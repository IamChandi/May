import { useMemo } from 'react';
import {
  ComposedChart,
  XAxis,
  YAxis,
  ReferenceLine,
  Scatter,
  ResponsiveContainer,
  ErrorBar,
  Tooltip
} from 'recharts';

export default function ForestPlot({ subgroups, selectedSubgroups }) {
  const filteredData = useMemo(() => {
    return subgroups
      .filter(sg => selectedSubgroups.includes(sg.name))
      .map((sg, index) => ({
        ...sg,
        index,
        // For visualization, convert RR to log scale for symmetric display
        logRR: Math.log(sg.rr),
        logCILower: Math.log(sg.ciLower),
        logCIUpper: Math.log(sg.ciUpper),
        // Error bar values (distance from center)
        errorLower: sg.rr - sg.ciLower,
        errorUpper: sg.ciUpper - sg.rr
      }));
  }, [subgroups, selectedSubgroups]);

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    if (!cx || !cy) return null;

    // Size based on sample size
    const size = Math.max(8, Math.min(16, Math.sqrt(payload.n) / 2));

    return (
      <g>
        {/* Diamond shape for point estimate */}
        <polygon
          points={`${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}`}
          fill="#3B82F6"
          stroke="#1D4ED8"
          strokeWidth={1}
        />
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white shadow-lg rounded-xl border border-gray-100 p-4 max-w-xs">
          <p className="font-semibold text-slate-800 mb-2">{data.name}</p>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600">
              N = <span className="font-medium text-slate-800">{data.n}</span>
            </p>
            <p className="text-gray-600">
              Rate Ratio: <span className="font-medium text-coral-600">{data.rr.toFixed(2)}</span>
            </p>
            <p className="text-gray-600">
              95% CI: [{data.ciLower.toFixed(2)}, {data.ciUpper.toFixed(2)}]
            </p>
            <p className="text-gray-600">
              p-value: <span className="font-medium text-slate-800">{data.pValue}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Calculate domain to ensure all error bars are visible
  const minCI = Math.min(...filteredData.map(d => d.ciLower));
  const maxCI = Math.max(...filteredData.map(d => d.ciUpper));
  const domain = [Math.max(0.05, minCI * 0.8), Math.min(2, maxCI * 1.2)];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <span>Favors {subgroups[0]?.name?.includes('NOVA') ? 'NOVA-101' : 'Treatment'}</span>
          <span className="text-gray-300">|</span>
          <span>Favors Placebo</span>
        </div>
      </div>

      <div className="flex">
        {/* Left side: Labels and data */}
        <div className="w-72 flex-shrink-0">
          <div className="h-10 flex items-end pb-2 border-b border-gray-200">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Subgroup
            </span>
          </div>
          {filteredData.map((sg, index) => (
            <div
              key={sg.name}
              className={`h-12 flex items-center text-sm border-b border-gray-100 ${
                sg.category === 'overall' ? 'bg-coral-50 font-semibold' : ''
              }`}
            >
              <span className="text-slate-700 truncate pr-4">{sg.name}</span>
            </div>
          ))}
        </div>

        {/* Middle: N column */}
        <div className="w-16 flex-shrink-0">
          <div className="h-10 flex items-end justify-center pb-2 border-b border-gray-200">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">N</span>
          </div>
          {filteredData.map((sg) => (
            <div
              key={sg.name}
              className={`h-12 flex items-center justify-center text-sm text-gray-600 border-b border-gray-100 ${
                sg.category === 'overall' ? 'bg-coral-50 font-semibold' : ''
              }`}
            >
              {sg.n}
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div className="flex-1 min-w-[300px]">
          <div className="h-10 flex items-end justify-center pb-2 border-b border-gray-200">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Rate Ratio (95% CI)
            </span>
          </div>
          <div style={{ height: filteredData.length * 48 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={filteredData}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
              >
                <XAxis
                  type="number"
                  domain={domain}
                  scale="log"
                  tickFormatter={(v) => v.toFixed(1)}
                  tick={{ fontSize: 11, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis
                  type="category"
                  dataKey="index"
                  hide
                />
                <ReferenceLine
                  x={1}
                  stroke="#9CA3AF"
                  strokeDasharray="3 3"
                  label={{
                    value: 'No Effect',
                    position: 'top',
                    fontSize: 10,
                    fill: '#9CA3AF'
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Scatter
                  dataKey="rr"
                  fill="#3B82F6"
                  shape={<CustomDot />}
                >
                  <ErrorBar
                    dataKey="rr"
                    width={0}
                    strokeWidth={2}
                    stroke="#3B82F6"
                    direction="x"
                  />
                </Scatter>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right side: RR and CI values */}
        <div className="w-40 flex-shrink-0">
          <div className="h-10 flex items-end justify-center pb-2 border-b border-gray-200">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              RR [95% CI]
            </span>
          </div>
          {filteredData.map((sg) => (
            <div
              key={sg.name}
              className={`h-12 flex items-center justify-center text-sm border-b border-gray-100 ${
                sg.category === 'overall' ? 'bg-coral-50' : ''
              }`}
            >
              <span className={`font-mono ${sg.category === 'overall' ? 'font-semibold text-coral-600' : 'text-gray-700'}`}>
                {sg.rr.toFixed(2)} [{sg.ciLower.toFixed(2)}, {sg.ciUpper.toFixed(2)}]
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 pt-4 border-t border-gray-100 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-coral-500 transform rotate-45"></div>
          <span>Point Estimate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-coral-500"></div>
          <span>95% Confidence Interval</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0 border-t-2 border-dashed border-gray-400"></div>
          <span>No Effect (RR = 1.0)</span>
        </div>
      </div>
    </div>
  );
}

// Simple version without recharts for reliability
export function SimpleForestPlot({ subgroups, selectedSubgroups }) {
  const filteredData = subgroups.filter(sg => selectedSubgroups.includes(sg.name));

  // Scale: 0.05 to 1.5 on log scale
  const minRR = 0.05;
  const maxRR = 1.5;
  const logMin = Math.log(minRR);
  const logMax = Math.log(maxRR);
  const logRange = logMax - logMin;

  const getPosition = (rr) => {
    const logRR = Math.log(Math.max(minRR, Math.min(maxRR, rr)));
    return ((logRR - logMin) / logRange) * 100;
  };

  const noEffectPosition = getPosition(1);

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200 pb-2">
        <div className="w-48 flex-shrink-0">Subgroup</div>
        <div className="w-16 text-center">N</div>
        <div className="flex-1 text-center">Rate Ratio (95% CI)</div>
        <div className="w-36 text-center">RR [95% CI]</div>
      </div>

      {/* Data rows */}
      {filteredData.map((sg) => {
        const pointPos = getPosition(sg.rr);
        const ciLowerPos = getPosition(sg.ciLower);
        const ciUpperPos = getPosition(sg.ciUpper);

        return (
          <div
            key={sg.name}
            className={`flex items-center py-2 border-b border-gray-100 ${
              sg.category === 'overall' ? 'bg-coral-50' : ''
            }`}
          >
            <div className={`w-48 flex-shrink-0 text-sm ${
              sg.category === 'overall' ? 'font-semibold text-slate-800' : 'text-slate-700'
            }`}>
              {sg.name}
            </div>
            <div className="w-16 text-center text-sm text-gray-600">{sg.n}</div>
            <div className="flex-1 relative h-6 mx-4">
              {/* Background */}
              <div className="absolute inset-0 bg-gray-100 rounded"></div>

              {/* No effect line */}
              <div
                className="absolute top-0 bottom-0 w-px bg-gray-400"
                style={{ left: `${noEffectPosition}%` }}
              ></div>

              {/* Confidence interval line */}
              <div
                className="absolute top-1/2 h-0.5 bg-coral-500 transform -translate-y-1/2"
                style={{
                  left: `${ciLowerPos}%`,
                  width: `${ciUpperPos - ciLowerPos}%`
                }}
              ></div>

              {/* Point estimate diamond */}
              <div
                className="absolute top-1/2 w-3 h-3 bg-coral-500 transform -translate-x-1/2 -translate-y-1/2 rotate-45"
                style={{ left: `${pointPos}%` }}
              ></div>
            </div>
            <div className={`w-36 text-center text-sm font-mono ${
              sg.category === 'overall' ? 'font-semibold text-coral-600' : 'text-gray-700'
            }`}>
              {sg.rr.toFixed(2)} [{sg.ciLower.toFixed(2)}, {sg.ciUpper.toFixed(2)}]
            </div>
          </div>
        );
      })}

      {/* X-axis labels */}
      <div className="flex items-center pt-2">
        <div className="w-48 flex-shrink-0"></div>
        <div className="w-16"></div>
        <div className="flex-1 mx-4 flex justify-between text-xs text-gray-400">
          <span>0.1</span>
          <span>0.25</span>
          <span>0.5</span>
          <span className="text-gray-600">1.0</span>
          <span>1.5</span>
        </div>
        <div className="w-36"></div>
      </div>

      {/* Favors labels */}
      <div className="flex items-center">
        <div className="w-48 flex-shrink-0"></div>
        <div className="w-16"></div>
        <div className="flex-1 mx-4 flex justify-between text-xs text-gray-500">
          <span>← Favors Treatment</span>
          <span>Favors Placebo →</span>
        </div>
        <div className="w-36"></div>
      </div>
    </div>
  );
}
