"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _config = require("@nestjs/config");
const _classificationservice = require("./classification.service");
describe('ClassificationService', ()=>{
    let service;
    let mockConfigService;
    beforeEach(async ()=>{
        mockConfigService = {
            get: jest.fn((key)=>{
                const config = {
                    AZURE_OPENAI_API_KEY: 'test-key',
                    AZURE_OPENAI_ENDPOINT: 'https://test.openai.azure.com',
                    AZURE_OPENAI_DEPLOYMENT_NAME: 'gpt-4o',
                    AZURE_OPENAI_API_VERSION: '2024-08-01-preview'
                };
                return config[key];
            })
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _classificationservice.ClassificationService,
                {
                    provide: _config.ConfigService,
                    useValue: mockConfigService
                }
            ]
        }).compile();
        service = module.get(_classificationservice.ClassificationService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    it('should return fallback JSON on classification failure', async ()=>{
        jest.spyOn(service['llm'], 'invoke').mockRejectedValue(new Error('API failure'));
        const result = await service.classify('test ticket');
        const parsed = JSON.parse(result);
        expect(parsed.error).toBe('Classification failed');
        expect(parsed.category).toBe('Unknown');
        expect(parsed.priority).toBe('P3-Medium');
        expect(parsed.assigned_team).toBe('End User Support');
        expect(parsed.confidence).toBe(0);
    });
    it('should return string content from successful classification', async ()=>{
        const mockResult = JSON.stringify({
            category: 'Software',
            priority: 'P2-High',
            assigned_team: 'Applications',
            confidence: 0.85
        });
        jest.spyOn(service['llm'], 'invoke').mockResolvedValue({
            content: mockResult
        });
        const result = await service.classify('Application crashing on startup');
        const parsed = JSON.parse(result);
        expect(parsed.category).toBe('Software');
        expect(parsed.priority).toBe('P2-High');
        expect(parsed.assigned_team).toBe('Applications');
        expect(parsed.confidence).toBe(0.85);
    });
});

//# sourceMappingURL=classification.service.spec.js.map