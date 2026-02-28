"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "KnowledgeLoaderService", {
    enumerable: true,
    get: function() {
        return KnowledgeLoaderService;
    }
});
const _common = require("@nestjs/common");
const _vectorsearchservice = require("./vector-search.service");
const _fs = /*#__PURE__*/ _interop_require_wildcard(require("fs"));
const _path = /*#__PURE__*/ _interop_require_wildcard(require("path"));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let KnowledgeLoaderService = class KnowledgeLoaderService {
    async onModuleInit() {
        await this.loadKnowledgeBase();
    }
    async loadKnowledgeBase() {
        if (!_fs.existsSync(this.knowledgeBasePath)) {
            this.logger.warn(`Knowledge base directory not found: ${this.knowledgeBasePath}`);
            return 0;
        }
        const files = _fs.readdirSync(this.knowledgeBasePath).filter((f)=>f.endsWith('.txt'));
        const allChunks = [];
        for (const file of files){
            const filePath = _path.join(this.knowledgeBasePath, file);
            const content = _fs.readFileSync(filePath, 'utf-8');
            const docType = this.inferDocType(file);
            const chunks = this.chunkDocument(file, docType, content);
            allChunks.push(...chunks);
        }
        if (allChunks.length === 0) {
            this.logger.warn('No document chunks found to load');
            return 0;
        }
        try {
            const collectionInfo = await this.vectorSearchService.getCollectionInfo();
            if (collectionInfo?.points_count > 0) {
                this.logger.log(`Collection already contains ${collectionInfo.points_count} points, skipping load`);
                return collectionInfo.points_count;
            }
        } catch  {
            this.logger.log('Collection info unavailable, proceeding with load');
        }
        const batchSize = 20;
        for(let i = 0; i < allChunks.length; i += batchSize){
            const batch = allChunks.slice(i, i + batchSize);
            try {
                await this.vectorSearchService.upsertDocuments(batch.map((c)=>({
                        id: c.id,
                        docType: c.docType,
                        title: c.title,
                        content: c.content
                    })));
            } catch (error) {
                this.logger.error(`Failed to upsert batch starting at ${i}`, error);
            }
        }
        this.logger.log(`Loaded ${allChunks.length} chunks from ${files.length} files`);
        return allChunks.length;
    }
    chunkDocument(filename, docType, content) {
        const sections = content.split(/(?=={3,})/);
        const chunks = [];
        let chunkIndex = 0;
        for (const section of sections){
            const trimmed = section.trim();
            if (trimmed.length < 50) continue;
            const titleMatch = trimmed.match(/^={3,}\s*\n(.+?)(?:\n|$)/);
            const title = titleMatch ? titleMatch[1].trim() : filename.replace('.txt', '').replace(/_/g, ' ');
            const subChunks = this.splitBySize(trimmed, 800, 1500);
            for (const sub of subChunks){
                chunks.push({
                    id: `${filename}-chunk-${chunkIndex}`,
                    docType,
                    title,
                    content: sub
                });
                chunkIndex++;
            }
        }
        if (chunks.length === 0) {
            const subChunks = this.splitBySize(content, 800, 1500);
            subChunks.forEach((sub, idx)=>{
                chunks.push({
                    id: `${filename}-chunk-${idx}`,
                    docType,
                    title: filename.replace('.txt', '').replace(/_/g, ' '),
                    content: sub
                });
            });
        }
        return chunks;
    }
    splitBySize(text, minSize, maxSize) {
        if (text.length <= maxSize) return [
            text
        ];
        const chunks = [];
        let remaining = text;
        while(remaining.length > 0){
            if (remaining.length <= maxSize) {
                chunks.push(remaining);
                break;
            }
            let splitPoint = remaining.lastIndexOf('\n', maxSize);
            if (splitPoint < minSize) {
                splitPoint = remaining.lastIndexOf(' ', maxSize);
            }
            if (splitPoint < minSize) {
                splitPoint = maxSize;
            }
            chunks.push(remaining.substring(0, splitPoint).trim());
            remaining = remaining.substring(splitPoint).trim();
        }
        return chunks;
    }
    inferDocType(filename) {
        const name = filename.toLowerCase();
        if (name.includes('security')) return 'security';
        if (name.includes('network')) return 'network';
        if (name.includes('infrastructure')) return 'infrastructure';
        if (name.includes('database')) return 'database';
        if (name.includes('cloud')) return 'cloud';
        if (name.includes('email')) return 'email';
        if (name.includes('monitoring')) return 'monitoring';
        if (name.includes('storage') || name.includes('backup')) return 'storage';
        if (name.includes('access') || name.includes('user')) return 'access';
        if (name.includes('slack') || name.includes('collaboration')) return 'collaboration';
        if (name.includes('ticket') || name.includes('classification')) return 'classification';
        return 'general';
    }
    constructor(vectorSearchService){
        this.vectorSearchService = vectorSearchService;
        this.logger = new _common.Logger(KnowledgeLoaderService.name);
        this.knowledgeBasePath = _path.resolve(process.cwd(), 'knowledge_base');
    }
};
KnowledgeLoaderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _vectorsearchservice.VectorSearchService === "undefined" ? Object : _vectorsearchservice.VectorSearchService
    ])
], KnowledgeLoaderService);

//# sourceMappingURL=knowledge-loader.service.js.map