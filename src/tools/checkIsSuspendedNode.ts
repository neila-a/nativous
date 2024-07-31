import {
    NativousNode,
    suspendedNode,
    suspended
} from "../core";
export default function checkIsSuspendedNode(child: NativousNode): child is suspendedNode {
    if (Array.isArray(child)) {
        if (child.length === 2) {
            if (child[0] === suspended) {
                if (Array.isArray(child[1])) {
                    if (child[1].every(one => one[1] instanceof Promise)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
