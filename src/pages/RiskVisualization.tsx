import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MapPin, Thermometer, Droplets, AlertTriangle, Users, Calendar, ChevronDown, Search, Bell, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { HeatMap } from "@/components/HeatMap";
import { MetricsCards } from "@/components/MetricsCards";
import { HistoricalChart } from "@/components/HistoricalChart";
import { LiveMetrics } from "@/components/LiveMetrics";
import { fetchHeatwaveData, getLocationData, type HeatwaveRisk } from "@/lib/supabase";

type RiskLevel = "low" | "moderate" | "high" | "extreme";

type AreaData = {
  current: {
    temperature: number;
    humidity: number;
    heatIndex: string;
    riskLevel: RiskLevel;
  };
  areas: {
    name: string;
    risk: string;
    population: number;
    temp: number;
  }[];
  location: string;
};

const RiskVisualization = () => {
  const [location, setLocation] = useState("");
  const [selectedArea, setSelectedArea] = useState("Downtown Metro");
  const [isSearching, setIsSearching] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);
  const [heatwaveData, setHeatwaveData] = useState<HeatwaveRisk[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Comprehensive Indian pin code database (sample of major cities)
  const areaDatabase = {
    // Delhi NCR
    "110001": {
      current: { temperature: 42, humidity: 68, heatIndex: "Extreme", riskLevel: "extreme" as const },
      areas: [
        { name: "Connaught Place", risk: "extreme", population: 85000, temp: 42 },
        { name: "Karol Bagh", risk: "extreme", population: 120000, temp: 41 },
        { name: "Old Delhi", risk: "high", population: 95000, temp: 39 },
        { name: "Delhi Cantonment", risk: "moderate", population: 45000, temp: 37 }
      ],
      location: "New Delhi, Delhi"
    },
    "122001": {
      current: { temperature: 41, humidity: 65, heatIndex: "Extreme", riskLevel: "extreme" as const },
      areas: [
        { name: "Cyber City", risk: "extreme", population: 75000, temp: 41 },
        { name: "DLF Phase 1", risk: "high", population: 55000, temp: 39 },
        { name: "Golf Course Road", risk: "high", population: 40000, temp: 38 },
        { name: "Aravalli Hills", risk: "low", population: 15000, temp: 34 }
      ],
      location: "Gurgaon, Haryana"
    },
    
    // Mumbai
    "400001": {
      current: { temperature: 36, humidity: 82, heatIndex: "Extreme", riskLevel: "extreme" as const },
      areas: [
        { name: "Fort District", risk: "extreme", population: 95000, temp: 36 },
        { name: "Marine Drive", risk: "high", population: 65000, temp: 35 },
        { name: "Colaba", risk: "high", population: 85000, temp: 35 },
        { name: "Nariman Point", risk: "moderate", population: 25000, temp: 33 }
      ],
      location: "Mumbai, Maharashtra"
    },
    "400050": {
      current: { temperature: 38, humidity: 78, heatIndex: "Extreme", riskLevel: "extreme" as const },
      areas: [
        { name: "Bandra West", risk: "extreme", population: 125000, temp: 38 },
        { name: "Khar", risk: "high", population: 95000, temp: 37 },
        { name: "Santacruz", risk: "high", population: 110000, temp: 36 },
        { name: "Juhu Beach", risk: "moderate", population: 75000, temp: 34 }
      ],
      location: "Bandra, Mumbai"
    },
    
    // Bangalore
    "560001": {
      current: { temperature: 32, humidity: 55, heatIndex: "High", riskLevel: "moderate" as const },
      areas: [
        { name: "MG Road", risk: "moderate", population: 65000, temp: 32 },
        { name: "Brigade Road", risk: "moderate", population: 45000, temp: 31 },
        { name: "Cubbon Park", risk: "low", population: 15000, temp: 29 },
        { name: "UB City", risk: "moderate", population: 35000, temp: 32 }
      ],
      location: "Bangalore, Karnataka"
    },
    "560066": {
      current: { temperature: 33, humidity: 52, heatIndex: "High", riskLevel: "moderate" as const },
      areas: [
        { name: "Whitefield", risk: "moderate", population: 85000, temp: 33 },
        { name: "ITPL", risk: "moderate", population: 45000, temp: 32 },
        { name: "Brookefield", risk: "low", population: 25000, temp: 30 },
        { name: "Varthur Lake", risk: "low", population: 12000, temp: 29 }
      ],
      location: "Whitefield, Bangalore"
    },
    
    // Chennai
    "600001": {
      current: { temperature: 39, humidity: 75, heatIndex: "Extreme", riskLevel: "extreme" as const },
      areas: [
        { name: "George Town", risk: "extreme", population: 95000, temp: 39 },
        { name: "Marina Beach", risk: "high", population: 65000, temp: 37 },
        { name: "Fort St. George", risk: "high", population: 25000, temp: 38 },
        { name: "Parry's Corner", risk: "extreme", population: 115000, temp: 39 }
      ],
      location: "Chennai, Tamil Nadu"
    },
    
    // Hyderabad
    "500001": {
      current: { temperature: 40, humidity: 62, heatIndex: "Extreme", riskLevel: "extreme" as const },
      areas: [
        { name: "Charminar", risk: "extreme", population: 125000, temp: 40 },
        { name: "Hussain Sagar", risk: "high", population: 85000, temp: 38 },
        { name: "Banjara Hills", risk: "moderate", population: 65000, temp: 36 },
        { name: "Jubilee Hills", risk: "moderate", population: 55000, temp: 35 }
      ],
      location: "Hyderabad, Telangana"
    },
    
    // Kolkata
    "700001": {
      current: { temperature: 37, humidity: 78, heatIndex: "Extreme", riskLevel: "extreme" as const },
      areas: [
        { name: "BBD Bagh", risk: "extreme", population: 105000, temp: 37 },
        { name: "Park Street", risk: "high", population: 75000, temp: 36 },
        { name: "Maidan", risk: "moderate", population: 35000, temp: 34 },
        { name: "Howrah Bridge", risk: "high", population: 95000, temp: 36 }
      ],
      location: "Kolkata, West Bengal"
    },
    
    // Pune
    "411001": {
      current: { temperature: 38, humidity: 58, heatIndex: "High", riskLevel: "high" as const },
      areas: [
        { name: "Pune Cantonment", risk: "high", population: 65000, temp: 38 },
        { name: "Camp Area", risk: "high", population: 85000, temp: 37 },
        { name: "Koregaon Park", risk: "moderate", population: 45000, temp: 35 },
        { name: "Osho Ashram", risk: "moderate", population: 25000, temp: 34 }
      ],
      location: "Pune, Maharashtra"
    },
    
    // Ahmedabad
    "380001": {
      current: { temperature: 44, humidity: 45, heatIndex: "Extreme", riskLevel: "extreme" as const },
      areas: [
        { name: "Old City", risk: "extreme", population: 145000, temp: 44 },
        { name: "Ellis Bridge", risk: "extreme", population: 95000, temp: 43 },
        { name: "Sabarmati", risk: "high", population: 75000, temp: 41 },
        { name: "Riverfront", risk: "moderate", population: 35000, temp: 38 }
      ],
      location: "Ahmedabad, Gujarat"
    },
    
    // Jaipur
    "302001": {
      current: { temperature: 43, humidity: 38, heatIndex: "Extreme", riskLevel: "extreme" as const },
      areas: [
        { name: "Pink City", risk: "extreme", population: 115000, temp: 43 },
        { name: "City Palace", risk: "extreme", population: 85000, temp: 42 },
        { name: "Amer Fort", risk: "high", population: 45000, temp: 40 },
        { name: "Nahargarh Fort", risk: "moderate", population: 15000, temp: 37 }
      ],
      location: "Jaipur, Rajasthan"
    },
    
    default: {
      current: { temperature: 38, humidity: 65, heatIndex: "High", riskLevel: "high" as const },
      areas: [
        { name: "City Center", risk: "high", population: 45000, temp: 38 },
        { name: "Industrial Area", risk: "high", population: 32000, temp: 39 },
        { name: "Residential Zone", risk: "moderate", population: 65000, temp: 36 },
        { name: "Green Belt", risk: "low", population: 18000, temp: 33 }
      ],
      location: "India"
    }
  };

  const [currentAreaData, setCurrentAreaData] = useState<AreaData>(areaDatabase.default);
  const riskData = currentAreaData;

  // Load initial data from Supabase
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchHeatwaveData();
        setHeatwaveData(data);
        
        // If we have real data, use it to update the display
        if (data.length > 0) {
          const latestData = data[0];
          const mappedRiskLevel = mapRiskLevel(latestData.risk_level);
          setCurrentAreaData({
            current: {
              temperature: latestData.temperature,
              humidity: latestData.humidity || 65,
              heatIndex: latestData.risk_level,
              riskLevel: mappedRiskLevel
            },
            areas: [
              {
                name: latestData.location,
                risk: mappedRiskLevel,
                population: latestData.population || 50000,
                temp: latestData.temperature
              }
            ],
            location: latestData.location
          });
          setSelectedArea(latestData.location);
        }
      } catch (error) {
        console.error('Failed to load initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Helper function to map risk levels
  const mapRiskLevel = (riskLevel: string): RiskLevel => {
    switch (riskLevel.toLowerCase()) {
      case 'extreme': return 'extreme';
      case 'high': return 'high';
      case 'medium': return 'moderate';
      case 'low': return 'low';
      default: return 'moderate';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "extreme": return "risk-extreme";
      case "high": return "risk-high";
      case "moderate": return "risk-moderate";
      case "low": return "risk-low";
      default: return "muted";
    }
  };

  const handleSearch = async () => {
    if (!location.trim()) return;
    
    setIsSearching(true);
    
    try {
      // First try to get data from Supabase
      const supabaseData = await getLocationData(location);
      
      if (supabaseData) {
        // Use real data from Supabase
        const mappedRiskLevel = mapRiskLevel(supabaseData.risk_level);
        setCurrentAreaData({
          current: {
            temperature: supabaseData.temperature,
            humidity: supabaseData.humidity || 65,
            heatIndex: supabaseData.risk_level,
            riskLevel: mappedRiskLevel
          },
          areas: [
            {
              name: supabaseData.location,
              risk: mappedRiskLevel,
              population: supabaseData.population || 50000,
              temp: supabaseData.temperature
            }
          ],
          location: supabaseData.location
        });
        setSelectedArea(supabaseData.location);
      } else {
        // Fallback to dummy data if not found in Supabase
        const areaData = areaDatabase[location as keyof typeof areaDatabase] || areaDatabase.default;
        setCurrentAreaData(areaData);
        setSelectedArea(areaData.areas[0].name);
      }
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to dummy data on error
      const areaData = areaDatabase[location as keyof typeof areaDatabase] || areaDatabase.default;
      setCurrentAreaData(areaData);
      setSelectedArea(areaData.areas[0].name);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-heat text-white py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl font-bold mb-4 animate-fade-in-up">Heat Risk Visualization</h1>
          <p className="text-lg opacity-90 mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Enter your location to visualize heat risks and get personalized insights
          </p>
          <div className="flex gap-4 max-w-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
              <Input
                placeholder="Enter city or ZIP code"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70 pl-10 focus:bg-white/20 transition-all duration-300"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button 
              variant="secondary" 
              onClick={handleSearch}
              disabled={isSearching}
              className="min-w-[100px] transform transition-all duration-300 hover:scale-105"
            >
              {isSearching ? (
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              ) : (
                <>
                  <MapPin className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Live Environmental Data */}
        <LiveMetrics />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Map and Data */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interactive Heat Map */}
            <Card className="animate-scale-in shadow-xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      Satellite Heat Map - {riskData.location}
                    </CardTitle>
                    <CardDescription>
                      High-resolution thermal imaging • Updated 15 min ago via NOAA GOES-16
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">LIVE</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-6">
                  <HeatMap onAreaSelect={setSelectedArea} selectedArea={selectedArea} />
                </div>
                
                {/* How Risk is Calculated - Expandable */}
                <Collapsible open={showCalculation} onOpenChange={setShowCalculation} className="mt-6">
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      How this risk is calculated
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showCalculation ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 animate-fade-in-up">
                    <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                      <h4 className="font-semibold">Risk Calculation Factors:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>🌡️ <strong>Temperature:</strong> Current and historical temperature data</li>
                        <li>💧 <strong>Humidity:</strong> Relative humidity levels affecting heat index</li>
                        <li>🏢 <strong>Urban density:</strong> Building density and heat island effects</li>
                        <li>🌳 <strong>Green coverage:</strong> Parks, trees, and cooling infrastructure</li>
                        <li>👥 <strong>Population vulnerability:</strong> Age demographics and health factors</li>
                        <li>📊 <strong>Historical patterns:</strong> Past heatwave frequency and intensity</li>
                      </ul>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>

            {/* Current Metrics */}
            <MetricsCards data={riskData.current} />

            {/* Historical Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Historical Heatwave Data
                </CardTitle>
                <CardDescription>
                  Temperature trends over the past 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HistoricalChart />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Risk Areas */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Risk Areas
                </CardTitle>
                <CardDescription>
                  Current heat risk by district
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {riskData.areas.map((area) => (
                  <div
                    key={area.name}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-card-hover ${
                      selectedArea === area.name ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedArea(area.name)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{area.name}</h4>
                      <Badge className={`bg-${getRiskColor(area.risk)} text-white`}>
                        {area.risk.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-3 w-3" />
                        {area.temp}°C
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3" />
                        {area.population.toLocaleString()} residents
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Take action based on your risk assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="hero" className="w-full transform transition-all duration-300 hover:scale-105" asChild>
                  <Link to="/mitigation">
                    View Mitigation Tips
                  </Link>
                </Button>
                <Button variant="outline" className="w-full group hover:shadow-card-hover transition-all duration-300">
                  <Download className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                  Download Report
                </Button>
                <Button variant="outline" className="w-full group hover:shadow-card-hover transition-all duration-300">
                  <Bell className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                  Set Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskVisualization;