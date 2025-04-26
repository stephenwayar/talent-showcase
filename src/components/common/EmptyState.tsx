import noImage from '@/assets/svgs/no-data.svg'

interface Props {
  message: string
  withImage?: boolean
}

export default function EmptyState({ message, withImage = true }: Props) {
  return (
    <div className="flex justify-center items-center">
      <div className="space-y-5 max-w-[500px]">
        {withImage && (
          <div className="w-[250px] mx-auto">
            <img
              alt='no-data'
              src={noImage}
              className="w-[250px] mx-auto"
            />
          </div>
        )}

        <h2 className="text-[#090A04] text-center text-4xl font-semibold">
          Oops!
        </h2>

        <p className="text-[#667085] text-center text-lg">
          {message}
        </p>
      </div>
    </div>
  )
}