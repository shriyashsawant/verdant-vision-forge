
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload, Loader2, MapPin, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TreeIdentificationResult from "./TreeIdentificationResult";
import { identifyTree } from "../utils/treeIdentification";
import { identifyTreeFromDatabase } from "../utils/treeIdentificationDatabase";

const TreeUpload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [identificationResult, setIdentificationResult] = useState(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setIdentificationResult(null);
    }
  };

  const handleCameraCapture = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast({
            title: "Location captured",
            description: "GPS coordinates have been recorded for this identification.",
          });
        },
        (error) => {
          toast({
            title: "Location access denied",
            description: "Unable to access your location. The identification will proceed without GPS data.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const analyzeTree = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please select an image to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      console.log('Starting tree analysis for:', selectedImage.name);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Try database identification first, fallback to local if needed
      let result = await identifyTreeFromDatabase(selectedImage, location);
      
      if (!result) {
        console.log('Database identification failed, using local database...');
        result = await identifyTree(selectedImage, location);
      }
      
      console.log('Analysis complete:', result);
      
      setIdentificationResult(result);
      
      // Save to history with quota management
      try {
        const history = JSON.parse(localStorage.getItem('treeHistory') || '[]');
        const newEntry = {
          ...result,
          id: Date.now(),
          image: imagePreview,
        };
        history.unshift(newEntry);
        
        // Limit to 10 entries to prevent quota exceeded
        const limitedHistory = history.slice(0, 10);
        localStorage.setItem('treeHistory', JSON.stringify(limitedHistory));
      } catch (quotaError) {
        console.warn('localStorage quota exceeded, clearing history');
        try {
          // Clear and save only current entry
          const freshHistory = [{
            ...result,
            id: Date.now(),
            image: imagePreview,
          }];
          localStorage.setItem('treeHistory', JSON.stringify(freshHistory));
        } catch {
          console.warn('Cannot save to localStorage');
        }
      }

      toast({
        title: "Tree identified!",
        description: `Found: ${result.commonName} with ${Math.round(result.confidence * 100)}% confidence`,
      });
      
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: "Analysis failed",
        description: "Unable to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Tree Image
          </CardTitle>
          <CardDescription>
            Choose an image file or take a photo of a tree to identify. For best results, name your file with hints like "mango-tree.jpg" or "basswood-leaf.png"
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="file-upload">Upload from device</Label>
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                ref={fileInputRef}
                className="cursor-pointer"
              />
            </div>
            <div>
              <Label>Take photo</Label>
              <Button 
                variant="outline" 
                onClick={handleCameraCapture}
                className="w-full"
              >
                <Camera className="mr-2 h-4 w-4" />
                Open Camera
              </Button>
              <Input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileSelect}
                ref={cameraInputRef}
                className="hidden"
              />
            </div>
          </div>

          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Selected tree"
                className="max-w-full h-64 object-cover rounded-lg mx-auto"
              />
              {selectedImage && (
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  File: {selectedImage.name}
                </p>
              )}
            </div>
          )}
          
          <div className="flex gap-2 justify-center">
            <Button 
              onClick={getLocation}
              variant="outline"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Add Location
            </Button>
            <Button 
              onClick={analyzeTree}
              disabled={!selectedImage || isAnalyzing}
              className="min-w-32 font-black uppercase tracking-wider"
              variant="nature"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ANALYZING...
                </>
              ) : (
                <>
                  <Info className="mr-2 h-5 w-5" />
                  IDENTIFY TREE ⚡
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {identificationResult && (
        <TreeIdentificationResult result={identificationResult} />
      )}
    </div>
  );
};

export default TreeUpload;
