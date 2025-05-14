import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';

export function RecentSales({ data }) {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Recent Campaigns</CardTitle>
        <CardDescription>Last 5 campaigns.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {data.slice(0, 5).map((sale, index) => (
            <div key={index} className='flex items-center'>
              <Avatar className='h-9 w-9'>
                <AvatarImage src={sale.avatar} alt='Avatar' />
                <AvatarFallback>{sale.effective_status === 'ACTIVE' ? 'ON' : 'OFF'}</AvatarFallback>
              </Avatar>
              <div className='ml-4 space-y-1'>
                <p className='text-sm leading-none font-medium'>{sale.name}</p>
                <p className='text-muted-foreground text-sm'>${sale.insights.data[0].spend} COP spent in total.</p>
              </div>
              <div className='ml-auto font-medium'>${sale.daily_budget || 0}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
