import { InquiriesForCustomerQuery } from '@mockp/network/src/gql/generated';
import { StartEndDateCard } from './DateCard';
import { MapLink } from '../molecules/MapLink';
import { StaticMapSimple } from './map/StaticMapSimple';
import { TitleStrongValue, TitleValue } from '../atoms/TitleValue';
import { Reveal } from '../molecules/Reveal';
import { Accordion } from '../atoms/Accordion';
import { format } from 'date-fns';

export interface IInquiryCardProps {
  inquiry: NonNullable<
    InquiriesForCustomerQuery['inquiriesForCustomer']
  >[number];
}

export const CustomerInquiryCard = ({ inquiry }: IInquiryCardProps) => {
  const lat = inquiry.property.address?.lat || 0;
  const lng = inquiry.property.address?.lng || 0;

  return (
    <div className="shadow-lg bg-white p-2">
      <div className="flex flex-col gap-2">
        <StartEndDateCard
          startTime={inquiry.startTime}
          endTime={inquiry.endTime}
        />
        <MapLink waypoints={[{ lat, lng }]}>
          <StaticMapSimple
            position={{
              lat,
              lng,
            }}
            className="h-full w-full"
          />
        </MapLink>
      </div>
      <div className="grid grid-cols-2 w-full gap-2 mt-2  ">
        <TitleStrongValue title={'Imóvel'}>
          {inquiry.property.displayName}
        </TitleStrongValue>
        <TitleStrongValue title={'Observações'}>
          {inquiry.contactNotes}
        </TitleStrongValue>

        <TitleStrongValue title={'Address'}>
          <div>
            {inquiry.property.address?.address}
            <div className="text-gray text-xs">
              {lat.toFixed(2)} {lng.toFixed(2)}
            </div>
          </div>
        </TitleStrongValue>
        <TitleStrongValue title={'Code'}>
          <Reveal secret={inquiry.passcode || ''} />
        </TitleStrongValue>
      </div>
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
