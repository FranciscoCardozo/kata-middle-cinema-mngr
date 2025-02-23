"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_openapi_validate_1 = require("express-openapi-validate");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var OpenApiValidatorProvider = /** @class */ (function () {
    function OpenApiValidatorProvider() {
    }
    OpenApiValidatorProvider.getValidator = function () {
        var openApiSpecificationFile = path_1.default.join(__dirname, '../../static/api.json');
        var openApiSpecification = fs_1.default.readFileSync(openApiSpecificationFile, 'utf-8');
        var openApiDocument = JSON.parse(openApiSpecification);
        return new express_openapi_validate_1.OpenApiValidator(openApiDocument);
    };
    return OpenApiValidatorProvider;
}());
exports.default = OpenApiValidatorProvider;
