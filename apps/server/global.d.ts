namespace Express {
    interface Request {
      user?: { id: string }
    }
  }
  
  declare namespace NodeJS {
    export interface ProcessEnv {
      APP_PORT: number
      APP_URL: string
      APP_NAME: string
      VERSION: number
      DATABASE_URL: string
      DATABASE_HOST: string
      DATABASE_PORT: string
      DATABASE_USERNAME: string
      DATABASE_PASSWORD: string
      DATABASE_NAME: string
      JWT_SECRET: string
      MAILER_HOST: string 
      MAILER_USER: string
      MAILER_PASSWORD: string
    }
  }