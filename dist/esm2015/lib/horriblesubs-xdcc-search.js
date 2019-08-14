"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const horriblesubs_http_client_1 = require("./horriblesubs-http-client");
const horriblesubs_cache_1 = require("./horriblesubs-cache");
const searchEvents = __importStar(require("./horriblesubs-events"));
class HorribleSubsXdccSearch extends events_1.EventEmitter {
    constructor() {
        super();
    }
    search(terms, cache) {
        if (!terms) {
            return Promise.reject('no search temrs provided');
        }
        if (cache) {
            let results = horriblesubs_cache_1.horribleSubsCache.get(terms);
            if (results && results.length) {
                this.emit(searchEvents.completed, { terms, results });
                return Promise.resolve(results);
            }
        }
        return horriblesubs_http_client_1.horribleSubsClient.get(terms)
            .then((results) => {
            if (cache) {
                horriblesubs_cache_1.horribleSubsCache.set(terms, results);
            }
            this.emit(searchEvents.completed, { terms, results });
            return Promise.resolve(results);
        })
            .catch(error => {
            this.emit(searchEvents.error, { terms, error });
            return Promise.reject(error);
        });
    }
}
exports.HorribleSubsXdccSearch = HorribleSubsXdccSearch;
;
//# sourceMappingURL=horriblesubs-xdcc-search.js.map