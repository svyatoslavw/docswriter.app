import { LinkConfirmationDto } from "@/authentication/dto/link-confirmation.dto"
import { getConfirmationHtml } from "@/common/mails/templates/confirmation-html"
import { getResetPasswordHtml } from "@/common/mails/templates/reset-password-html"
import { getTwoFactorHtml } from "@/common/mails/templates/two-factor-html"
import { MailerService } from "@nestjs-modules/mailer"
import { Injectable } from "@nestjs/common"

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmationEmail(dto: LinkConfirmationDto, email: string) {
    return this.mailerService.sendMail({
      to: email,
      sender: "Docswriter",
      from: "auth.nest.next@gmail.com",
      subject: "Login Confirmation",
      html: getConfirmationHtml(dto, email)
    })
  }

  async sendResetPasswordEmail(email: string, token: string) {
    return this.mailerService.sendMail({
      to: email,
      sender: "Docswriter",
      from: "auth.nest.next@gmail.com",
      subject: "Reset Password",
      html: getResetPasswordHtml(token, email)
    })
  }

  async sendTwoFactorEmail(email: string, code: string) {
    return this.mailerService.sendMail({
      to: email,
      sender: "Docswriter",
      from: "auth.nest.next@gmail.com",
      subject: "Two Factor Authentication",
      html: getTwoFactorHtml(code, email)
    })
  }
}
