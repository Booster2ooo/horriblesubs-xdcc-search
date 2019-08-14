/// <reference types="node" />
import { EventEmitter } from 'events';
import { HorribleSubsXdccResult } from './horriblesubs-xdcc-result';
export declare class HorribleSubsXdccSearch extends EventEmitter {
    constructor();
    search(terms: string, cache: boolean): Promise<HorribleSubsXdccResult[]>;
}
//# sourceMappingURL=horriblesubs-xdcc-search.d.ts.map