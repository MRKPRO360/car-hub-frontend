const formatCurrency = (amount: number): string => {
  if (amount >= 1000) return `$${(amount / 1000).toFixed(2)}K`;
  else return `$${amount.toFixed(2)}`;
};

export default formatCurrency;
