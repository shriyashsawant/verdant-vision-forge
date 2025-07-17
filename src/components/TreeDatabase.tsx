
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Leaf, MapPin } from "lucide-react";

const TreeDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock tree database - in a real app, this would be fetched from an API
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
    }
  ];

  const filteredTrees = treeDatabase.filter(tree =>
    tree.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tree.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tree.family.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Search trees by name, species, or family..."
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
