export function formatBrlAmount(reais: number): string {
  return reais.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatBrlCurrency(reais: number): string {
  return reais.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function parseBrlInput(raw: string): {
  value: number | undefined;
  display: string;
} {
  const digits = raw.replace(/\D/g, '');

  if (!digits) {
    return { value: undefined, display: '' };
  }

  const value = Number(digits) / 100;

  return {
    value,
    display: formatBrlAmount(value),
  };
}
