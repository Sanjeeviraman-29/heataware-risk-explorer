import { useState } from "react";
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

const RiskVisualization = () => {
  const [location, setLocation] = useState("");
  const [selectedArea, setSelectedArea] = useState("Downtown Metro");
  const [isSearching, setIsSearching] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);

  const riskData = {
    current: {
      temperature: 38,
      humidity: 65,
      heatIndex: "Extreme",
      riskLevel: "extreme" as const
    },
    areas: [
      { name: "Downtown Metro", risk: "extreme", population: 45000, temp: 38 },
      { name: "Industrial District", risk: "high", population: 12000, temp: 36 },
      { name: "Residential North", risk: "moderate", population: 30000, temp: 34 },
      { name: "Green Hills", risk: "low", population: 8000, temp: 31 }
    ]
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

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
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
                      Satellite Heat Map - {location || "Metropolitan Area"}
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