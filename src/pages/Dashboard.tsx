import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Thermometer, 
  AlertTriangle, 
  Calendar,
  Filter,
  Download,
  MapPin
} from "lucide-react";
import { TemperatureTrends } from "@/components/TemperatureTrends";
import { PopulationExposure } from "@/components/PopulationExposure";
import { RiskDistribution } from "@/components/RiskDistribution";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("30d");
  const [location, setLocation] = useState("metro-area");
  const [severity, setSeverity] = useState("all");

  const dashboardData = {
    summary: {
      avgTemperature: 35.2,
      extremeAreas: 12,
      affectedPopulation: 125000,
      riskTrend: "increasing"
    },
    zones: [
      { name: "Downtown Core", risk: "extreme", population: 45000, area: "12 km²" },
      { name: "Industrial West", risk: "high", population: 32000, area: "18 km²" },
      { name: "Residential North", risk: "moderate", population: 48000, area: "25 km²" },
      { name: "Suburban East", risk: "low", population: 28000, area: "35 km²" }
    ]
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "extreme": return "bg-risk-extreme text-white";
      case "high": return "bg-risk-high text-white";
      case "moderate": return "bg-risk-moderate text-white";
      case "low": return "bg-risk-low text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-temperature text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Analytics Dashboard</h1>
          <p className="text-lg opacity-90">
            Comprehensive heat risk analytics for researchers and urban planners
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Date Range</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 3 months</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metro-area">Metro Area</SelectItem>
                    <SelectItem value="downtown">Downtown</SelectItem>
                    <SelectItem value="suburbs">Suburbs</SelectItem>
                    <SelectItem value="industrial">Industrial Zone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Risk Severity</label>
                <Select value={severity} onValueChange={setSeverity}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="extreme">Extreme Only</SelectItem>
                    <SelectItem value="high">High & Above</SelectItem>
                    <SelectItem value="moderate">Moderate & Above</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Temperature</p>
                  <p className="text-2xl font-bold">{dashboardData.summary.avgTemperature}°C</p>
                </div>
                <Thermometer className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2">
                <Badge className="bg-risk-high text-white">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2.1°C
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Extreme Risk Areas</p>
                  <p className="text-2xl font-bold">{dashboardData.summary.extremeAreas}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-risk-extreme" />
              </div>
              <div className="mt-2">
                <Badge className="bg-risk-extreme text-white">
                  Critical
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Affected Population</p>
                  <p className="text-2xl font-bold">{dashboardData.summary.affectedPopulation.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2">
                <Badge className="bg-risk-moderate text-white">
                  Medium Exposure
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Risk Trend</p>
                  <p className="text-2xl font-bold capitalize">{dashboardData.summary.riskTrend}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-risk-high" />
              </div>
              <div className="mt-2">
                <Badge className="bg-risk-high text-white">
                  +15% This Month
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Daily Temperature Trends
              </CardTitle>
              <CardDescription>
                Average, minimum, and maximum temperatures over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TemperatureTrends />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Population vs Heat Exposure
              </CardTitle>
              <CardDescription>
                Population density correlation with heat risk levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PopulationExposure />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Risk Distribution */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
                <CardDescription>
                  Breakdown of areas by risk level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RiskDistribution />
              </CardContent>
            </Card>
          </div>

          {/* Zone Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Zone Analysis
                </CardTitle>
                <CardDescription>
                  Detailed breakdown by geographic zones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.zones.map((zone, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{zone.name}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span>{zone.population.toLocaleString()} residents</span>
                          <span>{zone.area}</span>
                        </div>
                      </div>
                      <Badge className={getRiskColor(zone.risk)}>
                        {zone.risk.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <Button variant="hero" className="w-full">
                    Generate Detailed Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;