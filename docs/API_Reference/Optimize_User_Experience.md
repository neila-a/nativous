# Optimize User Experience

## `useOptimistic`

`useOptimistic` allows you to provide users with an optimistic estimate during data loading, 
which will be replaced with the true value after loading is complete, like this:

```tsx
import {
    useStore,
    useOptimistic
} from "nativous";
function Foo() {
    const store = useStore({
        bar: 3
    }),
        [optimisticBar, setOptimisticBar] = useOptimistic(s => s.bar, store);
    return <p $click={async event => {
        setOptimisticBar("the optimistic estimate of data");
        store.bar = await fetch("foo://bar");
    }}>data: {optimisticBar}</p>;
}
```

In this example, when clicking `<p>`, `optimisticBar` is immediately updated to `the optimistic estimate of data`,
and then when the fetch is loaded, `optimisticBar` is updated to the actual data.

## `useTransition`

Transition allows you to update data in the store without blocking the UI.  
`useTransition` returns a tuple containing two elements,  
where the first element is a Boolean value representing whether there is a transition;  
And the second element is a function, which requires inputting a callback function containing the value to set the store.  
All operations to set the store in this callback function will be marked as transition.  

```tsx
import {
    useTransition,
    useStore
} from "nativous";
function Foo() {
    const [isPending, startTransition] = useTransition(),
        store = useStore({
            foo: 0,
            negativeFoo: 0
        });
    return <p $click={event => {
        startTransition(() => {
            while (true) {}
            store.foo = store.foo + 1;
        });
        store.negativeFoo = store.negativeFoo - 1;
    }}>Click count: {store.foo}, loading: {isPending}, negative: {store.negativeFoo}</p>;
}
```

In this example, when clicking `<p>`, `negativeFoo` first changes to `-1`, and then the page freezes due to the `while (true)` in the transition.
If the update of `foo` is more important than `negativeFoo`,
it ensures that important data will be updated in a timely manner, without being affected by the loading of other unimportant data for too long.

## Memoization

Updating the values in the store will trigger the component's re rendering, but many expensive calculations that do not change with the store will also be recalculated accordingly.To avoid unnecessary performance waste, Nativous provides a set of tools on memoization to prevent recalculation.

> [!NOTE]
> Asynchronous functions will cache the result of their redemption.

### `useMemo`

This hook can be used to cache values that do not need to be recalculated, like this:

```tsx
import {
    useMemo
} from "nativous";
function Foo() {
    const cached = useMemo(() => fetch("foo://bar"));
}
```

### `memoComponent`

`memoComponent` allows your component to skip re rendering without changing props.

```tsx
import {
    memoComponent
} from "nativous";
async function Foo() {
    const cached = await fetch("foo://bar");
    return <p>{cached}</p>;
}
const CachedFoo = memoComponent(Foo);
const bar = <CachedFoo />;
```
