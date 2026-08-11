import {
  InquiryStatus,
  AgentDropsDocument,
} from '@mockp/network/src/gql/generated';
import { useQuery } from '@apollo/client';
import { useTakeSkip } from '@mockp/util/hooks/pagination';
import { ShowData } from './ShowData';
import { AgentTripCard } from './AgentTripCard';
import { AssignAgentButton } from './AssignAgentButton';

export const ShowAgentAllDropTrips = () => {
  const { loading, data } = useQuery(AgentDropsDocument);
  const { setSkip, setTake, skip, take } = useTakeSkip();
  return (
    <ShowData
      loading={loading}
      pagination={{
        setSkip,
        setTake,
        skip,
        take,
        resultCount: data?.agentDrops.length || 0,
        totalCount: data?.agentDropsTotal || 0,
      }}
    >
      {data?.agentDrops.map((inquiry) => {
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
              time: inquiry.endTime,
            }}
            start={propertyAddress}
            end={{
              lat: visitLat,
              lng: visitLng,
            }}
          >
            <AssignAgentButton
              inquiryId={inquiry.id}
              status={InquiryStatus.Closed}
            >
              Encerrar
            </AssignAgentButton>
          </AgentTripCard>
        );
      })}
    </ShowData>
  );
};
