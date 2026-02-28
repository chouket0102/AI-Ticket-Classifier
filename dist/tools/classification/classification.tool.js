"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createClassificationTool", {
    enumerable: true,
    get: function() {
        return createClassificationTool;
    }
});
const _tools = require("@langchain/core/tools");
const _zod = require("zod");
function createClassificationTool(classificationService) {
    return new _tools.DynamicStructuredTool({
        name: 'classify_ticket',
        description: 'Classifies a support ticket into category, priority, and routing team. Use this FIRST for every ticket analysis.',
        schema: _zod.z.object({
            ticket_text: _zod.z.string().describe('The support ticket text to classify')
        }),
        func: async ({ ticket_text })=>{
            return classificationService.classify(ticket_text);
        }
    });
}

//# sourceMappingURL=classification.tool.js.map