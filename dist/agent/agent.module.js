"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentModule", {
    enumerable: true,
    get: function() {
        return AgentModule;
    }
});
const _common = require("@nestjs/common");
const _reactagent = require("./implementations/react.agent");
const _toolsmodule = require("../tools/tools.module");
const _vectorsearchmodule = require("../vector-search/vector-search.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AgentModule = class AgentModule {
};
AgentModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _toolsmodule.ToolsModule,
            _vectorsearchmodule.VectorSearchModule
        ],
        providers: [
            _reactagent.ReactAgent
        ],
        exports: [
            _reactagent.ReactAgent
        ]
    })
], AgentModule);

//# sourceMappingURL=agent.module.js.map