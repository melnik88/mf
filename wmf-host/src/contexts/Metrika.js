//see https://a.yandex-team.ru/arcadia/classifieds/autoru-frontend/auto-core/react/lib/metrika.d.ts
import { createContext } from 'react';

const metrika = {
    sendPageEvent: (params) => console.log('page event', params)
}

const MetrikaContext = createContext({ metrika });
MetrikaContext.displayName = 'Metrika Context';

export { metrika };
export default MetrikaContext;

