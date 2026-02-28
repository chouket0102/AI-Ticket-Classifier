"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApiModule", {
    enumerable: true,
    get: function() {
        return ApiModule;
    }
});
const _common = require("@nestjs/common");
const _agentcontroller = require("./agent/controller/agent.controller");
const _agentservice = require("./agent/service/agent/agent.service");
const _agentmodule = require("../agent/agent.module");
const _messagingmodule = require("../messaging/messaging.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ApiModule = class ApiModule {
};
ApiModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _agentmodule.AgentModule,
            _messagingmodule.MessagingModule
        ],
        controllers: [
            _agentcontroller.AgentController
        ],
        providers: [
            _agentservice.AgentService
        ]
    })
], ApiModule);

//# sourceMappingURL=api.module.js.map