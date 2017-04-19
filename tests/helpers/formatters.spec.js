import faker from 'faker';
import {compile} from 'handlebars';

describe('formatters', () => {
    describe('formatCurrency', () => {
        it('should return USD currency for USD code after compilation', () => {
            let template = compile('{{formatCurrency 1234567.89 code="USD"}}');

            expect(template()).toEqual('&#x24;1,234,567.89');
        });

        it('should return EUR currency for EUR code after compilation', () => {
            let template = compile('{{formatCurrency 1234567.89 code="EUR"}}');

            expect(template()).toEqual('1.234.567,89 &#x20ac;');
        });

        it('should return EUR currency with en locale for EUR code and en locale after compilation', () => {
            let template = compile('{{formatCurrency 1234567.89 code="EUR" locale="en"}}');

            expect(template()).toEqual('&#x20ac;1,234,567.89');
        });

        it('should return USD currency with no currency code after compilation', () => {
            let template = compile('{{formatCurrency 1234567.89}}');

            expect(template()).toEqual('&#x24;1,234,567.89');
        });

        it('should return an empty string for no value after compilation', () => {
            let template = compile('{{formatCurrency}}');

            expect(template()).toEqual('');
        });

        it('should return an empty string for invalid value after compilation', () => {
            let template = compile('{{formatCurrency value}}');

            expect(template({value: faker.random.word()})).toEqual('');
        });

        it('should return USD currency value in string after compilation', () => {
            let template = compile('{{formatCurrency "1234567"}}');

            expect(template()).toEqual('&#x24;1,234,567.00');
        });

        it('should return empty value for invalid currency code only', () => {
            let template = compile('{{formatCurrency 1234567.89 code=countryCode}}');

            expect(template({countryCode: faker.address.countryCode()})).toEqual('');
        });

        it('should return USD with en locale for invalid locale only', () => {
            let template = compile('{{formatCurrency 1234567.89 en=locale}}');

            expect(template({locale: faker.random.locale()})).toEqual('&#x24;1,234,567.89');
        });

        it('should return USD with en locale for USD currency code and invalid locale', () => {
            let template = compile('{{formatCurrency 1234567.89 code="USD" en=locale}}');

            expect(template({locale: faker.random.locale()})).toEqual('&#x24;1,234,567.89');
        });

        it('should return empty value for invalid currency code and en locale', () => {
            let template = compile('{{formatCurrency 1234567.89 code=countryCode}}');

            expect(template({countryCode: faker.address.countryCode()})).toEqual('');
        });
    });
});
