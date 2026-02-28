"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ToolsModule", {
    enumerable: true,
    get: function() {
        return ToolsModule;
    }
});
const _common = require("@nestjs/common");
const _classificationservice = require("./classification/classification.service");
const _extractionservice = require("./extraction/extraction.service");
const _historicalservice = require("./historical/historical.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ToolsModule = class ToolsModule {
};
ToolsModule = _ts_decorate([
    (0, _common.Module)({
        providers: [
            _classificationservice.ClassificationService,
            _extractionservice.ExtractionService,
            _historicalservice.HistoricalService
        ],
        exports: [
            _classificationservice.ClassificationService,
            _extractionservice.ExtractionService,
            _historicalservice.HistoricalService
        ]
    })
], ToolsModule);

//# sourceMappingURL=tools.module.js.map