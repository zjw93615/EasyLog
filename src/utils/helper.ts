function deepObjectMerge<T>(a: T, b: T) { // 深度合并对象
    for (var key in b) {
        a[key] = a[key] && a[key]!.toString() === '[object Object]'
            ? deepObjectMerge(a[key], b[key]) : a[key] = b[key]
    }
    return a
}