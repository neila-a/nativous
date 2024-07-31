export default function checkIsIterator(child: any): child is Iterable<any> {
    if (typeof child === "object") {
        if (child !== null) {
            if (Symbol.iterator in child) {
                return true;
            }
        }
    }
    return false;
}
