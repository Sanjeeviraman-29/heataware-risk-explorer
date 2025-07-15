import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { date: '7/1', avg: 32, min: 28, max: 35 },
  { date: '7/8', avg: 34, min: 30, max: 37 },
  { date: '7/15', avg: 36, min: 32, max: 39 },
  { date: '7/22', avg: 38, min: 34, max: 42 },
  { date: '7/29', avg: 35, min: 31, max: 38 },
];

export const TemperatureTrends = () => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            dataKey="date" 
            stroke="#64748b"
            fontSize={12}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
            label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            formatter={(value) => [`${value}°C`]}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="max" 
            stroke="hsl(0 85% 50%)" 
            strokeWidth={2}
            name="Maximum"
            dot={{ fill: 'hsl(0 85% 50%)', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="avg" 
            stroke="hsl(15 100% 50%)" 
            strokeWidth={3}
            name="Average"
            dot={{ fill: 'hsl(15 100% 50%)', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="min" 
            stroke="hsl(35 100% 65%)" 
            strokeWidth={2}
            name="Minimum"
            dot={{ fill: 'hsl(35 100% 65%)', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};