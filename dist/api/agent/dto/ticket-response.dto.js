"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get ClassificationDto () {
        return ClassificationDto;
    },
    get HistoricalTicketDto () {
        return HistoricalTicketDto;
    },
    get KnowledgeArticleDto () {
        return KnowledgeArticleDto;
    },
    get MetadataDto () {
        return MetadataDto;
    },
    get RecommendationsDto () {
        return RecommendationsDto;
    },
    get TicketAnalysisResponseDto () {
        return TicketAnalysisResponseDto;
    }
});
const _swagger = require("@nestjs/swagger");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ClassificationDto = class ClassificationDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    _ts_metadata("design:type", String)
], ClassificationDto.prototype, "category", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    _ts_metadata("design:type", String)
], ClassificationDto.prototype, "priority", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    _ts_metadata("design:type", String)
], ClassificationDto.prototype, "assigned_team", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    _ts_metadata("design:type", Number)
], ClassificationDto.prototype, "confidence", void 0);
let MetadataDto = class MetadataDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    _ts_metadata("design:type", Number)
], MetadataDto.prototype, "priority_score", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    _ts_metadata("design:type", String)
], MetadataDto.prototype, "urgency_level", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        type: [
            String
        ]
    }),
    _ts_metadata("design:type", Array)
], MetadataDto.prototype, "affected_systems", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        type: [
            String
        ]
    }),
    _ts_metadata("design:type", Array)
], MetadataDto.prototype, "technical_keywords", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    _ts_metadata("design:type", String)
], MetadataDto.prototype, "user_impact", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    _ts_metadata("design:type", Boolean)
], MetadataDto.prototype, "requires_escalation", void 0);
let KnowledgeArticleDto = class KnowledgeArticleDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    _ts_metadata("design:type", String)
], KnowledgeArticleDto.prototype, "title", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    _ts_metadata("design:type", String)
], KnowledgeArticleDto.prototype, "relevance", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        type: [
            String
        ]
    }),
    _ts_metadata("design:type", Array)
], KnowledgeArticleDto.prototype, "key_steps", void 0);
let HistoricalTicketDto = class HistoricalTicketDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    _ts_metadata("design:type", String)
], HistoricalTicketDto.prototype, "ticket_id", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    _ts_metadata("design:type", String)
], HistoricalTicketDto.prototype, "similarity", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    _ts_metadata("design:type", String)
], HistoricalTicketDto.prototype, "resolution", void 0);
let RecommendationsDto = class RecommendationsDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    _ts_metadata("design:type", String)
], RecommendationsDto.prototype, "summary", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        type: [
            String
        ]
    }),
    _ts_metadata("design:type", Array)
], RecommendationsDto.prototype, "immediate_actions", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        type: [
            String
        ]
    }),
    _ts_metadata("design:type", Array)
], RecommendationsDto.prototype, "resolution_steps", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    _ts_metadata("design:type", String)
], RecommendationsDto.prototype, "estimated_resolution_time", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    _ts_metadata("design:type", Boolean)
], RecommendationsDto.prototype, "escalation_needed", void 0);
let TicketAnalysisResponseDto = class TicketAnalysisResponseDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    _ts_metadata("design:type", String)
], TicketAnalysisResponseDto.prototype, "threadId", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        type: ClassificationDto
    }),
    _ts_metadata("design:type", typeof ClassificationDto === "undefined" ? Object : ClassificationDto)
], TicketAnalysisResponseDto.prototype, "classification", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        type: MetadataDto
    }),
    _ts_metadata("design:type", typeof MetadataDto === "undefined" ? Object : MetadataDto)
], TicketAnalysisResponseDto.prototype, "metadata", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        type: [
            KnowledgeArticleDto
        ]
    }),
    _ts_metadata("design:type", Array)
], TicketAnalysisResponseDto.prototype, "knowledge_articles", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        type: [
            HistoricalTicketDto
        ]
    }),
    _ts_metadata("design:type", Array)
], TicketAnalysisResponseDto.prototype, "historical_tickets", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        type: RecommendationsDto
    }),
    _ts_metadata("design:type", typeof RecommendationsDto === "undefined" ? Object : RecommendationsDto)
], TicketAnalysisResponseDto.prototype, "recommendations", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        type: [
            String
        ]
    }),
    _ts_metadata("design:type", Array)
], TicketAnalysisResponseDto.prototype, "tools_used", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    _ts_metadata("design:type", String)
], TicketAnalysisResponseDto.prototype, "complexity_assessment", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    _ts_metadata("design:type", String)
], TicketAnalysisResponseDto.prototype, "raw_response", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)(),
    _ts_metadata("design:type", Number)
], TicketAnalysisResponseDto.prototype, "processing_time_ms", void 0);

//# sourceMappingURL=ticket-response.dto.js.map