"use client"

import { Tweet, tweets$ } from "./../store/tweets"
import { useEffect, useState } from "react"
import ListTweet from "./components/listTweet"
import { convertTimeToSec } from "@/utilits/utilits"

export default function Home() {
  const [data, setData] = useState<Tweet[]>([])
  const [liked, setLiked] = useState<Tweet[]>([])
  const [activeNavItem, setActiveNavItem] = useState("tweet")

  const handleLike = (index: Tweet) => {
    setLiked((prev) => [...prev, index])
  }

  const handleUnlike = (index: Tweet) => {
    const objWithIdIndex = liked.findIndex((obj) => {
      return obj === index
    })

    if (objWithIdIndex > -1) {
      liked.splice(objWithIdIndex, 1)
    }

    setLiked((prev) => [...prev])
  }

  useEffect(() => {
    const observable = tweets$

    const subscription = observable.pipe().subscribe((tweet) => {
      setData((prev: Tweet[]) => {
        const obj = {
          ...tweet,
          id: prev.length,
        }

        const arr = [...prev, obj]
        return arr.sort((a, b) => (b.id as number) - (a.id as number))
      })
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [tweets$])

  const isNavLinkActive = (itemName: string) => {
    setActiveNavItem(itemName)
  }

  const cleanAllTweets = () => {
    setData([])
  }

  const cleanLiked = () => {
    setLiked([])
  }

  useEffect(() => {
    console.log(liked)
  }, [liked])

  return (
    <div className="p-4 w-full max-w-screen-md">
      <header className="flex items-center mb-3 flex-col flex-col-reverse md:flex-row md:flex-col-start">
        <div className="flex space-x-4">
          <a
            onClick={() => isNavLinkActive("tweet")}
            className={`text-3xl cursor-pointer ${
              activeNavItem === "tweet" ? "opacity-100" : "opacity-25"
            }`}
          >
            All tweets{" "}
            {data.length > 0 && <strong>{`(${data.length})`}</strong>}
          </a>
          <a
            onClick={() => isNavLinkActive("liked")}
            className={`text-3xl cursor-pointer ${
              activeNavItem === "liked" ? "opacity-100" : "opacity-25"
            }`}
          >
            Liked {liked.length > 0 && <strong>{`(${liked.length})`}</strong>}
          </a>
        </div>
        <div className="ml-auto flex space-x-3 mb-5 w-full md:mb-0 md:w-auto ">
          <div
            onClick={cleanAllTweets}
            className="cursor-pointer text-center md:text-right hover:underline "
          >
            <a>Clear all tweets</a>
          </div>

          <div
            onClick={cleanLiked}
            className="cursor-pointer text-center md:text-right hover:underline"
          >
            <a>Clear Liked</a>
          </div>
        </div>
      </header>

      <ul>
        {activeNavItem === "liked"
          ? liked.map((tweet: Tweet, index: number) => {
              const postTime = convertTimeToSec(tweet.timestamp)

              return (
                <li key={index}>
                  <ListTweet
                    tweetInfo={tweet}
                    postTime={postTime}
                    handleLike={handleLike}
                    handleUnlike={handleUnlike}
                    isActiveStatus={liked.includes(tweet)}
                  />
                </li>
              )
            })
          : data.map((tweet: Tweet, index: number) => {
              const postTime = convertTimeToSec(tweet.timestamp)

              if (postTime > 30) return null

              return (
                <li key={index}>
                  <ListTweet
                    tweetInfo={tweet}
                    postTime={postTime}
                    handleLike={handleLike}
                    handleUnlike={handleUnlike}
                    isActiveStatus={liked.includes(tweet)}
                  />
                </li>
              )
            })}
      </ul>
    </div>
  )
}
