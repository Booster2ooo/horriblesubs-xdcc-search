const hsXdccSearch = require('./dist/esm5/index');
const engine = new hsXdccSearch.HorribleSubsXdccSearch();

engine.on(hsXdccSearch.completed, console.log);
engine.on(hsXdccSearch.error, console.error);

engine.search('test')
    .then(console.log.bind(console))
    .catch(console.error.bind(console))
    ;