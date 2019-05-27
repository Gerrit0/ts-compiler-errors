export function debounce<A extends any[]> (fn: (...args: A) => void, time: number) {
  let timeout: number | undefined
  return function (...args: A): void {
    let passed: A = args
    function later () {
      timeout = undefined
      fn(...passed)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, time) as any
  }
}
