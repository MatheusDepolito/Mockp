export type TotalPriceType = {
  listPriceAtInquiry?: number;
};

export const useTotalPrice = ({ listPriceAtInquiry }: TotalPriceType) => {
  const price = listPriceAtInquiry ?? 0;

  return {
    parkingCharge: price,
    valetChargePickup: 0,
    valetChargeDropoff: 0,
  };
};
