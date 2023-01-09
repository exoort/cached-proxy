export const pipe = (...functions) => (value) => functions.reduce((currentValue, currentFunction) => currentValue.then(currentFunction), Promise.resolve(value));

export const pipeSync = (...functions) => (value) => functions.reduce((currentValue, currentFunction) => currentFunction(currentValue), value);
