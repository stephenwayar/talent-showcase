import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  retryFn: any
  failedTo: string;
}

export default function RetryButton({ failedTo, retryFn }: Props) {
  return (
    <div className="p-5 space-y-4 w-fit mx-auto text-center">
      <p className="font-semibold text-[#090A04] text-xl">
        Failed to {failedTo}
      </p>

      <button
        type='button'
        onClick={retryFn}
        className='h-[3rem] w-28 text-white text-center rounded-full py-2 px-5 bg-brand-expresso transition duration-75 delay-75 ease-linear bg-[#090a04e0]'
      >
        <div className="items-center flex space-x-[8px]">
          <div className="w-[18px] h-[18px]">
            <Icon
              icon='ooui:reload'
              width="18"
              height="18"
            />
          </div>

          <p className="font-bold">
            Retry
          </p>
        </div>
      </button>
    </div>
  )
}