"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRLE = void 0;
// This function parses a RLE string and returns a 2D array of booleans
// RLE format: https://www.conwaylife.com/wiki/Run_Length_Encoded
var parseRLE = function (rleString, width, height) {
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
exports.parseRLE = parseRLE;
var P384 = (0, exports.parseRLE)("15b2o$15b2o3$14bo$4b2o8bo$2bob2o8bo$bo$4bo31b2o$2obo16bo13bob2o$2o18b\n" +
    "2o11bo$22bo13bo$13bo6b2o10b2obo$11b2o7bo11b2o$11bo$11b3o2$21b2o$21b2o!", 38, 19);
console.log(P384);
