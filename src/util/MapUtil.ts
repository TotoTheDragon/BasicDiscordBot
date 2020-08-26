interface Map<K, V> {
    mapKeys<U>(callbackfn: (value: V, key: K, map: Map<K, V>) => U): Map<U, V>;
    mapValues<U>(callbackfn: (value: V, key: K, map: Map<K, V>) => U): Map<K, U>;
    merge(map: Map<K, V>): Map<K, V>;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
    readonly size: number;
}

Map.prototype.mapKeys = function (callbackfn: (value, key, map) => any) {
    return new Map(Array.from(this).map(([key, value]) => [callbackfn(value, key, this), value]));
}

Map.prototype.mapValues = function (callbackfn: (key, value, map) => any) {
    return new Map(Array.from(this).map(([key, value]) => [key, callbackfn(value, key, this)]));
}

Map.prototype.merge = function (map) {
    return new Map([...this, ...map]);
}