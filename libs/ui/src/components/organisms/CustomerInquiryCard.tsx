import { InquiriesForCustomerQuery } from '@mockp/network/src/gql/generated';
import { StartEndDateCard } from './DateCard';
import { MapLink } from '../molecules/MapLink';
import { StaticMapSimple } from './map/StaticMapSimple';
import { TitleStrongValue, TitleValue } from '../atoms/TitleValue';
import { Reveal } from '../molecules/Reveal';
import { Accordion } from '../atoms/Accordion';
import { format } from 'date-fns';
import { useI18n } from '@mockp/util/i18n';
import { getInquiryStatusLabel } from '../../i18n/enumLabels';

export interface IInquiryCardProps {
  inquiry: NonNullable<
    InquiriesForCustomerQuery['inquiriesForCustomer']
  >[number];
}

export const CustomerInquiryCard = ({ inquiry }: IInquiryCardProps) => {
  const { locale, t } = useI18n();
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
        <TitleStrongValue title={t('inquiry.property')}>
          {inquiry.property.displayName}
        </TitleStrongValue>
        <TitleStrongValue title={t('inquiry.notes')}>
          {inquiry.contactNotes}
        </TitleStrongValue>

        <TitleStrongValue title={t('inquiry.address')}>
          <div>
            {inquiry.property.address?.address}
            <div className="text-gray text-xs">
              {lat.toFixed(2)} {lng.toFixed(2)}
            </div>
          </div>
        </TitleStrongValue>
        <TitleStrongValue title={t('inquiry.code')}>
          <Reveal secret={inquiry.passcode || ''} />
        </TitleStrongValue>
      </div>
      <Accordion
        defaultOpen={false}
        title={
          <TitleStrongValue title={t('inquiry.status')}>
            <div className="font-bold">
              {getInquiryStatusLabel(inquiry.status, locale)}
            </div>
          </TitleStrongValue>
        }
      >
        <div className="flex flex-col gap-2">
          {inquiry.inquiryTimeline.map((timeline) => (
            <div key={timeline.timestamp}>
              <TitleValue
                title={getInquiryStatusLabel(timeline.status, locale)}
              >
                {format(new Date(timeline.timestamp), 'PPp')}
              </TitleValue>
            </div>
          ))}
        </div>
      </Accordion>
    </div>
  );
};
