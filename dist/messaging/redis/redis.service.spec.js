"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _redisservice = require("./redis.service");
const _config = require("@nestjs/config");
describe('RedisService', ()=>{
    let service;
    let mockConfigService;
    beforeEach(async ()=>{
        mockConfigService = {
            get: jest.fn()
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _redisservice.RedisService,
                {
                    provide: _config.ConfigService,
                    useValue: mockConfigService
                }
            ]
        }).compile();
        service = module.get(_redisservice.RedisService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});

//# sourceMappingURL=redis.service.spec.js.map