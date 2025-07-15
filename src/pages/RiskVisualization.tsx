import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Thermometer, Droplets, AlertTriangle, Users, Calendar, Loader2 } from "lucide-react";
import { HeatMap } from "@/components/HeatMap";
import { MetricsCards } from "@/components/MetricsCards";
import { HistoricalChart } from "@/components/HistoricalChart";
import { weatherApi, getCurrentLocation, WeatherData } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const RiskVisualization = () => {
  const [location, setLocation] = useState("");
  const [selectedArea, setSelectedArea] = useState("Downtown Metro");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Default mock data for areas (since we don't have multiple location data)
  const defaultAreas = [
    { name: "Downtown Metro", risk: "extreme", population: 45000, temp: 38 },
    { name: "Industrial District", risk: "high", population: 12000, temp: 36 },
    { name: "Residential North", risk: "moderate", population: 30000, temp: 34 },
    { name: "Green Hills", risk: "low", population: 8000, temp: 31 }
  ];

  // Try to get user's location on component mount
  useEffect(() => {
    const getInitialLocation = async () => {
      try {
        const coords = await getCurrentLocation();
        setLoading(true);
        const data = await weatherApi.getCurrentWeatherByCoords(coords.lat, coords.lon);
        setWeatherData(data);
        setError(null);
      } catch (err) {
        // If geolocation fails, try default city
        console.log('Geolocation failed, trying default city');
        handleSearch('New York');
      } finally {
        setLoading(false);
      }
    };

    getInitialLocation();
  }, []);

  const handleSearch = async (searchLocation?: string) => {
    const searchTerm = searchLocation || location;
    if (!searchTerm.trim()) {
      toast({
        title: "Error",
        description: "Please enter a city name or ZIP code",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await weatherApi.getCurrentWeather(searchTerm);
      setWeatherData(data);
      toast({
        title: "Success",
        description: `Weather data updated for ${data.location}`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Use real data if available, otherwise use mock data
  const riskData = weatherData ? {
    current: {
      temperature: weatherData.current.temperature,
      humidity: weatherData.current.humidity,
      heatIndex: weatherData.current.heatIndex,
      riskLevel: weatherData.current.riskLevel
    },
    areas: defaultAreas.map(area => ({
      ...area,
      temp: area.name === "Downtown Metro" ? weatherData.current.temperature : area.temp
    }))
  } : {
    current: {
      temperature: 38,
      humidity: 65,
      heatIndex: 38,
      riskLevel: "extreme" as const
    },
    areas: defaultAreas
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
              onKeyPress={handleKeyPress}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
              disabled={loading}
            />
            <Button 
              onClick={() => handleSearch()}
              disabled={loading}
              variant="secondary"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MapPin className="h-4 w-4" />
              )}
              {loading ? 'Searching...' : 'Search'}
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