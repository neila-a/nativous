import flatNativousNode from "../tools/flatNativousNode";
import checkIsSuspendedNode from "../tools/checkIsSuspendedNode";
import {
    NativousNode,
    suspended,
    suspendedNode
} from "../core/createElement";

/**
 * Convert multiple elements into an DocumentFragment.
 */
export function Fragment(props: {
    children: NativousNode[];
}) {
    const fragment = new DocumentFragment();
    if (props.children.every(node => !checkIsSuspendedNode(node))) {
        // @ts-ignore
        fragment.append(...flatNativousNode(props.children));
    } else {
        return [suspended, props.children.filter(node => checkIsSuspendedNode(node)).map(node => node[1]).flat()] as suspendedNode;
    }
    return fragment;
}
