import { BrokerageAgentsQuery } from '@mockp/network/src/gql/generated';
import { format } from 'date-fns';
import Image from 'next/image';
import { ProfileVerifiedBadge } from '../molecules/VerificationBadge';

export interface IAgentCardProps {
  agent: BrokerageAgentsQuery['brokerageAgents'][0];
}

export const AgentCard = ({ agent }: IAgentCardProps) => {
  return (
    <div className="space-y-2">
      <div className="p-1 border-2 shadow-lg border-primary">
        <Image
          className="object-cover w-full aspect-square "
          width={200}
          height={300}
          src={agent.image || '/agent.png'}
          alt={''}
        />
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="font-semibold">{agent.displayName}</div>
          <ProfileVerifiedBadge verified={agent.verified} />
        </div>
        <div className="mb-1 text-xs text-gray-500">{agent.licenseID}</div>
        <div className="text-xs text-gray">
          {format(new Date(agent.createdAt), 'PP')}
        </div>
      </div>
    </div>
  );
};
