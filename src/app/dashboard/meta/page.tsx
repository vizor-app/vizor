import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { assembleUrl } from '@/features/meta/utils/assemble-url';

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return redirect('/404');
  } else {
    const client = await clerkClient();
    const user = await client.users.getUserOauthAccessToken(userId, 'facebook');
    const accessToken = user.data[0].token || '';

    const metaApi = await assembleUrl('https://graph.facebook.com/v21.0', accessToken)
    const adAccountsResponse = await fetch(metaApi.me.adAccounts());
    const adAccounts = await adAccountsResponse.json();
    redirect(`/dashboard/meta/${adAccounts.data[0].id}`);
  }
}
