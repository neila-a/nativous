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
    for (let i = 0; i < arr.length; i++) {
        let value = arr[i];
        if (typeof value === "string") {
            result.push(value);
        } else if (value !== null) {
            if (typeof value === "object") {
                if (Symbol.iterator in value) {
                    if (typeof value[Symbol.iterator] === "function") {
                        $flatten(value as Iterable<T>, result);
                    }
                }
            }
        } else {
            result.push(value);
        }
    }
}