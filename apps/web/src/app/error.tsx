"use client"

import { Button } from "@workspace/ui/components"
import { RotateCcwIcon } from "lucide-react"
import { useEffect } from "react"

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    //eslint-disable-next-line no-console
    console.error(error)
  }, [error])

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h2 className="text-5xl font-bold">Internal server error!</h2>
        <h5 className="font-medium">Uh oh! Something went wrong. Please try again.</h5>
      </div>
      <Button className="w-40 items-center" onClick={() => reset()}>
        <RotateCcwIcon className="mr-2" size={16} />
        Try again
      </Button>
    </div>
  )
}
