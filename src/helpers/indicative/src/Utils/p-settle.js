import pReflect from './p-reflect';
export default function(iterable) { return Promise.all(iterable.map(pReflect)) }