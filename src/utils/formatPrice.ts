export default function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-us').format(price);
}
