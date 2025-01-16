import { Button } from "@workspace/ui/components/button"
import { ArrowRight } from "lucide-react"

export default function Page() {
  return (
    <div className="flex flex-col my-16 items-center justify-center h-full">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-5xl tracking-wide font-extrabold max-w-3xl text-center">
          Docs.ai - From code to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700">
            documentation
          </span>
          , instantly.
        </h1>
        <h2 className="max-w-xl text-center">
          Transform your code into clear, concise, and professional documentation with the power of
          AI. Simplify workflows, save time, and focus on what matters.
        </h2>
        <Button variant={"default"} className="[&_svg]:hover:translate-x-1.5 w-fit">
          Sign up for free <ArrowRight className="relative ml-2 h-4 w-4 transition-all" />
        </Button>
      </div>
    </div>
  )
}
