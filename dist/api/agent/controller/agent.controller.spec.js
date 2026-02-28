"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _agentcontroller = require("./agent.controller");
const _agentservice = require("../service/agent/agent.service");
describe('AgentController', ()=>{
    let controller;
    let agentService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            controllers: [
                _agentcontroller.AgentController
            ],
            providers: [
                {
                    provide: _agentservice.AgentService,
                    useValue: {
                        analyzeTicket: jest.fn(),
                        chat: jest.fn(),
                        stream: jest.fn(),
                        getHistory: jest.fn()
                    }
                }
            ]
        }).compile();
        controller = module.get(_agentcontroller.AgentController);
        agentService = module.get(_agentservice.AgentService);
    });
    it('should be defined', ()=>{
        expect(controller).toBeDefined();
    });
    describe('analyzeTicket', ()=>{
        it('should call agentService.analyzeTicket with the provided DTO', async ()=>{
            const ticketDto = {
                threadId: 'thread-1',
                ticketText: 'Production database is down and all services are affected'
            };
            const mockResponse = {
                threadId: 'thread-1',
                classification: {
                    category: 'Infrastructure',
                    priority: 'P1-Critical',
                    assigned_team: 'Database',
                    confidence: 0.95
                },
                metadata: undefined,
                knowledge_articles: [],
                historical_tickets: [],
                recommendations: {
                    summary: 'Critical infrastructure issue',
                    immediate_actions: [
                        'Check DB connectivity'
                    ],
                    resolution_steps: [
                        'Restart database service'
                    ],
                    estimated_resolution_time: '2 hours',
                    escalation_needed: true
                },
                tools_used: [
                    'classify_ticket',
                    'extract_metadata'
                ],
                complexity_assessment: 'complex',
                raw_response: '{}',
                processing_time_ms: 3500
            };
            agentService.analyzeTicket.mockResolvedValue(mockResponse);
            const result = await controller.analyzeTicket(ticketDto);
            expect(agentService.analyzeTicket).toHaveBeenCalledWith(ticketDto);
            expect(result.threadId).toBe('thread-1');
            expect(result.classification?.priority).toBe('P1-Critical');
            expect(result.processing_time_ms).toBe(3500);
        });
    });
    describe('chat', ()=>{
        it('should call agentService.chat', async ()=>{
            const messageDto = {
                threadId: 'thread-1',
                type: 'human',
                content: [
                    {
                        type: 'text',
                        text: 'Hello'
                    }
                ]
            };
            agentService.chat.mockResolvedValue({
                id: 'msg-1',
                type: 'ai',
                content: 'Hello!'
            });
            const result = await controller.chat(messageDto);
            expect(result.id).toBe('msg-1');
            expect(agentService.chat).toHaveBeenCalledWith(messageDto);
        });
    });
    describe('getHistory', ()=>{
        it('should call agentService.getHistory', async ()=>{
            agentService.getHistory.mockResolvedValue([
                {
                    id: 'msg-1',
                    type: 'human',
                    content: 'Hello'
                },
                {
                    id: 'msg-2',
                    type: 'ai',
                    content: 'Hi there'
                }
            ]);
            const result = await controller.getHistory('thread-1');
            expect(result).toHaveLength(2);
            expect(agentService.getHistory).toHaveBeenCalledWith('thread-1');
        });
    });
});

//# sourceMappingURL=agent.controller.spec.js.map