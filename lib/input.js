"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInput = void 0;
var userInput = function (body, el, keys) {
    if (keys === void 0) { keys = { left: "ArrowLeft", up: "ArrowUp", right: "ArrowRight", down: "ArrowDown", action: "Space" }; }
    el.addEventListener("keydown", function (e) {
        if (e.code === keys.left) {
            body.left = true;
        }
        if (e.code === keys.up) {
            body.up = true;
        }
        if (e.code === keys.right) {
            body.right = true;
        }
        if (e.code === keys.down) {
            body.down = true;
        }
        if (e.code === keys.action) {
            body.action = true;
        }
    });
    el.addEventListener("keyup", function (e) {
        if (e.code === keys.left) {
            body.left = false;
        }
        if (e.code === keys.up) {
            body.up = false;
        }
        if (e.code === keys.right) {
            body.right = false;
        }
        if (e.code === keys.down) {
            body.down = false;
        }
        if (e.code === keys.action) {
            body.action = false;
        }
    });
};
exports.userInput = userInput;
