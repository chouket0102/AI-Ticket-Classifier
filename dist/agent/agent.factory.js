"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentFactory", {
    enumerable: true,
    get: function() {
        return AgentFactory;
    }
});
const _openai = require("@langchain/openai");
const _dotenv = /*#__PURE__*/ _interop_require_wildcard(require("dotenv"));
const _modelproviderenum = require("./enum/model-provider.enum");
const _agentbuilder = require("./agent.builder");
const _googlegenai = require("@langchain/google-genai");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
_dotenv.config();
let AgentFactory = class AgentFactory {
    static createAgent(modelProvider, tools, checkpointer) {
        if (!modelProvider) {
            throw new Error('Model provider is required');
        }
        switch(modelProvider){
            case _modelproviderenum.ModelProvider.OPENAI:
                {
                    return new _agentbuilder.ReactAgentBuilder(tools, new _openai.ChatOpenAI({
                        model: process.env.OPENAI_MODEL
                    })).build(checkpointer);
                }
            case _modelproviderenum.ModelProvider.GOOGLE:
                {
                    return new _agentbuilder.ReactAgentBuilder(tools, new _googlegenai.ChatGoogleGenerativeAI({
                        model: process.env.GOOGLE_GENAI_MODEL || ''
                    })).build(checkpointer);
                }
            case _modelproviderenum.ModelProvider.AZURE_OPENAI:
                {
                    return new _agentbuilder.ReactAgentBuilder(tools, new _openai.AzureChatOpenAI({
                        azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
                        azureOpenAIApiInstanceName: AgentFactory.extractInstanceName(process.env.AZURE_OPENAI_ENDPOINT || ''),
                        azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o',
                        azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION || '2024-08-01-preview',
                        temperature: 0.1,
                        maxTokens: 4000
                    })).build(checkpointer);
                }
        }
    }
    static extractInstanceName(endpoint) {
        const match = endpoint.match(/https:\/\/([^.]+)\.openai\.azure\.com/);
        return match ? match[1] : endpoint;
    }
};

//# sourceMappingURL=agent.factory.js.map