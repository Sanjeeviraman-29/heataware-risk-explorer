import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Thermometer, Droplets, AlertTriangle, Users, Calendar } from "lucide-react";
import { HeatMap } from "@/components/HeatMap";
import { MetricsCards } from "@/components/MetricsCards";
import { HistoricalChart } from "@/components/HistoricalChart";

const RiskVisualization = () => {
  const [location, setLocation] = useState("");
  const [selectedArea, setSelectedArea] = useState("Downtown Metro");

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-heat text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Heat Risk Visualization</h1>
          <div className="flex gap-4 max-w-md">
            <Input
              placeholder="Enter city or ZIP code"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
            />
            <Button variant="secondary">
              <MapPin className="h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Map and Data */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interactive Heat Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-primary" />
                  Heat Risk Map
                </CardTitle>
                <CardDescription>
                  Click on areas to view detailed risk information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HeatMap onAreaSelect={setSelectedArea} selectedArea={selectedArea} />
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
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="hero" className="w-full">
                  View Mitigation Tips
                </Button>
                <Button variant="outline" className="w-full">
                  Download Report
                </Button>
                <Button variant="outline" className="w-full">
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