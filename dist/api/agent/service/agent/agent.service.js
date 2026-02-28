"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentService", {
    enumerable: true,
    get: function() {
        return AgentService;
    }
});
const _common = require("@nestjs/common");
const _messages = require("@langchain/core/messages");
const _operators = require("rxjs/operators");
const _messageutil = require("../../utils/message.util");
const _reactagent = require("../../../../agent/implementations/react.agent");
const _redisservice = require("../../../../messaging/redis/redis.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AgentService = class AgentService {
    async analyzeTicket(ticketDto) {
        const startTime = Date.now();
        const config = {
            configurable: {
                thread_id: ticketDto.threadId
            }
        };
        try {
            const message = await this.agent.chat({
                messages: [
                    new _messages.HumanMessage(`Analyze this support ticket and provide recommendations: ${ticketDto.ticketText}`)
                ]
            }, config);
            const rawContent = typeof message.content === 'string' ? message.content : JSON.stringify(message.content);
            const parsed = this.parseAgentResponse(rawContent);
            const processingTime = Date.now() - startTime;
            return {
                threadId: ticketDto.threadId,
                classification: parsed.classification,
                metadata: parsed.metadata,
                knowledge_articles: parsed.knowledge_articles,
                historical_tickets: parsed.historical_tickets,
                recommendations: parsed.recommendations,
                tools_used: parsed.tools_used || [],
                complexity_assessment: parsed.complexity_assessment || 'unknown',
                raw_response: rawContent,
                processing_time_ms: processingTime
            };
        } catch (error) {
            this.logger.error('Error analyzing ticket', error);
            throw new _common.BadRequestException(error.message || 'An error occurred while analyzing the ticket.');
        }
    }
    async chat(messageDto) {
        const messages = _messageutil.MessageUtil.toHumanMessages(messageDto);
        const config = {
            configurable: {
                thread_id: messageDto.threadId
            }
        };
        try {
            const message = await this.agent.chat({
                messages
            }, config);
            return {
                id: message.id || 'unknown',
                type: message.getType(),
                content: message.content
            };
        } catch (error) {
            this.logger.error('Error in chat:', error);
            throw new _common.BadRequestException(error.message || 'An error occurred while processing your request.');
        }
    }
    async stream(message) {
        const channel = `agent-stream:${message.threadId}`;
        this.logger.log(`Streaming messages to channel: ${channel}`);
        this.streamMessagesToRedis([
            new _messages.HumanMessage(message.content)
        ], {
            configurable: {
                thread_id: message.threadId
            }
        }, channel);
        return this.redisService.subscribe(channel).pipe((0, _operators.map)((msg)=>JSON.parse(msg)));
    }
    async streamMessagesToRedis(messages, configurable, channel) {
        try {
            const streams = await this.agent.stream({
                messages
            }, {
                streamMode: 'messages',
                ...configurable
            });
            for await (const chunk of streams){
                if (!chunk) continue;
                const messageChunks = Array.isArray(chunk) ? chunk.filter((item)=>item?.constructor?.name === 'AIMessageChunk') : [];
                for (const messageChunk of messageChunks){
                    await this.redisService.publish(channel, JSON.stringify({
                        data: {
                            id: messageChunk.id,
                            type: messageChunk.getType(),
                            content: messageChunk.content
                        },
                        type: 'message'
                    }));
                }
            }
            await this.redisService.publish(channel, JSON.stringify({
                data: {
                    id: 'done',
                    content: ''
                },
                type: 'done'
            }));
        } catch (error) {
            this.logger.error('Error in streamMessagesToRedis:', error);
            await this.redisService.publish(channel, JSON.stringify({
                type: 'error',
                data: {
                    message: error.message
                }
            }));
        }
    }
    async getHistory(threadId) {
        try {
            const history = await this.agent.getHistory(threadId);
            return history.map((msg)=>({
                    id: msg.id || 'unknown',
                    type: msg.getType(),
                    content: msg.content
                })).filter((msg)=>msg.content);
        } catch (error) {
            this.logger.error('Error fetching history:', error);
            throw new _common.BadRequestException(error.message || 'An error occurred while fetching history.');
        }
    }
    parseAgentResponse(rawContent) {
        try {
            const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch  {
            this.logger.warn('Could not parse structured JSON from agent response');
        }
        return {
            classification: null,
            metadata: null,
            knowledge_articles: [],
            historical_tickets: [],
            recommendations: {
                summary: rawContent,
                immediate_actions: [],
                resolution_steps: [],
                estimated_resolution_time: 'unknown',
                escalation_needed: false
            },
            tools_used: [],
            complexity_assessment: 'unknown'
        };
    }
    constructor(agent, redisService){
        this.agent = agent;
        this.redisService = redisService;
        this.logger = new _common.Logger(AgentService.name);
    }
};
AgentService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _reactagent.ReactAgent === "undefined" ? Object : _reactagent.ReactAgent,
        typeof _redisservice.RedisService === "undefined" ? Object : _redisservice.RedisService
    ])
], AgentService);

//# sourceMappingURL=agent.service.js.map