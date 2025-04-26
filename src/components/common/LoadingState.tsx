import { Icon } from "@iconify/react/dist/iconify.js";

export default function LoadingState() {
  return (
    <div className="p-5 w-fit mx-auto">
      <Icon
        width="30"
        height="30"
        color="#100D03"
        className='animate-spin'
        icon="fluent:spinner-ios-16-filled"
      />
    </div>
  )
}