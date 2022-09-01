const { Transformer } = require('@parcel/plugin')
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

function getData(asset) {
    const dataPath = asset.filePath.replace('.hbs', '.data.json')
    try {
        const data = fs.readFileSync(dataPath);
        return JSON.parse(data);
    } catch (e) {
        return {};
    }
}

const componentMap = new Map();

function readComponent(componentName) {
    const componentPath = path.resolve('src/components', componentName, componentName + '.hbs');
    const cached = componentMap.get(componentPath);
    if (cached) {
        return cached;
    }
    try {
        const componentCode = fs.readFileSync(componentPath, { encoding: 'utf8' });
        componentMap.set(componentPath, componentCode);
        return componentCode;
    } catch (e) {
        throw new Error('Cannot find component file by path: ' + componentPath)
    }
}

function replaceComponent(hbsCode) {
    return hbsCode.replace(/{{#component ([\w\W]+?)}}([\w\W]+?){{\/component}}/gi, (_, component, innerCode) => {
        return readComponent(component).replace(/{{#default-slot}}{{\/default-slot}}/gi, innerCode)
    })
}

module.exports = new Transformer({
    async transform({ asset }) {
        let code = await asset.getCode();
        const data = getData(asset)
        code = replaceComponent(code);

        const template = Handlebars.compile(code);
        const html = template(data)
        asset.setCode(html);
        asset.type = 'html';
        return [asset];
    }
});
