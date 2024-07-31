import checkIsIterator from "./checkIsIterator";

/**
 * Flatten an array indefinitely.
 */
export default function flatten<T>(array: Iterable<T>) {
    let result: T[] = [];
    $flatten(array, result);
    return result;
}

/**
 * Internal flatten function recursively passes `result`.
 */
function $flatten<T>(array: Iterable<T>, result: T[]) {
    const arr = Array.from(array);
    arr.forEach(value => {
        if (typeof value === "string") {
            result.push(value);
        } else if (checkIsIterator(value)) {
            $flatten(value, result);
        } else {
            result.push(value);
        }
    });
}
