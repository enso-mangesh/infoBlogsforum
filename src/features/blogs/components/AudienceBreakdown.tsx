'use client';

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
} from 'recharts';

const usersData = [
  {
    name: 'Followers',
    value: 62,
  },
  {
    name: 'Non-Followers',
    value: 38,
  },
];

const genderData = [
  {
    name: 'Male',
    value: 62,
  },
  {
    name: 'Female',
    value: 38,
  },
];

const USERS_COLORS = ['#1D4ED8', '#D1D1D1'];
const GENDER_COLORS = ['#1D4ED8', '#F472A0'];

function DonutChart({
  data,
  colors,
}: {
  data: {
    name: string;
    value: number;
  }[];
  colors: string[];
}) {
  return (
    <div className="h-40 w-55">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="65%"
            outerRadius="90%"
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={colors[index]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function Legend({
  data,
  colors,
}: {
  data: {
    name: string;
    value: number;
  }[];
  colors: string[];
}) {
  return (
    <div className="space-y-2">
      {data.map((item, index) => (
        <div
          key={item.name}
          className="flex items-center gap-4"
        >
          <span
            className="size-4 rounded-full"
            style={{
              backgroundColor: colors[index],
            }}
          />

          <span className="text-sm text-muted-foreground">
            {item.name} ({item.value}%)
          </span>
        </div>
      ))}
    </div>
  );
}

export function AudienceBreakdown() {
  return (
    <section className="space-y-6">
      {/* Main heading */}
      <h2 className="text-2xl font-medium text-foreground">
        Audience breakdown
      </h2>

      {/* Users vs Professionals */}
      <div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          Users vs Professionals
        </h3>

        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-4">
          <DonutChart
            data={usersData}
            colors={USERS_COLORS}
          />

          <Legend
            data={usersData}
            colors={USERS_COLORS}
          />
        </div>
      </div>

      {/* Audience Gender */}
      <div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          Audience Gender
        </h3>

        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-4">
          <DonutChart
            data={genderData}
            colors={GENDER_COLORS}
          />

          <Legend
            data={genderData}
            colors={GENDER_COLORS}
          />
        </div>
      </div>
    </section>
  );
}