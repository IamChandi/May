import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Line
} from 'recharts';
import { BarChart3, PieChart as PieChartIcon, Activity, Calendar, Info } from 'lucide-react';

// Team Blue color palette
const COLORS = {
  coral: '#3B82F6',    // Primary blue
  sage: '#06B6D4',     // Teal/cyan
  amber: '#60A5FA',    // Light blue
  slate: '#0F172A',    // Dark slate
  cream: '#F0F9FF'     // Light blue background
};

export default function Visualizations({ chartData, onNavigate }) {
  const [activeChart, setActiveChart] = useState('efficacy');

  const charts = [
    { id: 'efficacy', label: 'Drug Efficacy', icon: BarChart3 },
    { id: 'safety', label: 'Safety Profile', icon: Activity },
    { id: 'timeline', label: 'Trial Timeline', icon: Calendar },
    { id: 'demographics', label: 'Patient Demographics', icon: PieChartIcon }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-slate-900">Data Visualizations</h2>
          <p className="text-gray-500 mt-1">Interactive charts comparing clinical trial data</p>
        </div>
      </div>

      {/* Chart Navigation */}
      <div className="flex flex-wrap gap-2">
        {charts.map((chart) => {
          const Icon = chart.icon;
          return (
            <button
              key={chart.id}
              onClick={() => setActiveChart(chart.id)}
              className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm
                transition-all duration-200
                ${activeChart === chart.id
                  ? 'bg-coral-500 text-white shadow-soft'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-coral-300 hover:text-coral-600'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {chart.label}
            </button>
          );
        })}
      </div>

      {/* Chart Container */}
      <div className="bg-white rounded-2xl shadow-medium border border-gray-100 p-6">
        {activeChart === 'efficacy' && (
          <EfficacyChart data={chartData.efficacy} />
        )}
        {activeChart === 'safety' && (
          <SafetyHeatmap data={chartData.safety} />
        )}
        {activeChart === 'timeline' && (
          <TrialTimeline data={chartData.trialTimeline} />
        )}
        {activeChart === 'demographics' && (
          <DemographicsChart data={chartData.demographics} />
        )}
      </div>

      {/* Source Attribution */}
      <div className="flex items-start gap-2 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-medium">Data Sources</p>
          <p className="mt-1 text-amber-700">
            Visualizations are based on published clinical trial data from STEP, SURPASS, LEADER, and AWARD trials.
            Click on any data point to see the source citation.
          </p>
        </div>
      </div>
    </div>
  );
}

function EfficacyChart({ data }) {
  return (
    <div>
      <h3 className="font-semibold text-slate-900 mb-1">Drug Efficacy Comparison</h3>
      <p className="text-sm text-gray-500 mb-6">HbA1c reduction and weight loss outcomes across GLP-1 receptor agonists</p>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="drug"
              tick={{ fontSize: 12, fill: '#6B7280' }}
              angle={-20}
              textAnchor="end"
              height={60}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 12, fill: '#6B7280' }}
              label={{ value: 'HbA1c Reduction (%)', angle: -90, position: 'insideLeft', fill: '#6B7280' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12, fill: '#6B7280' }}
              label={{ value: 'Weight Loss (%)', angle: 90, position: 'insideRight', fill: '#6B7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar yAxisId="left" dataKey="hba1cReduction" name="HbA1c Reduction (%)" fill={COLORS.coral} radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="weightLoss" name="Weight Loss (%)" stroke={COLORS.sage} strokeWidth={3} dot={{ fill: COLORS.sage, r: 6 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SafetyHeatmap({ data }) {
  const sideEffects = ['nausea', 'vomiting', 'diarrhea', 'hypoglycemia'];
  const maxValue = Math.max(...data.flatMap(d => sideEffects.map(se => d[se])));

  const getColor = (value) => {
    const intensity = value / maxValue;
    if (intensity < 0.25) return 'bg-sage-100 text-sage-800';
    if (intensity < 0.5) return 'bg-amber-100 text-amber-800';
    if (intensity < 0.75) return 'bg-coral-200 text-coral-800';
    return 'bg-coral-400 text-white';
  };

  return (
    <div>
      <h3 className="font-semibold text-slate-900 mb-1">Safety Profile Heatmap</h3>
      <p className="text-sm text-gray-500 mb-6">Adverse event incidence rates (%) across drug classes</p>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-sm font-medium text-gray-500 pb-3 pr-4">Drug</th>
              {sideEffects.map(se => (
                <th key={se} className="text-center text-sm font-medium text-gray-500 pb-3 px-2 capitalize">
                  {se}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.drug} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="py-3 pr-4 font-medium text-slate-800">{row.drug}</td>
                {sideEffects.map(se => (
                  <td key={se} className="py-3 px-2 text-center">
                    <span className={`inline-flex items-center justify-center w-12 h-10 rounded-lg font-semibold text-sm ${getColor(row[se])}`}>
                      {row[se]}%
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-end gap-4 text-xs text-gray-500">
        <span>Incidence Rate:</span>
        <div className="flex items-center gap-1">
          <span className="w-6 h-4 bg-sage-100 rounded"></span>
          <span>Low</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-6 h-4 bg-amber-100 rounded"></span>
          <span>Moderate</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-6 h-4 bg-coral-400 rounded"></span>
          <span>High</span>
        </div>
      </div>
    </div>
  );
}

function TrialTimeline({ data }) {
  const minYear = Math.min(...data.map(d => d.startYear));
  const maxYear = Math.max(...data.map(d => d.endYear));
  const totalYears = maxYear - minYear + 1;

  const sponsorColors = {
    'Eli Lilly': COLORS.coral,
    'Novo Nordisk': COLORS.sage
  };

  return (
    <div>
      <h3 className="font-semibold text-slate-900 mb-1">Clinical Trial Timeline</h3>
      <p className="text-sm text-gray-500 mb-6">Major GLP-1 RA trials by phase and enrollment</p>

      <div className="space-y-4">
        {/* Year Headers */}
        <div className="flex items-center">
          <div className="w-40 flex-shrink-0"></div>
          <div className="flex-1 flex">
            {[...Array(totalYears)].map((_, i) => (
              <div key={i} className="flex-1 text-center text-xs text-gray-500 font-medium">
                {minYear + i}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Bars */}
        {data.map((trial, index) => {
          const startOffset = ((trial.startYear - minYear) / totalYears) * 100;
          const width = ((trial.endYear - trial.startYear + 1) / totalYears) * 100;
          const color = sponsorColors[trial.sponsor] || COLORS.slate;

          return (
            <div key={trial.name} className="flex items-center group">
              <div className="w-40 flex-shrink-0 pr-4">
                <p className="font-medium text-slate-800 text-sm truncate">{trial.name}</p>
                <p className="text-xs text-gray-500">N={trial.enrollment.toLocaleString()}</p>
              </div>
              <div className="flex-1 relative h-10 bg-gray-100 rounded-lg overflow-hidden">
                <div
                  className="absolute h-full rounded-lg transition-all duration-300 group-hover:opacity-80 flex items-center justify-center"
                  style={{
                    left: `${startOffset}%`,
                    width: `${width}%`,
                    backgroundColor: color
                  }}
                >
                  <span className="text-white text-xs font-medium px-2 truncate">
                    Phase {trial.phase}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="flex items-center justify-end gap-6 pt-4 border-t border-gray-100">
          {Object.entries(sponsorColors).map(([sponsor, color]) => (
            <div key={sponsor} className="flex items-center gap-2">
              <span className="w-4 h-4 rounded" style={{ backgroundColor: color }}></span>
              <span className="text-sm text-gray-600">{sponsor}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DemographicsChart({ data }) {
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.1 ? (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <div>
      <h3 className="font-semibold text-slate-900 mb-1">Patient Population by Age</h3>
      <p className="text-sm text-gray-500 mb-6">Distribution of elderly patients across analyzed trials</p>

      <div className="flex items-center justify-center">
        <div className="h-80 w-full max-w-lg">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                stroke="#fff"
                strokeWidth={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white shadow-lg rounded-lg border border-gray-100 p-3">
                        <p className="font-medium text-slate-800">{payload[0].name}</p>
                        <p className="text-coral-600 font-semibold">{payload[0].value}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span className="text-sm text-gray-600">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-4 max-w-xs">
        <p className="font-semibold text-slate-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-semibold">{entry.value}%</span>
          </p>
        ))}
        {item.source && (
          <p className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
            Source: {item.source}
          </p>
        )}
      </div>
    );
  }
  return null;
}
