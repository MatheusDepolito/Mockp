'use client';
import { Tab, Tabs, TabPanel } from '../molecules/Tabs';
import { useState } from 'react';
import { ShowCustomerInquiries } from '../organisms/ShowCustomerInquiries';
import { InquiryStatus } from '@mockp/network/src/gql/generated';

export const ListCustomerInquiries = () => {
  const [value, setValue] = useState<0 | 1>(1);
  return (
    <div>
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        aria-label="inquiries"
      >
        <Tab label={'ENCERRADAS'} />
        <Tab label={'EM ANDAMENTO'} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShowCustomerInquiries statuses={[InquiryStatus.Closed]} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowCustomerInquiries
          statuses={[
            InquiryStatus.Interested,
            InquiryStatus.VisitScheduled,
            InquiryStatus.Proposal,
          ]}
        />
      </TabPanel>
    </div>
  );
};
