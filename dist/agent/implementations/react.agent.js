"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ReactAgent", {
    enumerable: true,
    get: function() {
        return ReactAgent;
    }
});
const _common = require("@nestjs/common");
const _agentfactory = require("../agent.factory");
const _modelproviderenum = require("../enum/model-provider.enum");
const _langgraphcheckpointpostgres = require("@langchain/langgraph-checkpoint-postgres");
const _memory = require("../memory/memory");
const _classificationservice = require("../../tools/classification/classification.service");
const _extractionservice = require("../../tools/extraction/extraction.service");
const _historicalservice = require("../../tools/historical/historical.service");
const _vectorsearchservice = require("../../vector-search/vector-search.service");
const _classificationtool = require("../../tools/classification/classification.tool");
const _extractiontool = require("../../tools/extraction/extraction.tool");
const _knowledgetool = require("../../tools/knowledge/knowledge.tool");
const _historicaltool = require("../../tools/historical/historical.tool");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ReactAgent = class ReactAgent {
    async onModuleInit() {
        this.logger.log('Initializing PostgresSaver checkpointer tables...');
        await this.initCheckpointer();
        this.logger.log('PostgresSaver checkpointer ready');
    }
    async chat(input, chatOptions) {
        const response = await this.agent.invoke(input, chatOptions);
        const messages = response && Array.isArray(response.messages) ? response.messages : null;
        return messages ? messages[messages.length - 1] : null;
    }
    async stream(input, chatOptions) {
        return this.agent.stream(input, chatOptions);
    }
    async getHistory(threadId) {
        const history = await this.checkpointer.get({
            configurable: {
                thread_id: threadId
            }
        });
        return Array.isArray(history?.channel_values?.messages) ? history.channel_values.messages : [];
    }
    async initCheckpointer() {
        if (this.checkpointer && this.checkpointer instanceof _langgraphcheckpointpostgres.PostgresSaver) {
            try {
                await this.checkpointer.setup();
            } catch (err) {
                this.logger.error('Error setting up PostgresSaver:', err);
            }
        }
    }
    constructor(classificationService, extractionService, historicalService, vectorSearchService){
        this.classificationService = classificationService;
        this.extractionService = extractionService;
        this.historicalService = historicalService;
        this.vectorSearchService = vectorSearchService;
        this.logger = new _common.Logger(ReactAgent.name);
        const tools = [
            (0, _classificationtool.createClassificationTool)(this.classificationService),
            (0, _extractiontool.createExtractionTool)(this.extractionService),
            (0, _knowledgetool.createKnowledgeTool)(this.vectorSearchService),
            (0, _historicaltool.createHistoricalTool)(this.historicalService)
        ];
        this.agent = _agentfactory.AgentFactory.createAgent(_modelproviderenum.ModelProvider.AZURE_OPENAI, tools, _memory.postgresCheckpointer);
        this.checkpointer = _memory.postgresCheckpointer;
    }
};
ReactAgent = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _classificationservice.ClassificationService === "undefined" ? Object : _classificationservice.ClassificationService,
        typeof _extractionservice.ExtractionService === "undefined" ? Object : _extractionservice.ExtractionService,
        typeof _historicalservice.HistoricalService === "undefined" ? Object : _historicalservice.HistoricalService,
        typeof _vectorsearchservice.VectorSearchService === "undefined" ? Object : _vectorsearchservice.VectorSearchService
    ])
], ReactAgent);

//# sourceMappingURL=react.agent.js.map