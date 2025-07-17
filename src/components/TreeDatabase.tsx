
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Leaf, MapPin } from "lucide-react";

const TreeDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Expanded realistic tree database based on common identification datasets
  const treeDatabase = [
    {
      id: 1,
      species: "Quercus alba",
      commonName: "White Oak",
      family: "Fagaceae",
      type: "Deciduous",
      region: "Eastern North America",
      description: "Large deciduous tree known for its rounded lobed leaves and light gray bark.",
      characteristics: ["Rounded lobed leaves", "Light gray bark", "Acorns with shallow caps"],
      maxHeight: "80-100 feet",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      species: "Acer saccharum",
      commonName: "Sugar Maple",
      family: "Sapindaceae",
      type: "Deciduous",
      region: "Eastern North America",
      description: "Iconic maple tree famous for its brilliant fall colors and maple syrup production.",
      characteristics: ["5-lobed palmate leaves", "Gray-brown bark", "Winged seeds (samaras)"],
      maxHeight: "60-75 feet",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      species: "Pinus strobus",
      commonName: "Eastern White Pine",
      family: "Pinaceae",
      type: "Evergreen",
      region: "Eastern North America",
      description: "Fast-growing evergreen with soft, blue-green needles in clusters of five.",
      characteristics: ["Needles in clusters of 5", "Soft blue-green color", "Long cylindrical cones"],
      maxHeight: "80-100 feet",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      species: "Betula papyrifera",
      commonName: "Paper Birch",
      family: "Betulaceae",
      type: "Deciduous",
      region: "Northern North America",
      description: "Distinctive white bark that peels in paper-like layers.",
      characteristics: ["White peeling bark", "Oval serrated leaves", "Small catkins"],
      maxHeight: "50-70 feet",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      species: "Sequoia sempervirens",
      commonName: "Coast Redwood",
      family: "Cupressaceae",
      type: "Evergreen",
      region: "Pacific Coast",
      description: "Tallest tree species in the world, found along the Pacific coast.",
      characteristics: ["Fibrous red bark", "Flat needle-like leaves", "Small cones"],
      maxHeight: "300+ feet",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      species: "Magnolia grandiflora",
      commonName: "Southern Magnolia",
      family: "Magnoliaceae",
      type: "Evergreen",
      region: "Southeastern United States",
      description: "Evergreen tree with large, fragrant white flowers and glossy leaves.",
      characteristics: ["Large white flowers", "Glossy dark green leaves", "Cone-like fruit clusters"],
      maxHeight: "60-80 feet",
      image: "/placeholder.svg"
    },
    {
      id: 7,
      species: "Fagus grandifolia",
      commonName: "American Beech",
      family: "Fagaceae",
      type: "Deciduous",
      region: "Eastern North America",
      description: "Smooth gray bark and distinctive bronze fall foliage.",
      characteristics: ["Smooth gray bark", "Serrated oval leaves", "Triangular nuts"],
      maxHeight: "50-70 feet",
      image: "/placeholder.svg"
    },
    {
      id: 8,
      species: "Tsuga canadensis",
      commonName: "Eastern Hemlock",
      family: "Pinaceae",
      type: "Evergreen",
      region: "Eastern North America",
      description: "Shade-tolerant conifer with short, flat needles and small cones.",
      characteristics: ["Short flat needles", "Small hanging cones", "Drooping branch tips"],
      maxHeight: "60-70 feet",
      image: "/placeholder.svg"
    },
    {
      id: 9,
      species: "Carya ovata",
      commonName: "Shagbark Hickory",
      family: "Juglandaceae",
      type: "Deciduous",
      region: "Eastern North America",
      description: "Named for its distinctive shaggy, peeling bark.",
      characteristics: ["Shaggy peeling bark", "Compound leaves with 5 leaflets", "Large edible nuts"],
      maxHeight: "60-80 feet",
      image: "/placeholder.svg"
    },
    {
      id: 10,
      species: "Fraxinus americana",
      commonName: "White Ash",
      family: "Oleaceae",
      type: "Deciduous",
      region: "Eastern North America",
      description: "Important timber tree with compound leaves and winged seeds.",
      characteristics: ["Compound leaves", "Diamond-shaped bark pattern", "Winged seeds"],
      maxHeight: "50-80 feet",
      image: "/placeholder.svg"
    },
    {
      id: 11,
      species: "Platanus occidentalis",
      commonName: "American Sycamore",
      family: "Platanaceae",
      type: "Deciduous",
      region: "Eastern United States",
      description: "Large tree with distinctive mottled bark that exfoliates in patches.",
      characteristics: ["Mottled exfoliating bark", "Large palmate leaves", "Round seed balls"],
      maxHeight: "75-100 feet",
      image: "/placeholder.svg"
    },
    {
      id: 12,
      species: "Liriodendron tulipifera",
      commonName: "Tulip Tree",
      family: "Magnoliaceae",
      type: "Deciduous",
      region: "Eastern North America",
      description: "Fast-growing tree with distinctive tulip-shaped flowers and leaves.",
      characteristics: ["Tulip-shaped leaves", "Orange-green flowers", "Cone-like fruits"],
      maxHeight: "80-120 feet",
      image: "/placeholder.svg"
    },
    {
      id: 13,
      species: "Picea abies",
      commonName: "Norway Spruce",
      family: "Pinaceae",
      type: "Evergreen",
      region: "Northern Europe",
      description: "Popular ornamental conifer with drooping branches and large cones.",
      characteristics: ["Drooping branches", "4-sided needles", "Large hanging cones"],
      maxHeight: "100-200 feet",
      image: "/placeholder.svg"
    },
    {
      id: 14,
      species: "Populus tremuloides",
      commonName: "Quaking Aspen",
      family: "Salicaceae",
      type: "Deciduous",
      region: "Northern North America",
      description: "Small tree with leaves that tremble in the slightest breeze.",
      characteristics: ["Round leaves on flat petioles", "White bark with black scars", "Golden fall color"],
      maxHeight: "40-70 feet",
      image: "/placeholder.svg"
    },
    {
      id: 15,
      species: "Abies balsamea",
      commonName: "Balsam Fir",
      family: "Pinaceae",
      type: "Evergreen",
      region: "Northeastern North America",
      description: "Aromatic conifer commonly used as Christmas trees.",
      characteristics: ["Flat needles with white stripes", "Upright purple cones", "Smooth bark with resin blisters"],
      maxHeight: "40-60 feet",
      image: "/placeholder.svg"
    },
    {
      id: 16,
      species: "Quercus rubra",
      commonName: "Northern Red Oak",
      family: "Fagaceae",
      type: "Deciduous",
      region: "Eastern North America",
      description: "Important timber oak with pointed leaf lobes and reddish fall color.",
      characteristics: ["Pointed leaf lobes", "Dark furrowed bark", "Large acorns"],
      maxHeight: "60-75 feet",
      image: "/placeholder.svg"
    },
    {
      id: 17,
      species: "Acer rubrum",
      commonName: "Red Maple",
      family: "Sapindaceae",
      type: "Deciduous",
      region: "Eastern North America",
      description: "Adaptable maple with brilliant red fall foliage and early spring flowers.",
      characteristics: ["3-5 lobed leaves", "Red flowers and twigs", "Bright red fall color"],
      maxHeight: "40-60 feet",
      image: "/placeholder.svg"
    },
    {
      id: 18,
      species: "Tilia americana",
      commonName: "American Basswood",
      family: "Malvaceae",
      type: "Deciduous",
      region: "Eastern North America",
      description: "Large shade tree with heart-shaped leaves and fragrant flowers.",
      characteristics: ["Large heart-shaped leaves", "Fragrant yellowish flowers", "Small round fruits"],
      maxHeight: "50-80 feet",
      image: "/placeholder.svg"
    },
    {
      id: 19,
      species: "Pinus ponderosa",
      commonName: "Ponderosa Pine",
      family: "Pinaceae",
      type: "Evergreen",
      region: "Western North America",
      description: "Large pine with distinctive orange-red bark plates and long needles.",
      characteristics: ["Orange-red bark plates", "Long needles in clusters of 3", "Large egg-shaped cones"],
      maxHeight: "60-100 feet",
      image: "/placeholder.svg"
    },
    {
      id: 20,
      species: "Pseudotsuga menziesii",
      commonName: "Douglas Fir",
      family: "Pinaceae",
      type: "Evergreen",
      region: "Western North America",
      description: "Important timber tree with distinctive cones and flat needles.",
      characteristics: ["Flat needles with white stripes", "Distinctive 3-pronged cone bracts", "Thick furrowed bark"],
      maxHeight: "100-250 feet",
      image: "/placeholder.svg"
    },
    {
      id: 21,
      species: "Salix babylonica",
      commonName: "Weeping Willow",
      family: "Salicaceae",
      type: "Deciduous",
      region: "Northern China",
      description: "Graceful tree with long, drooping branches and narrow leaves.",
      characteristics: ["Long drooping branches", "Narrow lance-shaped leaves", "Catkin flowers"],
      maxHeight: "25-40 feet",
      image: "/placeholder.svg"
    },
    {
      id: 22,
      species: "Ulmus americana",
      commonName: "American Elm",
      family: "Ulmaceae",
      type: "Deciduous",
      region: "Eastern North America",
      description: "Classic shade tree with distinctive vase-shaped crown.",
      characteristics: ["Vase-shaped crown", "Serrated oval leaves", "Small winged seeds"],
      maxHeight: "60-80 feet",
      image: "/placeholder.svg"
    },
    {
      id: 23,
      species: "Juglans nigra",
      commonName: "Black Walnut",
      family: "Juglandaceae",
      type: "Deciduous",
      region: "Eastern North America",
      description: "Valuable timber tree producing edible nuts with distinctive compound leaves.",
      characteristics: ["Large compound leaves", "Dark furrowed bark", "Round nuts in green husks"],
      maxHeight: "50-75 feet",
      image: "/placeholder.svg"
    },
    {
      id: 24,
      species: "Castanea dentata",
      commonName: "American Chestnut",
      family: "Fagaceae",
      type: "Deciduous",
      region: "Eastern North America",
      description: "Once dominant canopy tree, now rare due to chestnut blight.",
      characteristics: ["Long serrated leaves", "Spiny nut husks", "Smooth gray bark when young"],
      maxHeight: "50-100 feet",
      image: "/placeholder.svg"
    },
    {
      id: 25,
      species: "Acer negundo",
      commonName: "Box Elder",
      family: "Sapindaceae",
      type: "Deciduous",
      region: "Central North America",
      description: "Fast-growing maple with compound leaves, unusual for the maple family.",
      characteristics: ["Compound leaves with 3-5 leaflets", "Green bark on young twigs", "Winged seeds"],
      maxHeight: "35-50 feet",
      image: "/placeholder.svg"
    },
    {
      id: 26,
      species: "Thuja occidentalis",
      commonName: "Eastern White Cedar",
      family: "Cupressaceae",
      type: "Evergreen",
      region: "Northeastern North America",
      description: "Small to medium conifer with scale-like leaves and fibrous bark.",
      characteristics: ["Scale-like leaves", "Fibrous bark", "Small egg-shaped cones"],
      maxHeight: "40-50 feet",
      image: "/placeholder.svg"
    },
    {
      id: 27,
      species: "Prunus serotina",
      commonName: "Black Cherry",
      family: "Rosaceae",
      type: "Deciduous",
      region: "Eastern North America",
      description: "Important timber tree with dark bark and white flower clusters.",
      characteristics: ["Dark scaly bark", "Serrated leaves", "White flower clusters"],
      maxHeight: "50-80 feet",
      image: "/placeholder.svg"
    },
    {
      id: 28,
      species: "Liquidambar styraciflua",
      commonName: "American Sweetgum",
      family: "Altingiaceae",
      type: "Deciduous",
      region: "Eastern United States",
      description: "Ornamental tree with star-shaped leaves and spiky seed balls.",
      characteristics: ["Star-shaped leaves", "Spiky round seed balls", "Corky bark ridges"],
      maxHeight: "60-75 feet",
      image: "/placeholder.svg"
    },
    {
      id: 29,
      species: "Catalpa bignonioides",
      commonName: "Southern Catalpa",
      family: "Bignoniaceae",
      type: "Deciduous",
      region: "Southeastern United States",
      description: "Medium tree with large heart-shaped leaves and showy white flowers.",
      characteristics: ["Large heart-shaped leaves", "White orchid-like flowers", "Long bean-like pods"],
      maxHeight: "30-40 feet",
      image: "/placeholder.svg"
    },
    {
      id: 30,
      species: "Nyssa sylvatica",
      commonName: "Black Gum",
      family: "Nyssaceae",
      type: "Deciduous",
      region: "Eastern North America",
      description: "Ornamental tree prized for its brilliant red fall color.",
      characteristics: ["Glossy oval leaves", "Brilliant red fall color", "Dark blue berries"],
      maxHeight: "30-50 feet",
      image: "/placeholder.svg"
    }
  ];

  const filteredTrees = treeDatabase.filter(tree =>
    tree.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tree.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tree.family.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tree.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tree.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Tree Species Database</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Explore our comprehensive database of tree species. Learn about different trees,
          their characteristics, and where they can be found.
        </p>
        
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search trees by name, species, family, type, or region..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrees.map((tree) => (
          <Card key={tree.id} className="hover:shadow-lg transition-shadow">
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
                <Badge variant={tree.type === 'Deciduous' ? 'default' : 'secondary'}>
                  {tree.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">{tree.description}</p>
                
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div>
                    <strong>Family:</strong> {tree.family}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <strong>Region:</strong> {tree.region}
                  </div>
                  <div>
                    <strong>Max Height:</strong> {tree.maxHeight}
                  </div>
                </div>

                <div>
                  <strong className="text-sm">Key Features:</strong>
                  <ul className="mt-1 space-y-1">
                    {tree.characteristics.slice(0, 2).map((char, index) => (
                      <li key={index} className="flex items-start text-sm text-muted-foreground">
                        <Leaf className="h-3 w-3 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTrees.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No trees found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default TreeDatabase;
