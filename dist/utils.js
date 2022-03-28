"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
exports.utils = {
    round(number, precision) {
        let factor = 10 ** precision;
        return Math.round(number * factor) / factor;
    },
    randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
};
