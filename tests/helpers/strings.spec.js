
import {compile} from 'handlebars';
import strings from '../../src/helpers/strings';

describe('strings', () => {

    describe('excerpt', () => {
        it('should extract all the characters from a string if it is less than 50 characters by default', () => {
            expect(strings.excerpt('just wow')).toEqual('just wow');
        });

        it('should extract 50 characters from a string if it has more than 50 characters by default', () => {
            expect(strings.excerpt('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'))
                .toEqual('Lorem ipsum dolor sit amet, consectetur adipisicin...');
        });

        it('should extract provided number of characters from a string', () => {
            expect(strings.excerpt('Just wow', 4)).toEqual('Just...');
        });

        it('should extract all the characters from a string if the provided number of characters to be extracted is more than the number of characters', () => {
            expect(strings.excerpt('wow', 10)).toEqual('wow');
        });

        it('should return the string if the length parameter is not a number', () => {
            expect(strings.excerpt('just wow', 'random')).toEqual('just wow');
        });
    });

    describe('sanitize', () => {
        it('should return a normal string as dash case', () => {
            expect(strings.sanitize('Just    wow')).toEqual('just-wow');
        });

        it('should return a string with special characters as dash case without special characters', () => {
            expect(strings.sanitize('*JuST *#wow#')).toEqual('just-wow');
        });
    });

    describe('capitalizeFirst', () => {
        it('should capitalize the first letter of a string', () => {
            expect(strings.capitalizeFirst('just wow')).toEqual('Just wow');
        });

        it('should return the param if it is not a string', () => {
            expect(strings.capitalizeFirst(1.1)).toEqual(1.1);
        });
    });

    describe('capitalizeEach', () => {
        it('should capitalize the first letter of a string', () => {
            expect(strings.capitalizeEach('just wow')).toEqual('Just Wow');
        });

        it('should return the param if it is not a string', () => {
            expect(strings.capitalizeEach(1)).toEqual(1);
        });
    });

    describe('sprintf', () => {
        it('function should work as expected (basic support)', () => {
            expect(strings.sprintf('%(greeting)s %(name)s!', {
                hash: {
                    greeting: 'Hello',
                    name: 'Kabir'
                }
            })).toEqual('Hello Kabir!');
        });

        it('should work as expected (Basic support)', () => {
            var obj = {
                hash: {
                    greeting: 'Hello',
                    name: 'Kabir'
                }
            };

            expect(strings.sprintf('%(greeting)s %(name)s!', obj)).toEqual('Hello Kabir!');
        });

        it('should work as expected after compilation (Basic support)', () => {
            var template = compile('{{sprintf "%(greeting)s %(name)s!" greeting=greeting name=name }}');
            var obj = {
                greeting: 'Hello',
                name: 'Kabir'
            };

            expect(template(obj)).toEqual('Hello Kabir!');
        });

        it('should work as expected after compilation (C-style sprintf)', () => {
            var template = compile('{{sprintf "%s %s!" "Hello" "Kabir" }}');

            expect(template()).toEqual('Hello Kabir!');
        });

        it('should work as expected after compilation (C-style sprintf) with arbitrary number of parameters', () => {
            var template = compile('{{sprintf "This is a test: %s %s %d %s %d" "Foo" "Bar" 55 "Baz" "20"}}');

            expect(template()).toEqual('This is a test: Foo Bar 55 Baz 20');
        });

        it('should work as expected after compilation if an object is passed dynamically', () => {
            var template = compile('{{sprintf "%(greeting)s %(name)s! How are you?" obj }}');
            var obj = {
                greeting: 'Hello',
                name: 'Kabir'
            };

            expect(template({
                obj
            })).toEqual('Hello Kabir! How are you?');
        });
    });

    /* lowercase */
    it('lowercase should return lowercase value of a string param', () => {
        expect(strings.lowercase('Hello World!')).toEqual('hello world!');
    });

    it('lowercase should return number for interger param', () => {
        expect(strings.lowercase('1234')).toEqual('1234');
    });

    it('lowercase should should work as expected after compilation (Basic Support)', () => {
        var template = Handlebars.compile('{{lowercase val}}');
        var obj = {
            val: 'JUST WOW!!!'
        };

        expect(template(obj)).toEqual('just wow!!!');
    });

    /* uppercase */
    it('uppercase should return uppercase value of a string param', () => {
        expect(strings.uppercase('hello world!')).toEqual('HELLO WORLD!');
    });

    it('uppercase should return number for interger param', () => {
        expect(strings.uppercase('1234')).toEqual('1234');
    });

    it('uppercase should work as expected after compilation (Basic Support)', () => {
        var template = Handlebars.compile('{{uppercase val}}');
        var obj = {
            val: 'just wow!!!'
        };

        expect(template(obj)).toEqual('JUST WOW!!!');
    });

    /* first */
    it('first should return first element of an array(string)', () => {
        expect(strings.first(['David', 'Miller', 'Jones'])).toEqual('David');
    });

    it('first should return first element of an array(int)', () => {
        expect(strings.first([4, 5, 6])).toEqual(4);
    });

    it('first should work as expected after compilation (Basic Supprt)', () => {
        var template = Handlebars.compile('{{first fullName}}');
        var obj = {
            fullName: [
                'David',
                'Miller',
                'Jones'
            ]
        };

        expect(template(obj)).toEqual('David');
    });

    /* last */
    it('last should return last element of an array(string)', () => {
        expect(strings.last(['David', 'Miller', 'Jones'])).toEqual('Jones');
    });

    it('last should return last element of an array(int)', () => {
        expect(strings.last([4, 5, 6])).toEqual(6);
    });

    it('last should work as expected after compilation (Basic Supprt)', () => {
        var template = Handlebars.compile('{{last fullName}}');
        var obj = {
            fullName: [
                'David',
                'Miller',
                'Jones'
            ]
        };

        expect(template(obj)).toEqual('Jones');
    });

    /* concat */
    it('concat should return the param value if only one parameter(string) is provided', () => {
        expect(strings.concat('hello')).toEqual('hello');
    });

    it('concat should return the param value if only one parameter(integer) is provided', () => {
        expect(strings.concat(5)).toEqual('5');
    });

    it('concat should return concatenation of all param values(string)', () => {
        expect(strings.concat('hello', ' ', 'world', '!!!')).toEqual('hello world!!!');
    });

    it('concat should return concatenation of all param values(string and integer)', () => {
        expect(strings.concat('I have got', ' ', 4, ' ', 'apples.')).toEqual('I have got 4 apples.');
    });

    it('concat should return concatenation of all param values(integer)', () => {
        expect(strings.concat(1, 2, 3, 4)).toEqual('1234');
    });

    it('concat should return empty string if no params provided', () => {
        expect(strings.concat()).toEqual('');
    });

    it('concat should return concatenation of boolean value if boolean params provided', () => {
        expect(strings.concat(true, false, true, false)).toEqual('truefalsetruefalse');
    });

    it('concat should return concatenation of boolean value if null params provided', () => {
        expect(strings.concat(null, 'abc')).toEqual('nullabc');
    });

    /* join */
    it('join should join the values of array using the delimeter provided', () => {
        expect(strings.join(['Hands', 'legs', 'feet'], ' & ')).toEqual('Hands & legs & feet');
    });

    it('join should return the first value of array if size of the array is equals to 1', () => {
        expect(strings.join(['Hands'], ' & ')).toEqual('Hands');
    });

    it('join should return empty string if size of array is zero', () => {
        expect(strings.join([], ' & ')).toEqual('');
    });

    it('join should return empty string if first parameter is null', () => {
        expect(strings.join(null, ' & ')).toEqual('');
    });

    it('join should return empty string if both the array and delimeter is null', () => {
        expect(strings.join(null, null)).toEqual('');
    });

    it('join should return concatenation of elements of array using null if the delimeter is null', () => {
        expect(strings.join(['Hands', 'legs', 'feet'], null)).toEqual('Handsnulllegsnullfeet');
    });

    it('join should return concatenation of elements of array using false if the delimeter is false', () => {
        expect(strings.join(['Hands', 'legs', 'feet'], false)).toEqual('Handsfalselegsfalsefeet');
    });
});
