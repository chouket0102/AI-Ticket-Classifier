"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _config = require("@nestjs/config");
const _extractionservice = require("./extraction.service");
describe('ExtractionService', ()=>{
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
                _extractionservice.ExtractionService,
                {
                    provide: _config.ConfigService,
                    useValue: mockConfigService
                }
            ]
        }).compile();
        service = module.get(_extractionservice.ExtractionService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    it('should return fallback JSON on extraction failure', async ()=>{
        jest.spyOn(service['llm'], 'invoke').mockRejectedValue(new Error('API failure'));
        const result = await service.extract('test ticket');
        const parsed = JSON.parse(result);
        expect(parsed.error).toBe('Extraction failed');
        expect(parsed.priority_score).toBe(0.5);
        expect(parsed.urgency_level).toBe('Medium');
        expect(parsed.affected_systems).toEqual([]);
        expect(parsed.requires_escalation).toBe(false);
    });
    it('should return extraction results from successful call', async ()=>{
        const mockResult = JSON.stringify({
            priority_score: 0.92,
            urgency_level: 'Critical',
            affected_systems: [
                'Production DB',
                'API Gateway'
            ],
            technical_keywords: [
                'database',
                'connection pool',
                'timeout'
            ],
            user_impact: 'Organization',
            requires_escalation: true
        });
        jest.spyOn(service['llm'], 'invoke').mockResolvedValue({
            content: mockResult
        });
        const result = await service.extract('Production database is down');
        const parsed = JSON.parse(result);
        expect(parsed.priority_score).toBe(0.92);
        expect(parsed.urgency_level).toBe('Critical');
        expect(parsed.affected_systems).toContain('Production DB');
        expect(parsed.requires_escalation).toBe(true);
    });
});

//# sourceMappingURL=extraction.service.spec.js.map