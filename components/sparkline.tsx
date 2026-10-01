type SparklineProps = {
  values: number[];
  width?: number;
  height?: number;
};

export function Sparkline({ values, width = 120, height = 34 }: SparklineProps) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * width;
      const ratio = max === min ? 0.5 : (value - min) / (max - min);
      const y = height - 3 - ratio * (height - 6);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg className="sparkline" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Trend">
      <polyline points={points} fill="none" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function AreaChart({ values }: { values: number[] }) {
  const width = 900;
  const height = 260;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const coords = values.map((value, index) => {
    const x = (index / Math.max(values.length - 1, 1)) * width;
    const ratio = max === min ? 0.5 : (value - min) / (max - min);
    const y = height - 20 - ratio * (height - 50);
    return [x, y] as const;
  });
  const line = coords.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `M 0 ${height} L ${coords.map(([x, y]) => `${x} ${y}`).join(" L ")} L ${width} ${height} Z`;

  return (
    <div className="area-chart-wrap">
      <svg className="area-chart" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="img" aria-label="Visitors trend">
        <defs>
          <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.14" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.2, 0.4, 0.6, 0.8].map((n) => (
          <line key={n} x1="0" x2={width} y1={height * n} y2={height * n} className="chart-grid" />
        ))}
        <path d={area} fill="url(#areaFill)" />
        <polyline points={line} fill="none" className="chart-line" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="chart-axis"><span>Sep 24</span><span>Sep 26</span><span>Sep 28</span><span>Sep 30</span><span>Today</span></div>
    </div>
  );
}
