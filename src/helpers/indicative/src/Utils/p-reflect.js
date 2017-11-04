export default function(promise) {
  return Promise.resolve(promise).then(
    value => ({
      isFulfilled: true,
      isRejected: false,
      value
    }),
    reason => ({
      isFulfilled: false,
      isRejected: true,
      reason
    })
  )
}