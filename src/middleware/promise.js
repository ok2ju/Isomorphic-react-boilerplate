export default function promiseMiddleware() {
  return next => (action) => {
    const { promise, ...rest } = action;

    if (!promise) return next(action);

    next({ ...rest, readyState: 'request' });
    return promise.then(
      result => next({ ...rest, result, readyState: 'success' }),
      error => next({ ...rest, error, readyState: 'failure' })
    );
  };
}
