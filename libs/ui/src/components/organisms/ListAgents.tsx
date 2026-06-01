import { useTakeSkip } from '@mockp/util/hooks/pagination';
import { useQuery } from '@apollo/client';
import {
  CompanyAgentsDocument,
  CompanyAgentsQuery,
} from '@mockp/network/src/gql/generated';
import { ShowData } from './ShowData';
import { AgentCard } from './AgentCard';

export const ListAgents = () => {
  const { take, skip, setSkip, setTake } = useTakeSkip();
  const { data, loading } = useQuery(CompanyAgentsDocument);

  return (
    <ShowData
      loading={loading}
      pagination={{
        resultCount: data?.companyAgents.length,
        totalCount: data?.companyAgentsTotal,
        take,
        skip,
        setSkip,
        setTake,
      }}
    >
      {data?.companyAgents.map((agent) => (
        <AgentCard key={agent.uid} agent={agent} />
      ))}
    </ShowData>
  );
};
