import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const DatasetLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const loadKaggleDataset = async () => {
    setIsLoading(true);
    setStatus('loading');
    
    try {
      // Call the Supabase edge function to fetch and process the dataset
      const { data, error } = await supabase.functions.invoke('fetch-kaggle-dataset');
      
      if (error) {
        throw error;
      }
      
      console.log('Dataset loading result:', data);
      
      setStatus('success');
      toast({
        title: "Dataset loaded successfully!",
        description: `${data.count} tree species have been added to the database.`,
      });
      
    } catch (error) {
      console.error('Failed to load dataset:', error);
      setStatus('error');
      toast({
        title: "Failed to load dataset",
        description: "There was an error loading the Kaggle dataset. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Database className="h-5 w-5" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'loading':
        return 'Loading dataset...';
      case 'success':
        return 'Dataset loaded successfully';
      case 'error':
        return 'Failed to load dataset';
      default:
        return 'Load Kaggle Tree Dataset';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon()}
          Train with Kaggle Dataset
        </CardTitle>
        <CardDescription>
          Load the "5M Trees Dataset" from Kaggle to enhance tree identification accuracy with thousands of additional species.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Dataset Information:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Dataset: mexwell/5m-trees-dataset</li>
            <li>• Contains comprehensive tree species data</li>
            <li>• Includes visual characteristics and habitat information</li>
            <li>• Will be stored in Supabase for fast identification</li>
          </ul>
        </div>
        
        <Button 
          onClick={loadKaggleDataset}
          disabled={isLoading || status === 'success'}
          className="w-full font-black uppercase tracking-widest"
          variant={status === 'success' ? 'forest' : status === 'error' ? 'destructive' : 'nature'}
          size="xl"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              LOADING DATASET...
            </>
          ) : (
            <>
              {getStatusIcon()}
              <span className="ml-2 font-black text-lg">{getStatusText().toUpperCase()} 🚀</span>
            </>
          )}
        </Button>
        
        {status === 'success' && (
          <div className="text-center text-sm text-green-600">
            ✅ The tree identification system is now enhanced with the Kaggle dataset!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DatasetLoader;