import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Thermometer, Droplets, AlertTriangle, Users, Calendar, Loader2 } from "lucide-react";
import { HeatMap } from "@/components/HeatMap";
import { MetricsCards } from "@/components/MetricsCards";
import { HistoricalChart } from "@/components/HistoricalChart";
import { useWeatherData } from "@/hooks/useWeatherData";
import { useToast } from "@/components/ui/use-toast";

const RiskVisualization = () => {
  const [location, setLocation] = useState("");
  const [searchLocation, setSearchLocation] = useState("Chennai");
  const [selectedArea, setSelectedArea] = useState("Downtown Metro");
  const { toast } = useToast();

  const { data: weatherData, isLoading, error, refetch } = useWeatherData(searchLocation);

  const handleSearch = () => {
    if (!location.trim()) {
      toast({
        title: "Error",
        description: "Please enter a city name or ZIP code",
        variant: "destructive",
      });
      return;
    }
    setSearchLocation(location.trim());
    refetch();
  };

  const riskData = weatherData ? {
    current: {
      temperature: weatherData.weather.temperature,
      humidity: weatherData.weather.humidity,
      heatIndex: weatherData.heatRisk.heatIndex.toString(),
      riskLevel: weatherData.heatRisk.level as const,
      feelsLike: weatherData.weather.feelsLike,
      description: weatherData.weather.description
    },
    areas: weatherData.areas
  } : null;

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
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
          />
          <Button variant="secondary" onClick={handleSearch} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MapPin className="h-4 w-4" />
            )}
            Search
          </Button>
        </div>
        {weatherData && (
          <div className="mt-4 text-white/90">
            <p className="text-lg">Showing results for: <span className="font-semibold">{weatherData.weather.location}</span></p>
          </div>
        )}
      </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="h-5 w-5" />
                  <p className="font-medium">Error loading weather data: {error.message}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-lg">Loading weather data...</p>
          </div>
        )}

        {riskData && (
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
                  <HistoricalChart data={weatherData?.historical} />
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
        )}
      </div>
    </div>
  );
};

export default RiskVisualization;