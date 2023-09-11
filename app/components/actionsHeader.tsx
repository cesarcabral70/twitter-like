interface Props {
  cleanAllTweets: () => void
  cleanLiked: () => void
}

const ActionsHeader = ({ cleanAllTweets, cleanLiked }: Props) => {
  return (
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
  )
}

export default ActionsHeader
