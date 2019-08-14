import { EventEmitter } from 'events';
import { horribleSubsClient } from './horriblesubs-http-client';
import { horribleSubsCache } from './horriblesubs-cache';
import { HorribleSubsXdccResult } from './horriblesubs-xdcc-result';
import * as searchEvents from './horriblesubs-events';

export class HorribleSubsXdccSearch extends EventEmitter {

  constructor() {
    super();
  }

  search(terms: string, cache: boolean): Promise<HorribleSubsXdccResult[]> {
    if (!terms) {
      return Promise.reject('no search temrs provided');
    }
    if (cache) {
      let results = horribleSubsCache.get(terms);
      if (results && results.length) {
        this.emit(searchEvents.completed, { terms, results });
        return Promise.resolve(results as HorribleSubsXdccResult[]);
      }
    }
    return horribleSubsClient.get(terms)
      .then((results: HorribleSubsXdccResult[]) => {
        if (cache) {
          horribleSubsCache.set(terms, results);
        }
        this.emit(searchEvents.completed, { terms, results });
        return Promise.resolve(results)
      })
      .catch(error => {        
        this.emit(searchEvents.error, { terms, error });
        return Promise.reject(error);
      });
  }

};