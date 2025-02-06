import { LocationInfo } from './types';

export const initialViewState = {
  latitude: -22.1256,
  longitude: -51.3889,
  zoom: 11.5,
};

export const majorCitiesLocationInfo: LocationInfo[] = [
  {
    placeName: 'Rio de Janeiro, Brazil',
    latLng: [-22.9068, -43.1729],
  },
  {
    placeName: 'São Paulo, Brazil',
    latLng: [-23.5505, -46.6333],
  },
  {
    placeName: 'Belo Horizonte, Brazil',
    latLng: [-19.9167, -43.9345],
  },
  {
    placeName: 'Curitiba, Brazil',
    latLng: [-25.4284, -49.2733],
  },
  {
    placeName: 'Porto Alegre, Brazil',
    latLng: [-30.0346, -51.2177],
  },
  {
    placeName: 'Salvador, Brazil',
    latLng: [-12.9714, -38.5014],
  },
  {
    placeName: 'Fortaleza, Brazil',
    latLng: [-3.7172, -38.5433],
  },
  {
    placeName: 'Brasília, Brazil',
    latLng: [-15.8267, -47.9218],
  },
];

export const VALET_CHARGE_PER_METER = 0.005;

export const TAKE_COUNT = 12;
