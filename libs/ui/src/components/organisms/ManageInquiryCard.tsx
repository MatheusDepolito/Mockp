import { InquiriesForPropertyQuery } from '@mockp/network/src/gql/generated';
import { TitleStrongValue, TitleValue } from '../atoms/TitleValue';
import { Reveal } from '../molecules/Reveal';
import { StartEndDateCard } from './DateCard';
import { Accordion } from '../atoms/Accordion';
import { format } from 'date-fns';
import { useI18n } from '@mockp/util/i18n';
import { getInquiryStatusLabel } from '../../i18n/enumLabels';

export interface IManageInquiryCardProps {
  inquiry: InquiriesForPropertyQuery['inquiriesForProperty'][0];
}

export const ManageInquiryCard = ({ inquiry }: IManageInquiryCardProps) => {
  const { locale, t } = useI18n();

  return (
    <div className="p-4 space-y-3 bg-white ">
      <div className="flex items-start justify-between">
        <TitleStrongValue title={t('inquiry.notes')}>
          <div className="text-3xl font-bold">{inquiry.contactNotes}</div>
        </TitleStrongValue>
        <div className="px-1 py-0.5 border border-primary">
          <TitleValue title={t('inquiry.property')}>
            {inquiry.property.displayName}
          </TitleValue>
        </div>
      </div>
      <StartEndDateCard
        startTime={inquiry.startTime}
        endTime={inquiry.endTime}
      />
      <TitleStrongValue title={t('inquiry.code')}>
        <Reveal showIntruction={false} secret={inquiry.passcode || ''} />
      </TitleStrongValue>

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
