"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var https = __importStar(require("https"));
var horriblesubs_xdcc_result_1 = require("./horriblesubs-xdcc-result");
var defaultRequestOptions = {
    method: 'GET',
    hostname: 'xdcc.horriblesubs.info',
    port: 443,
    path: '/'
}, handlers = {
    data: function (httpChunks, chuck) {
        httpChunks.push(chuck);
    },
    end: function (httpChunks, cb) {
        var body = Buffer.concat(httpChunks), content = body.toString(), p = { k: [] };
        eval(content);
        var results = p.k.map(function (r) { return new horriblesubs_xdcc_result_1.HorribleSubsXdccResult(r); });
        return cb(results);
    },
    error: function (cb, err) { return cb(err); }
}, horribleSubsClient = {
    get: function (terms) { return new Promise(function (resolve, reject) {
        var options = Object.assign({}, defaultRequestOptions), httpChunks = [];
        var request;
        options.path += "search.php?t=" + terms;
        options.path = encodeURI(options.path);
        request = https.request(options, function (response) {
            response.on('data', handlers.data.bind(null, httpChunks));
            response.on('end', handlers.end.bind(null, httpChunks, resolve));
        });
        request.on('error', handlers.error.bind(null, reject));
        request.end();
    }); }
};
exports.horribleSubsClient = horribleSubsClient;
//# sourceMappingURL=horriblesubs-http-client.js.map