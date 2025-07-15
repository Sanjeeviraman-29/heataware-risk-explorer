import { Card } from "@/components/ui/card";

interface HeatMapProps {
  onAreaSelect: (area: string) => void;
  selectedArea: string;
}

export const HeatMap = ({ onAreaSelect, selectedArea }: HeatMapProps) => {
  const areas = [
    { id: "downtown", name: "Downtown Metro", x: 45, y: 30, risk: "extreme" },
    { id: "industrial", name: "Industrial District", x: 20, y: 60, risk: "high" },
    { id: "residential", name: "Residential North", x: 70, y: 20, risk: "moderate" },
    { id: "green-hills", name: "Green Hills", x: 80, y: 70, risk: "low" }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "extreme": return "#dc2626";
      case "high": return "#ea580c";
      case "moderate": return "#ca8a04";
      case "low": return "#16a34a";
      default: return "#6b7280";
    }
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg overflow-hidden">
      {/* Background heat gradient overlay */}
      <div className="absolute inset-0 opacity-60">
        <div className="w-full h-full bg-gradient-radial from-red-300 via-orange-200 to-yellow-100"></div>
      </div>
      
      {/* Heat zones */}
      {areas.map((area) => (
        <div
          key={area.id}
          className={`absolute w-16 h-16 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 ${
            selectedArea === area.name ? 'ring-4 ring-white ring-opacity-80 z-10' : ''
          }`}
          style={{
            left: `${area.x}%`,
            top: `${area.y}%`,
            backgroundColor: getRiskColor(area.risk),
            transform: 'translate(-50%, -50%)',
            opacity: 0.8
          }}
          onClick={() => onAreaSelect(area.name)}
        >
          <div className="absolute inset-0 rounded-full animate-heat-pulse"></div>
          
          {/* Area label */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-white rounded text-xs font-medium shadow-lg whitespace-nowrap">
            {area.name}
          </div>
        </div>
      ))}
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
        <h4 className="text-sm font-medium mb-2">Risk Level</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getRiskColor("extreme") }}></div>
            <span className="text-xs">Extreme</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getRiskColor("high") }}></div>
            <span className="text-xs">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getRiskColor("moderate") }}></div>
            <span className="text-xs">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getRiskColor("low") }}></div>
            <span className="text-xs">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};