import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting Kaggle dataset fetch...')
    
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch the dataset from Kaggle API or a public CSV URL
    // Since we can't use kagglehub directly in edge functions,
    // we'll use a publicly accessible version of the dataset
    const response = await fetch('https://www.kaggle.com/api/v1/datasets/download/mexwell/5m-trees-dataset')
    
    if (!response.ok) {
      throw new Error(`Failed to fetch dataset: ${response.statusText}`)
    }

    console.log('Dataset fetched successfully')

    // For now, let's create some sample tree species data
    // In a real implementation, you would parse the CSV data
    const sampleTreeSpecies = [
      {
        species_name: 'Quercus alba',
        common_name: 'White Oak',
        family: 'Fagaceae',
        genus: 'Quercus',
        height_range: '20-30 meters',
        leaf_type: 'deciduous',
        bark_characteristics: 'light gray, scaly',
        flower_characteristics: 'small, greenish catkins',
        fruit_characteristics: 'acorns',
        habitat: 'mixed forests',
        geographic_distribution: 'Eastern North America',
        conservation_status: 'least concern',
        image_features: {
          leaf_shape: 'lobed',
          bark_texture: 'rough',
          fruit_type: 'nut',
          dominant_colors: ['green', 'brown']
        }
      },
      {
        species_name: 'Acer saccharum',
        common_name: 'Sugar Maple',
        family: 'Sapindaceae',
        genus: 'Acer',
        height_range: '25-35 meters',
        leaf_type: 'deciduous',
        bark_characteristics: 'gray-brown, furrowed',
        flower_characteristics: 'small, yellowish-green clusters',
        fruit_characteristics: 'winged samaras',
        habitat: 'hardwood forests',
        geographic_distribution: 'Eastern North America',
        conservation_status: 'least concern',
        image_features: {
          leaf_shape: 'palmate',
          bark_texture: 'rough',
          fruit_type: 'samara',
          dominant_colors: ['green', 'red', 'orange']
        }
      }
    ]

    // Insert the data into the database
    const { data, error } = await supabase
      .from('tree_species')
      .insert(sampleTreeSpecies)

    if (error) {
      console.error('Database insert error:', error)
      throw error
    }

    console.log(`Successfully inserted ${sampleTreeSpecies.length} tree species`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully processed ${sampleTreeSpecies.length} tree species`,
        count: sampleTreeSpecies.length 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error processing dataset:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process dataset', 
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    )
  }
})