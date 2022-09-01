import {Parcel} from '@parcel/core';
import { entryArray } from './generate-pages.js';

const port = 3000;

console.log(entryArray);

let bundler = new Parcel({
    entries: entryArray,
    defaultConfig: '@parcel/config-default',
    serveOptions: {
        port
    },
    hmrOptions: {
        port
    },
    defaultTargetOptions: {
        publicUrl: '../',
    }
});

await bundler.watch((err, event) => {
    if (err) {
        // fatal error
        console.error(err);
        throw err;
    }
    if (event.type === 'buildSuccess') {
        let bundles = event.bundleGraph.getBundles();
        console.log(`✨ Built ${bundles.length} bundles in ${event.buildTime}ms!`);
    } else if (event.type === 'buildFailure') {
        console.log(event.diagnostics);
    }
});

console.log(`Server running at http://localhost:${port}`);
