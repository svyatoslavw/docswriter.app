import { registerAs } from "@nestjs/config"

export default registerAs("mailer", () => ({
  host: process.env.MAILER_HOST,
  user: process.env.MAILER_USER,
  password: process.env.MAILER_PASSWORD
}))
