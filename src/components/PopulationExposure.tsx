import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { zone: 'Downtown', population: 45000, heatExposure: 85, riskLevel: 'extreme' },
  { zone: 'Industrial', population: 32000, heatExposure: 72, riskLevel: 'high' },
  { zone: 'Residential', population: 48000, heatExposure: 58, riskLevel: 'moderate' },
  { zone: 'Suburban', population: 28000, heatExposure: 35, riskLevel: 'low' },
];

export const PopulationExposure = () => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            dataKey="zone" 
            stroke="#64748b"
            fontSize={12}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
            label={{ value: 'Population', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            formatter={(value, name) => [
              name === 'population' ? value.toLocaleString() : `${value}%`,
              name === 'population' ? 'Population' : 'Heat Exposure'
            ]}
          />
          <Bar 
            dataKey="population" 
            fill="hsl(15 100% 50%)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};