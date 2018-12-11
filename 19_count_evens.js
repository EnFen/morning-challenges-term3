/*

Working individually or in pairs write out differnt tests which will
count the number of even numbers in an array. 

Try to have at least three different tests which test differnt values
put into your method, such as an empty array.

Once you have done done this, write out the method and check if it passes. 

Example: countEvens = ([1,2,3,4]) => 2

Hint:
If you're having trouble writing tests, look up some of the previous challenges or try
Google - mocha tests to get an idea.

*/

const countEvens = (arr) => {
    let count = 0
    arr.forEach(num => {
        if (num == NaN || num == null) {
            return
        } else if (num % 2 == 0) {
            count++
        }
    });
    return count
}

// Your tests here
const assert = require('assert');

describe('countEvens', function () {
    context('When passed an empty array', function () {
        it('Should return 0', function () {
            assert.equal(countEvens([]), 0)
        })
    })
    context('When passed an array of numbers', function () {
        it('Should return the count of even numbers', function () {
            assert.equal(countEvens([1, 2, 3, 4]), 2)
        })
    })
    context('When passed an array which includes NaN values', function () {
        it('Should ignore NaN in count', function () {
            assert.equal(countEvens([1, 'two', 3, 4]), 1)
        })
    })
    context('When passed an array which includes null values', function () {
        it('Should ignore null in count', function () {
            assert.equal(countEvens([1, 2, null, 4]), 2)
        })
    })
})