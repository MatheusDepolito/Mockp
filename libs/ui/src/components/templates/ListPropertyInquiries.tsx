'use client';
import { useState } from 'react';
import { Tab, TabPanel, Tabs } from '../molecules/Tabs';
import { ShowPropertyInquiries } from '../organisms/ShowPropertyInquiries';
import { InquiryStatus } from '@mockp/network/src/gql/generated';

export interface IListInquiriesProps {
  propertyId: number;
}
export const ListPropertyInquiries = ({ propertyId }: IListInquiriesProps) => {
  const [value, setValue] = useState<0 | 1>(0);

  return (
    <div>
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        aria-label="inquiries"
      >
        <Tab label={'EM ANDAMENTO'} />
        <Tab label={'ENCERRADAS'} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShowPropertyInquiries
          propertyId={propertyId}
          statuses={[
            InquiryStatus.Interested,
            InquiryStatus.VisitScheduled,
            InquiryStatus.Proposal,
          ]}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowPropertyInquiries
          propertyId={propertyId}
          statuses={[InquiryStatus.Closed]}
        />
      </TabPanel>
    </div>
  );
};
