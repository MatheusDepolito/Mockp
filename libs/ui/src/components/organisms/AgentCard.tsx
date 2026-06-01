import { CompanyAgentsQuery } from '@mockp/network/src/gql/generated';
import { format } from 'date-fns';
import Image from 'next/image';

export interface IAgentCardProps {
  agent: CompanyAgentsQuery['companyAgents'][0];
}

export const AgentCard = ({ agent }: IAgentCardProps) => {
  return (
    <div className="space-y-2">
      <div className="p-1 border-2 shadow-lg border-primary">
        <Image
          className="object-cover w-full aspect-square "
          width={200}
          height={300}
          src={agent.image || '/valet.jpeg'}
          alt={''}
        />
      </div>
      <div>
        <div className="font-semibold ">{agent.displayName}</div>
        <div className="mb-1 text-xs text-gray-500">{agent.licenseID}</div>
        <div className="text-xs text-gray">
          {format(new Date(agent.createdAt), 'PP')}
        </div>
      </div>
    </div>
  );
};
