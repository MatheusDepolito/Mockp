import { InquiriesForPropertyQuery } from '@mockp/network/src/gql/generated';
import { TitleStrongValue, TitleValue } from '../atoms/TitleValue';
import { Reveal } from '../molecules/Reveal';
import { StartEndDateCard } from './DateCard';
import { Accordion } from '../atoms/Accordion';
import { format } from 'date-fns';

export interface IManageInquiryCardProps {
  inquiry: InquiriesForPropertyQuery['inquiriesForProperty'][0];
}

export const ManageInquiryCard = ({ inquiry }: IManageInquiryCardProps) => {
  return (
    <div className="p-4 space-y-3 bg-white ">
      <div className="flex items-start justify-between">
        <TitleStrongValue title={'Observações'}>
          <div className="text-3xl font-bold">{inquiry.contactNotes}</div>
        </TitleStrongValue>
        <div className="px-1 py-0.5 border border-primary">
          <TitleValue title={'Imóvel'}>
            {inquiry.property.displayName}
          </TitleValue>
        </div>
      </div>
      <StartEndDateCard
        startTime={inquiry.startTime}
        endTime={inquiry.endTime}
      />
      <TitleStrongValue title={'Code'}>
        <Reveal showIntruction={false} secret={inquiry.passcode || ''} />
      </TitleStrongValue>

      <Accordion
        defaultOpen={false}
        title={
          <TitleStrongValue title={'Status'}>
            <div className="font-bold">
              {inquiry.status.split('_').join(' ')}
            </div>
          </TitleStrongValue>
        }
      >
        <div className="flex flex-col gap-2">
          {inquiry.inquiryTimeline.map((timeline) => (
            <div key={timeline.timestamp}>
              <TitleValue title={timeline.status}>
                {format(new Date(timeline.timestamp), 'PPp')}
              </TitleValue>
            </div>
          ))}
        </div>
      </Accordion>
    </div>
  );
};
