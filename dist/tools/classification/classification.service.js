"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClassificationService", {
    enumerable: true,
    get: function() {
        return ClassificationService;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _openai = require("@langchain/openai");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ClassificationService = class ClassificationService {
    async classify(ticketText) {
        const prompt = `Classify the following IT support ticket. Return ONLY valid JSON with these fields:
- category: one of [Hardware, Software, Network, Security, Database, Cloud, Access Management, Email, Monitoring, Service Request]
- priority: one of [P1-Critical, P2-High, P3-Medium, P4-Low]
- assigned_team: one of [Infrastructure, Applications, Security, End User Support, IAM, Database, Cloud, Network, Email]
- confidence: a number between 0.0 and 1.0

Ticket: ${ticketText}`;
        try {
            const response = await this.llm.invoke(prompt);
            return typeof response.content === 'string' ? response.content : JSON.stringify(response.content);
        } catch (error) {
            this.logger.error('Classification failed', error);
            return JSON.stringify({
                error: 'Classification failed',
                category: 'Unknown',
                priority: 'P3-Medium',
                assigned_team: 'End User Support',
                confidence: 0
            });
        }
    }
    extractInstanceName(endpoint) {
        const match = endpoint.match(/https:\/\/([^.]+)\.openai\.azure\.com/);
        return match ? match[1] : endpoint;
    }
    constructor(configService){
        this.configService = configService;
        this.logger = new _common.Logger(ClassificationService.name);
        this.llm = new _openai.AzureChatOpenAI({
            azureOpenAIApiKey: this.configService.get('AZURE_OPENAI_API_KEY'),
            azureOpenAIApiInstanceName: this.extractInstanceName(this.configService.get('AZURE_OPENAI_ENDPOINT') || ''),
            azureOpenAIApiDeploymentName: this.configService.get('AZURE_OPENAI_DEPLOYMENT_NAME'),
            azureOpenAIApiVersion: this.configService.get('AZURE_OPENAI_API_VERSION'),
            temperature: 0,
            maxTokens: 1000
        });
    }
};
ClassificationService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], ClassificationService);

//# sourceMappingURL=classification.service.js.map