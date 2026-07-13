'use client';
import {
  FormProviderCreateProperty,
  FormTypeCreateProperty,
} from '@mockp/forms/src/createProperty';
import { useMutation, useQuery } from '@apollo/client';
import { useCloudinaryUpload } from '@mockp/util/hooks/cloudinary';
import {
  CompanyAgentsDocument,
  CreatePropertyDocument,
  PropertyPurpose,
  PropertyType,
  namedOperations,
} from '@mockp/network/src/gql/generated';
import { Form } from '../atoms/Form';
import { HtmlLabel } from '../atoms/HtmlLabel';
import { HtmlInput } from '../atoms/HtmlInput';
import { Button } from '../atoms/Button';
import { HtmlTextArea } from '../atoms/HtmlTextArea';
import { HtmlSelect } from '../atoms/HtmlSelect';
import { Autocomplete } from '../atoms/AutoComplete';
import Link from 'next/link';
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

const CreatePropertyContent = ({ brokerageId }: { brokerageId?: number }) => {
  const { locale, t } = useI18n();
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

  const { data: agentsData, loading: agentsLoading } = useQuery(
    CompanyAgentsDocument,
    {
      skip: !brokerageId,
      variables: brokerageId
        ? {
            where: {
              brokerageId: { equals: brokerageId },
            },
          }
        : undefined,
    },
  );

  const agents = agentsData?.companyAgents ?? [];

  const [createProperty, { loading }] = useMutation(CreatePropertyDocument, {
    refetchQueries: [namedOperations.Query.Properties],
    onCompleted: () => {
      reset();
      toast(t('createProperty.success'));
    },
    onError(error) {
      toast(
        getApiErrorMessage({
          error,
          locale,
          fallbackMessage: t('createProperty.actionFailed'),
        }),
      );
    },
  });

  return (
    <div className="grid md:grid-cols-2 gap-2 mt-2 ">
      <div>
        <Form
          onSubmit={handleSubmit(
            async ({
              images,
              description,
              displayName,
              location,
              propertyFeatures,
              propertyType,
              purpose,
              listPrice,
              responsibleAgentId,
            }) => {
              try {
                const uploadedImages = images ? await upload(images) : [];

                await createProperty({
                  variables: {
                    createPropertyInput: {
                      Address: location,
                      images: uploadedImages,
                      PropertyFeatures: propertyFeatures,
                      description,
                      displayName,
                      propertyType,
                      purpose,
                      listPrice,
                      responsibleAgentId,
                      ...(brokerageId ? { brokerageId } : {}),
                    },
                  },
                });
              } catch (error) {
                const message = getApiErrorMessage({
                  error,
                  locale,
                  fallbackMessage: t('createProperty.actionFailed'),
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
          <HtmlLabel
            title="Corretor responsável"
            error={errors.responsibleAgentId?.message}
          >
            <Controller
              control={control}
              name="responsibleAgentId"
              render={({ field }) => {
                const selected =
                  agents.find((agent) => agent.uid === field.value) ?? null;
                return (
                  <Autocomplete<(typeof agents)[number]>
                    options={agents}
                    value={selected}
                    disabled={agentsLoading || agents.length === 0}
                    isOptionEqualToValue={(option, value) =>
                      option.uid === value.uid
                    }
                    getOptionLabel={(option) =>
                      option.licenseID
                        ? `${option.displayName} (${option.licenseID})`
                        : option.displayName
                    }
                    onChange={(_, value) => field.onChange(value?.uid ?? '')}
                    placeholder={
                      agentsLoading ? 'Carregando...' : 'Buscar corretor...'
                    }
                    noOptionsText="Nenhum corretor encontrado"
                  />
                );
              }}
            />
            {!agentsLoading && agents.length === 0 ? (
              <p className="mt-1 text-xs text-red-600">
                Cadastre um corretor em{' '}
                <Link href="/agents" className="underline">
                  Corretores
                </Link>{' '}
                antes de criar um imóvel.
              </p>
            ) : null}
          </HtmlLabel>
          <HtmlLabel title="Endereço" error={errors.location?.address?.message}>
            <HtmlTextArea
              cols={5}
              {...register('location.address')}
              placeholder="Rua, número, bairro"
            />
          </HtmlLabel>
          <ImagePreview srcs={images} clearImage={() => resetField('images')}>
            <Controller
              control={control}
              name={`images`}
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
          <Button loading={uploading || loading} type="submit">
            Criar imóvel
          </Button>
        </Form>
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

export const CreateProperty = ({ brokerageId }: { brokerageId?: number }) => {
  return (
    <FormProviderCreateProperty>
      <CreatePropertyContent brokerageId={brokerageId} />
    </FormProviderCreateProperty>
  );
};
