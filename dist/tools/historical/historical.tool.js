"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createHistoricalTool", {
    enumerable: true,
    get: function() {
        return createHistoricalTool;
    }
});
const _tools = require("@langchain/core/tools");
const _zod = require("zod");
function createHistoricalTool(historicalService) {
    return new _tools.DynamicStructuredTool({
        name: 'query_historical',
        description: 'Queries historical resolved tickets using natural language to find similar past cases and their resolutions. Use this for complex P1/P2 issues or when additional context from past incidents would help.',
        schema: _zod.z.object({
            question: _zod.z.string().describe('Natural language question about historical tickets, e.g. "database outage" or "VPN connectivity issues"')
        }),
        func: async ({ question })=>{
            const results = await historicalService.query(question);
            return JSON.stringify(results, null, 2);
        }
    });
}

//# sourceMappingURL=historical.tool.js.map