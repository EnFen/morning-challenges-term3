// Good morning ladies and gents, do we have a treat for you today.
// For our bonus round morning challenge, I present to you, Conway's Game of Life!
// The rules are simple. You are presented with 2d array, containing 1's and 0's.
// 1's represent live cells, 0's represent dead cells.
// Your task is to find what the next generation of the 2d array looks like based on the following rules:
//     If a living cell has fewer than 2 neighbours, it dies.
//     If a living cell has 2 or 3 neighbours, it continues to live.
//     If a living cell has greater than 3 neighbours, it dies.
//     If a dead cell has exactly 3 neighbours, it comes to life.
// Good luck and have fun!

// input celllocation as row/col, game as matrix; function returns count of neighbours
function checkNeighbours(row, col, game) {
    let count = 0

    const up = game[row - 1]
    const down = game[row + 1]
    const left = game[row][col - 1]
    const right = game[row][col + 1]

    if (up !== undefined) {
        var top = game[row - 1][col]
        var topLeft = game[row - 1][col - 1]
        var topRight = game[row - 1][col + 1]
    }

    if (down !== undefined) {
        var bot = game[row + 1][col]
        var botLeft = game[row + 1][col - 1]
        var botRight = game[row + 1][col + 1]
    }

    // check conditions
    if (left === undefined && up === undefined) {
        count += (right + botRight + bot)
    } else if (left === undefined && bot === undefined) {
        count += (top + topRight + right)
    } else if (right === undefined && up === undefined) {
        count += (left + botLeft + bot)
    } else if (right === undefined && bot === undefined) {
        count += (top + topLeft + left)
    } else if (up === undefined) {
        count += (left + botLeft + bot + botRight + right)
    } else if (bot === undefined) {
        count += (left + topLeft + top + topRight + right)
    } else if (left === undefined) {
        count += (top + topRight + right + botRight + bot)
    } else if (right === undefined) {
        count += (top + topLeft + left + botLeft + bot)
    } else {
        count += (topLeft + top + topRight + right + botRight + bot + botLeft + left)
    }

    return count
}

function conwaysGameOfLife(game) {

    const gameRows = game.length
    const gameCols = game[0].length
    let nextGen = []

    for (let row = 0; row < gameRows; row++) {
        nextGen.push([])
        for (let col = 0; col < gameCols; col++) {
            let cell = game[row][col]
            let neighbours = checkNeighbours(row, col, game)

            if (cell === 1 && (neighbours < 2 || neighbours > 3)) {
                nextGen[row][col] = 0
            } else if (cell === 1 && (neighbours === 2 || neighbours === 3)) {
                nextGen[row][col] = 1
            } else if (cell === 0 && neighbours === 3) {
                nextGen[row][col] = 1
            } else {
                nextGen[row][col] = 0
            }
        }
    }
    return nextGen

}

function* nthGen(game) {
    while (true) {
        yield conwaysGameOfLife(game)
        game = conwaysGameOfLife(game)
    }
}

let assert = require('assert')

describe("Conway's Game Of Life", function () {
    context("Testing One Generation", function () {
        it("Should correctly return the next generation of the game", function () {
            let game = [
                [0, 0, 0, 0, 0],
                [0, 0, 1, 1, 0],
                [0, 1, 1, 0, 0],
                [0, 0, 1, 0, 1],
                [0, 0, 1, 0, 0]
            ]
            assert.deepEqual(conwaysGameOfLife(game), [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0],
                [0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 1, 0]
            ])
        })
    })
    context("BEAST MODE!!!! Testing n generations", function () {
        let game = [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 1, 0, 1],
            [0, 0, 1, 0, 0]
        ]
        let answers = [
            [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0],
                [0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 1, 0]
            ],
            [
                [0, 0, 1, 0, 0],
                [0, 1, 1, 0, 0],
                [0, 1, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            [
                [0, 1, 1, 0, 0],
                [0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            [
                [0, 1, 1, 0, 0],
                [1, 1, 0, 1, 0],
                [0, 1, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            [
                [1, 1, 1, 0, 0],
                [1, 0, 0, 1, 0],
                [1, 1, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0]
            ]

        ]
        let generatorObject = nthGen(game)
        for (let gen = 0; gen < 5; gen++) {
            it("Should correctly return the next generation of the game", function () {
                assert.deepEqual(generatorObject.next().value, answers[gen])
            })
        }
    })
})