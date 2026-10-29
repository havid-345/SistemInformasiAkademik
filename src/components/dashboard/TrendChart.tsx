import React, { useState } from 'react';
import { BarChart3, Minus, X, Maximize2 } from 'lucide-react';
import { TREND_MAHASISWA_AKTIF } from '../../data/mockDashboard';

export const TrendChart: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePoint, setActivePoint] = useState<{ year: string; count: number; x: number; y: number } | null>(null);

  // Filter or take points from mock data
  const data = TREND_MAHASISWA_AKTIF.slice(0, 16);

  // SVG dimensions
  const width = 900;
  const height = 300;
  const paddingX = 65;
  const paddingTop = 50;
  const paddingBottom = 45;

  const minCount = 0;
  const maxCount = 2000; // Reference graph caps around 2k with a peak

  const effectiveWidth = width - paddingX * 2;
  const effectiveHeight = height - paddingTop - paddingBottom;

  const getCoordinates = (index: number, count: number) => {
    const x = paddingX + (index / (data.length - 1)) * effectiveWidth;
    // Normalized to 0 - 2000 range, clamp for visual parity
    const clampedCount = Math.min(count, 1800);
    const y = height - paddingBottom - (clampedCount / maxCount) * effectiveHeight;
    return { x, y };
  };

  const points = data.map((d, i) => ({
    ...d,
    ...getCoordinates(i, d.count),
  }));

  const pathD = points.reduce((acc, curr, index) => {
    return `${acc} ${index === 0 ? 'M' : 'L'} ${curr.x} ${curr.y}`;
  }, '');

  return (
    <div className="bg-white rounded-sm shadow-xs border-t-3 border-[#00c0ef] border-x border-b border-slate-200">
      {/* Box Header matching image.png */}
      <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-cyan-600" />
          <h3 className="text-sm font-bold text-slate-800">Grafik Mahasiswa Aktif</h3>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-6 h-6 bg-[#00c0ef] hover:bg-cyan-600 text-white rounded-xs flex items-center justify-center transition-colors"
            title="Minimize"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-6 h-6 bg-[#00c0ef] hover:bg-cyan-600 text-white rounded-xs flex items-center justify-center transition-colors"
            title="Toggle View"
          >
            {isCollapsed ? <Maximize2 className="w-3 h-3" /> : <X className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-4 sm:p-6 overflow-x-auto">
          <div className="text-center font-bold text-slate-800 text-sm tracking-wider uppercase mb-2">
            GRAFIK TREND JUMLAH MAHASISWA AKTIF
          </div>

          <div className="min-w-[700px] relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
              {/* Background horizontal grid lines */}
              {[-1000, 0, 1000, 2000].map((val) => {
                const yPos =
                  val < 0
                    ? height - paddingBottom + 15
                    : height - paddingBottom - (val / maxCount) * effectiveHeight;

                return (
                  <g key={val}>
                    <line
                      x1={paddingX - 10}
                      y1={yPos}
                      x2={width - paddingX + 15}
                      y2={yPos}
                      stroke="#e2e8f0"
                      strokeWidth="1"
                    />
                    <text
                      x={paddingX - 18}
                      y={yPos + 4}
                      textAnchor="end"
                      fontSize="10"
                      fill="#64748b"
                      fontWeight="500"
                    >
                      {val === -1000 ? '-1k' : val === 0 ? '0k' : val === 1000 ? '1k' : '2k'}
                    </text>
                  </g>
                );
              })}

              {/* Vertical guideline for each year */}
              {points.map((pt, i) => (
                <line
                  key={i}
                  x1={pt.x}
                  y1={paddingTop - 10}
                  x2={pt.x}
                  y2={height - paddingBottom + 15}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              ))}

              {/* Y Axis Label */}
              <text
                x={20}
                y={height / 2}
                textAnchor="middle"
                fontSize="10"
                fill="#64748b"
                fontWeight="bold"
                transform={`rotate(-90 20 ${height / 2})`}
              >
                Jumlah
              </text>

              {/* Trend Line (Cyan) */}
              <path
                d={pathD}
                fill="none"
                stroke="#00c0ef"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points & numbers above dots */}
              {points.map((pt, i) => (
                <g
                  key={i}
                  className="cursor-pointer group"
                  onMouseEnter={() => setActivePoint(pt)}
                  onMouseLeave={() => setActivePoint(null)}
                >
                  {/* Highlight on hover */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="8"
                    className="fill-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  {/* Dot */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="3.5"
                    className="fill-cyan-600 stroke-2 stroke-white transition-transform group-hover:scale-125"
                  />
                  {/* Value number label */}
                  <text
                    x={pt.x}
                    y={pt.y - 9}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontWeight="700"
                    fill="#1e293b"
                  >
                    {new Intl.NumberFormat('id-ID').format(pt.count)}
                  </text>
                  {/* Year label on X-axis */}
                  <text
                    x={pt.x}
                    y={height - paddingBottom + 30}
                    textAnchor="middle"
                    fontSize="9.5"
                    fill="#64748b"
                    fontWeight="500"
                  >
                    {pt.year}
                  </text>
                </g>
              ))}
            </svg>

            {/* Tooltip */}
            {activePoint && (
              <div
                className="absolute bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full z-20"
                style={{
                  left: `${(activePoint.x / width) * 100}%`,
                  top: `${(activePoint.y / height) * 100}%`,
                }}
              >
                <div className="font-bold">Tahun {activePoint.year}</div>
                <div className="text-cyan-300">
                  {new Intl.NumberFormat('id-ID').format(activePoint.count)} Mahasiswa
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
