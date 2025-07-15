import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { date: '07-01', temp: 32, maxTemp: 35, minTemp: 28 },
  { date: '07-05', temp: 34, maxTemp: 37, minTemp: 30 },
  { date: '07-10', temp: 36, maxTemp: 39, minTemp: 32 },
  { date: '07-15', temp: 38, maxTemp: 42, minTemp: 34 },
  { date: '07-20', temp: 35, maxTemp: 38, minTemp: 31 },
  { date: '07-25', temp: 37, maxTemp: 40, minTemp: 33 },
  { date: '07-30', temp: 39, maxTemp: 43, minTemp: 35 },
];

export const HistoricalChart = () => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(15 100% 50%)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(15 100% 50%)" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="maxTempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(0 85% 50%)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(0 85% 50%)" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            dataKey="date" 
            stroke="#64748b"
            fontSize={12}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
            domain={['dataMin - 2', 'dataMax + 2']}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            formatter={(value, name) => [
              `${value}°C`,
              name === 'temp' ? 'Average' : name === 'maxTemp' ? 'Maximum' : 'Minimum'
            ]}
            labelStyle={{ color: '#374151' }}
          />
          <Area 
            type="monotone" 
            dataKey="maxTemp" 
            stroke="hsl(0 85% 50%)" 
            fill="url(#maxTempGradient)"
            strokeWidth={2}
          />
          <Area 
            type="monotone" 
            dataKey="temp" 
            stroke="hsl(15 100% 50%)" 
            fill="url(#tempGradient)"
            strokeWidth={3}
          />
          <Line 
            type="monotone" 
            dataKey="minTemp" 
            stroke="hsl(35 100% 65%)" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: 'hsl(35 100% 65%)', strokeWidth: 2, r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};