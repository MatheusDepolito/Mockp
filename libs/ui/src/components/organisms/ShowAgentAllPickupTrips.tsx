import {
  InquiryStatus,
  AgentPickupsDocument,
} from '@mockp/network/src/gql/generated';
import { useQuery } from '@apollo/client';
import { useTakeSkip } from '@mockp/util/hooks/pagination';
import { ShowData } from './ShowData';
import { AgentTripCard } from './AgentTripCard';
import { AssignAgentButton } from './AssignAgentButton';

export const ShowAgentAllPickupTrips = () => {
  const { loading, data } = useQuery(AgentPickupsDocument);
  const { setSkip, setTake, skip, take } = useTakeSkip();
  return (
    <ShowData
      loading={loading}
      pagination={{
        setSkip,
        setTake,
        skip,
        take,
        resultCount: data?.agentPickups.length || 0,
        totalCount: data?.agentPickupsTotal || 0,
      }}
    >
      {data?.agentPickups.map((inquiry) => {
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
            start={{
              lat: visitLat,
              lng: visitLng,
            }}
            end={propertyAddress}
          >
            <AssignAgentButton
              inquiryId={inquiry.id}
              status={InquiryStatus.VisitScheduled}
            >
              Aceitar visita
            </AssignAgentButton>
          </AgentTripCard>
        );
      })}
    </ShowData>
  );
};
