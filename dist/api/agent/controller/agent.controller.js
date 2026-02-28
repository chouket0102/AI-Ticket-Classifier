"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentController", {
    enumerable: true,
    get: function() {
        return AgentController;
    }
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _agentservice = require("../service/agent/agent.service");
const _ssedto = require("../dto/sse.dto");
const _messagedto = require("../dto/message.dto");
const _messageresponsedto = require("../dto/message.response.dto");
const _ticketdto = require("../dto/ticket.dto");
const _ticketresponsedto = require("../dto/ticket-response.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let AgentController = class AgentController {
    async analyzeTicket(ticketDto) {
        return await this.agentService.analyzeTicket(ticketDto);
    }
    async chat(messageDto) {
        return await this.agentService.chat(messageDto);
    }
    async stream(messageDto) {
        return await this.agentService.stream(messageDto);
    }
    async getHistory(threadId) {
        return await this.agentService.getHistory(threadId);
    }
    constructor(agentService){
        this.agentService = agentService;
    }
};
_ts_decorate([
    (0, _common.Post)('analyze'),
    (0, _swagger.ApiOperation)({
        summary: 'Analyze a support ticket using the adaptive agent'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'Returns structured ticket analysis with classification, metadata, and recommendations',
        type: _ticketresponsedto.TicketAnalysisResponseDto
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _ticketdto.TicketDto === "undefined" ? Object : _ticketdto.TicketDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentController.prototype, "analyzeTicket", null);
_ts_decorate([
    (0, _common.Post)('chat'),
    (0, _swagger.ApiOperation)({
        summary: 'Chat with the agent'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagedto.MessageDto === "undefined" ? Object : _messagedto.MessageDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentController.prototype, "chat", null);
_ts_decorate([
    (0, _common.Sse)('stream'),
    (0, _swagger.ApiOperation)({
        summary: 'Stream agent responses'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'Returns a stream of agent responses',
        type: _ssedto.SseMessage
    }),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagedto.SseMessageDto === "undefined" ? Object : _messagedto.SseMessageDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentController.prototype, "stream", null);
_ts_decorate([
    (0, _common.Get)('history/:threadId'),
    (0, _swagger.ApiOperation)({
        summary: 'Get chat history'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'Returns the chat history',
        type: [
            _messageresponsedto.MessageResponseDto
        ]
    }),
    _ts_param(0, (0, _common.Param)('threadId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentController.prototype, "getHistory", null);
AgentController = _ts_decorate([
    (0, _swagger.ApiTags)('Agent'),
    (0, _common.Controller)('agent'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _agentservice.AgentService === "undefined" ? Object : _agentservice.AgentService
    ])
], AgentController);

//# sourceMappingURL=agent.controller.js.map