export type TotalPriceType = {
  listPriceAtInquiry?: number;
};

export const useTotalPrice = ({ listPriceAtInquiry }: TotalPriceType) => {
  const price = listPriceAtInquiry ?? 0;

  return {
    parkingCharge: price,
    agentChargePickup: 0,
    agentChargeDropoff: 0,
  };
};
