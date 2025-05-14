import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { assembleUrl } from '@/features/meta/utils/assemble-url';

import MetaAdsPage from '@/features/meta/components/meta-view-page';
import { SearchParams } from 'nuqs/server';
// import { Suspense } from 'react';

type PageProps = {
  params: Promise<{ adAccountId: string }>
  searchParams: Promise<SearchParams>;
};

function parseAdAccountActions(actions) {
  return actions.reduce((acc, { action_type, value }) => {
    if (!action_type.includes('.')) acc[action_type] = value;
    return acc;
  }, {});
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  const { userId } = await auth();

  if (!userId) {
    return redirect('/404');   
  }
  
  const client = await clerkClient();
  const user = await client.users.getUserOauthAccessToken(userId, 'facebook');
  const accessToken = user.data[0].token || '';

  const metaApi = await assembleUrl('https://graph.facebook.com/v21.0', accessToken)
  
  const adAccountsResponse = await fetch(metaApi.me.adAccounts());
  const adAccounts = await adAccountsResponse.json();

  const adAccountInsightsResponse = await fetch(metaApi.insights.adAccountInsights(accessToken, params.adAccountId, '30'));
  const adAccountInsightsData = await adAccountInsightsResponse.json();
  const adAccountInsights = adAccountInsightsData.data[0];

  const adAccountInsightsActionsResponse = await fetch(metaApi.insights.adAccountInsightsActions(accessToken, params.adAccountId, '30'));
  const adAccountInsightsActionsData = await adAccountInsightsActionsResponse.json();
  const adAccountInsightsActions = parseAdAccountActions(adAccountInsightsActionsData.data[0].actions);

  const adAccountInsightsDayIntervalResponse = await fetch(metaApi.insights.adAccountInsights(accessToken, params.adAccountId, '30', '1'));
  const adAccountInsightsDayIntervalData = await adAccountInsightsDayIntervalResponse.json();
  const adAccountInsightsDayInterval = adAccountInsightsDayIntervalData.data;

  const adAccountCampaignsResponse = await fetch(metaApi.adAccount.campaigns(accessToken, params.adAccountId, '2025-02-07', '2025-05-13'));
  const adAccountCampaignsData = await adAccountCampaignsResponse.json();
  const adAccountCampaigns = adAccountCampaignsData.data;
  
  return <MetaAdsPage adAccounts={adAccounts} campaigns={adAccountCampaigns} insights={{...adAccountInsights, dayInterval: adAccountInsightsDayInterval, actions: adAccountInsightsActions}} />;
}
