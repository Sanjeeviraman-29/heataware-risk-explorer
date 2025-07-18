import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye,
  TrendingUp,
  TrendingDown,
  Clock,
  Satellite
} from "lucide-react";

interface MetricData {
  label: string;
  value: string;
  unit: string;
  trend: "up" | "down" | "stable";
  trendValue: string;
  icon: any;
  progress?: number;
  status: "normal" | "warning" | "critical";
}

export const LiveMetrics = () => {
  const metrics: MetricData[] = [
    {
      label: "Air Temperature",
      value: "42.3",
      unit: "°C",
      trend: "up",
      trendValue: "+3.2°",
      icon: Thermometer,
      progress: 85,
      status: "critical"
    },
    {
      label: "Humidity",
      value: "68",
      unit: "%",
      trend: "down",
      trendValue: "-5%",
      icon: Droplets,
      progress: 68,
      status: "warning"
    },
    {
      label: "Wind Speed",
      value: "12.5",
      unit: "km/h",
      trend: "stable",
      trendValue: "±0.2",
      icon: Wind,
      progress: 30,
      status: "normal"
    },
    {
      label: "UV Index",
      value: "11",
      unit: "UVI",
      trend: "up",
      trendValue: "+2",
      icon: Eye,
      progress: 92,
      status: "critical"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "text-red-600 bg-red-50 border-red-200";
      case "warning": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "normal": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "critical": return "bg-red-500";
      case "warning": return "bg-yellow-500";
      case "normal": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Satellite className="h-5 w-5" />
            Live Environmental Data
          </h3>
          <p className="text-sm text-muted-foreground">Real-time sensor readings updated every 5 minutes</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Last update: 2 min ago</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === "up" ? TrendingUp : 
                           metric.trend === "down" ? TrendingDown : Clock;
          
          return (
            <Card key={index} className={`transition-all duration-300 hover:shadow-lg border-2 ${getStatusColor(metric.status)}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                  </div>
                  <Badge variant={metric.status === "critical" ? "destructive" : 
                                 metric.status === "warning" ? "secondary" : "default"} 
                         className="text-xs">
                    {metric.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{metric.value}</span>
                    <span className="text-sm text-muted-foreground">{metric.unit}</span>
                  </div>
                  
                  {metric.progress && (
                    <div className="space-y-1">
                      <Progress value={metric.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0</span>
                        <span>{metric.progress}%</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <TrendIcon className={`h-4 w-4 ${
                      metric.trend === "up" ? "text-red-500" :
                      metric.trend === "down" ? "text-green-500" : "text-gray-500"
                    }`} />
                    <span className={`text-sm font-medium ${
                      metric.trend === "up" ? "text-red-600" :
                      metric.trend === "down" ? "text-green-600" : "text-gray-600"
                    }`}>
                      {metric.trendValue}
                    </span>
                    <span className="text-xs text-muted-foreground">vs yesterday</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Additional info panel */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-orange-100 rounded-full">
              <Thermometer className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-orange-900 mb-1">Extreme Heat Advisory</h4>
              <p className="text-sm text-orange-800 mb-2">
                Current conditions exceed safe thresholds. Heat index feels like 47°C.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                  Issued: Today 2:30 PM
                </Badge>
                <Badge className="bg-red-100 text-red-800 border-red-300">
                  Valid until: 8:00 PM
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};