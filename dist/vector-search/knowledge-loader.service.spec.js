"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _knowledgeloaderservice = require("./knowledge-loader.service");
const _fs = /*#__PURE__*/ _interop_require_wildcard(require("fs"));
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
jest.mock('fs');
describe('KnowledgeLoaderService', ()=>{
    let service;
    let mockVectorSearchService;
    const FAKE_KB_PATH = '/fake/knowledge_base';
    beforeEach(()=>{
        jest.clearAllMocks();
        _fs.existsSync.mockReturnValue(true);
        _fs.readdirSync.mockReturnValue([
            'doc1.txt'
        ]);
        _fs.readFileSync.mockReturnValue('Sample document content for testing purposes. This covers database troubleshooting.');
        mockVectorSearchService = {
            getCollectionInfo: jest.fn(),
            upsertDocuments: jest.fn().mockResolvedValue(undefined),
            search: jest.fn(),
            ensureCollection: jest.fn()
        };
        service = new _knowledgeloaderservice.KnowledgeLoaderService(mockVectorSearchService);
        service.knowledgeBasePath = FAKE_KB_PATH;
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    it('should skip loading if collection already populated', async ()=>{
        mockVectorSearchService.getCollectionInfo.mockResolvedValue({
            points_count: 100
        });
        const count = await service.loadKnowledgeBase();
        expect(count).toBe(100);
        expect(mockVectorSearchService.upsertDocuments).not.toHaveBeenCalled();
    });
    it('should load documents when collection is empty', async ()=>{
        mockVectorSearchService.getCollectionInfo.mockResolvedValue({
            points_count: 0
        });
        mockVectorSearchService.upsertDocuments.mockResolvedValue(undefined);
        const count = await service.loadKnowledgeBase();
        expect(count).toBeGreaterThan(0);
        expect(mockVectorSearchService.upsertDocuments).toHaveBeenCalled();
    });
    it('should handle missing knowledge base directory', async ()=>{
        _fs.existsSync.mockReturnValue(false);
        const customService = new _knowledgeloaderservice.KnowledgeLoaderService(mockVectorSearchService);
        customService.knowledgeBasePath = '/nonexistent/path';
        const count = await customService.loadKnowledgeBase();
        expect(count).toBe(0);
    });
});

//# sourceMappingURL=knowledge-loader.service.spec.js.map