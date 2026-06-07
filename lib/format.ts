/** Format a number as Bangladeshi Taka, e.g. 1149 -> "৳1,149". */
export function taka(amount: number): string {
  return `৳${amount.toLocaleString("en-US")}`;
}

/** Two-decimal Taka used on the checkout summary, e.g. "৳130.00". */
export function taka2(amount: number): string {
  return `৳${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
