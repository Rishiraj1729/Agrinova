import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const tooltipStyle = { background: '#fff', border: '1px solid #d8e0d9', borderRadius: 8, fontSize: 12, color: '#142018' }

export interface DonutSlice {
  name: string
  value: number
  fill: string
}

interface DonutChartProps {
  data: DonutSlice[]
  height?: number
}

export function DonutChart({ data, height = 260 }: DonutChartProps) {
  return (
    <div>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            innerRadius={52}
            outerRadius={78}
            paddingAngle={3}
            stroke="#0a0f0a"
            strokeWidth={2}
            label={({ percent }) => (percent != null ? `${(percent * 100).toFixed(0)}%` : '')}
            labelLine={{ stroke: '#7a8f7a', strokeWidth: 1 }}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} stroke="#0a0f0a" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value, name) => [`${value}%`, name]}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ paddingTop: 12, fontSize: 11, color: '#f0f4f0' }}
            formatter={(value) => <span style={{ color: '#c8d4c8' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-1 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2 rounded-md bg-nv-dark/50 px-2 py-1.5 text-xs">
            <span className="h-3 w-3 shrink-0 rounded-full ring-1 ring-white/10" style={{ backgroundColor: d.fill }} />
            <span className="truncate text-nv-muted">{d.name}</span>
            <span className="ml-auto font-semibold text-nv-fg">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
