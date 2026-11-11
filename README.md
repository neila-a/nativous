# Nativous

> [!IMPORTANT]  
> https://github.com/alex-kinokon/jsx-dom is a better alternative to this library.

Nativous is the library for rendering JSX directly to the DOM.

The name *Nativous* is a combination of [*Native*](https://www.etymonline.com/word/native) and [*-ous*](https://www.etymonline.com/word/-ous), and it is pronounced /naˈti.vous/.

## Installation

```bash
npm install nativous
```

## Examples

```tsx
function Hello({
    name
}) {
    return <p>Hello, {name}!</p>
}
document.body.appendChild(<Hello name="Taylor" />);
```

This example will render "Hello, Taylor!" into body of the page.

## [API Reference](./wiki)