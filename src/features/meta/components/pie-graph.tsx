'use client';

import * as React from 'react';
import { IconTrendingUp } from '@tabler/icons-react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

const colorFills = [
  'var(--primary)',
  'var(--primary-light)',
  'var(--primary-lighter)',
  'var(--primary-dark)',
  'var(--primary-darker)',
]

const chartData = [
  { action: 'page_engagement', value: 275, fill: 'var(--primary)' },
  { action: 'post_engagement', value: 200, fill: 'var(--primary-light)' },
  { action: 'video_view', value: 287, fill: 'var(--primary-lighter)' },
  { action: 'link_click', value: 287, fill: 'var(--primary-dark)' },
];

const chartConfig = {
  value: {
    label: 'Actions'
  },
  page_engagement: {
    label: 'Page Engagement',
    color: 'var(--primary)'
  },
  post_engagement: {
    label: 'Post Engagement',
    color: 'var(--primary)'
  },
  video_view: {
    label: 'Video Views',
    color: 'var(--primary)'
  },
  link_click: {
    label: 'Link Clicks',
    color: 'var(--primary)'
  }
} satisfies ChartConfig;

export function PieGraph({ chartData }) {
  const totalActions = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>Page Actions</CardTitle>
        <CardDescription>
          <span className='hidden @[540px]/card:block'>
            Total page actions from ads
          </span>
          <span className='@[540px]/card:hidden'>Total page actions from ads</span>
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square h-[250px]'
        >
          <PieChart>
            <defs>
              {['page_engagement', 'post_engagement', 'video_view', 'link_click'].map(
                (action, index) => (
                  <linearGradient
                    key={action}
                    id={`fill${action}`}
                    x1='0'
                    y1='0'
                    x2='0'
                    y2='1'
                  >
                    <stop
                      offset='0%'
                      stopColor='var(--primary)'
                      stopOpacity={1 - index * 0.15}
                    />
                    <stop
                      offset='100%'
                      stopColor='var(--primary)'
                      stopOpacity={0.8 - index * 0.15}
                    />
                  </linearGradient>
                )
              )}
            </defs>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData.map((item) => ({
                ...item,
                fill: `url(#fill${item.action})`
              }))}
              dataKey='value'
              nameKey='action'
              innerRadius={60}
              strokeWidth={2}
              stroke='var(--background)'
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {totalActions.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground text-sm'
                        >
                          Total Actions
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
