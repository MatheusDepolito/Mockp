import { FormTypeCreateGarage } from '@mockp/forms/src/createGarage';
import { ViewState } from '@mockp/util/types';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Marker } from '../organisms/map/MapMarker';
import { MockpIcon } from '../atoms/MockpIcon';
import { initialViewState } from '@mockp/util/constants';
export const GarageMapMarker = ({
  initialLocation,
}: {
  initialLocation?: ViewState;
}) => {
  const { location } = useWatch<FormTypeCreateGarage>();
  const { setValue } = useFormContext<FormTypeCreateGarage>();

  // const markerLocation = location || initialViewState;

  // useEffect(() => {
  //   if(initialLocation) {
  //     const { latitude, longitude } = initialLocation;
  //     setValue('location', { lat: latitude, lng: longitude, address: '' })
  //   }
  // }, [initialLocation, setValue])

  return (
    <Marker
      pitchAlignment="auto"
      longitude={location?.lng || 0}
      latitude={location?.lat || 0}
      draggable
      onDragEnd={({ lngLat }) => {
        const { lat, lng } = lngLat;

        setValue('location.lat', lat || 0);
        setValue('location.lng', lng || 0);
      }}
    >
      <MockpIcon />
    </Marker>
  );
};
