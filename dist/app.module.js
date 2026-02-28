"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppModule", {
    enumerable: true,
    get: function() {
        return AppModule;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _messagingmodule = require("./messaging/messaging.module");
const _agentmodule = require("./agent/agent.module");
const _apimodule = require("./api/api.module");
const _toolsmodule = require("./tools/tools.module");
const _vectorsearchmodule = require("./vector-search/vector-search.module");
const _azureopenaiconfig = /*#__PURE__*/ _interop_require_default(require("./config/azure-openai.config"));
const _qdrantconfig = /*#__PURE__*/ _interop_require_default(require("./config/qdrant.config"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AppModule = class AppModule {
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _config.ConfigModule.forRoot({
                isGlobal: true,
                load: [
                    _azureopenaiconfig.default,
                    _qdrantconfig.default
                ]
            }),
            _messagingmodule.MessagingModule,
            _toolsmodule.ToolsModule,
            _vectorsearchmodule.VectorSearchModule,
            _agentmodule.AgentModule,
            _apimodule.ApiModule
        ],
        controllers: [],
        providers: []
    })
], AppModule);

//# sourceMappingURL=app.module.js.map