import { ReactNode } from 'react';
import { Badge } from '../atoms/Badge';

export const UnverifiedProfileBanner = ({
  children,
}: {
  children?: ReactNode;
}) => (
  <div className="mb-4 rounded border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-900">
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="yellow" size="sm">
        Perfil em análise
      </Badge>
      <span>
        {children ??
          'Seus imóveis ficarão visíveis após aprovação da equipe Mockp.'}
      </span>
    </div>
  </div>
);

export const ProfileVerifiedBadge = ({ verified }: { verified: boolean }) =>
  verified ? (
    <Badge variant="green" size="sm">
      Verificado
    </Badge>
  ) : (
    <Badge variant="yellow" size="sm">
      Perfil em análise
    </Badge>
  );
