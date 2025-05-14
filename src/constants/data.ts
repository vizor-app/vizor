import { NavItem } from '@/types';

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  /* {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] 
  }, */
  {
    title: 'Meta Ads',
    url: '/dashboard/meta',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['a', 'a'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,
    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen',
        shortcut: ['m', 'm']
      }
    ]
  }
];
