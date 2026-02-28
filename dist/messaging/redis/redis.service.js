"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RedisService", {
    enumerable: true,
    get: function() {
        return RedisService;
    }
});
const _common = require("@nestjs/common");
const _redis = require("redis");
const _rxjs = require("rxjs");
const _config = require("@nestjs/config");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RedisService = class RedisService {
    async onModuleInit() {
        const redisConfigs = {
            username: this.configService.get('REDIS_USERNAME') || 'default',
            password: this.configService.get('REDIS_PASSWORD') || '',
            socket: {
                host: this.configService.get('REDIS_HOST') || 'localhost',
                port: this.configService.get('REDIS_PORT') || 6379
            }
        };
        this.publisher = (0, _redis.createClient)(redisConfigs);
        this.subscriber = (0, _redis.createClient)(redisConfigs);
        await this.publisher.connect();
        await this.subscriber.connect();
    }
    async onModuleDestroy() {
        await this.publisher.quit();
        await this.subscriber.quit();
    }
    async publish(channel, message) {
        await this.publisher.publish(channel, message);
    }
    subscribe(channel) {
        return new _rxjs.Observable((subscriber)=>{
            const messageHandler = (msg)=>subscriber.next(msg);
            this.subscriber.subscribe(channel, messageHandler);
            // Cleanup on unsubscribe
            return ()=>{
                this.subscriber.unsubscribe(channel, messageHandler);
            };
        });
    }
    constructor(configService){
        this.configService = configService;
    }
};
RedisService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], RedisService);

//# sourceMappingURL=redis.service.js.map