import { useTakeSkip } from '@mockp/util/hooks/pagination';
import { useQuery } from '@apollo/client';
import { BrokerageAgentsDocument } from '@mockp/network/src/gql/generated';
import { ShowData } from './ShowData';
import { AgentCard } from './AgentCard';

export const ListAgents = () => {
  const { take, skip, setSkip, setTake } = useTakeSkip();
  const { data, loading } = useQuery(BrokerageAgentsDocument);

  return (
    <ShowData
      loading={loading}
      pagination={{
        resultCount: data?.brokerageAgents.length,
        totalCount: data?.brokerageAgentsTotal,
        take,
        skip,
        setSkip,
        setTake,
      }}
    >
      {data?.brokerageAgents.map((agent) => (
        <AgentCard key={agent.uid} agent={agent} />
      ))}
    </ShowData>
  );
};
