import { useTakeSkip } from '@mockp/util/hooks/pagination';
import { useQuery } from '@apollo/client';
import {
  InquiryStatus,
  MyDropTripsDocument,
  SortOrder,
} from '@mockp/network/src/gql/generated';
import { ShowData } from './ShowData';
import { AgentTripCard } from './AgentTripCard';
import { Reveal } from '../molecules/Reveal';
import { useI18n } from '@mockp/util/i18n';
import { getInquiryStatusLabel } from '../../i18n/enumLabels';

export const ShowAgentMyDropTrips = ({ uid }: { uid: string }) => {
  const { locale } = useI18n();
  const { setSkip, setTake, skip, take } = useTakeSkip();

  const { data, loading } = useQuery(MyDropTripsDocument, {
    variables: {
      skip,
      take,
      orderBy: { endTime: SortOrder.Asc },
      where: {
        status: { equals: InquiryStatus.Closed },
        AgentAssignment: {
          is: {
            assignedAgentId: { equals: uid },
          },
        },
      },
    },
  });

  return (
    <ShowData
      loading={loading}
      pagination={{
        setSkip,
        setTake,
        skip,
        take,
        resultCount: data?.inquiriesForAgent.length || 0,
        totalCount: data?.inquiriesCount.count || 0,
      }}
    >
      {data?.inquiriesForAgent.map((inquiry) => {
        const propertyAddress = inquiry.property.address;
        const visitLat =
          inquiry.agentAssignment?.visitLat ?? propertyAddress?.lat;
        const visitLng =
          inquiry.agentAssignment?.visitLng ?? propertyAddress?.lng;

        return (
          <AgentTripCard
            key={inquiry.id}
            inquiry={{
              id: inquiry.id,
              time: inquiry.startTime,
            }}
            start={propertyAddress}
            end={{
              lat: visitLat,
              lng: visitLng,
            }}
          >
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-xl font-semibold ">
                  {inquiry.contactNotes}
                </div>

                <Reveal
                  secret={inquiry.passcode}
                  showIntruction={false}
                  className="w-full"
                />
              </div>

              <div className="text-sm">
                {getInquiryStatusLabel(inquiry.status, locale)}
              </div>
            </div>
          </AgentTripCard>
        );
      })}
    </ShowData>
  );
};
