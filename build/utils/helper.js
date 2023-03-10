"use strict";
function deepObjectMerge(a, b) {
    for (var key in b) {
        a[key] = a[key] && a[key].toString() === '[object Object]'
            ? deepObjectMerge(a[key], b[key]) : a[key] = b[key];
    }
    return a;
}
