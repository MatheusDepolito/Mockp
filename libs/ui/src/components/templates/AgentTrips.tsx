import { useState } from 'react';
import { Tab, TabPanel, Tabs } from '../molecules/Tabs';
import { ShowAgentMyPickupTrips } from '../organisms/ShowValetMyPickupTrips';
import { ShowAgentMyDropTrips } from '../organisms/ShowValetMyDropTrips';

export const AgentTrips = ({ uid }: { uid: string }) => {
  const [value, setValue] = useState<0 | 1>(0);

  return (
    <>
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        aria-label="bookings"
      >
        <Tab label={'Pickup'} />
        <Tab label={'Drop'} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShowAgentMyPickupTrips uid={uid} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowAgentMyDropTrips uid={uid} />
      </TabPanel>
    </>
  );
};
