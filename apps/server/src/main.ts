import { NestFactory } from "@nestjs/core"
import * as cookieParser from "cookie-parser"
import * as dotenv from "dotenv"
import * as passport from "passport"
import { AppModule } from "./app.module"
import { HttpExceptionFilter } from "./common/exceptions/http-exception.filter"
import { SwaggerConfigModule } from "./config/swagger/swagger.module"

async function bootstrap() {
  dotenv.config()

  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  // app.use(
  //   session({
  //     // name: "sessionToken",
  //     secret: process.env.JWT_SECRET,
  //     saveUninitialized: true,
  //     resave: true
  //     // saveUninitialized: false,
  //     // resave: false,
  //     // cookie: {
  //     //   maxAge: 0
  //     // }
  //   })
  // )
  app.use(passport.initialize())

  app.enableCors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type, Authorization, Access-Control-Allow-Origin"],
    credentials: true,
    exposedHeaders: ["set-cookie"]
  })

  app.useGlobalFilters(new HttpExceptionFilter())
  SwaggerConfigModule.setupSwagger(app)

  app.setGlobalPrefix(`api/v${process.env.VERSION || "1"}`)

  await app.listen(process.env.PORT ?? 4000)
}
bootstrap()
