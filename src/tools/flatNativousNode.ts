import {
    NativousNode,
    NativousNodeWithoutIterableAndSuspended,
    suspendedNode
} from "../core/createElement";
import checkIsIterator from "./checkIsIterator";
import checkIsSuspendedNode from "./checkIsSuspendedNode";
import flatten from "./flatten";
type flated = Array<NativousNodeWithoutIterableAndSuspended | suspendedNode>;
export default function flatNativousNode(children: NativousNode[]) {
    const childrenWithoutSuspended = children.filter(child => !checkIsSuspendedNode(child)) as Array<NativousNodeWithoutIterableAndSuspended | Iterable<NativousNode>>;
    return childrenWithoutSuspended.map(child => {
        if (checkIsIterator(child)) {
            return flatten(child) as flated;
        }
        return child;
    }).flat().concat(children.filter(child => checkIsSuspendedNode(child)));
}
