import { PropertiesQuery } from '@mockp/network/src/gql/generated';
import { AutoImageChanger } from './AutoImageChanger';
import Link from 'next/link';
import { IconTypes } from '../molecules/IconTypes';
import { CreateManyPropertyFeaturesDialog } from './CreateManyPropertyFeaturesDialog';

export interface IPropertyCardProps {
  property: PropertiesQuery['properties'][number];
  hideInquiriesLink?: boolean;
}

export const PropertyCard = ({
  property,
  hideInquiriesLink,
}: IPropertyCardProps) => {
  return (
    <div className="overflow-hidden bg-white shadow-lg flex flex-col">
      <AutoImageChanger images={property.images} durationPerImage={5000} />

      <div className="p-2 flex-grow flex flex-col gap-4">
        <div>
          <div className="flex justify-between ">
            <h3 className="font-semibold ">{property.displayName}</h3>
            {!hideInquiriesLink ? (
              <Link
                className="text-sm underline underline-offset-4"
                href={{
                  pathname: 'inquiries',
                  query: { propertyId: property.id },
                }}
              >
                Inquiries
              </Link>
            ) : null}
          </div>
          <p className="text-gray-500 text-sm my-2 line-clamp-2 ">
            {property.description}
          </p>
          <p className="text-sm text-gray-400">
            Address: {property.address?.address}
          </p>
        </div>
        <div className="flex gap-2 mt-auto">
          <>
            {property.featureCounts.map((feature) => (
              <div
                key={feature.type}
                className="flex items-center justify-center w-16 h-10 gap-1 border-2 border-primary"
              >
                <div>{IconTypes[feature.type]}</div>
                <div className="text-sm">{feature.count}</div>
              </div>
            ))}
            <CreateManyPropertyFeaturesDialog propertyId={property.id} />
          </>
        </div>
      </div>
    </div>
  );
};
