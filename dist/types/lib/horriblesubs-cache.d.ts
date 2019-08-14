import { HorribleSubsXdccResult } from "./horriblesubs-xdcc-result";
declare const horribleSubsCache: {
    set: (terms: string, results: HorribleSubsXdccResult[]) => HorribleSubsXdccResult[];
    get: (terms: string) => HorribleSubsXdccResult[] | null | undefined;
    remove: (terms: string) => void;
    clear: (terms: string) => void;
};
export { horribleSubsCache };
//# sourceMappingURL=horriblesubs-cache.d.ts.map