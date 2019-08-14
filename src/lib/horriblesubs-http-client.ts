import * as https from 'https';
import { HorribleSubsXdccResult } from './horriblesubs-xdcc-result';

const defaultRequestOptions = {
      method: 'GET'
      , hostname: 'xdcc.horriblesubs.info'
      , port: 443
      , path: '/'
    }
   , handlers = {
      data: (httpChunks: any[], chuck: any) => {
        httpChunks.push(chuck);
      }
    , end: (httpChunks: any[], cb: Function) => {
        const body = Buffer.concat(httpChunks)
            , content = body.toString()
            , p = { k: [] }
            ;
        eval(content);
        const results = p.k.map((r: any) => new HorribleSubsXdccResult(r));
        return cb(results);
      }
    , error: (cb: Function, err: Error) => cb(err)
   }
  , horribleSubsClient = {
      get: (terms: string): Promise<HorribleSubsXdccResult[]> => new Promise((resolve, reject) => {
          const options = Object.assign({}, defaultRequestOptions)
              , httpChunks: any[] = []
              ;
          let request;
          options.path += `search.php?t=${terms}`;
          options.path = encodeURI(options.path);
          request = https.request(options, (response) => {
            response.on('data', handlers.data.bind(null, httpChunks) );
            response.on('end', handlers.end.bind(null, httpChunks, resolve) );
          });
          request.on('error', handlers.error.bind(null, reject) );
          request.end();
      })
    }
  ;

export { horribleSubsClient };