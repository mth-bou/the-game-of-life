"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseToRLE = exports.parseFromRLE = void 0;
// This function parses a RLE string and returns a 2D array of booleans
// RLE format: https://www.conwaylife.com/wiki/Run_Length_Encoded
var parseFromRLE = function (rleString, width, height) {
    var grid = Array.from({ length: height }, function () { return Array(width).fill(false); });
    var x = 0, y = 0;
    var i = 0;
    while (i < rleString.length) {
        var count = 0;
        while (i < rleString.length && !isNaN(Number(rleString[i]))) {
            count = count * 10 + Number(rleString[i]);
            i++;
        }
        count = count || 1;
        if (rleString[i] === 'b' || rleString[i] === 'o') {
            for (var n = 0; n < count; n++) {
                if (x >= width) {
                    x = 0;
                    y++;
                }
                if (y >= height)
                    break;
                grid[y][x] = rleString[i] === 'o';
                x++;
            }
        }
        else if (rleString[i] === '$') {
            y += count;
            x = 0;
        }
        i++;
    }
    return grid;
};
exports.parseFromRLE = parseFromRLE;
var parseToRLE = function (grid) {
    var rleString = '';
    var count = 0;
    var previousCell = grid[0][0];
    // Parcourir chaque ligne du tableau
    grid.forEach(function (row, rowIndex) {
        row.forEach(function (cell, colIndex) {
            if (cell === previousCell) {
                count++;
            }
            else {
                rleString += "".concat(count > 1 ? count : '').concat(previousCell ? 'o' : 'b');
                count = 1;
                previousCell = cell;
            }
            // Fin de ligne ou changement de ligne
            if (colIndex === row.length - 1) {
                rleString += "".concat(count > 1 ? count : '').concat(previousCell ? 'o' : 'b');
                if (rowIndex < grid.length - 1)
                    rleString += '$';
                count = 0;
                previousCell = rowIndex < grid.length - 1 ? grid[rowIndex + 1][0] : cell;
            }
        });
    });
    // Ajouter la fin de la chaîne RLE
    if (count > 0) {
        rleString += "".concat(count > 1 ? count : '').concat(previousCell ? 'o' : 'b');
    }
    return {
        rleString: rleString,
        width: grid[0].length,
        height: grid.length
    };
};
exports.parseToRLE = parseToRLE;
/*const P384 = parseFromRLE("15b2o$15b2o3$14bo$4b2o8bo$2bob2o8bo$bo$4bo31b2o$2obo16bo13bob2o$2o18b\n" +
    "2o11bo$22bo13bo$13bo6b2o10b2obo$11b2o7bo11b2o$11bo$11b3o2$21b2o$21b2o!", 38, 19);

console.log(P384);*/
var gosperGliderGun = (0, exports.parseFromRLE)('24bo11b$22bobo11b$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14b$2o8bo3bob2o4bobo11b$10bo5bo7bo11b$11bo3bo20b$12b2o!', 36, 9);
console.log(gosperGliderGun);
