import { FormTypeCreateProperty } from '@mockp/forms/src/createProperty';
import { useWatch, useFormContext, useFieldArray } from 'react-hook-form';
import { Marker } from '../organisms/map/MapMarker';
import { MockpIcon } from '../atoms/MockpIcon';
import { Accordion } from '../atoms/Accordion';
import { Button } from '../atoms/Button';
import { IconPlus } from '@tabler/icons-react';
import { PropertyFeatureType } from '@mockp/network/src/gql/generated';
import { HtmlLabel } from '../atoms/HtmlLabel';
import { HtmlSelect } from '../atoms/HtmlSelect';
import { HtmlInput } from '../atoms/HtmlInput';

export const PropertyMapMarker = () => {
  const { location } = useWatch<FormTypeCreateProperty>();
  const { setValue } = useFormContext<FormTypeCreateProperty>();

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

export const AddPropertyFeatures = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormTypeCreateProperty>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `propertyFeatures`,
  });

  const { propertyFeatures } = useWatch<FormTypeCreateProperty>();
  return (
    <div>
      {fields.map((item, featureIndex) => (
        <Accordion
          defaultOpen
          key={item.id}
          title={
            <div>
              {propertyFeatures?.[featureIndex]?.type} x{' '}
              {propertyFeatures?.[featureIndex]?.quantity}
            </div>
          }
        >
          <div className={`flex justify-end my-2`}>
            <Button
              variant="text"
              size="none"
              className="text-xs text-gray-600 underline underline-offset-2"
              onClick={() => {
                remove(featureIndex);
              }}
            >
              remover característica
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <HtmlLabel
              title="Tipo"
              error={errors.propertyFeatures?.[featureIndex]?.type?.toString()}
            >
              <HtmlSelect
                placeholder="tipo"
                {...register(`propertyFeatures.${featureIndex}.type`)}
              >
                {Object.values(PropertyFeatureType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </HtmlSelect>
            </HtmlLabel>

            <HtmlLabel
              title="Quantidade"
              error={errors.propertyFeatures?.[featureIndex]?.quantity?.message}
            >
              <HtmlInput
                type="number"
                placeholder="Quantidade"
                {...register(`propertyFeatures.${featureIndex}.quantity`, {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>

            <HtmlLabel
              title="Nome (opcional)"
              optional
              error={
                errors.propertyFeatures?.[featureIndex]?.displayName?.message
              }
            >
              <HtmlInput
                placeholder="Ex: Suíte master"
                {...register(`propertyFeatures.${featureIndex}.displayName`)}
              />
            </HtmlLabel>
          </div>
        </Accordion>
      ))}
      <Button
        className="flex items-center justify-center w-full py-2 text-xs border border-dashed"
        variant="text"
        size="none"
        onClick={() => {
          append({
            quantity: 1,
            type: PropertyFeatureType.Bedroom,
          });
        }}
      >
        <IconPlus className="w-4 h-4" /> Adicionar característica
      </Button>
    </div>
  );
};
