-- Create a table to store tree species data from the Kaggle dataset
CREATE TABLE public.tree_species (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  species_name TEXT NOT NULL,
  common_name TEXT,
  family TEXT,
  genus TEXT,
  height_range TEXT,
  leaf_type TEXT,
  bark_characteristics TEXT,
  flower_characteristics TEXT,
  fruit_characteristics TEXT,
  habitat TEXT,
  geographic_distribution TEXT,
  conservation_status TEXT,
  image_features JSONB,
  source TEXT DEFAULT 'kaggle_dataset',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.tree_species ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (no authentication required for reading tree data)
CREATE POLICY "Tree species are publicly readable" 
ON public.tree_species 
FOR SELECT 
USING (true);

-- Create policy for authenticated users to insert/update (for admin functions)
CREATE POLICY "Authenticated users can insert tree species" 
ON public.tree_species 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update tree species" 
ON public.tree_species 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Create index for better search performance
CREATE INDEX idx_tree_species_name ON public.tree_species(species_name);
CREATE INDEX idx_tree_species_common_name ON public.tree_species(common_name);
CREATE INDEX idx_tree_species_family ON public.tree_species(family);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_tree_species_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_tree_species_updated_at
  BEFORE UPDATE ON public.tree_species
  FOR EACH ROW
  EXECUTE FUNCTION public.update_tree_species_updated_at();