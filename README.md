# babel-loader-react-export test

Demonstration of a possible bug with babel-loader 6.1 when using a custom webpack plugin. It's a comparison of two methods to define a React component:

Using ES2015 exports:

```javascript
export default class Index extends React.Component { ... }
```

Using `module`:

```javascript
class Index extends React.Component { ... }
module.exports = Index
```

When using a custom webpack plugin, the first method causes an error inside React:

```
Uncaught Error: Invariant Violation:
Element type is invalid: expected a string (for built-in components)
or a class/function (for composite components) but got: object.
```

The first method yields a React component like the one below, where the `type` is wrapped inside an extraneous object with a `default` property:

```javascript
{ '$$typeof': Symbol(react.element),
  type:
   Object {
     default: { [Function: Index] propTypes: [Object], defaultProps: [Object] } },
  key: null,
  ref: null,
  props: {},
  _owner: null,
  _store: {} }
```

... and the following warning:

```
Warning: React.createElement:
type should not be null, undefined, boolean, or number.
It should be a string (for DOM elements) or a ReactClass (for composite components).
```

The issue only arises inside the custom plugin (StaticReactSource.js:59), as demonstrated by the following tests.

Install:

```
npm install
```

Build default configuration:

```
npm run webpack-default
```

Creates two bundles, one based on a React component that uses `modules.exports` and one that uses `export default`.

Build plugin configuration:

```
npm run webpack-plugin
```

Creates two bundles with additional HTML chunks, one based on a React component that uses `modules.exports` and one that uses `export default`. **The build fails for the second bundle.**

Run tests:

```
npm test
```
