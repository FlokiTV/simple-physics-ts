"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
exports.utils = {
    round: function (number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    },
    randInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
};
