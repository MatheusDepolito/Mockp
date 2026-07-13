'use client';
import {
  FormProviderCreateProperty,
  FormTypeCreateProperty,
} from '@mockp/forms/src/createProperty';
import { useMutation, useQuery } from '@apollo/client';
import { useCloudinaryUpload } from '@mockp/util/hooks/cloudinary';
import {
  PropertyDocument,
  PropertyPurpose,
  PropertyType,
  RemovePropertyDocument,
  UpdatePropertyDocument,
  namedOperations,
} from '@mockp/network/src/gql/generated';
import { Form } from '../atoms/Form';
import { HtmlLabel } from '../atoms/HtmlLabel';
import { HtmlInput } from '../atoms/HtmlInput';
import { Button } from '../atoms/Button';
import { HtmlTextArea } from '../atoms/HtmlTextArea';
import { HtmlSelect } from '../atoms/HtmlSelect';
import { ImagePreview } from '../organisms/ImagePreview';
import { Controller, useFormContext } from 'react-hook-form';
import { Map } from '../organisms/map/Map';
import { initialViewState } from '@mockp/util/constants';
import { Panel } from '../organisms/map/Panel';
import { SearchPlaceBox } from '../organisms/map/SearchPlacesBox';
import { ViewState } from '@mockp/util/types';
import {
  CenterOfMap,
  DefaultZoomControls,
} from '../organisms/map/ZoomControls';
import {
  AddPropertyFeatures,
  PropertyMapMarker,
} from '../organisms/CreatePropertyComponents';
import { formatBrlAmount, parseBrlInput } from '@mockp/util/currency';
import { toast } from 'react-toastify';
import { getApiErrorMessage, useI18n } from '@mockp/util/i18n';
import {
  getPropertyPurposeLabel,
  getPropertyTypeLabel,
} from '../../i18n/enumLabels';
import { useEffect, useState } from 'react';
import { Dialog } from '../atoms/Dialog';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IconTrash } from '@tabler/icons-react';
import { LoaderPanel } from '../molecules/Loader';
import { AlertSection } from '../molecules/AlertSection';

