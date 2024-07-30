# States

## Create A Store

In Nativous, the store gathers the states and reducers that make up your application.

First, you should import the hook for create store.

```tsx
import {
    useStore
} from "nativous";
```

### Basic

```tsx
const store = useStore();
```

### With Schema Type

```tsx
const store = useStore<{
    foo: foo
    bar: bar
}>();
```

### With Initial Values

```tsx
const store = useStore({
    foo: 3
    bar: "three"
});
```

### With Initiator

```tsx
const store = useStore({
    foo: fooInitiator
    bar: () => 3
});
```

> [!IMPORTANT]
> Because the function has already been used for the initiator, if you want to use the function as the value of the state, you need to use `() => function` as the value of the schema.

### With Reducers

```tsx
const store = useStore({
    foo: 3,
    bar: 2
}, {
    foo: (state: number, action: number) => state + action
    bar(state: number, action: number) {
        return state + action
    }
});
```

## Update A Store

### Basic

Directly set the value of the store to update it.

```tsx
store.foo = "3";
```

> [!NOTE]
> // TODO: Patch

### With Reducers

Same as basically. When setting values, Nativous will call the reducer in the background.
