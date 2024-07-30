import {
    elementTypes
} from "../symbols";
import flatNativousNode, {
    checkIsSuspendedNode
} from "../tools/flatNativousNode";
import procNode from "../tools/procNode";
import {
    Fragment,
    Suspense
} from "../utils";
type IfEquals<X, Y, A = X, B = never> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;
type WritableKeys<T> = {
    [P in keyof T]-?: IfEquals<{
        [Q in P]: T[P]
    }, {
            -readonly [Q in P]: T[P]
        }, P>
}[keyof T];
type htmltags = keyof HTMLElementTagNameMap;
type svgtags = keyof SVGElementTagNameMap;
export type suspendedNode = [typeof suspended, [usePromiseID: number, Promise<any>][]];
export type NativousNode = Node
    | string
    | number
    | Iterable<NativousNode>
    // | ReactPortal
    | boolean
    | null
    | suspendedNode
    | undefined;
export type NativousNodeWithoutIterableAndSuspended = Exclude<NativousNode, Iterable<NativousNode> | suspendedNode> | string;
export const suspended = Symbol("suspended mark");
export const enum renderStage {
    initial,
    Suspense,
    states
}
export let nowRenderCount: [renderStage, number] = [renderStage.initial, 0],
    globalUsePromiseCount = 0;
export const addGlobalUsePromiseCount = () => globalUsePromiseCount++,
    promiseResults: Record<
        number, // promise id
        any // result
    > = {
    };
export type Component = (() => NativousNode) | ((props: object) => NativousNode);

// Nativous overloads

/**
 * Create a Nativous element that have props.
 */
function createElement<component extends (props: object) => NativousNode>(
    component: component,
    props: Omit<Parameters<component>[0], "children">,
    ...children: Parameters<component>[0] extends [children: infer children] ? children extends unknown[] ? children : [] : []
): ReturnType<component>;

/**
 * Create a Nativous element that haven't props.
 */
function createElement<component extends () => NativousNode>(
    component: component
): ReturnType<component>;

// DOM overloads

/**
 * Create a native HTML element.
 */
function createElement<K extends htmltags>(
    tagName: K,
    props: Partial<WritableKeys<HTMLElementTagNameMap[K]>> | null,
    ...children: NativousNode[]
): HTMLElementTagNameMap[K];

/**
 * Create a native SVG element.
 */
function createElement<K extends svgtags>(
    tagName: K,
    props: Partial<WritableKeys<SVGElementTagNameMap[K]>> | null,
    ...children: NativousNode[]
): SVGElementTagNameMap[K];

// Web component overloads

/**
 * Create a web component that extends native HTML element.
 */
function createElement<componentProps extends {
    is: htmltags;
} = {
    is: "object"
}>(tagName: string, props: componentProps & {
    is: htmltags;
}, ...children: NativousNode[]): HTMLElementTagNameMap[componentProps extends {
    is: infer realIs
} ? realIs : ""];

/**
 * Create a web component that doesn't extend native HTML element.
 */
function createElement<componentProps extends object = {}>(tagName: string, props: componentProps | null, ...children: NativousNode[]): HTMLElement;

/**
 * Suspense util.
 * @param props.fallback fallback of the Suspense.
 * @param children content of the Suspense.
 */
function createElement<props extends {
    fallback: NativousNode
}, children extends NativousNode[]>(component: typeof Suspense, props: props, children: children): children | props["fallback"];

function createElement(
    component: string | Component | typeof Suspense,
    props: object | Partial<{}> | null = {},
    ...children: NativousNode[]
) {
    function getElement() {
        if (typeof component === "string") {
            if (props !== null) {
                if ("is" in props) {
                    if (typeof props.is === "string") {
                        // Web component that extends native dom node
                        return document.createElement(component, {
                            is: props.is as string
                        });
                    }
                }
            }
            // Pure web component
            return document.createElement(component);
        }
        return undefined as unknown as HTMLElement;
    }

    const flatChildren = flatNativousNode(children),
        suspendedChildren = flatChildren.filter(child => checkIsSuspendedNode(child)),
        childrenWithoutSuspended = flatChildren.filter(child => !checkIsSuspendedNode(child)) as NativousNodeWithoutIterableAndSuspended[],
        childrenPromises = suspendedChildren.map(child => child[1]).flat();

    switch (typeof component) {

        // dom
        case "string":
            let element = getElement();

            // @ts-ignore
            element[elementTypes.type] = elementTypes.dom;
            element.append(...childrenWithoutSuspended.map(procNode));

            for (const prop in props) {
                type prop = keyof typeof props;
                const value = props[prop as prop] as any;

                if (prop.includes("$")) {
                    // Event handler
                    const isFunc = typeof value === "function",
                        haveSignal = Array.isArray(value)
                            && typeof value[0] === "function"
                            && value[1] instanceof AbortSignal,
                        splited = prop.split("$"),
                        type = splited[splited.length - 1];

                    let options: AddEventListenerOptions = {};
                    if (splited.length === 2) {
                        type originOptions = Array<Exclude<
                            keyof AddEventListenerOptions,
                            "signal"
                        >>;
                        const originOptions = splited[0].split("") as originOptions;
                        originOptions.forEach(option => (options = {
                            ...options,
                            [option]: true
                        }));
                    }

                    if (isFunc) {
                        element.addEventListener(type, value, options);
                    } else if (haveSignal) {
                        element.addEventListener(type, value[0], {
                            ...options,
                            signal: value[1]
                        })
                    }
                } else {
                    // @ts-ignore
                    element[prop] = value;
                }
            }
            return element;

        // Nativous element
        case "function":
            try {
                return component({
                    ...props,
                    children
                });
            } catch (error_or_promise) {
                if (Array.isArray(error_or_promise)) {
                    if (error_or_promise.length === 2) {
                        if (error_or_promise[1] instanceof Promise) {
                            if (typeof error_or_promise[0] === "number") {
                                return [suspended, childrenPromises.concat(error_or_promise)] as suspendedNode;
                            }
                        }
                    }
                }
            }

        // a Suspense
        case "symbol":
            inner: switch (component) {
                case Suspense:
                    Promise.all(childrenPromises.map(async child => [child[0], await child[1]] as [id: number, any]))
                        .then(infos => infos.map(info => (promiseResults[info[0]] = info[1])));
                    if (childrenPromises.length === 0) {
                        // @ts-ignore
                        return createElement(Fragment, children);
                    }
                    if (props !== null) {
                        if ("fallback" in props) {
                            return props.fallback;
                        }
                    }
                    break inner;
            }
            return new DocumentFragment();
    }
}

export {
    createElement
};
