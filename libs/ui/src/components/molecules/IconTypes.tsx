import { PropertyFeatureType } from '@mockp/network/src/gql/generated';
import {
  IconAirConditioning,
  IconBed,
  IconCar,
  IconHome,
  IconMoonStars,
  IconShirt,
  IconSun,
  IconSunrise,
  IconSunset,
  IconToolsKitchen2,
} from '@tabler/icons-react';

export const IconTypes: Partial<Record<PropertyFeatureType, JSX.Element>> = {
  [PropertyFeatureType.Bedroom]: <IconBed className="w-6 h-6" />,
  [PropertyFeatureType.Bathroom]: <IconHome className="w-6 h-6" />,
  [PropertyFeatureType.ParkingSpot]: <IconCar className="w-6 h-6" />,
  [PropertyFeatureType.AirConditioner]: (
    <IconAirConditioning className="w-6 h-6" />
  ),
  [PropertyFeatureType.BuiltInWardrobe]: <IconShirt className="w-6 h-6" />,
  [PropertyFeatureType.FurnishedKitchen]: (
    <IconToolsKitchen2 className="w-6 h-6" />
  ),
  [PropertyFeatureType.Other]: <IconHome className="w-6 h-6" />,
};

export const IconType = ({
  time,
  className,
}: {
  time: string;
  className?: string;
}) => {
  const date = new Date(time);
  const hour = date.getHours();

  if (hour >= 4 && hour < 10) return <IconSunrise className="w-5 h-5" />;
  if (hour >= 10 && hour < 16) return <IconSun className="w-5 h-5" />;
  if (hour >= 16 && hour < 20) return <IconSunset className="w-5 h-5" />;
  return <IconMoonStars className={`w-5 h-5 ${className}`} />;
};