const EditPropertyContent = ({ id }: { id: number }) => {
  const { locale, t } = useI18n();
  const router = useRouter();
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
    resetField,
    watch,
  } = useFormContext<FormTypeCreateProperty>();

  const { images } = watch();

  const { uploading, upload } = useCloudinaryUpload();

  const { data, loading, error } = useQuery(PropertyDocument, {
    variables: { where: { id } },
  });

  useEffect(() => {
    const property = data?.property;
    if (!property) {
      return;
    }

    setExistingImages(property.images ?? []);
    reset({
      displayName: property.displayName ?? '',
      description: property.description ?? '',
      propertyType: property.propertyType,
      purpose: property.purpose,
      listPrice: property.listPrice ?? undefined,
      location: {
        address: property.address?.address ?? '',
        lat: property.address?.lat ?? 0,
        lng: property.address?.lng ?? 0,
      },
      propertyFeatures:
        property.propertyFeatures?.map((feature) => ({
          type: feature.type,
          quantity: feature.quantity,
          displayName: feature.displayName ?? undefined,
        })) ?? [],
      images: undefined,
    });
  }, [data?.property, reset]);

  const [updateProperty, { loading: updating }] = useMutation(
    UpdatePropertyDocument,
    {
      refetchQueries: [
        namedOperations.Query.Property,
        namedOperations.Query.myPropertiesAsAgent,
      ],
      onCompleted: () => {
        toast(t('editProperty.success'));
      },
      onError(updateError) {
        toast(
          getApiErrorMessage({
            error: updateError,
            locale,
            fallbackMessage: t('editProperty.actionFailed'),
          }),
        );
      },
    },
  );

  const [removeProperty, { loading: removing }] = useMutation(
    RemovePropertyDocument,
    {
      refetchQueries: [namedOperations.Query.myPropertiesAsAgent],
      onCompleted: () => {
        toast(t('editProperty.deleted'));
        router.push('/my-properties');
      },
      onError(removeError) {
        toast(
          getApiErrorMessage({
            error: removeError,
            locale,
            fallbackMessage: t('editProperty.actionFailed'),
          }),
        );
      },
    },
  );

  if (loading) {
    return <LoaderPanel text={t('editProperty.title')} />;
  }

  if (error || !data?.property) {
    return (
      <AlertSection title={t('editProperty.title')}>
        {error?.message ?? t('editProperty.notFound')}
      </AlertSection>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-2 mt-2">
      <div>
        <Form
          onSubmit={handleSubmit(
            async ({
              images: newImages,
              description,
              displayName,
              location,
              propertyFeatures,
              propertyType,
              purpose,
              listPrice,
            }) => {
              try {
                const uploadedImages = newImages ? await upload(newImages) : [];
                const allImages = [...existingImages, ...uploadedImages];

                await updateProperty({
                  variables: {
                    updatePropertyInput: {
                      id,
                      Address: location,
                      images: allImages,
                      PropertyFeatures: propertyFeatures,
                      description,
                      displayName,
                      propertyType,
                      purpose,
                      listPrice,
                    },
                  },
                });
              } catch (submitError) {
                const message = getApiErrorMessage({
                  error: submitError,
                  locale,
                  fallbackMessage: t('editProperty.actionFailed'),
                });
                toast(message);
              }
            },
          )}
        >
          <HtmlLabel error={errors.displayName?.message} title="Nome do imóvel">
            <HtmlInput
              {...register('displayName')}
              placeholder="Ex: Apartamento centro"
            />
          </HtmlLabel>
          <HtmlLabel title="Descrição" error={errors.description?.message}>
            <HtmlTextArea
              cols={5}
              {...register('description')}
              placeholder="Descreva o imóvel..."
            />
          </HtmlLabel>
          <div className="grid grid-cols-2 gap-2">
            <HtmlLabel
              title={t('createProperty.typeLabel')}
              error={errors.propertyType?.message}
            >
              <HtmlSelect {...register('propertyType')}>
                {Object.values(PropertyType).map((type) => (
                  <option key={type} value={type}>
                    {getPropertyTypeLabel(type, locale)}
                  </option>
                ))}
              </HtmlSelect>
            </HtmlLabel>
            <HtmlLabel
              title={t('createProperty.purposeLabel')}
              error={errors.purpose?.message}
            >
              <HtmlSelect {...register('purpose')}>
                {Object.values(PropertyPurpose).map((purpose) => (
                  <option key={purpose} value={purpose}>
                    {getPropertyPurposeLabel(purpose, locale)}
                  </option>
                ))}
              </HtmlSelect>
            </HtmlLabel>
          </div>
          <HtmlLabel title="Preço (opcional)" optional>
            <Controller
              control={control}
              name="listPrice"
              render={({ field }) => (
                <HtmlInput
                  type="text"
                  inputMode="numeric"
                  placeholder="0,00"
                  value={
                    field.value != null && !Number.isNaN(field.value)
                      ? formatBrlAmount(field.value)
                      : ''
                  }
                  onChange={(event) => {
                    const { value } = parseBrlInput(event.target.value);
                    field.onChange(value);
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              )}
            />
          </HtmlLabel>
          <HtmlLabel title="Endereço" error={errors.location?.address?.message}>
            <HtmlTextArea
              cols={5}
              {...register('location.address')}
              placeholder="Rua, número, bairro"
            />
          </HtmlLabel>
          {existingImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {existingImages.map((src, index) => (
                <div key={src} className="relative aspect-square">
                  <Image
                    className="object-cover h-full w-full"
                    alt=""
                    width={300}
                    height={300}
                    src={src}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setExistingImages((current) =>
                        current.filter((_, i) => i !== index),
                      )
                    }
                    className="absolute top-1 right-1 p-1 text-white bg-red/80 rounded"
                  >
                    <IconTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : null}
          <ImagePreview srcs={images} clearImage={() => resetField('images')}>
            <Controller
              control={control}
              name="images"
              render={({ field }) => (
                <HtmlInput
                  type="file"
                  accept="image/*"
                  multiple={true}
                  onChange={(e) => field.onChange(e?.target?.files)}
                  className="border-0"
                />
              )}
            />
          </ImagePreview>
          <AddPropertyFeatures />
          <div className="grid grid-cols-2 gap-2">
            <Button loading={uploading || updating} type="submit">
              {t('editProperty.saveButton')}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => setDeleteOpen(true)}
            >
              {t('editProperty.deleteButton')}
            </Button>
          </div>
        </Form>
        <Dialog
          open={deleteOpen}
          setOpen={setDeleteOpen}
          title={t('editProperty.deleteTitle')}
        >
          <div>{t('editProperty.deleteConfirm')}</div>
          <div className="grid w-full grid-cols-2 gap-2 mt-4">
            <Button variant="outlined" onClick={() => setDeleteOpen(false)}>
              {t('editProperty.deleteCancel')}
            </Button>
            <Button
              loading={removing}
              onClick={async () => {
                await removeProperty({ variables: { where: { id } } });
              }}
            >
              {t('editProperty.deleteConfirmButton')}
            </Button>
          </div>
        </Dialog>
      </div>
      <Map
        initialViewState={initialViewState}
        onLoad={(e) => {
          const { lat, lng } = e.target.getCenter();
          setValue('location.lat', lat);
          setValue('location.lng', lng);
        }}
      >
        <PropertyMapMarker />
        <Panel position="left-top">
          <SearchPlaceBox
            onLocationChange={(location: ViewState) => {
              setValue('location.lat', location.latitude);
              setValue('location.lng', location.longitude);
            }}
          />
          <DefaultZoomControls>
            <CenterOfMap
              onClick={(latLng) => {
                const lat = parseFloat(latLng.lat.toFixed(8));
                const lng = parseFloat(latLng.lng.toFixed(8));

                setValue('location.lat', lat, {
                  shouldValidate: true,
                });
                setValue('location.lng', lng, {
                  shouldValidate: true,
                });
              }}
            />
          </DefaultZoomControls>
        </Panel>
      </Map>
    </div>
  );
};

export const EditProperty = ({ id }: { id: number }) => {
  const { t } = useI18n();

  return (
    <FormProviderCreateProperty mode="solo">
      <h1 className="text-xl font-semibold">{t('editProperty.title')}</h1>
      <EditPropertyContent id={id} />
    </FormProviderCreateProperty>
  );
};
