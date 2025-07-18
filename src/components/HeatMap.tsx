import { Card } from "@/components/ui/card";

interface HeatMapProps {
  onAreaSelect: (area: string) => void;
  selectedArea: string;
}

export const HeatMap = ({ onAreaSelect, selectedArea }: HeatMapProps) => {
  const areas = [
    { id: "downtown", name: "Financial District", x: 45, y: 30, risk: "extreme", temp: "45.2°C", population: "85K" },
    { id: "industrial", name: "Manufacturing Zone", x: 20, y: 60, risk: "high", temp: "42.8°C", population: "32K" },
    { id: "residential", name: "Midtown Residential", x: 70, y: 20, risk: "moderate", temp: "38.5°C", population: "125K" },
    { id: "university", name: "University Campus", x: 25, y: 25, risk: "moderate", temp: "37.9°C", population: "45K" },
    { id: "airport", name: "Airport District", x: 85, y: 45, risk: "high", temp: "43.1°C", population: "12K" },
    { id: "suburbs", name: "Suburban West", x: 15, y: 80, risk: "low", temp: "35.2°C", population: "68K" },
    { id: "park", name: "Central Park Area", x: 60, y: 55, risk: "low", temp: "33.8°C", population: "28K" },
    { id: "riverside", name: "Riverside District", x: 80, y: 75, risk: "low", temp: "34.5°C", population: "42K" }
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
    <div className="relative w-full h-[500px] bg-gradient-to-br from-slate-100 to-stone-200 rounded-lg overflow-hidden border shadow-inner">
      {/* Satellite-style background */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-green-200/30 via-yellow-100/40 to-orange-200/50"></div>
        {/* Grid overlay for map feel */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Heat zones with enhanced styling */}
      {areas.map((area, index) => (
        <div
          key={area.id}
          className={`absolute group cursor-pointer transition-all duration-500 hover:z-20 ${
            selectedArea === area.name ? 'z-30' : 'z-10'
          }`}
          style={{
            left: `${area.x}%`,
            top: `${area.y}%`,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${index * 100}ms`
          }}
          onClick={() => onAreaSelect(area.name)}
        >
          {/* Main heat zone circle */}
          <div 
            className={`w-12 h-12 rounded-full transition-all duration-300 group-hover:scale-150 shadow-lg border-2 border-white/50 ${
              selectedArea === area.name ? 'scale-125 ring-4 ring-blue-500/50' : ''
            }`}
            style={{
              backgroundColor: getRiskColor(area.risk),
              boxShadow: `0 0 20px ${getRiskColor(area.risk)}60`
            }}
          >
            <div className="absolute inset-0 rounded-full animate-heat-pulse opacity-40"></div>
          </div>
          
          {/* Heat radiation effect */}
          <div 
            className="absolute -inset-4 rounded-full opacity-20 animate-pulse"
            style={{ backgroundColor: getRiskColor(area.risk) }}
          ></div>
          
          {/* Enhanced tooltip */}
          <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 transition-all duration-300 ${
            selectedArea === area.name || selectedArea === '' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}>
            <div className="bg-white rounded-lg shadow-xl border p-3 min-w-[180px]">
              <div className="font-semibold text-sm text-gray-900 mb-1">{area.name}</div>
              <div className="text-xs text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Temperature:</span>
                  <span className="font-medium text-red-600">{area.temp}</span>
                </div>
                <div className="flex justify-between">
                  <span>Population:</span>
                  <span className="font-medium">{area.population}</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk Level:</span>
                  <span className={`font-medium capitalize ${
                    area.risk === 'extreme' ? 'text-red-600' :
                    area.risk === 'high' ? 'text-orange-600' :
                    area.risk === 'moderate' ? 'text-yellow-600' : 'text-green-600'
                  }`}>{area.risk}</span>
                </div>
              </div>
              {/* Arrow pointing down */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Enhanced Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <h4 className="text-sm font-semibold text-gray-900">Heat Risk Levels</h4>
        </div>
        <div className="space-y-2">
          {[
            { level: "extreme", label: "Extreme (>40°C)", color: getRiskColor("extreme") },
            { level: "high", label: "High (35-40°C)", color: getRiskColor("high") },
            { level: "moderate", label: "Moderate (30-35°C)", color: getRiskColor("moderate") },
            { level: "low", label: "Low (<30°C)", color: getRiskColor("low") }
          ].map((item) => (
            <div key={item.level} className="flex items-center gap-3">
              <div className="relative">
                <div 
                  className="w-4 h-4 rounded-full border border-white shadow-sm" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <div 
                  className="absolute inset-0 rounded-full animate-pulse opacity-50" 
                  style={{ backgroundColor: item.color }}
                ></div>
              </div>
              <span className="text-xs font-medium text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded shadow-lg border flex items-center justify-center text-sm font-bold text-gray-600 hover:bg-white transition-colors">
          +
        </button>
        <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded shadow-lg border flex items-center justify-center text-sm font-bold text-gray-600 hover:bg-white transition-colors">
          −
        </button>
      </div>
      
      {/* Coordinates indicator */}
      <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-xs font-mono">
        LAT: 40.7128° LON: -74.0060°
      </div>
    </div>
  );
};