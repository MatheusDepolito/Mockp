import {
  InquiryStatus,
  ValetDropsDocument,
} from '@mockp/network/src/gql/generated';
import { useQuery } from '@apollo/client';
import { useTakeSkip } from '@mockp/util/hooks/pagination';
import { ShowData } from './ShowData';
import { AgentTripCard } from './ValetTripCard';
import { AssignAgentButton } from './AssignValetButton';

export const ShowAgentAllDropTrips = () => {
  const { loading, data } = useQuery(ValetDropsDocument);
  const { setSkip, setTake, skip, take } = useTakeSkip();
  return (
    <ShowData
      loading={loading}
      pagination={{
        setSkip,
        setTake,
        skip,
        take,
        resultCount: data?.valetDrops.length || 0,
        totalCount: data?.valetDropsTotal || 0,
      }}
    >
      {data?.valetDrops.map((inquiry) => {
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
