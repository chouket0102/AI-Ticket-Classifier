"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createExtractionTool", {
    enumerable: true,
    get: function() {
        return createExtractionTool;
    }
});
const _tools = require("@langchain/core/tools");
const _zod = require("zod");
function createExtractionTool(extractionService) {
    return new _tools.DynamicStructuredTool({
        name: 'extract_metadata',
        description: 'Extracts detailed metadata from a support ticket including priority score, urgency level, affected systems, technical keywords, user impact, and escalation requirements. Use after classification.',
        schema: _zod.z.object({
            ticket_text: _zod.z.string().describe('The support ticket text to extract metadata from')
        }),
        func: async ({ ticket_text })=>{
            return extractionService.extract(ticket_text);
        }
    });
}

//# sourceMappingURL=extraction.tool.js.map