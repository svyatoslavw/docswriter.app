import { LinkConfirmationDto } from "@/authentication/dto/link-confirmation.dto"

export function getConfirmationHtml(dto: LinkConfirmationDto, email: string): string {
  const url = `http://localhost:3000/auth/confirm?token=${dto.token}&userId=${dto.userId}&code=${dto.code}`
  return `
       <table class="body-wrap" style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; height: 100%; background: #fff; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important;">
              <tbody>
              <tr style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;">
                  <td class="container" style="margin: 0 auto !important; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; display: block !important; clear: both !important; max-width: 580px !important;"><!-- Message start -->
                  <table style="margin: 0px; padding: 0px; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', Helvetica, Helvetica, Arial, sans-serif; line-height: 1.65; border-collapse: collapse; width: 100%; height: 200px;">
                      <tbody>
                      <tr style="margin: 0px; padding: 0px; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', Helvetica, Helvetica, Arial, sans-serif;">
                        <td class="masthead" style="margin: 0px; padding: 50px 0px; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', Helvetica, Helvetica, Arial, sans-serif; background: #030014; color: white;" align="center">
                        <img src="https://previews.dropbox.com/p/thumb/ACgW08mybAi86ySok74iP5gQ-qIrCIZqj_jbQw9UDjW3e4FWi4DvUWBh3APE2VHFk6zghNBL3bN-GWSmzTUBznjnbdiTyFMzr_2C9KsEkvXao7keMMS4StYksB5MazpX9NObC5t6u5evdfLj9MbY8Kcm6noSqyY3NapIE8fL_u2sEmzTEtyNQRkED_I2kZtnmyxycqjCYZwhyK5k1NDCtDwL4tBE-NinNVLrUT7aMnnZe0g-gabCpi8W8_plJhS-2GAhRICMulCUQ2w2wn0ZDIdRlGLEJsH1_I_R6qidz4kZ8-DVD-4wW6DcSJh534GBcsvXfz_SHHYMTK0ACVAx_xxx/p.png?is_prewarmed=true" alt="Logo" width="136" height="125">
                        </td>
                      </tr>
                      <tr style="margin: 0px; padding: 0px; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', Helvetica, Helvetica, Arial, sans-serif; line-height: 1.65; height: 473px;">
                          <td class="content" style="margin: 0px; padding: 30px 35px; font-size: 100%; line-height: 1.65; background: #030014; height: 473px;">
                          <h2 style="font-family: 'Avenir Next', 'Helvetica Neue', Helvetica, Helvetica, Arial, sans-serif; margin: 0px 0px 20px; padding: 0px; font-size: 28px; line-height: 1.25;">
                              <span style="color: #b6b2ff;">Hi ${email},</span>
                          </h2>
                          <p>
                              <span style="color: #b6b2ff;">Thank you for signing up with us! We're excited to have you as a part of our community.&nbsp; 
                              <br>
                              <br>By verifying your email, you'll gain full access to all the features and benefits of Cypress . If you did not create an account with us, please disregard this email. 
                              <br>
                              </span>
                          </p>
                          <table style="font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', Helvetica, Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; line-height: 1.65; border-collapse: collapse; width: 98.2353%; height: 35px;">
                              <tbody>
                              <tr style="margin: 0px; padding: 0px; font-size: 100%; line-height: 1.65;">
                                  <td style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;" align="center">
                                  <p style="margin: 0px 0px 20px; padding: 0px; font-size: 16px; line-height: 1.65;">
                                    <span style="margin: 0px; padding: 0px; font-size: 22px; line-height: 1.65; color: white; display: inline-block; background: #7000FF; border-style: solid; border-color: #7000FF; border-image: initial; border-width: 10px 20px 10px; font-weight: bold; border-radius: 4px;">${dto.code}</span>
                                  </p>
                                      <a href="${url}" style="color: gray; font-size: 14px">or click on confirmation link</a>
                                  </td>
                              </tr>
                              </tbody>
                          </table>
                          <p style="font-family: 'Avenir Next', 'Helvetica Neue', Helvetica, Helvetica, Arial, sans-serif; margin: 0px 0px 20px; padding: 0px; font-size: 16px; line-height: 1.65; font-weight: normal;">
                              <span style="color: #b6b2ff;">
                              <em style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;">– Docswriter Team</em>
                              </span>
                          </p>
                          </td>
                      </tr>
                      </tbody>
                  </table>
                  </td>
              </tr>
              <tr style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65;">
                  <td class="container" style="margin: 0 auto !important; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; display: block !important; clear: both !important; max-width: 580px !important;">
                  <span style="color: #b6b2ff;"><!-- Message start --></span>
                  <table style="margin: 0; padding: 0; font-size: 100%; font-family: 'Avenir Next', 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; line-height: 1.65; border-collapse: collapse; width: 100% !important;">
                  </table>
                  </td>
              </tr>
              </tbody>
          </table>
      `
}
