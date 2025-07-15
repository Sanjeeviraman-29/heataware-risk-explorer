import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Extreme Risk', value: 15, color: 'hsl(0 85% 50%)' },
  { name: 'High Risk', value: 25, color: 'hsl(25 100% 55%)' },
  { name: 'Moderate Risk', value: 35, color: 'hsl(50 100% 60%)' },
  { name: 'Low Risk', value: 25, color: 'hsl(120 60% 50%)' },
];

export const RiskDistribution = () => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            formatter={(value) => [`${value}%`, 'Areas']}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            wrapperStyle={{ fontSize: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};