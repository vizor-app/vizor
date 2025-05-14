export async function assembleUrl(apiUrl: string, accessToken: string) {
  return {
    me: {
      adAccounts: (): string => {
          let url = `${apiUrl}/me/adaccounts`;
          url += `?access_token=${accessToken}`;
          url += `&fields=id,name,insights`;
        
          return url;
      }
    },
    insights: {
      adAccountInsights: (accessToken: string, adAccountIdQuery?: string | null, datePreset?: string | null, timeIncrement?: string | null): string => {
        let url = `${apiUrl}/${adAccountIdQuery}/insights/ad_account_insights`;
        url += `?access_token=${accessToken}`;
        url += `&fields=spend,impressions,reach,cpm,ctr,cpc,clicks,cost_per_inline_link_click,purchase_roas,account_id,account_currency,unique_clicks`;
        if (datePreset) url += `&date_preset=last_${datePreset}d`;
        if (timeIncrement) url += `&time_increment=${timeIncrement}`;

        return url;
      },
      adAccountInsightsActions: (accessToken: string, adAccountIdQuery?: string | null, datePreset?: string | null, timeIncrement?: string | null): string => {
        let url = `${apiUrl}/${adAccountIdQuery}/insights/ad_account_insights`;
        url += `?access_token=${accessToken}`;
        url += `&fields=actions`;
        if (datePreset) url += `&date_preset=last_${datePreset}d`;
        if (timeIncrement) url += `&time_increment=${timeIncrement}`;

        return url;
      },
    },
    adAccount: {
      campaigns: (accessToken: string, adAccountIdQuery?: string | null, since?: string | null, until?: string | null): string => {
        let url = `${apiUrl}/${adAccountIdQuery}/campaigns`;

        let filtering = [];

        /* if (true) {
          filtering.push({ field: 'effective_status', operator: 'IN', value: ['ACTIVE'] })
        } */

        url += `?access_token=${accessToken}`;
        url += `&filtering=${JSON.stringify(filtering)}`
        url += `&fields=name,effective_status,budget_remaining,daily_budget,lifetime_budget,insights.time_range({'since':'${since}','until':'${until}'}){spend,impressions,reach,actions{link_click,onsite_conversion{purchase},comment,onsite_conversion{lead_grouped}},cpm,ctr,cost_per_inline_link_click,action_values{onsite_conversion{purchase}},purchase_roas}`;

        return url;
      }
    }
  }
}
