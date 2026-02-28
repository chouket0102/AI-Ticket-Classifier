"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _appmodule = require("./app.module");
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
async function bootstrap() {
    const app = await _core.NestFactory.create(_appmodule.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new _common.ValidationPipe({
        transform: true
    }));
    const swaggerConfig = new _swagger.DocumentBuilder().setTitle('AI Ticket Classifier').setDescription('Adaptive AI agent for IT support ticket analysis').setVersion('1.0').build();
    const document = _swagger.SwaggerModule.createDocument(app, swaggerConfig);
    _swagger.SwaggerModule.setup('docs', app, document);
    const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:3001'
    ];
    app.enableCors({
        origin: allowedOrigins,
        methods: [
            'GET',
            'POST'
        ]
    });
    await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

//# sourceMappingURL=main.js.map