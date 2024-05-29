
export function priceFormatter(price) {
    return (Math.round(price) / 100).toFixed(2);
}