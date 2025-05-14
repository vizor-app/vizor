'use client';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { parseAsString, useQueryState } from 'nuqs';

interface AdAccount {
  id: string;
  name: string; 
}

interface AdAccountSelectProps {
  adAccounts: AdAccount[];
}

export function AdAccountSelect({adAccounts}: AdAccountSelectProps) {
  const [adAccountId, setAdAccountId] = useQueryState(
    'id',
    parseAsString.withOptions({ shallow: false })
    .withOptions({ shallow: false, history: 'push' })
    .withDefault(adAccounts[0]?.id)
  );

  const handleAdAccountChange = (value: string) => {
    setAdAccountId(value);
  };


  return (
    <div className='flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
      <div className='flex items-center space-x-2'>
        <p className='whitespace-nowrap text-sm font-medium'>
          Ad account
        </p>
        <Select
          value={`${adAccounts.find((account) => account.id === adAccountId)?.id}`}
          onValueChange={(value) => {
            {handleAdAccountChange(value)}
          }}
        >
          <SelectTrigger className='h-8 w-[200px]'>
            <SelectValue placeholder={'Select an Ad Account'} />
          </SelectTrigger>
          <SelectContent side='bottom'>
            {adAccounts?.map((adAccount) => (
              <SelectItem key={adAccount.id} value={`${adAccount.id}`}>
                {adAccount.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )

}