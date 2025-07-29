
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, MapPin, BookOpen, Heart, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TreeUpload from "@/components/TreeUpload";
import TreeDatabase from "@/components/TreeDatabase";
import TreeHistory from "@/components/TreeHistory";
import DatasetLoader from "@/components/DatasetLoader";

const Index = () => {
  const [activeTab, setActiveTab] = useState("identify");
  const { toast } = useToast();

  const features = [
    {
      icon: Camera,
      title: "AI Tree Recognition",
      description: "Take a photo or upload an image to instantly identify tree species using advanced AI",
      action: () => setActiveTab("identify")
    },
    {
      icon: BookOpen,
      title: "Tree Database",
      description: "Explore our comprehensive database of tree species with detailed information",
      action: () => setActiveTab("database")
    },
    {
      icon: MapPin,
      title: "Location Mapping",
      description: "Map and track trees in your area with GPS coordinates",
      action: () => toast({ title: "Coming Soon!", description: "Tree mapping feature will be available soon." })
    },
    {
      icon: History,
      title: "Identification History",
      description: "View your past tree identifications and save favorites",
      action: () => setActiveTab("history")
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Tree Vision Buddy</h1>
          <p className="text-xl mb-8">Discover and identify trees with the power of AI</p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => setActiveTab("identify")}
            className="mr-4"
          >
            <Camera className="mr-2 h-5 w-5" />
            Start Identifying
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => setActiveTab("database")}
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Browse Trees
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: "identify", label: "Identify", icon: Camera },
              { id: "database", label: "Database", icon: BookOpen },
              { id: "history", label: "History", icon: History }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === id
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === "identify" && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Identify a Tree</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Upload an image or take a photo of a tree, and our AI will help you identify the species,
                provide detailed information, and assess its health.
              </p>
            </div>
            <div className="space-y-6">
              <DatasetLoader />
              <TreeUpload />
            </div>
          </div>
        )}

        {activeTab === "database" && <TreeDatabase />}
        {activeTab === "history" && <TreeHistory />}

        {activeTab === "features" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={feature.action}>
                <CardHeader className="text-center">
                  <feature.icon className="h-12 w-12 mx-auto text-green-600 mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
