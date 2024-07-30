# Event Listeners

## Basic Example

```tsx
<button $click={event => {
    doSomething();
}}>
    Click here!
</button>
```

## Capture Example

```tsx
<button capture$click={event => {
    doSomething();
}}>
    Click here!
</button>
```

## Other

Other [options](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener#parameters) like `passive`, `once` are like `capture`, use `...$event` to declare.

## Combination

```tsx
<button capture_once$click={event => {
    doSomething();
}}>
    Click here once!
</button>
```

The order has no impact.

## Singal Example

```tsx
const signal = new AbortSignal();

<button $click={[event => {
    doSomething();
}, signal]}>
    Click here!
</button>
```
