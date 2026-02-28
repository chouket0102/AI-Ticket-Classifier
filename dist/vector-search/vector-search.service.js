"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VectorSearchService", {
    enumerable: true,
    get: function() {
        return VectorSearchService;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _jsclientrest = require("@qdrant/js-client-rest");
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
let VectorSearchService = class VectorSearchService {
    async onModuleInit() {
        await this.ensureCollection();
    }
    async onModuleDestroy() {
        this.logger.log('Vector search service shutting down');
    }
    async ensureCollection() {
        try {
            const collections = await this.client.getCollections();
            const exists = collections.collections.some((c)=>c.name === this.collectionName);
            if (!exists) {
                await this.client.createCollection(this.collectionName, {
                    vectors: {
                        size: this.vectorSize,
                        distance: 'Cosine'
                    }
                });
                this.logger.log(`Created collection: ${this.collectionName}`);
            }
        } catch (error) {
            this.logger.warn('Could not connect to Qdrant. Vector search will be unavailable.', error);
        }
    }
    async upsertDocuments(documents) {
        const contents = documents.map((d)=>d.content);
        const vectors = await this.embeddings.embedDocuments(contents);
        const points = documents.map((doc, index)=>({
                id: this.hashToNumber(doc.id),
                vector: vectors[index],
                payload: {
                    doc_id: doc.id,
                    doc_type: doc.docType,
                    title: doc.title,
                    content: doc.content
                }
            }));
        await this.client.upsert(this.collectionName, {
            wait: true,
            points
        });
        this.logger.log(`Upserted ${documents.length} documents`);
    }
    async search(query, topK = 3) {
        try {
            const queryVector = await this.embeddings.embedQuery(query);
            const results = await this.client.search(this.collectionName, {
                vector: queryVector,
                limit: topK,
                with_payload: true
            });
            return results.map((r)=>({
                    docId: r.payload?.doc_id || '',
                    docType: r.payload?.doc_type || '',
                    title: r.payload?.title || '',
                    content: (r.payload?.content || '').substring(0, 500),
                    score: r.score
                }));
        } catch (error) {
            this.logger.error('Vector search failed', error);
            return [];
        }
    }
    async getCollectionInfo() {
        try {
            return await this.client.getCollection(this.collectionName);
        } catch  {
            return null;
        }
    }
    hashToNumber(str) {
        let hash = 0;
        for(let i = 0; i < str.length; i++){
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }
    extractInstanceName(endpoint) {
        const match = endpoint.match(/https:\/\/([^.]+)\.openai\.azure\.com/);
        return match ? match[1] : endpoint;
    }
    constructor(configService){
        this.configService = configService;
        this.logger = new _common.Logger(VectorSearchService.name);
        this.vectorSize = 1536;
        this.collectionName = this.configService.get('QDRANT_COLLECTION') || 'knowledge_base';
        this.client = new _jsclientrest.QdrantClient({
            host: this.configService.get('QDRANT_HOST') || 'localhost',
            port: this.configService.get('QDRANT_PORT') || 6333,
            checkCompatibility: false
        });
        this.embeddings = new _openai.AzureOpenAIEmbeddings({
            azureOpenAIApiKey: this.configService.get('AZURE_OPENAI_API_KEY'),
            azureOpenAIApiInstanceName: this.extractInstanceName(this.configService.get('AZURE_OPENAI_ENDPOINT') || ''),
            azureOpenAIApiDeploymentName: this.configService.get('AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME'),
            azureOpenAIApiVersion: this.configService.get('AZURE_OPENAI_API_VERSION')
        });
    }
};
VectorSearchService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], VectorSearchService);

//# sourceMappingURL=vector-search.service.js.map