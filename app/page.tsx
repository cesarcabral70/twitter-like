"use client"

import { Tweet, tweets$ } from "./../store/tweets"
import { useEffect, useState } from "react"

export default function Home() {
  const [data, setData] = useState<Tweet[]>([])

  useEffect(() => {
    const observable = tweets$

    const subscription = observable.pipe().subscribe((data) => {
      setData((prevDataArray: Tweet[]) => [...prevDataArray, data])
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [tweets$])

  return (
    <div className="p-4 w-full max-w-screen-md">
      <ul>
        {data
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((item: Tweet, index: number) => {
            const postTime = convertTimeToSec(item.timestamp)

            if (postTime > 31) return null

            return (
              <li
                className="p-4 bg-white mb-4 rounded-lg border-2 border-solid border-gray-200"
                key={index}
              >
                <div>
                  <strong className="mr-1 text-blue-800">
                    @{item.account}
                  </strong>
                  <em className="text-gray-400">
                    {postTime === 0 ? "Just now" : `${postTime}s ago`}
                  </em>
                </div>
                {item.content}
              </li>
            )
          })}
      </ul>
    </div>
  )
}

function convertTimeToSec(data: number) {
  const now = Date.now()
  const timeDiff = now - data
  const seconds = Math.floor(timeDiff / 1000)

  return seconds
}
