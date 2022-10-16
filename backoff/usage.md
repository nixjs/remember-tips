## ConstantBackoff

The `ConstantBackoff` will make the websocket wait a constant time between each connection retry. To use the `ConstantBackoff`
with a wait-time of `1 second`:

```typescript
const backoff  = new ConstantBackoff(1000)
// const time = backOff.next()
//     if (time === 1000) {
//         backOff.reset()
//     }
```

## LinearBackoff

The `LinearBackoff` linearly increases the wait-time between connection-retries until an optional maximum is reached.
To use the `LinearBackoff` to initially wait `0 seconds` and increase the wait-time by `1 second` with every retry until
a maximum of `8 seconds` is reached:

```typescript
const backoff  = new LinearBackoff(0, 1000, 8000)
```

## ExponentialBackoff

The `ExponentialBackoff` doubles the backoff with every retry until a maximum is reached. This is modelled after the binary
exponential-backoff algorithm used in computer-networking. To use the `ExponentialBackoff` that will produce the series
`[100, 200, 400, 800, 1600, 3200, 6400]`:

```typescript
const backoff  = new ExponentialBackoff(100, 7)
```

