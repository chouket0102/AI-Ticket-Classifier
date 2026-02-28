"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ExtractionService", {
    enumerable: true,
    get: function() {
        return ExtractionService;
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
let ExtractionService = class ExtractionService {
    async extract(ticketText) {
        const prompt = `Extract detailed metadata from the following IT support ticket. Return ONLY valid JSON with these fields:
- priority_score: number between 0.0 and 1.0 (0.9+ = Critical, 0.7-0.9 = High, 0.4-0.7 = Medium, below 0.4 = Low)
- urgency_level: one of [Critical, High, Medium, Low]
- affected_systems: array of system names affected
- technical_keywords: array of relevant technical terms
- user_impact: one of [Single User, Multiple Users, Department, Organization]
- requires_escalation: boolean

Ticket: ${ticketText}`;
        try {
            const response = await this.llm.invoke(prompt);
            return typeof response.content === 'string' ? response.content : JSON.stringify(response.content);
        } catch (error) {
            this.logger.error('Extraction failed', error);
            return JSON.stringify({
                error: 'Extraction failed',
                priority_score: 0.5,
                urgency_level: 'Medium',
                affected_systems: [],
                technical_keywords: [],
                user_impact: 'Single User',
                requires_escalation: false
            });
        }
    }
    extractInstanceName(endpoint) {
        const match = endpoint.match(/https:\/\/([^.]+)\.openai\.azure\.com/);
        return match ? match[1] : endpoint;
    }
    constructor(configService){
        this.configService = configService;
        this.logger = new _common.Logger(ExtractionService.name);
        this.llm = new _openai.AzureChatOpenAI({
            azureOpenAIApiKey: this.configService.get('AZURE_OPENAI_API_KEY'),
            azureOpenAIApiInstanceName: this.extractInstanceName(this.configService.get('AZURE_OPENAI_ENDPOINT') || ''),
            azureOpenAIApiDeploymentName: this.configService.get('AZURE_OPENAI_DEPLOYMENT_NAME'),
            azureOpenAIApiVersion: this.configService.get('AZURE_OPENAI_API_VERSION'),
            temperature: 0,
            maxTokens: 1500
        });
    }
};
ExtractionService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], ExtractionService);

//# sourceMappingURL=extraction.service.js.map