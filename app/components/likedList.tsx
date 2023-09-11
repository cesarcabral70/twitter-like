import { Tweet } from "@/store/tweets"
import { convertTimeToSec } from "@/utilits/utilits"
import ItemTweet from "./itemTweet"

interface Props {
  activeNavItem: string
  data: Tweet[]
  handleLike: (e: Tweet) => void
  handleUnlike: (e: Tweet) => void
  likedData?: Tweet[]
}

const ListTweet = ({
  activeNavItem,
  data,
  handleLike,
  handleUnlike,
  likedData,
}: Props) => {
  return (
    <ul>
      {data.map((tweet: Tweet, index: number) => {
        const postTime = convertTimeToSec(tweet.timestamp)

        if (activeNavItem !== "liked" && postTime > 30) return null

        return (
          <li key={index}>
            <ItemTweet
              tweetInfo={tweet}
              postTime={postTime}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              isActiveStatus={
                likedData ? likedData.includes(tweet) : data.includes(tweet)
              }
            />
          </li>
        )
      })}
    </ul>
  )
}

export default ListTweet
