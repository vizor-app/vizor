import { Metadata } from 'next';
import SignUpViewPage from '@/features/auth/components/sign-up-view';

export const metadata: Metadata = {
  title: 'Vizor : Sign Up',
  description: 'Sign Up page for authentication.'
};

export default async function Page() {
  return <SignUpViewPage />;
}
