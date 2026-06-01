import { formatBrlCurrency } from '@mockp/util/currency';

export const CostTitleValue = ({
  title,
  price,
}: {
  title: string;
  price?: number | null;
}) => {
  if (price == null || price <= 0) return null;

  return (
    <div className="flex justify-between text-lg font-bold">
      <div>{title}</div>
      <div>{formatBrlCurrency(price)}</div>
    </div>
  );
};
