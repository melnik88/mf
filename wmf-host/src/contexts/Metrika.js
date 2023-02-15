import { createContext } from 'react';

const metrika = {
    sendPageEvent: (params) => console.log('page event', params)
}

const MetrikaContext = createContext({ metrika });
MetrikaContext.displayName = 'Metrika Context';

export { metrika };
export default MetrikaContext;

