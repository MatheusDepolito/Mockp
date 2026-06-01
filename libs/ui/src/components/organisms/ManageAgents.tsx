import { SearchPropertiesQuery } from '@mockp/network/src/gql/generated';
import { useState } from 'react';
import { toast } from '../molecules/Toast';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormTypeBookPropertyFeature } from '@mockp/forms/src/bookProperty';
import { Switch } from '../atoms/Switch';
import { Marker } from './map/MapMarker';
import { Map } from './map/Map';
import { MockpIcon } from '../atoms/MockpIcon';
import { IconUser } from '@tabler/icons-react';
import { Panel } from './map/Panel';
import { DefaultZoomControls } from './map/ZoomControls';

export const ManageAgents = ({
  property,
}: {
  property: SearchPropertiesQuery['searchProperties'][number];
}) => {
  const [customMeetPoint, setCustomMeetPoint] = useState(false);

  const { setValue } = useFormContext<FormTypeBookPropertyFeature>();
  const { visitInfo } = useWatch<FormTypeBookPropertyFeature>();

  const lat = property.address?.lat;
  const lng = property.address?.lng;
  if (!lat || !lng) {
    toast('Property location not set.');
    return <div>Something went wrong.</div>;
  }

  const meetLat = visitInfo?.lat ?? lat;
  const meetLng = visitInfo?.lng ?? lng;

  return (
    <div className="p-2 space-y-3 bg-gray-25">
      <div className="text-xl font-bold">Visita</div>
      <p className="text-sm text-gray">
        Por padrão a visita ocorre no endereço do imóvel. Ative a opção abaixo
        para indicar um ponto de encontro diferente.
      </p>

      <Switch
        checked={customMeetPoint}
        onChange={(enabled) => {
          setCustomMeetPoint(enabled);

          if (!enabled) {
            setValue('visitInfo', undefined, { shouldValidate: true });
          } else {
            setValue('visitInfo', { lat, lng });
          }
        }}
        label={'Ponto de encontro diferente do imóvel?'}
      />

      {customMeetPoint ? (
        <Map
          initialViewState={{
            latitude: meetLat,
            longitude: meetLng,
            zoom: 13,
          }}
          height="50vh"
        >
          <Panel position="right-center">
            <DefaultZoomControls />
          </Panel>
          <Marker latitude={lat} longitude={lng}>
            <MockpIcon />
          </Marker>
          <Marker
            pitchAlignment="auto"
            longitude={meetLng}
            latitude={meetLat}
            draggable
            onDragEnd={({ lngLat }) => {
              const { lat: nextLat, lng: nextLng } = lngLat;
              setValue('visitInfo.lat', nextLat || 0);
              setValue('visitInfo.lng', nextLng || 0);
            }}
          >
            <div className="flex flex-col items-center">
              <IconUser />
              <span>Encontro</span>
            </div>
          </Marker>
        </Map>
      ) : null}
    </div>
  );
};
