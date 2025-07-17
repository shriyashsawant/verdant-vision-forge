
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Calendar, Shield, Leaf, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TreeIdentificationResultProps {
  result: {
    species: string;
    commonName: string;
    confidence: number;
    characteristics: string[];
    healthStatus: string;
    description: string;
    careInstructions: string[];
    location?: { lat: number; lng: number } | null;
    timestamp: string;
  };
}

const TreeIdentificationResult = ({ result }: TreeIdentificationResultProps) => {
  const { toast } = useToast();

  const saveToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('treeFavorites') || '[]');
    const favorite = {
      ...result,
      id: Date.now(),
      savedAt: new Date().toISOString(),
    };
    favorites.unshift(favorite);
    localStorage.setItem('treeFavorites', JSON.stringify(favorites));
    
    toast({
      title: "Saved to favorites!",
      description: `${result.commonName} has been added to your favorites.`,
    });
  };

  const getHealthStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Result */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl text-green-700">
                {result.commonName}
              </CardTitle>
              <CardDescription className="text-lg italic">
                {result.species}
              </CardDescription>
            </div>
            <div className="text-right space-y-2">
              <Badge variant="secondary" className="text-sm">
                {Math.round(result.confidence * 100)}% confident
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={saveToFavorites}
              >
                <Heart className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{result.description}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Characteristics */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <Leaf className="h-4 w-4 mr-2 text-green-600" />
                Key Characteristics
              </h3>
              <ul className="space-y-2">
                {result.characteristics.map((char, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {char}
                  </li>
                ))}
              </ul>
            </div>

            {/* Health Status & Info */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <Shield className="h-4 w-4 mr-2 text-green-600" />
                Health & Status
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Health Status:</span>
                  <Badge className={`ml-2 ${getHealthStatusColor(result.healthStatus)}`}>
                    {result.healthStatus}
                  </Badge>
                </div>
                
                {result.location && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {result.location.lat.toFixed(4)}, {result.location.lng.toFixed(4)}
                  </div>
                )}
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(result.timestamp).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Care Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="h-5 w-5 mr-2 text-green-600" />
            Care Instructions
          </CardTitle>
          <CardDescription>
            How to properly care for your {result.commonName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {result.careInstructions.map((instruction, index) => (
              <div key={index} className="flex items-start p-3 bg-green-50 rounded-lg">
                <span className="w-6 h-6 bg-green-200 text-green-800 rounded-full flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">
                  {index + 1}
                </span>
                <span>{instruction}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreeIdentificationResult;
