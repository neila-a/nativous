import {
    NativousNode,
    NativousNodeWithoutIterableAndSuspended,
    suspended,
    suspendedNode
} from "../core/createElement";
import flatten from "./Iterable2Array";
type flated = Array<NativousNodeWithoutIterableAndSuspended | suspendedNode>;
function checkIsIterator(child: NativousNode): child is Iterable<NativousNode> {
    if (typeof child === "object") {
        if (child !== null) {
            if (Symbol.iterator in child) {
                return true;
            }
        }
    }
    return false;
}
export function checkIsSuspendedNode(child: NativousNode): child is suspendedNode {
    if (Array.isArray(child)) {
        if (child.length === 2) {
            if (child[0] === suspended) {
                if (Array.isArray(child[1])) {
                    if (child[1].every(one => one instanceof Promise)) {
                        return true;
                    }
            }
            }
        }
    }
    return false;
}
export default function flatNativousNode(children: NativousNode[]) {
    const childrenWithoutSuspended = children.filter(child => !checkIsSuspendedNode(child)) as Array<NativousNodeWithoutIterableAndSuspended | Iterable<NativousNode>>;
    return childrenWithoutSuspended.map(child => {
        if (checkIsIterator(child)) {
            return flatten(child) as flated;
        }
        return child;
    }).flat().concat(children.filter(child => checkIsSuspendedNode(child)));
}
