"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createKnowledgeTool", {
    enumerable: true,
    get: function() {
        return createKnowledgeTool;
    }
});
const _tools = require("@langchain/core/tools");
const _zod = require("zod");
function createKnowledgeTool(vectorSearchService) {
    return new _tools.DynamicStructuredTool({
        name: 'search_knowledge',
        description: 'Searches the knowledge base for relevant articles, documentation, and solutions using semantic vector search. Returns top matching documents with titles and content excerpts.',
        schema: _zod.z.object({
            query: _zod.z.string().describe('The search query to find relevant knowledge base documentation')
        }),
        func: async ({ query })=>{
            const results = await vectorSearchService.search(query, 3);
            return JSON.stringify(results, null, 2);
        }
    });
}

//# sourceMappingURL=knowledge.tool.js.map