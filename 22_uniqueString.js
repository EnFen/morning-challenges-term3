/*
Find the unique string in an array, which should all contain letters.

Example:
uniqueString(["alright", "isod", "Alright", "ALRIGHT"]) => "isod"

Test your solution:
mocha 22_uniqueString.js
*/

function uniqueString(array) {

    // let objectCount = {}
    // for (string of array) {
    //     let uniq_string = [...new Set(string.toLowerCase())].sort().join('')
    //     if (objectCount[uniq_string] === undefined) objectCount[uniq_string] = []
    //     objectCount[uniq_string].push(string)
    // }

    // for (key in objectCount) {
    //     if (objectCount[key].length === 1) return objectCount[key][0]
    // }



    // Setup - reduce the passed string to its unique lowercase characters, sorted
    const redString = (string) => [...new Set(string.toLowerCase())].sort().join('')

    // Find the unique string
    if (redString(array[0]) === redString(array[1])) {
        return array.filter(item => redString(item) !== redString(array[0]))[0]
    } else if (redString(array[1]) === redString(array[2])) {
        return array[0]
    } else {
        return array[1]
    }
}


const assert = require('assert')

describe('Unique string challenge', function () {
    it('Should return the unique string', function () {
        assert.deepEqual(uniqueString(['aa', 'AaA', 'aaaa', 'bBbB', 'aAaA', 'a']), 'bBbB')
        assert.deepEqual(uniqueString(['kios', 'ikos', 'foo', 'ikso', 'kois', 'kiso']), 'foo')
        assert.deepEqual(uniqueString(['abc', ' ', '  ']), 'abc')
    })
})