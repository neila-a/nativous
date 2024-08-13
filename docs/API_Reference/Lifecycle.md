# Lifecycle

Use `addLifecycleEvent` to add lifecycle hooks.

## Mount Event

The mount event is triggered when the component is **first** rendered.

```tsx
function Foo() {
    addLifecycleEvent("mount", () => {
        // ...
    });
}
```

## Unmount Event

The Unmount event is triggered when a component is about to be unmounted.

```tsx
function Foo() {
    addLifecycleEvent("unmount", () => {
        // ...
    });
}
```
