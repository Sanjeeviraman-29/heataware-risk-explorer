import { useState, useEffect } from "react";
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
import { fetchMitigationStrategies, type MitigationStrategy } from "@/lib/supabase";

const Mitigation = () => {
  const [openCards, setOpenCards] = useState<string[]>([]);
  const [strategies, setStrategies] = useState<MitigationStrategy[]>([]);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);

  const toggleCard = (id: string) => {
    setOpenCards(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Load strategies from Supabase
  useEffect(() => {
    const loadStrategies = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMitigationStrategies(selectedRiskLevel);
        setStrategies(data);
      } catch (error) {
        console.error('Failed to load strategies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStrategies();
  }, [selectedRiskLevel]);

  const handleRiskLevelFilter = async (riskLevel: string) => {
    setSelectedRiskLevel(riskLevel);
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
      <div className="bg-gradient-cooling text-white py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl font-bold mb-4 animate-fade-in-up">Smart Mitigation Tips</h1>
          <p className="text-lg opacity-90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Evidence-based solutions to reduce urban heat and build climate resilience
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Section */}
        <div className="mb-8 animate-fade-in-up">
          <h2 className="text-xl font-semibold mb-4">Filter by Risk Level</h2>
          <div className="flex flex-wrap gap-3">
            <Badge 
              className={`cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                selectedRiskLevel === "All" ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              onClick={() => handleRiskLevelFilter("All")}
            >
              All Levels
            </Badge>
            <Badge 
              className={`cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                selectedRiskLevel === "Extreme" ? "bg-risk-extreme text-white ring-2 ring-white" : "bg-risk-extreme text-white hover:bg-risk-extreme/80"
              }`}
              onClick={() => handleRiskLevelFilter("Extreme")}
            >
              Extreme Risk
            </Badge>
            <Badge 
              className={`cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                selectedRiskLevel === "High" ? "bg-risk-high text-white ring-2 ring-white" : "bg-risk-high text-white hover:bg-risk-high/80"
              }`}
              onClick={() => handleRiskLevelFilter("High")}
            >
              High Risk
            </Badge>
            <Badge 
              className={`cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                selectedRiskLevel === "Medium" ? "bg-risk-moderate text-white ring-2 ring-white" : "bg-risk-moderate text-white hover:bg-risk-moderate/80"
              }`}
              onClick={() => handleRiskLevelFilter("Medium")}
            >
              Moderate Risk
            </Badge>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground">Loading strategies...</p>
          </div>
        )}

        {/* Mitigation Strategies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Display Supabase strategies if available, otherwise fallback to dummy data */}
          {(strategies.length > 0 ? strategies : mitigationStrategies).map((strategy, index) => {
            // Handle both Supabase data and dummy data structures
            const Icon = strategy.icon || Trees; // Fallback icon for Supabase data
            const strategyId = strategy.id?.toString() || strategy.strategy;
            const isOpen = openCards.includes(strategyId);
            const title = strategy.strategy || strategy.title;
            const description = strategy.description;

            // Create colorful gradients for each card
            const cardGradients = [
              'from-green-500/10 to-emerald-500/10 border-green-200/50',
              'from-blue-500/10 to-cyan-500/10 border-blue-200/50',
              'from-purple-500/10 to-violet-500/10 border-purple-200/50',
              'from-orange-500/10 to-amber-500/10 border-orange-200/50',
              'from-pink-500/10 to-rose-500/10 border-pink-200/50',
              'from-indigo-500/10 to-blue-500/10 border-indigo-200/50'
            ];

            const iconGradients = [
              'bg-gradient-to-br from-green-500 to-emerald-600',
              'bg-gradient-to-br from-blue-500 to-cyan-600',
              'bg-gradient-to-br from-purple-500 to-violet-600',
              'bg-gradient-to-br from-orange-500 to-amber-600',
              'bg-gradient-to-br from-pink-500 to-rose-600',
              'bg-gradient-to-br from-indigo-500 to-blue-600'
            ];

            return (
              <Card 
                key={strategyId} 
                className={`transition-all duration-500 hover:shadow-elegant transform hover:-translate-y-2 animate-slide-up bg-gradient-to-br ${cardGradients[index % cardGradients.length]} backdrop-blur-sm`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Collapsible>
                  <CollapsibleTrigger 
                    className="w-full text-left"
                    onClick={() => toggleCard(strategyId)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-lg ${iconGradients[index % iconGradients.length]} transform transition-all duration-300 hover:scale-110`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg hover:text-primary transition-colors duration-300">{title}</CardTitle>
                            <CardDescription className="mt-1">
                              {description}
                            </CardDescription>
                          </div>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground transition-transform duration-300" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-300" />
                        )}
                      </div>
                      
                      {/* Strategy Metrics - Only show if data exists (dummy data) */}
                      {strategy.impact && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge className={`${getImpactColor(strategy.impact)} transform transition-all duration-300 hover:scale-105`}>
                            💪 Impact: {strategy.impact}
                          </Badge>
                          <Badge variant="outline" className="transform transition-all duration-300 hover:scale-105">
                            💰 Cost: {strategy.cost}
                          </Badge>
                          <Badge variant="outline" className="transform transition-all duration-300 hover:scale-105">
                            ⏱️ {strategy.timeframe}
                          </Badge>
                        </div>
                      )}
                      
                      {/* Risk Level Badge for Supabase data */}
                      {strategy.risk_level_targeted && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          <Badge className={`bg-${getRiskLevelColor(strategy.risk_level_targeted.toLowerCase())} text-white transform transition-all duration-300 hover:scale-105`}>
                            🎯 Target: {strategy.risk_level_targeted} Risk
                          </Badge>
                        </div>
                      )}
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="animate-fade-in-up">
                    <CardContent className="space-y-6">
                      {/* For dummy data with detailed fields */}
                      {strategy.benefits && (
                        <>
                          {/* Benefits */}
                          <div>
                            <h4 className="font-medium mb-3 flex items-center gap-2">
                              <Shield className="h-4 w-4 text-green-600" />
                              🌟 Key Benefits
                            </h4>
                            <ul className="space-y-2">
                              {strategy.benefits.map((benefit, benefitIndex) => (
                                <li key={benefitIndex} className="flex items-start gap-2 text-sm animate-fade-in-left" style={{ animationDelay: `${benefitIndex * 0.1}s` }}>
                                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mt-2 flex-shrink-0" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Action Items */}
                          <div>
                            <h4 className="font-medium mb-3 flex items-center gap-2">
                              <Leaf className="h-4 w-4 text-blue-600" />
                              🛠️ Implementation Actions
                            </h4>
                            <ul className="space-y-2">
                              {strategy.actions.map((action, actionIndex) => (
                                <li key={actionIndex} className="flex items-start gap-2 text-sm animate-fade-in-left" style={{ animationDelay: `${actionIndex * 0.1}s` }}>
                                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mt-2 flex-shrink-0" />
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Real-world Examples */}
                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <Lightbulb className="h-4 w-4 text-yellow-600" />
                              🌍 Real-world Examples
                            </h4>
                            <p className="text-sm text-muted-foreground bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg border border-yellow-200/50">{strategy.examples}</p>
                          </div>
                        </>
                      )}
                      
                      {/* For Supabase data - simpler display */}
                      {!strategy.benefits && (
                        <div>
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <Shield className="h-4 w-4 text-green-600" />
                            📋 Strategy Details
                          </h4>
                          <p className="text-sm text-muted-foreground bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200/50">
                            {description}
                          </p>
                          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium">🎯 Targeted Risk Level: <span className="text-primary">{strategy.risk_level_targeted}</span></p>
                          </div>
                        </div>
                      )}

                      <Button variant="hero" className="w-full transform transition-all duration-300 hover:scale-105 hover:shadow-elegant">
                        📋 Get Implementation Guide
                      </Button>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center animate-fade-in-up">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 shadow-elegant">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">🚀 Ready to Take Action?</h3>
              <p className="text-muted-foreground mb-6">
                Connect with local officials and community organizations to implement these strategies in your area.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="hero" className="transform transition-all duration-300 hover:scale-105 hover:shadow-elegant">
                  📞 Contact Local Officials
                </Button>
                <Button variant="outline" className="transform transition-all duration-300 hover:scale-105">
                  🤝 Join Community Groups
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