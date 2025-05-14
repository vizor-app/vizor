import PageContainer from '@/components/layout/page-container';
import { AreaGraph } from './area-graph';
import { BarGraph } from './bar-graph';
import { PieGraph } from './pie-graph';
import { RecentSales } from './recent-sales';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter
} from '@/components/ui/card';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import React from 'react';

function parseNumber(value: string | number) {
  return parseFloat(value.toString()).toLocaleString('es-CO');
}

function parseCurrency(amount: string) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(parseFloat(amount));
}

function transformData(data) {
  return data.map(item => ({
    date: item.date_start,
    impressions: parseInt(item.impressions, 10),
    reach: parseInt(item.reach, 10),
    clicks: parseInt(item.clicks, 10),
    ctr: parseFloat(item.ctr),
    cpm: parseInt(item.cpm),
    cpc: parseInt(item.cpc),
    spend: parseFloat(item.spend),
  }));
}

function transformActionData(input) {
  const approvedActions = [
    'page_engagement',
    'post_engagement',
    'video_view',
    'link_click',
  ];

  const fillColors = [
    'var(--primary)',
    'var(--primary-light)',
    'var(--primary-lighter)',
    'var(--primary-dark)',
    'var(--primary-darker)'
  ];

  const filteredKeys = Object.keys(input).filter(key => approvedActions.includes(key));

  return filteredKeys.map((key, index) => ({
    action: key,
    value: Number(input[key]),
    fill: fillColors[index % fillColors.length]
  }));
}

function percentageChange(oldValue, newValue) {
    if (oldValue === 0) return newValue !== 0 ? Infinity : 0;
    return ((newValue - oldValue) / Math.abs(oldValue)) * 100;
}

export default function MetaAdsPage({ adAccounts, campaigns, insights }) { 
  const currentAdAccount = adAccounts.data.find((account) => account.id === 'act_' + insights.account_id);

  const lastDate = insights.dayInterval[0]
  const firstDate = insights.dayInterval[insights.dayInterval.length - 1]
  
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            {currentAdAccount.name} (Last 30 days)
          </h2>
        </div>

        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Spend</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                ${parseNumber(insights.spend)}
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Impressions</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {parseNumber(insights.impressions)}
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingDown />
                  -20%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Reach</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {parseNumber(insights.reach)}
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>CTR</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {parseFloat(insights.ctr).toFixed(2)}%
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +4.5%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Landing Page Views</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {insights.actions.landing_page_view}
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +4.5%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Add To Cart</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {insights.actions.add_to_cart}
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +4.5%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Checkouts</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {insights.actions.initiate_checkout}
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +4.5%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Conversions</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {insights.actions.purchase}
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +4.5%
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'>
            <BarGraph chartData={transformData(insights.dayInterval)} />
          </div>
          <div className='col-span-4 md:col-span-3'>
            <RecentSales data={campaigns} />
          </div>
          <div className='col-span-4'>
            <AreaGraph chartData={transformData(insights.dayInterval)} />
          </div>
          <div className='col-span-4 md:col-span-3'>
            <PieGraph chartData={transformActionData(insights.actions)} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
