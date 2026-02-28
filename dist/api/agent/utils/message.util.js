"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessageUtil", {
    enumerable: true,
    get: function() {
        return MessageUtil;
    }
});
const _messages = require("@langchain/core/messages");
let MessageUtil = class MessageUtil {
    static toHumanMessages(message) {
        const messages = [];
        for (const content of message.content){
            if (content?.type === 'text' && content?.text) {
                messages.push(new _messages.HumanMessage(content.text));
            } else {
                // Handle other content types as needed
                throw new Error(`Unsupported content type: ${content.type}`);
            }
        }
        return messages;
    }
};

//# sourceMappingURL=message.util.js.map