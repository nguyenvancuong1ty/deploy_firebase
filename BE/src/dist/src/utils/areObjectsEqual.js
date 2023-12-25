"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areObjectsEqual = void 0;
const areObjectsEqual = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length > keys2.length) {
        for (let key of keys2) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
    }
    else if (keys1.length < keys2.length) {
        for (let key of keys1) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
    }
    else {
        for (let key of keys1) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
    }
    return true;
};
exports.areObjectsEqual = areObjectsEqual;
