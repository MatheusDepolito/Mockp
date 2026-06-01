'use client';
import { FormTypeBookPropertyFeature } from '@mockp/forms/src/bookProperty';
import { loadStripe } from '@stripe/stripe-js';

import {
  CreateInquiryInput,
  SearchPropertiesQuery,
} from '@mockp/network/src/gql/generated';
import { useFormContext, useWatch } from 'react-hook-form';
import { Form } from '../atoms/Form';
import { Badge } from '../atoms/Badge';
import { AutoImageChanger } from './AutoImageChanges';
import { DateRangeInquiryInfo } from '../molecules/DateRangeBookingInfo';
import { HtmlLabel } from '../atoms/HtmlLabel';
import { IconTypes } from '../molecules/IconTypes';
import { HtmlInput } from '../atoms/HtmlInput';
import { toLocalISOString } from '@mockp/util/date';
import { useTotalPrice } from '@mockp/util/hooks/price';
import { CostTitleValue } from '../molecules/CostTitleValue';
import { Button } from '../atoms/Button';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { TotalPrice } from '@mockp/util/types';
import { ManageAgents } from './ManageAgents';
import { toast } from '../molecules/Toast';

export const BookPropertyPopup = ({
  property,
}: {
  property: SearchPropertiesQuery['searchProperties'][0];
}) => {
  const session = useSession();
  const uid = session.data?.user?.uid;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<FormTypeBookPropertyFeature>();

  const { startTime, endTime } = useWatch<FormTypeBookPropertyFeature>();

  const listPriceAtInquiry = property.listPrice ?? undefined;

  const totalPriceObj = useTotalPrice({
    listPriceAtInquiry,
  });

  const totalPrice = totalPriceObj.parkingCharge;

  const [booking, setInquiry] = useState(false);

  return (
    <div className="flex gap-2 text-left border-t-2 border-white bg-white/50 backdrop-blur-sm">
      <Form
        onSubmit={handleSubmit(async (data) => {
          if (!uid) {
            alert('You are not logged in.');
            return;
          }
          const inquiryData: CreateInquiryInput = {
            phoneNumber: data.phoneNumber,
            customerId: uid,
            endTime: data.endTime,
            startTime: data.startTime,
            propertyId: property.id,
            contactNotes: data.contactNotes,
            totalPrice,
            listPriceAtInquiry,
            ...(data.visitInfo
              ? {
                  agentAssignment: {
                    visitLat: data.visitInfo.lat,
                    visitLng: data.visitInfo.lng,
                  },
                }
              : {}),
          };

          try {
            setInquiry(true);
            await createInquirySession(uid!, totalPriceObj, inquiryData);
          } catch (error) {
            toast('An error occurred while creating the booking session.');
          } finally {
            setInquiry(false);
          }
        })}
      >
        <div className="flex items-start gap-2">
          <div className="mb-2 text-lg font-bold">{property.displayName}</div>
          {property.verification?.verified ? (
            <Badge variant="green" size="sm">
              Verified
            </Badge>
          ) : (
            <Badge variant="gray" size="sm">
              Not verified
            </Badge>
          )}
        </div>
        <div className="mb-2 text-xl font-extralight">
          {property.address?.address}
        </div>
        <AutoImageChanger
          images={property.images || []}
          durationPerImage={10000}
          aspectRatio="aspect-video"
          noAutoChange
        />
        {property.featureCounts.length ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {property.featureCounts.map((feature) => (
              <div
                key={feature.type}
                className="flex items-center gap-1 px-2 py-1 border border-gray-200 bg-white"
              >
                {IconTypes[feature.type]}
                <span className="text-sm">{feature.count}</span>
              </div>
            ))}
          </div>
        ) : null}
        <DateRangeInquiryInfo startTime={startTime} endTime={endTime} />

        <HtmlLabel title="Start time" error={errors.startTime?.message}>
          <HtmlInput
            type="datetime-local"
            min={toLocalISOString(new Date()).slice(0, 16)}
            {...register('startTime')}
          />
        </HtmlLabel>
        <HtmlLabel title="End time" error={errors.endTime?.message}>
          <HtmlInput
            min={toLocalISOString(new Date()).slice(0, 16)}
            type="datetime-local"
            {...register('endTime')}
          />
        </HtmlLabel>

        <HtmlLabel title="Observações" error={errors.contactNotes?.message}>
          <HtmlInput
            placeholder="Mensagem para o corretor"
            {...register('contactNotes')}
          />
        </HtmlLabel>
        <HtmlLabel title="Phone number" error={errors.phoneNumber?.message}>
          <HtmlInput placeholder="+910000000000" {...register('phoneNumber')} />
        </HtmlLabel>
        <ManageAgents property={property} />

        {listPriceAtInquiry ? (
          <div className="mt-4">
            <CostTitleValue
              title="Preço anunciado"
              price={listPriceAtInquiry}
            />
            <CostTitleValue title="Total" price={totalPrice} />
          </div>
        ) : null}

        <Button loading={booking} type="submit" className="w-full mt-2">
          Solicitar visita
        </Button>
      </Form>
    </div>
  );
};

export const createInquirySession = async (
  uid: string,
  totalPriceObj: TotalPrice,
  inquiryData: CreateInquiryInput,
) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        totalPriceObj,
        uid,
        inquiryData,
      }),
    });
    const checkoutSession = await response.json();

    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    const stripe = await loadStripe(publishableKey || '');
    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.sessionId,
    });

    return result;
  } catch (error) {
    console.error('Error creating booking session:', error);
    throw error;
  }
};
