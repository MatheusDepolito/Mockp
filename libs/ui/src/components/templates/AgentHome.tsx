import { useState } from 'react';
import { Tab, TabPanel, Tabs } from '../molecules/Tabs';
import { ShowAgentAllPickupTrips } from '../organisms/ShowValetAllPickupTrips';
import { ShowAgentAllDropTrips } from '../organisms/ShowValetAllDropTrips';

export const AgentHome = () => {
  const [value, setValue] = useState<0 | 1>(0);

  return (
    <>
      <Tabs value={value} onChange={(e, v) => setValue(v)} aria-label="visitas">
        <Tab label={'Visitas disponíveis'} />
        <Tab label={'Retornos'} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShowAgentAllPickupTrips />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowAgentAllDropTrips />
      </TabPanel>
    </>
  );
};
