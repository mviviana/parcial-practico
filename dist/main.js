"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("./filters/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        prefix: 'api/v',
        defaultVersion: '1',
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map