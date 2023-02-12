import React from 'react';
import MetrikaContext from "../contexts/Metrika";

const style = {
    padding: 20,
    outline: '1px dashed red',
    marginBottom: '10px',
}

export function SimpleComponent() {
    const context = React.useContext(MetrikaContext);

    console.log(context);
    return (
        <div style={ style }>
            Component from HOST app.
        </div>
    );
}
