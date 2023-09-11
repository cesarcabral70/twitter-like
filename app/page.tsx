"use client"

import { convertTimeToSec } from "@/utilits/utilits"
import { useEffect, useState } from "react"
import { Tweet, tweets$ } from "./../store/tweets"
import ActionsHeader from "./components/actionsHeader"
import ItemTweet from "./components/itemTweet"
import TabNav from "./components/tabNav"
import ListTweet from "./components/likedList"

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
    setLiked([])
  }

  const cleanLiked = () => {
    setLiked([])
  }

  return (
    <div className="p-4 w-full max-w-screen-md">
      <header className="flex items-center mb-3 flex-col flex-col-reverse md:flex-row md:flex-col-start">
        <TabNav
          isNavLinkActive={isNavLinkActive}
          activeNavItem={activeNavItem}
          data={data}
          liked={liked}
        />

        <ActionsHeader
          cleanAllTweets={cleanAllTweets}
          cleanLiked={cleanLiked}
        />
      </header>

      {activeNavItem === "liked" ? (
        <ListTweet
          activeNavItem={activeNavItem}
          data={liked}
          handleLike={handleLike}
          handleUnlike={handleUnlike}
        />
      ) : (
        <ListTweet
          activeNavItem={activeNavItem}
          data={data}
          handleLike={handleLike}
          handleUnlike={handleUnlike}
          likedData={liked}
        />
      )}
    </div>
  )
}
