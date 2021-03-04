"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.Validator = exports.ValidationError = void 0;
var validator_1 = require("validator");
var moment = require("moment");
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(errors) {
        var _this = _super.call(this, "validation error") || this;
        _this.errors = errors;
        Object.setPrototypeOf(_this, ValidationError.prototype);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, ValidationError);
        }
        _this.name = "ValidationError";
        return _this;
    }
    ValidationError.prototype.get = function () {
        return this.errors;
    };
    return ValidationError;
}(Error));
exports.ValidationError = ValidationError;
var Validator = /** @class */ (function () {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    function Validator(data, rules) {
        this.data = data;
        this.rules = rules;
        this.errors = {};
        this.values = {};
    }
    /**
     * エラー時のメッセージを変更する。
     * @param {Partial<ErrorLabels>} errorLabels エラーラベル情報
     */
    Validator.changeErrorLabels = function (errorLabels) {
        this.errorLabels = __assign(__assign({}, this.errorLabels), errorLabels);
    };
    /**
     * validationしたのちにエラーもしくは、整形したデータを返却するmethod
     * @param {{}} data
     * @param {Rule[]} rules
     * @returns {T}
     */
    Validator.parse = function (data, rules) {
        return __awaiter(this, void 0, void 0, function () {
            var v, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        v = new Validator(data, rules);
                        return [4 /*yield*/, v.execute()];
                    case 1:
                        response = _a.sent();
                        if ("errors" in response) {
                            throw new ValidationError(response.errors);
                        }
                        return [2 /*return*/, response.values];
                }
            });
        });
    };
    /**
     * validationしたのちにエラーもしくは、整形したデータを返却するmethod
     * @param {{}} data
     * @param {Rule[]} rules
     * @returns {ValidateResponse<T>}
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    Validator.validate = function (data, rules) {
        return __awaiter(this, void 0, void 0, function () {
            var v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        v = new Validator(data, rules);
                        return [4 /*yield*/, v.execute()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Validator.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, key, rule, e_1_1;
            var e_1, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 5, 6, 7]);
                        _a = __values(Object.entries(this.rules)), _b = _a.next();
                        _e.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 4];
                        _c = __read(_b.value, 2), key = _c[0], rule = _c[1];
                        return [4 /*yield*/, this.setValue(key, rule)];
                    case 2:
                        _e.sent();
                        _e.label = 3;
                    case 3:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (_b && !_b.done && (_d = _a["return"])) _d.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 7:
                        if (Object.keys(this.errors).length) {
                            return [2 /*return*/, { errors: this.errors }];
                        }
                        return [2 /*return*/, { values: this.values }];
                }
            });
        });
    };
    Validator.prototype.set = function (key, value, convert) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!convert) return [3 /*break*/, 2];
                        _a = this.values;
                        _b = key;
                        return [4 /*yield*/, convert(value)];
                    case 1:
                        _a[_b] = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.values[key] = value;
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Validator.prototype.setValue = function (key, rule) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, value;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(!this.data || typeof this.data !== "object" || !(key in this.data))) return [3 /*break*/, 6];
                        // defaultのセットがある場合は、その値が使える。
                        if (rule.isOptional)
                            return [2 /*return*/];
                        if (!(rule.defaultValue !== undefined)) return [3 /*break*/, 4];
                        _a = this.values;
                        _b = key;
                        if (!(typeof rule.defaultValue === "function")) return [3 /*break*/, 2];
                        return [4 /*yield*/, rule.defaultValue()];
                    case 1:
                        _c = _d.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = rule.defaultValue;
                        _d.label = 3;
                    case 3:
                        _a[_b] = _c;
                        return [3 /*break*/, 5];
                    case 4:
                        this.addErrorObject(key, this.replaceErrorMessage(rule));
                        _d.label = 5;
                    case 5: return [2 /*return*/];
                    case 6:
                        value = this.data[key];
                        // nestの処理
                        if (rule.type === "nest") {
                            return [2 /*return*/, this.setNestValue(key, value, rule)];
                        }
                        // array-nestの処理
                        if (rule.type === "arrayNest") {
                            return [2 /*return*/, this.setNestArrayValue(key, value, rule)];
                        }
                        if (rule.type === "indexSignature") {
                            return [2 /*return*/, this.setIndexSignatureValue(key, value, rule)];
                        }
                        if (rule.type === "indexSignatureObject") {
                            return [2 /*return*/, this.setIndexSignatureObjectValue(key, value, rule)];
                        }
                        if (rule.type === "indexSignatureArray") {
                            return [2 /*return*/, this.setIndexSignatureArrayValue(key, value, rule)];
                        }
                        if (rule.type === "customAll") {
                            return [2 /*return*/, this.setCustomAllValue(key, value, this.data, rule)];
                        }
                        if (rule.type === "custom") {
                            return [2 /*return*/, this.setCustomValue(key, value, rule)];
                        }
                        if (rule.type === "array") {
                            return [2 /*return*/, this.setArrayValue(key, value, rule)];
                        }
                        return [4 /*yield*/, this.isValid(value, rule)];
                    case 7:
                        // 上記以外
                        if (!(_d.sent())) {
                            return [2 /*return*/, this.addErrorObject(key, this.replaceErrorMessage(rule))];
                        }
                        // this.values[key] = value;
                        return [4 /*yield*/, this.set(key, value, rule.convert)];
                    case 8:
                        // this.values[key] = value;
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Validator.prototype.setNestValue = function (key, value, rule) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Validator.validate(value, rule.rules)];
                    case 1:
                        response = _a.sent();
                        if (!("errors" in response)) return [3 /*break*/, 2];
                        this.addErrorObject(key, response.errors);
                        return [3 /*break*/, 4];
                    case 2: 
                    // this.values[key] = response.values;
                    return [4 /*yield*/, this.set(key, response.values, rule.convert)];
                    case 3:
                        // this.values[key] = response.values;
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Validator.prototype.setNestArrayValue = function (key, value, rule) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, values, errors, index, value_1, value_1_1, v, response, e_2_1;
            var e_2, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!Array.isArray(value)) {
                            return [2 /*return*/, this.addErrorObject(key, this.replaceErrorMessage(rule))];
                        }
                        if (!(value.length === 0)) return [3 /*break*/, 6];
                        if (!rule.isOptional) return [3 /*break*/, 1];
                        this.values[key] = value;
                        return [2 /*return*/];
                    case 1:
                        if (!rule.defaultValue) return [3 /*break*/, 5];
                        _a = this.values;
                        _b = key;
                        if (!(typeof rule.defaultValue === "function")) return [3 /*break*/, 3];
                        return [4 /*yield*/, rule.defaultValue()];
                    case 2:
                        _c = _e.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _c = rule.defaultValue;
                        _e.label = 4;
                    case 4:
                        _a[_b] = _c;
                        return [2 /*return*/];
                    case 5: return [2 /*return*/, this.addErrorObject(key, this.replaceErrorMessage(rule))];
                    case 6:
                        values = [];
                        errors = {};
                        index = 0;
                        _e.label = 7;
                    case 7:
                        _e.trys.push([7, 12, 13, 14]);
                        value_1 = __values(value), value_1_1 = value_1.next();
                        _e.label = 8;
                    case 8:
                        if (!!value_1_1.done) return [3 /*break*/, 11];
                        v = value_1_1.value;
                        return [4 /*yield*/, Validator.validate(v, rule.rules)];
                    case 9:
                        response = _e.sent();
                        if ("errors" in response) {
                            errors[index] = response.errors;
                        }
                        else {
                            values.push(response.values);
                        }
                        index++;
                        _e.label = 10;
                    case 10:
                        value_1_1 = value_1.next();
                        return [3 /*break*/, 8];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        e_2_1 = _e.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 14];
                    case 13:
                        try {
                            if (value_1_1 && !value_1_1.done && (_d = value_1["return"])) _d.call(value_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 14:
                        if (Object.values(errors).length) {
                            this.addErrorObject(key, errors);
                        }
                        else {
                            // this.values[key] = values;
                            this.set(key, values, rule.convert);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Validator.prototype.setArrayValue = function (key, value, rule) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, values, errors, index, value_2, value_2_1, v, tmp, e_3_1, rules, response;
            var e_3, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        /**
                         * 以下の場合は、optionalじゃないとエラーとする。
                         *  1. 値がない
                         *  2. 配列じゃない
                         */
                        if (!value || !Array.isArray(value)) {
                            if (rule.isOptional)
                                return [2 /*return*/];
                            return [2 /*return*/, this.addErrorObject(key, this.replaceErrorMessage(rule))];
                        }
                        if (!(value.length === 0)) return [3 /*break*/, 6];
                        /**
                         * 以下の場合のみ有効
                         *  1. optionalである・・・空の配列がリクエストされているので、空の配列を返す
                         *  2. defaultValueがある・・・defaultValuに準ずる。
                         */
                        if (rule.isOptional) {
                            this.values[key] = value;
                            return [2 /*return*/];
                        }
                        if (!(rule.defaultValue !== undefined)) return [3 /*break*/, 4];
                        _a = this.values;
                        _b = key;
                        if (!(typeof rule.defaultValue === "function")) return [3 /*break*/, 2];
                        return [4 /*yield*/, rule.defaultValue()];
                    case 1:
                        _c = _e.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _c = rule.defaultValue;
                        _e.label = 3;
                    case 3:
                        _a[_b] = _c;
                        return [3 /*break*/, 5];
                    case 4:
                        this.addErrorObject(key, this.replaceErrorMessage(rule));
                        _e.label = 5;
                    case 5: return [2 /*return*/];
                    case 6:
                        values = [];
                        errors = {};
                        index = 0;
                        _e.label = 7;
                    case 7:
                        _e.trys.push([7, 12, 13, 14]);
                        value_2 = __values(value), value_2_1 = value_2.next();
                        _e.label = 8;
                    case 8:
                        if (!!value_2_1.done) return [3 /*break*/, 11];
                        v = value_2_1.value;
                        tmp = __assign(__assign({}, rule.rule), { label: "" + (rule.rule.label || rule.label) });
                        return [4 /*yield*/, this.isValid(value, tmp)];
                    case 9:
                        if (!(_e.sent())) {
                            errors[index] = this.replaceErrorMessage(tmp);
                        }
                        else {
                            values.push(v);
                        }
                        index++;
                        _e.label = 10;
                    case 10:
                        value_2_1 = value_2.next();
                        return [3 /*break*/, 8];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        e_3_1 = _e.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 14];
                    case 13:
                        try {
                            if (value_2_1 && !value_2_1.done && (_d = value_2["return"])) _d.call(value_2);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 14:
                        rules = value.reduce(function (a, _, index) {
                            var _a;
                            return __assign(__assign({}, a), (_a = {}, _a[index.toString()] = __assign(__assign({}, rule.rule), { label: index + 1 + "\u3064\u76EE\u306E" + rule.label }), _a));
                        }, {});
                        return [4 /*yield*/, Validator.validate(value, rules)];
                    case 15:
                        response = _e.sent();
                        if ("errors" in response) {
                            this.addErrorObject(key, response.errors);
                        }
                        else {
                            this.set(key, Object.values(response.values), rule.convert);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Validator.prototype.setIndexSignatureValue = function (key, value, rule) {
        return __awaiter(this, void 0, void 0, function () {
            var values, errors, targetValues, targetValues_1, targetValues_1_1, _a, k, v, tmp, e_4_1;
            var e_4, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!value || typeof value !== "object") {
                            if (rule.isOptional)
                                return [2 /*return*/];
                            return [2 /*return*/];
                        }
                        values = {};
                        errors = {};
                        targetValues = Object.entries(value);
                        if (targetValues.length === 0) {
                            return [2 /*return*/, this.addErrorObject(key, this.replaceErrorMessage(rule))];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, 7, 8]);
                        targetValues_1 = __values(targetValues), targetValues_1_1 = targetValues_1.next();
                        _c.label = 2;
                    case 2:
                        if (!!targetValues_1_1.done) return [3 /*break*/, 5];
                        _a = __read(targetValues_1_1.value, 2), k = _a[0], v = _a[1];
                        tmp = __assign(__assign({}, rule.rule), { label: "" + (rule.rule.label || rule.label) });
                        return [4 /*yield*/, this.isValid(v, tmp)];
                    case 3:
                        if (_c.sent()) {
                            values[k] = v;
                        }
                        else {
                            errors[k] = this.replaceErrorMessage(tmp);
                        }
                        _c.label = 4;
                    case 4:
                        targetValues_1_1 = targetValues_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_4_1 = _c.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (targetValues_1_1 && !targetValues_1_1.done && (_b = targetValues_1["return"])) _b.call(targetValues_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 8:
                        if (Object.values(errors).length) {
                            this.addErrorObject(key, errors);
                        }
                        else {
                            this.set(key, values, rule.convert);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Validator.prototype.setIndexSignatureArrayValue = function (key, value, rule) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, values, targetValues, targetValues_2, targetValues_2_1, _a, k, v, _b, _c, _d, targetValues_3, index, v_1, v_1_1, vv, response, e_5_1, e_6_1;
            var e_6, _e, e_5, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!value || typeof value !== "object") {
                            if (rule.isOptional)
                                return [2 /*return*/];
                            return [2 /*return*/];
                        }
                        errors = {};
                        values = {};
                        targetValues = Object.entries(value);
                        if (targetValues.length === 0) {
                            return [2 /*return*/, this.addErrorObject(key, this.replaceErrorMessage(rule))];
                        }
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 19, 20, 21]);
                        targetValues_2 = __values(targetValues), targetValues_2_1 = targetValues_2.next();
                        _g.label = 2;
                    case 2:
                        if (!!targetValues_2_1.done) return [3 /*break*/, 18];
                        _a = __read(targetValues_2_1.value, 2), k = _a[0], v = _a[1];
                        if (!(!v || !Array.isArray(v) || v.length === 0)) return [3 /*break*/, 8];
                        if (!!rule.isOptional) return [3 /*break*/, 7];
                        if (!(rule.defaultValue !== undefined)) return [3 /*break*/, 6];
                        _b = values;
                        _c = k;
                        if (!(typeof rule.defaultValue === "function")) return [3 /*break*/, 4];
                        return [4 /*yield*/, rule.defaultValue()];
                    case 3:
                        _d = _g.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _d = rule.defaultValue;
                        _g.label = 5;
                    case 5:
                        _b[_c] = _d;
                        return [3 /*break*/, 7];
                    case 6:
                        errors[k] = this.replaceErrorMessage(rule);
                        _g.label = 7;
                    case 7: return [3 /*break*/, 17];
                    case 8:
                        targetValues_3 = [];
                        index = 0;
                        _g.label = 9;
                    case 9:
                        _g.trys.push([9, 14, 15, 16]);
                        v_1 = (e_5 = void 0, __values(v)), v_1_1 = v_1.next();
                        _g.label = 10;
                    case 10:
                        if (!!v_1_1.done) return [3 /*break*/, 13];
                        vv = v_1_1.value;
                        return [4 /*yield*/, Validator.validate(vv, rule.rules)];
                    case 11:
                        response = _g.sent();
                        if ("errors" in response) {
                            if (!errors[k])
                                errors[k] = {};
                            errors[k][index] = response.errors;
                        }
                        else {
                            targetValues_3.push(response.values);
                        }
                        index++;
                        _g.label = 12;
                    case 12:
                        v_1_1 = v_1.next();
                        return [3 /*break*/, 10];
                    case 13: return [3 /*break*/, 16];
                    case 14:
                        e_5_1 = _g.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 16];
                    case 15:
                        try {
                            if (v_1_1 && !v_1_1.done && (_f = v_1["return"])) _f.call(v_1);
                        }
                        finally { if (e_5) throw e_5.error; }
                        return [7 /*endfinally*/];
                    case 16:
                        values[k] = targetValues_3;
                        _g.label = 17;
                    case 17:
                        targetValues_2_1 = targetValues_2.next();
                        return [3 /*break*/, 2];
                    case 18: return [3 /*break*/, 21];
                    case 19:
                        e_6_1 = _g.sent();
                        e_6 = { error: e_6_1 };
                        return [3 /*break*/, 21];
                    case 20:
                        try {
                            if (targetValues_2_1 && !targetValues_2_1.done && (_e = targetValues_2["return"])) _e.call(targetValues_2);
                        }
                        finally { if (e_6) throw e_6.error; }
                        return [7 /*endfinally*/];
                    case 21:
                        if (Object.values(errors).length) {
                            this.addErrorObject(key, errors);
                        }
                        else {
                            // this.values[key] = values;
                            this.set(key, values, rule.convert);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Validator.prototype.setIndexSignatureObjectValue = function (key, value, rule) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, values, _a, _b, _c, k, v, response, e_7_1;
            var e_7, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!value || typeof value !== "object") {
                            if (rule.isOptional)
                                return [2 /*return*/];
                            return [2 /*return*/, this.addErrorObject(key, this.replaceErrorMessage(rule))];
                        }
                        errors = {};
                        values = {};
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 6, 7, 8]);
                        _a = __values(Object.entries(value)), _b = _a.next();
                        _e.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 5];
                        _c = __read(_b.value, 2), k = _c[0], v = _c[1];
                        return [4 /*yield*/, Validator.validate(v, rule.rules)];
                    case 3:
                        response = _e.sent();
                        if ("errors" in response) {
                            errors[k] = response.errors;
                        }
                        else {
                            values[k] = response.values;
                        }
                        _e.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_7_1 = _e.sent();
                        e_7 = { error: e_7_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_d = _a["return"])) _d.call(_a);
                        }
                        finally { if (e_7) throw e_7.error; }
                        return [7 /*endfinally*/];
                    case 8:
                        if (Object.values(errors).length) {
                            this.addErrorObject(key, errors);
                        }
                        else {
                            // this.values[key] = values;
                            this.set(key, values, rule.convert);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Validator.prototype.isValid = function (value, rule) {
        return __awaiter(this, void 0, void 0, function () {
            var length, targetDate;
            return __generator(this, function (_a) {
                if (rule.type === "string") {
                    return [2 /*return*/, typeof value === "string" && value.length > 0];
                }
                if (rule.type === "number") {
                    return [2 /*return*/, typeof value === "number"];
                }
                if (rule.type === "boolean") {
                    return [2 /*return*/, typeof value === "boolean"];
                }
                if (rule.type === "rangeNumber") {
                    if (typeof value !== "number")
                        return [2 /*return*/, false];
                    if ((rule.min !== undefined && rule.min > value) || (rule.max !== undefined && rule.max < value))
                        return [2 /*return*/, false];
                    return [2 /*return*/, true];
                }
                if (rule.type === "rangeLength") {
                    if (typeof value !== "string")
                        return [2 /*return*/, false];
                    length = value.length;
                    if ((rule.min !== undefined && rule.min > length) || (rule.max !== undefined && rule.max < length))
                        return [2 /*return*/, false];
                    return [2 /*return*/, true];
                }
                if (rule.type === "mail") {
                    return [2 /*return*/, validator_1["default"].isEmail(value)];
                }
                if (rule.type === "in") {
                    // return validator.isIn(value, rule.options);
                    return [2 /*return*/, rule.options.indexOf(value) !== -1];
                }
                if (rule.type === "zipcode") {
                    return [2 /*return*/, /^\d{3}-\d{4}$/.test(value.toString())];
                }
                if (rule.type === "equal") {
                    return [2 /*return*/, value === rule.value];
                }
                if (rule.type === "notEqual") {
                    return [2 /*return*/, value !== rule.value];
                }
                if (rule.type === "match") {
                    return [2 /*return*/, rule.regexp.test(String(value))];
                }
                /*/
                if (rule.type === "customAll") {
                    // customAllの場合は、その値以外を渡す必要がある。
                    return await rule.func(this.data);
                }
                if (rule.type === "custom") {
                    // customの場合は、その値のみ。
                    return await rule.func(value);
                }
                /*/
                if (rule.type === "date") {
                    return [2 /*return*/, value instanceof Date];
                }
                if (rule.type === "dateBetween") {
                    targetDate = moment(value);
                    if (rule.from && moment(rule.from).isAfter(targetDate))
                        return [2 /*return*/, false];
                    if (rule.to && moment(rule.to).isBefore(targetDate))
                        return [2 /*return*/, false];
                }
                return [2 /*return*/, true];
            });
        });
    };
    Validator.prototype.setCustomValue = function (key, value, rule) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, rule.func(value)];
                    case 1:
                        result = _a.sent();
                        if (typeof result === "boolean") {
                            if (!result) {
                                return [2 /*return*/, this.addErrorObject(key, this.replaceErrorMessage(rule))];
                            }
                            // this.values[key] = value;
                            this.set(key, value, rule.convert);
                            return [2 /*return*/];
                        }
                        if ("errors" in result) {
                            return [2 /*return*/, this.addErrorObject(key, result.errors)];
                        }
                        if ("error" in result) {
                            return [2 /*return*/, this.addErrorObject(key, result.error)];
                        }
                        this.set(key, result.values, rule.convert);
                        return [2 /*return*/];
                }
            });
        });
    };
    Validator.prototype.setCustomAllValue = function (key, value, data, rule) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, rule.func(data)];
                    case 1:
                        result = _a.sent();
                        if (typeof result === "boolean") {
                            if (!result) {
                                return [2 /*return*/, this.addErrorObject(key, this.replaceErrorMessage(rule))];
                            }
                            this.set(key, value, rule.convert);
                            // this.values[key] = value;
                            return [2 /*return*/];
                        }
                        if ("errors" in result) {
                            return [2 /*return*/, this.addErrorObject(key, result.errors)];
                        }
                        if ("error" in result) {
                            return [2 /*return*/, this.addErrorObject(key, result.error)];
                        }
                        this.set(key, result.values, rule.convert);
                        return [2 /*return*/];
                }
            });
        });
    };
    Validator.prototype.addErrorObject = function (key, message) {
        this.errors[key] = message;
    };
    Validator.prototype.replaceErrorMessage = function (rule) {
        var baseMessage = rule.message ? rule.message : Validator.errorLabels[rule.type];
        return baseMessage.replace(/\[\[\[([^\\[]+)\]\]\]/g, function (_, match) {
            if (match in rule) {
                if (rule.type === "dateBetween") {
                    if (match === "from") {
                        return rule.from ? moment(rule.from).format("YYYY/MM/DD HH:mm") : "";
                    }
                    if (match === "to") {
                        return rule.to ? moment(rule.to).format("YYYY/MM/DD HH:mm") : "";
                    }
                }
                return rule[match];
            }
            return "";
        });
    };
    // 全体のエラーメッセージをstaticで持つようにする。
    Validator.errorLabels = {
        string: "[[[label]]]について入力してください。",
        rangeLength: "[[[label]]]について[[[min]]]以上[[[max]]]以下で入力してください。",
        mail: "[[[label]]]の形式が正しくありません。",
        match: "[[[label]]]について入力形式が正しくありません。",
        zipcode: "[[[label]]]は(***-****)の形式で入力してください。",
        number: "[[[label]]]について半角数値で入力してください。",
        rangeNumber: "[[[label]]]について[[[min]]]以上[[[max]]]以下の文字数で入力してください。",
        boolean: "[[[label]]]についてチェックを入れてください。",
        "in": "[[[label]]]について選択してください。",
        array: "[[[label]]]について入力してください。",
        date: "[[[label]]]について日付を入力してください。",
        dateBetween: "[[[label]]]について「[[[from]]]〜[[[to]]]」の期間にて入力してください。",
        equal: "[[[label]]]が[[[value]]]ではありません。",
        notEqual: "[[[label]]]は[[[value]]]を入力することはできません。",
        nest: "[[[label]]]について入力がありません。",
        arrayNest: "[[[label]]]について入力がありません。",
        indexSignature: "[[[label]]]について入力がありません。",
        indexSignatureArray: "[[[label]]]について入力がありません。",
        indexSignatureObject: "[[[label]]]について入力がありません。"
    };
    return Validator;
}());
exports.Validator = Validator;
//# sourceMappingURL=index.js.map