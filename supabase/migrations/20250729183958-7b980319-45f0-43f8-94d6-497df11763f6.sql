-- Fix the security warning for function search path
-- Update the existing function to include search_path setting
CREATE OR REPLACE FUNCTION public.update_tree_species_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER 
SET search_path = public;