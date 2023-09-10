import { Tweet } from "@/store/tweets"
import { useEffect, useState } from "react"
import Image from "next/image"

interface Props {
  tweetInfo: Tweet
  postTime: number
  handleUnlike: (index: Tweet) => void
  handleLike: (index: Tweet) => void
  isActiveStatus: boolean
}

const ListTweet = ({
  tweetInfo,
  postTime,
  handleUnlike,
  handleLike,
  isActiveStatus,
}: Props) => {
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    setIsActive(!isActive)

    isActiveStatus ? handleUnlike(tweetInfo) : handleLike(tweetInfo)
  }

  useEffect(() => {
    setIsActive(isActiveStatus)
  }, [])

  return (
    <div
      className={`p-4  mb-4 rounded-lg border-2 border-solid bg-white border-gray-200 ${
        isActiveStatus ? "border-blue-400 bg-blue-50" : "border-white"
      }`}
    >
      <div>
        <strong className="mr-1 text-blue-800">@{tweetInfo.account}</strong>
        <em className="text-gray-400">
          {postTime === 0 ? "Just now" : `${postTime}s ago`}
        </em>
      </div>

      <article>{tweetInfo.content}</article>

      <div className="flex">
        <a
          className={`mt-4 pt-2 pb-2 flex flex-row flex-none items-center cursor-pointer text-xs ${
            isActiveStatus ? "text-red-400" : "opacity-20 text-black"
          }`}
          onClick={handleClick}
        >
          {isActiveStatus && (
            <Image
              alt={`Like content: ${tweetInfo.content}`}
              src={isActiveStatus ? "/heart-red.svg" : "/heart-black.svg"}
              width={18}
              height={18}
              className={`mr-1 absolute`}
              priority
            />
          )}

          <Image
            alt={`Like content: ${tweetInfo.content}`}
            src={isActiveStatus ? "/heart-red.svg" : "/heart-black.svg"}
            width={18}
            height={18}
            className={`mr-1 ${
              isActiveStatus ? "animate-ping scale-50" : "scale-100"
            }`}
            priority
          />

          {isActiveStatus ? "Liked" : "Like"}
        </a>
      </div>
    </div>
  )
}

export default ListTweet
