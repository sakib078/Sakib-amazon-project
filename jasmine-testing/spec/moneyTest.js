import { priceFormatter } from "../../scripts/utils/money.js";

console.log("test suit: formatcurrancy");

describe('test suit: formate currancy', () => {
    it('convert cents into dollars', () => {
        expect(priceFormatter(2095)).toEqual('20.95');
    });

    it('format price with 0', () => {
        expect(priceFormatter(0)).toEqual('0.00');
    })

    it('random value like 2000.5', () => {
        expect(priceFormatter(2000.5)).toEqual('20.01');
    })
});