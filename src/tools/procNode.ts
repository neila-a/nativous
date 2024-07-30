import {
    NativousNodeWithoutIterableAndSuspended
} from "../core/createElement";
export default function procNode(node: NativousNodeWithoutIterableAndSuspended) {
    if (node instanceof Node) {
    } else if (typeof node === "string") {
        node = new Text(node);
    } else if (typeof node === "number") {
        node = new Text(node.toString(10));
    } else if (node === undefined || node === null) {
        node = new DocumentFragment();
    } else if (typeof node === "boolean") {
        node = new Text(node === true ? "true" : "false");
    }
    return node;
}
