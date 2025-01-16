import { INestApplication, Module } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

@Module({})
export class SwaggerConfigModule {
  static setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle("Docs.ai")
      .setDescription("API Documentation")
      .setVersion("0.1")
      .setContact("Svyatoslavw", "https://github.com/svyatoslavw", "sviatoslavvww@gmail.com")
      .setLicense("MIT License", "https://github.com/svyatoslavw/cv-editor/blob/main/LICENSE")
      .addBearerAuth({ in: "header", type: "http" })
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("api/docs", app, document)
  }
}
