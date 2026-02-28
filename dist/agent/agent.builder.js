"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ReactAgentBuilder", {
    enumerable: true,
    get: function() {
        return ReactAgentBuilder;
    }
});
const _langgraph = require("@langchain/langgraph");
const _prebuilt = require("@langchain/langgraph/prebuilt");
const _messages = require("@langchain/core/messages");
const _prompts = require("./prompts");
let ReactAgentBuilder = class ReactAgentBuilder {
    shouldContinue(state) {
        const { messages } = state;
        const lastMessage = messages[messages.length - 1];
        if ('tool_calls' in lastMessage && Array.isArray(lastMessage.tool_calls) && lastMessage.tool_calls?.length) {
            return 'tools';
        }
        return _langgraph.END;
    }
    async callModel(state) {
        if (!this.model || !this.model.bindTools) {
            throw new Error('Invalid or missing language model (llm)');
        }
        const messages = [
            // Add always system prompt so it is not duplicated in the messages
            new _messages.SystemMessage(_prompts.REACT_AGENT_SYSTEM_PROMPT),
            ...state.messages
        ];
        const modelInvoker = this.model.bindTools(this.tools);
        const response = await modelInvoker.invoke(messages);
        return {
            messages: response
        };
    }
    initializeGraph() {
        this.stateGraph.addNode('agent', this.callModel.bind(this)).addNode('tools', this.toolNode).addEdge(_langgraph.START, 'agent').addConditionalEdges('agent', this.shouldContinue.bind(this), [
            'tools',
            _langgraph.END
        ]).addEdge('tools', 'agent');
    }
    /**
   * Builds and compiles the state graph for the agent.
   * @returns {CompiledStateGraph<typeof MessagesAnnotation, any>} The compiled state graph.
   */ build(checkpointer) {
        return this.stateGraph.compile(checkpointer ? {
            checkpointer: checkpointer
        } : {});
    }
    constructor(tools, llm){
        if (!llm) {
            throw new Error('Language model (llm) is required');
        }
        this.tools = tools || [];
        this.toolNode = new _prebuilt.ToolNode(tools || []);
        this.model = llm;
        this.stateGraph = new _langgraph.StateGraph(_langgraph.MessagesAnnotation);
        this.initializeGraph();
    }
};

//# sourceMappingURL=agent.builder.js.map