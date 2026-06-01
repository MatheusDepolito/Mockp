import { SearchPropertiesQuery } from '@mockp/network/src/gql/generated';
import { useKeypress } from '@mockp/util/hooks/keys';
import { useState } from 'react';
import { Marker } from '../map/MapMarker';
import { Dialog } from '../../atoms/Dialog';
import { MockpIcon } from '../../atoms/MockpIcon';
import { FormProviderBookPropertyFeature } from '@mockp/forms/src/bookProperty';
import { useWatch } from 'react-hook-form';
import { FormTypeSearchProperty } from '@mockp/forms/src/searchProperties';
import { BookPropertyPopup } from '../BookPropertyPopup';

export const PropertyMarker = ({
  marker,
}: {
  marker: SearchPropertiesQuery['searchProperties'][number];
}) => {
  const [showPopup, setShowPopup] = useState(false);
  useKeypress(['Escape'], () => setShowPopup(false));

  const { endTime, startTime } = useWatch<FormTypeSearchProperty>();

  if (!marker.address?.lat || !marker.address.lng) {
    return null;
  }

  return (
    <>
      <Dialog
        title="Inquiry"
        widthClassName="max-w-3xl"
        open={showPopup}
        setOpen={setShowPopup}
      >
        <FormProviderBookPropertyFeature defaultValues={{ endTime, startTime }}>
          <BookPropertyPopup property={marker} />
        </FormProviderBookPropertyFeature>
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
