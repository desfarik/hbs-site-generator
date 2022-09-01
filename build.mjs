import {Parcel} from '@parcel/core';
import { entryArray } from './generate-pages.js';


console.log(entryArray);

let bundler = new Parcel({
    entries: entryArray,
    defaultConfig: '@parcel/config-default',
    mode: 'production',
    defaultTargetOptions: {
        publicUrl: '../',
    }
});

(async ()=>{
    try {
        let {bundleGraph, buildTime} = await bundler.run();
        let bundles = bundleGraph.getBundles();
        console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`);
    } catch (err) {
        console.log(err.diagnostics);
    }
})()

