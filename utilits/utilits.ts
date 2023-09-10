export function convertTimeToSec(data: number): number {
  const now = Date.now()
  const timeDiff = now - data
  const seconds = Math.floor(timeDiff / 1000)

  return seconds
}
