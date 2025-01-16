import { NestFactory } from "@nestjs/core"
import * as dotenv from "dotenv"
import { AppModule } from "./app.module"
import { HttpExceptionFilter } from "./common/exceptions/http-exception.filter"
import { SwaggerConfigModule } from "./config/swagger/swagger.module"

async function bootstrap() {
  dotenv.config()

  const app = await NestFactory.create(AppModule)

  app.useGlobalFilters(new HttpExceptionFilter())
  SwaggerConfigModule.setupSwagger(app)

  app.setGlobalPrefix(`api/v${process.env.VERSION || "1"}`)

  await app.listen(process.env.PORT ?? 4000)
}
bootstrap()
