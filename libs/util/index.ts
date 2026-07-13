import { LatLng } from './types';
export * from './i18n';

export const isLatLng = (obj?: Partial<LatLng> | null): obj is LatLng => {
  return obj?.lat !== undefined && obj?.lng !== undefined;
};
