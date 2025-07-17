
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload, Loader2, MapPin, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TreeIdentificationResult from "./TreeIdentificationResult";

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
      // Simulate AI analysis - in a real app, this would call an AI service
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock result - replace with actual AI analysis
      const mockResult = {
        species: "Quercus alba",
        commonName: "White Oak",
        confidence: 0.87,
        characteristics: [
          "Rounded lobed leaves",
          "Light gray bark",
          "Large deciduous tree",
          "Acorns with shallow caps"
        ],
        healthStatus: "Healthy",
        description: "The White Oak is a large deciduous tree native to eastern and central North America. It's known for its distinctive rounded lobed leaves and light gray bark.",
        careInstructions: [
          "Prefers full sun to partial shade",
          "Requires well-drained soil",
          "Water regularly during dry periods",
          "Prune in late fall or winter"
        ],
        location: location,
        timestamp: new Date().toISOString(),
      };

      setIdentificationResult(mockResult);
      
      // Save to history
      const history = JSON.parse(localStorage.getItem('treeHistory') || '[]');
      history.unshift({
        ...mockResult,
        id: Date.now(),
        image: imagePreview,
      });
      localStorage.setItem('treeHistory', JSON.stringify(history.slice(0, 50))); // Keep last 50

      toast({
        title: "Tree identified!",
        description: `Found: ${mockResult.commonName} with ${Math.round(mockResult.confidence * 100)}% confidence`,
      });
      
    } catch (error) {
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
            Choose an image file or take a photo of a tree to identify
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
              className="min-w-32"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Info className="mr-2 h-4 w-4" />
                  Identify Tree
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
