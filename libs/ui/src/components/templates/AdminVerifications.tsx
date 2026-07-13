'use client';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  AdminAgentsDocument,
  AdminBrokeragesDocument,
} from '@mockp/network/src/gql/generated';
import { useTakeSkip } from '@mockp/util/hooks/pagination';
import { ShowData } from '../organisms/ShowData';
import { Tab, TabPanel, Tabs } from '../molecules/Tabs';
import { ProfileVerifiedBadge } from '../molecules/VerificationBadge';
import { VerifyAgentButton } from '../organisms/admin/VerifyAgentButton';
import { VerifyBrokerageButton } from '../organisms/admin/VerifyBrokerageButton';
import { format } from 'date-fns';
import { useI18n } from '@mockp/util/i18n';

export const AdminVerifications = () => {
  const { t } = useI18n();
  const [tab, setTab] = useState<0 | 1 | 2>(0);

  return (
    <>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        aria-label="verificações"
      >
        <Tab label={t('adminVerifications.titleProperties')} />
        <Tab label={t('adminVerifications.titleAgents')} />
        <Tab label={t('adminVerifications.titleBrokerages')} />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <p className="text-sm text-gray-600 py-4">
          {t('adminVerifications.propertiesHint')}
        </p>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <AdminAgentsList />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <AdminBrokeragesList />
      </TabPanel>
    </>
  );
};

const AdminAgentsList = () => {
  const { t } = useI18n();
  const { setSkip, setTake, skip, take } = useTakeSkip();
  const { data, loading, error } = useQuery(AdminAgentsDocument, {
    variables: { skip, take },
  });
  const agents = data?.agents ?? [];

  return (
    <ShowData
      error={error?.message}
      loading={loading}
      title={t('adminVerifications.titleAgents')}
      pagination={{
        skip,
        take,
        resultCount: agents.length,
        totalCount: agents.length,
        setSkip,
        setTake,
      }}
    >
      {agents.map((agent) => (
        <div
          key={agent.uid}
          className="flex flex-wrap items-center justify-between gap-2 rounded border border-gray-200 bg-white p-4"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 font-semibold">
              {agent.displayName}
              <ProfileVerifiedBadge verified={agent.verified} />
            </div>
            <div className="text-xs text-gray-500">
              CRECI {agent.licenseID}
              {agent.brokerageId
                ? ` · ${t('adminVerifications.brokerageLabelPrefix')} #${agent.brokerageId}`
                : ` · ${t('adminVerifications.independentAgent')}`}
            </div>
            <div className="text-xs text-gray-400">
              {format(new Date(agent.createdAt), 'PP')}
            </div>
          </div>
          <VerifyAgentButton uid={agent.uid} verified={agent.verified} />
        </div>
      ))}
    </ShowData>
  );
};

const AdminBrokeragesList = () => {
  const { t } = useI18n();
  const { setSkip, setTake, skip, take } = useTakeSkip();
  const { data, loading, error } = useQuery(AdminBrokeragesDocument, {
    variables: { skip, take },
  });
  const brokerages = data?.brokerages ?? [];

  return (
    <ShowData
      error={error?.message}
      loading={loading}
      title={t('adminVerifications.titleBrokerages')}
      pagination={{
        skip,
        take,
        resultCount: brokerages.length,
        totalCount: brokerages.length,
        setSkip,
        setTake,
      }}
    >
      {brokerages.map((brokerage) => (
        <div
          key={brokerage.id}
          className="flex flex-wrap items-center justify-between gap-2 rounded border border-gray-200 bg-white p-4"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 font-semibold">
              {brokerage.displayName}
              <ProfileVerifiedBadge verified={brokerage.verified} />
            </div>
            {brokerage.description ? (
              <p className="text-sm text-gray-600">{brokerage.description}</p>
            ) : null}
            <div className="text-xs text-gray-400">
              {format(new Date(brokerage.createdAt), 'PP')}
            </div>
          </div>
          <VerifyBrokerageButton
            id={brokerage.id}
            verified={brokerage.verified}
          />
        </div>
      ))}
    </ShowData>
  );
};
