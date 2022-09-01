import calcSomth from './imported-js';

function component() {
    const element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = ['Hello2', 'webpack'].join(' ');
    calcSomth();

    return element;
}

calcSomth();

document.body.appendChild(component());
