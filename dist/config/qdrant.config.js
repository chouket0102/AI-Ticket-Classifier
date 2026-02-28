"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _config = require("@nestjs/config");
const _default = (0, _config.registerAs)('qdrant', ()=>({
        host: process.env.QDRANT_HOST || 'localhost',
        port: parseInt(process.env.QDRANT_PORT || '6333', 10),
        collectionName: process.env.QDRANT_COLLECTION || 'knowledge_base'
    }));

//# sourceMappingURL=qdrant.config.js.map