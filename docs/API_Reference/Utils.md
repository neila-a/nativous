# Utils

## `Fragment`

```tsx
import {
    Fragment
} from "nativous";
```

`Fragment` is used to convert multiple elements into an array, like this:

```tsx
const foo = <Fragment>
    <span>foo</span>
    bar
</Fragment>;
```

## `usePromise`

`usePromise` allows you to obtain the content of a `Promise`. It needs to be used in conjunction with `Suspense`.

## `Suspense`

`Suspense` allows the display of fallback solutions before the child component completes loading, like this:

```tsx
import {
    Suspense,
    usePromise
} from "nativous";
function Loading() {
    return <p>Loading...</p>;
}
function Main() {
    const data = usePromise(fetch("foo://bar"));
    return <p>data: {data}</p>;
}
function Entry() {
    return <Suspense fallback={<Loading />}>
        <Main />
    </Suspense>;
}
```

In this example, the `<Main/>` component is suspended while retrieving data.  
After it is rendered, Nativous displays the nearest Suspense in its ancestor component as `<Loading/>` in the fallback.  
When data acquisition is complete,
Nativous will hide the `<Loading/>` component and render the `<Main/>` component with data.

> [!IMPORTANT]
> Components that are suspended outside of `Suspense` cannot be directly rendered into DOM like `Node.appendChild`, which is called 'suspension pollution'.  
> To avoid suspension pollution, please add at least one `Suspense` at the top level of the application, so as to wrap the entire application under the `Suspense`.  
> The closer the position of the `Suspense` is to the suspended position, the better,  
> because if any sub component under the `Suspense` is suspended, the `Suspense` will make all sub components under it display the fallback,  
> and making the position of the `Suspense` closer to the suspended position can reduce the area where the fallback is displayed.  
