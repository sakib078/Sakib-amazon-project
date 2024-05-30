import { priceFormatter } from "../../scripts/utils/money";

console.log("test suit: formatcurrancy");

describe('test suit: fromate currancy', () => {
    it('convert cents into dollars', () => {
        expect(priceFormatter(2095)).toEqual(20.95);
    })
})