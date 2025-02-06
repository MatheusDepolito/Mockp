import { SearchGaragesQuery } from '@mockp/network/src/gql/generated';
import { useKeypress } from '@mockp/util/hooks/keys';
import { useState } from 'react';
import { Marker } from '../map/MapMarker';
import { Dialog } from '../../atoms/Dialog';
import { MockpIcon } from '../../atoms/MockpIcon';
import { FormProviderBookSlot } from '@mockp/forms/src/bookSlot';
import { useWatch } from 'react-hook-form';
import { FormTypeSearchGarage } from '@mockp/forms/src/searchGarages';
import { BookSlotPopup } from '../BookSlotPopup';

export const GarageMarker = ({
  marker,
}: {
  marker: SearchGaragesQuery['searchGarages'][number];
}) => {
  const [showPopup, setShowPopup] = useState(false);
  useKeypress(['Escape'], () => setShowPopup(false));

  const { endTime, startTime } = useWatch<FormTypeSearchGarage>();

  if (!marker.address?.lat || !marker.address.lng) {
    return null;
  }

  return (
    <>
      <Dialog
        title="Booking"
        widthClassName="max-w-3xl"
        open={showPopup}
        setOpen={setShowPopup}
      >
        <FormProviderBookSlot defaultValues={{ endTime, startTime }}>
          <BookSlotPopup garage={marker} />
        </FormProviderBookSlot>
      </Dialog>

      <Marker
        latitude={marker.address.lat}
        longitude={marker.address.lng}
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setShowPopup((state) => !state);
        }}
      >
        <MockpIcon />
      </Marker>
    </>
  );
};
