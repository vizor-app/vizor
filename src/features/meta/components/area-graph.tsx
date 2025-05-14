'use client';

import { IconTrendingUp } from '@tabler/icons-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

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

const chartData = [
  { date: 'January', impressions: 186, reach: 80 },
  { date: 'February', impressions: 305, reach: 200 },
  { date: 'March', impressions: 237, reach: 120 },
  { date: 'April', impressions: 73, reach: 190 },
  { date: 'May', impressions: 209, reach: 130 },
  { date: 'June', impressions: 214, reach: 140 }
];

const chartConfig = {
  visitors: {
    label: 'Results'
  },
  impressions: {
    label: 'Impressions',
    color: 'var(--primary)'
  },
  reach: {
    label: 'Reach',
    color: 'var(--primary)'
  },
  clicks: {
    label: 'Clicks',
    color: 'var(--primary)'
  }
} satisfies ChartConfig;

export function AreaGraph({chartData}) {
  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>Results</CardTitle>
        <CardDescription>
          Last 30 days of impressions, reach and clicks.
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <defs>
              <linearGradient id='fillImpressions' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-impressions)'
                  stopOpacity={1.0}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-impressions)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillReach' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-reach)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-reach)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillClicks' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-clicks)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-clicks)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='dot' />}
            />
            <Area
              dataKey='clicks'
              type='natural'
              fill='url(#fillClicks)'
              stroke='var(--color-clicks)'
              stackId='a'
            />
            <Area
              dataKey='reach'
              type='natural'
              fill='url(#fillReach)'
              stroke='var(--color-reach)'
              stackId='a'
            />
            <Area
              dataKey='impressions'
              type='natural'
              fill='url(#fillImpressions)'
              stroke='var(--color-impressions)'
              stackId='a'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
