// rxjs is exposed by
// <https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.4.0/rxjs.umd.min.js>

import { BehaviorSubject, interval, map, merge } from "rxjs"

export interface Tweet {
  account: string
  timestamp: number
  content: string
  id?: number
}

const createTweetSource = (
  frequency: number,
  account: string,
  attribute: string
) => {
  return interval(frequency).pipe(
    map((i) => ({
      account,
      timestamp: Date.now(),
      content: `${attribute} Tweet number ${i + 1}`,
    }))
  )
}

export const tweets$ = merge(
  createTweetSource(5000, "AwardsDarwin", "Facepalm"),
  createTweetSource(3000, "iamdevloper", "Expert"),
  createTweetSource(5000, "CommitStrip", "Funny")
)

export const rawTweets$: any = new BehaviorSubject([])

tweets$.subscribe()
