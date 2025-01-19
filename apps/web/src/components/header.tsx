import { ModeToggle } from "@docswriter/ui/components"

import { ProfileDropdown } from "./ProfileDropdown"
import { Logotype } from "./logotype"

const Header = () => {
  return (
    <header className="flex w-full items-center justify-between px-10 py-4">
      <Logotype />
      <ul className="flex gap-8">
        <li>
          <a href="#">Features</a>
        </li>
        <li>
          <a href="#">Testimonials</a>
        </li>
        <li>
          <a href="#">Pricing</a>
        </li>
        <li>
          <a href="#">FAQ</a>
        </li>
      </ul>
      <div className="flex gap-2">
        <ProfileDropdown />
        <ModeToggle />
      </div>
    </header>
  )
}

export { Header }
