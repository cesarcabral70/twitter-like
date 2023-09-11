import { Tweet } from "@/store/tweets"

interface Props {
  data: Tweet[]
  liked: Tweet[]
  isNavLinkActive: (data: string) => void
  activeNavItem: string
}

const TabNav = ({ isNavLinkActive, activeNavItem, data, liked }: Props) => {
  return (
    <div className="flex space-x-7">
      <a
        onClick={() => isNavLinkActive("tweet")}
        className={`text-3xl relative cursor-pointer ${
          activeNavItem === "tweet" ? "opacity-100" : "opacity-25"
        }`}
      >
        All tweets{" "}
        {data.length > 0 && <CounterLabel>{data.length}</CounterLabel>}
      </a>
      <a
        onClick={() => isNavLinkActive("liked")}
        className={`text-3xl cursor-pointer relative ${
          activeNavItem === "liked" ? "opacity-100" : "opacity-25"
        }`}
      >
        Liked {liked.length > 0 && <CounterLabel>{liked.length}</CounterLabel>}
      </a>
    </div>
  )
}

export default TabNav

function CounterLabel({ children }: { children: React.ReactNode }) {
  return (
    <strong className="rounded-full flex text-sm bg-red-400 border-2  text-white border-red-400 p-1 w-7 h-7 text-center justify-center items-center absolute -top-2 -right-6 scale-75">{`${children}`}</strong>
  )
}
