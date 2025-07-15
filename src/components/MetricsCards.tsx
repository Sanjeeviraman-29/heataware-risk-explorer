import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplets, AlertTriangle, TrendingUp } from "lucide-react";

interface MetricsData {
  temperature: number;
  humidity: number;
  heatIndex: string;
  riskLevel: "low" | "moderate" | "high" | "extreme";
}

interface MetricsCardsProps {
  data: MetricsData;
}

export const MetricsCards = ({ data }: MetricsCardsProps) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "extreme": return "bg-risk-extreme text-white";
      case "high": return "bg-risk-high text-white";
      case "moderate": return "bg-risk-moderate text-white";
      case "low": return "bg-risk-low text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-primary" />
            Current Temperature
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary mb-2">{data.temperature}°C</div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-risk-high" />
            <span className="text-sm text-muted-foreground">+3°C above average</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Droplets className="h-5 w-5 text-primary" />
            Humidity Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary mb-2">{data.humidity}%</div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">High</Badge>
            <span className="text-sm text-muted-foreground">Increases heat stress</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Heat Risk Index
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{data.heatIndex}</div>
          <Badge className={getRiskColor(data.riskLevel)}>
            {data.riskLevel.toUpperCase()} RISK
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};