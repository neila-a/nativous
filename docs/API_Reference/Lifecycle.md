# Lifecycle

## `useOnMount`

The `useOnMount` hook returns a `Promise` that is fulfilled when the component is first rendered.

```tsx
import {
    useOnMount
} from "nativous";
function Foo() {
    const onMountPromise = useOnMount();
    onMountPromise.then(() => {
        console.log("Foo  is first rendered! ");
    });
    return <p>Foo</p>;
}
```

## `useOnUnMount`

The `useOnUnmount` hook returns a Promise that is fulfilled when the component is about to be unmounted.

```tsx
import {
    useOnUnount
} from "nativous";
function Foo() {
    const onUnmountPromise = useOnUnmount();
    onUnmountPromise.then(() => {
        console.log("Foo is about to be unmounted! ");
    });
    return <p>Foo</p>;
}
```
