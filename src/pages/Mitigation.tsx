import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Trees, 
  Building, 
  Car, 
  Droplets, 
  Sun, 
  Users, 
  ChevronDown, 
  ChevronUp,
  Leaf,
  Shield,
  Lightbulb
} from "lucide-react";

const Mitigation = () => {
  const [openCards, setOpenCards] = useState<string[]>([]);

  const toggleCard = (id: string) => {
    setOpenCards(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const mitigationStrategies = [
    {
      id: "urban-forestry",
      title: "Urban Forestry & Green Spaces",
      icon: Trees,
      riskLevel: "all",
      impact: "High",
      cost: "Medium",
      timeframe: "Long-term",
      description: "Increase tree canopy coverage and create green corridors to reduce surface temperatures.",
      benefits: [
        "Reduces ambient temperature by 2-8°C",
        "Improves air quality",
        "Provides natural shade and cooling",
        "Enhances biodiversity"
      ],
      actions: [
        "Plant native, heat-resistant tree species",
        "Create pocket parks in dense urban areas",
        "Develop green corridors connecting parks",
        "Implement community tree planting programs"
      ],
      examples: "Singapore's 'City in a Garden' initiative, Barcelona's green corridors"
    },
    {
      id: "cool-roofs",
      title: "Cool Roofing & Building Design",
      icon: Building,
      riskLevel: "high",
      impact: "Medium",
      cost: "Low",
      timeframe: "Short-term",
      description: "Implement reflective and green roofing systems to reduce heat absorption.",
      benefits: [
        "Reduces building energy consumption by 15-30%",
        "Lowers urban heat island effect",
        "Decreases roof surface temperature by 30-50°F",
        "Extends roof lifespan"
      ],
      actions: [
        "Install reflective roofing materials",
        "Create green roof gardens",
        "Use light-colored building materials",
        "Implement cool pavement technologies"
      ],
      examples: "Los Angeles Cool Roof Initiative, NYC Green Roof Tax Abatement"
    },
    {
      id: "transportation",
      title: "Sustainable Transportation",
      icon: Car,
      riskLevel: "moderate",
      impact: "Medium",
      cost: "High",
      timeframe: "Medium-term",
      description: "Reduce heat-generating emissions through sustainable transportation systems.",
      benefits: [
        "Reduces urban air temperature",
        "Improves air quality",
        "Decreases greenhouse gas emissions",
        "Promotes public health"
      ],
      actions: [
        "Expand public transit networks",
        "Promote electric vehicle adoption",
        "Create bike-sharing programs",
        "Implement congestion pricing"
      ],
      examples: "Copenhagen's cycling infrastructure, London's congestion charge"
    },
    {
      id: "water-features",
      title: "Water-Based Cooling Systems",
      icon: Droplets,
      riskLevel: "extreme",
      impact: "High",
      cost: "High",
      timeframe: "Medium-term",
      description: "Implement water features and misting systems for localized cooling.",
      benefits: [
        "Provides immediate cooling effect",
        "Creates comfortable public spaces",
        "Supports community gathering",
        "Enhances urban aesthetics"
      ],
      actions: [
        "Install public misting systems",
        "Create urban water features",
        "Develop splash pads and fountains",
        "Implement permeable pavement"
      ],
      examples: "Paris's public misting systems, Portland's fountain network"
    },
    {
      id: "community-programs",
      title: "Community Resilience Programs",
      icon: Users,
      riskLevel: "all",
      impact: "High",
      cost: "Low",
      timeframe: "Short-term",
      description: "Develop community-based programs to protect vulnerable populations.",
      benefits: [
        "Reduces heat-related health risks",
        "Builds community resilience",
        "Provides immediate relief",
        "Supports vulnerable populations"
      ],
      actions: [
        "Establish cooling centers",
        "Create heat emergency response plans",
        "Implement early warning systems",
        "Organize community education programs"
      ],
      examples: "Phoenix heat emergency response, Chicago cooling center network"
    },
    {
      id: "smart-design",
      title: "Smart Urban Design",
      icon: Lightbulb,
      riskLevel: "high",
      impact: "High",
      cost: "Medium",
      timeframe: "Long-term",
      description: "Redesign urban spaces to optimize airflow and reduce heat retention.",
      benefits: [
        "Improves natural ventilation",
        "Reduces heat accumulation",
        "Creates comfortable microclimates",
        "Enhances urban livability"
      ],
      actions: [
        "Design wind corridors between buildings",
        "Create shaded pedestrian pathways",
        "Optimize building orientation",
        "Implement smart street lighting"
      ],
      examples: "Singapore's urban wind studies, Barcelona's superblocks"
    }
  ];

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "extreme": return "risk-extreme";
      case "high": return "risk-high";
      case "moderate": return "risk-moderate";
      case "low": return "risk-low";
      default: return "muted";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-risk-low text-white";
      case "Medium": return "bg-risk-moderate text-white";
      case "Low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-cooling text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Heat Mitigation Strategies</h1>
          <p className="text-lg opacity-90">
            Evidence-based solutions to reduce urban heat and build climate resilience
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Filter by Risk Level</h2>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-muted text-muted-foreground cursor-pointer hover:bg-muted/80">
              All Levels
            </Badge>
            <Badge className="bg-risk-extreme text-white cursor-pointer hover:bg-risk-extreme/80">
              Extreme Risk
            </Badge>
            <Badge className="bg-risk-high text-white cursor-pointer hover:bg-risk-high/80">
              High Risk
            </Badge>
            <Badge className="bg-risk-moderate text-white cursor-pointer hover:bg-risk-moderate/80">
              Moderate Risk
            </Badge>
          </div>
        </div>

        {/* Mitigation Strategies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mitigationStrategies.map((strategy) => {
            const Icon = strategy.icon;
            const isOpen = openCards.includes(strategy.id);

            return (
              <Card key={strategy.id} className="transition-all hover:shadow-card-hover">
                <Collapsible>
                  <CollapsibleTrigger 
                    className="w-full text-left"
                    onClick={() => toggleCard(strategy.id)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{strategy.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {strategy.description}
                            </CardDescription>
                          </div>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      
                      {/* Strategy Metrics */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Badge className={getImpactColor(strategy.impact)}>
                          Impact: {strategy.impact}
                        </Badge>
                        <Badge variant="outline">
                          Cost: {strategy.cost}
                        </Badge>
                        <Badge variant="outline">
                          {strategy.timeframe}
                        </Badge>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <CardContent className="space-y-6">
                      {/* Benefits */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          Key Benefits
                        </h4>
                        <ul className="space-y-2">
                          {strategy.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Items */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-primary" />
                          Implementation Actions
                        </h4>
                        <ul className="space-y-2">
                          {strategy.actions.map((action, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Real-world Examples */}
                      <div>
                        <h4 className="font-medium mb-2">Real-world Examples</h4>
                        <p className="text-sm text-muted-foreground">{strategy.examples}</p>
                      </div>

                      <Button variant="hero" className="w-full">
                        Get Implementation Guide
                      </Button>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Ready to Take Action?</h3>
              <p className="text-muted-foreground mb-6">
                Connect with local officials and community organizations to implement these strategies in your area.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="hero">
                  Contact Local Officials
                </Button>
                <Button variant="outline">
                  Join Community Groups
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Mitigation;