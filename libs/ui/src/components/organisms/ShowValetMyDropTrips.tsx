import { useTakeSkip } from '@mockp/util/hooks/pagination';
import { useQuery } from '@apollo/client';
import {
  InquiryStatus,
  MyDropTripsDocument,
  SortOrder,
} from '@mockp/network/src/gql/generated';
import { ShowData } from './ShowData';
import { AgentTripCard } from './ValetTripCard';
import { Reveal } from '../molecules/Reveal';

export const ShowAgentMyDropTrips = ({ uid }: { uid: string }) => {
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
            booking={{
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
                {inquiry.status?.split('_').join(' ')}
              </div>
            </div>
          </AgentTripCard>
        );
      })}
    </ShowData>
  );
};
