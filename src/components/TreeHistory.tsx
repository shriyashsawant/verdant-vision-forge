
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, Heart, Calendar, MapPin, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TreeHistory = () => {
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load history and favorites from localStorage
    const savedHistory = JSON.parse(localStorage.getItem('treeHistory') || '[]');
    const savedFavorites = JSON.parse(localStorage.getItem('treeFavorites') || '[]');
    
    setHistory(savedHistory);
    setFavorites(savedFavorites);
  }, []);

  const removeFromHistory = (id: number) => {
    const updatedHistory = history.filter((item: any) => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('treeHistory', JSON.stringify(updatedHistory));
    
    toast({
      title: "Removed from history",
      description: "The identification has been removed from your history.",
    });
  };

  const removeFromFavorites = (id: number) => {
    const updatedFavorites = favorites.filter((item: any) => item.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('treeFavorites', JSON.stringify(updatedFavorites));
    
    toast({
      title: "Removed from favorites",
      description: "The tree has been removed from your favorites.",
    });
  };

  const TreeCard = ({ tree, showRemove, onRemove }: any) => (
    <Card key={tree.id}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-green-700">
              {tree.commonName}
            </CardTitle>
            <CardDescription className="italic">
              {tree.species}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {Math.round(tree.confidence * 100)}% match
            </Badge>
            {showRemove && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(tree.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          {tree.image && (
            <img
              src={tree.image}
              alt={tree.commonName}
              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            />
          )}
          <div className="space-y-2 flex-1">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {tree.description}
            </p>
            
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(tree.timestamp).toLocaleDateString()}
              </div>
              {tree.location && (
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  GPS Recorded
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-1">
              {tree.characteristics?.slice(0, 2).map((char: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {char}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Your Tree Journey</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Review your past tree identifications and manage your favorite discoveries.
        </p>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Recent Identifications ({history.length})
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Favorites ({favorites.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4 mt-6">
          {history.length > 0 ? (
            <div className="grid gap-4">
              {history.map((tree: any) => (
                <TreeCard
                  key={tree.id}
                  tree={tree}
                  showRemove={true}
                  onRemove={removeFromHistory}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <History className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No identifications yet</h3>
                <p className="text-muted-foreground">
                  Start identifying trees to see your history here.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4 mt-6">
          {favorites.length > 0 ? (
            <div className="grid gap-4">
              {favorites.map((tree: any) => (
                <TreeCard
                  key={tree.id}
                  tree={tree}
                  showRemove={true}
                  onRemove={removeFromFavorites}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No favorites saved</h3>
                <p className="text-muted-foreground">
                  Save interesting tree identifications to access them quickly later.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TreeHistory;
