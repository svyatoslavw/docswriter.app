namespace Express {
    interface Request {
      user?: { id: string }
    }
  }
  
  declare namespace NodeJS {
    export interface ProcessEnv {
      DATABASE_URL: string
      DATABASE_HOST: string
      DATABASE_PORT: string
      DATABASE_USERNAME: string
      DATABASE_PASSWORD: string
      DATABASE_NAME: string
    }
  }