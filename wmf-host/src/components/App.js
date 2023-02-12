import React, {Component, Suspense} from 'react';
import PropTypes from 'prop-types';
import {SimpleComponent} from './SimpleComponent';
import {ErrorBoundary} from './ErrorBoundary';
import { metrika } from '../contexts/Metrika';
const RemoteComponent = React.lazy(async () => await import('remoteApp/RemoteComponent'));
const DashboardWidgetHeader = React.lazy(async () => await import('autoruApp/DashboardWidgetHeader'));
const DashboardWidget = React.lazy(async () => await import('autoruApp/DashboardWidget'));
const DashboardWidgetButton = React.lazy(async () => await import('autoruApp/DashboardWidgetButton'));

import '../styles/App.css';

class Header extends React.PureComponent {
    render() {
        const {header} = this.props;
        return (<h1>{header}</h1>)
    }
}

Header.contextTypes = {
    metrika: PropTypes.object
}



class App extends Component {
    static childContextTypes = {
        metrika: PropTypes.object,
    };

    getChildContext() {
        return { metrika }
    }

    render() {
        return (
            <div>
                <Header title="React App (Host)" />
                <SimpleComponent/>
                <ErrorBoundary>
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <RemoteComponent/>
                    </Suspense>
                        <Suspense fallback={<div>Загрузка...</div>}>
                            <DashboardWidget>
                                <DashboardWidgetHeader
                                    title="Заголовок"
                                />
                                <div>Тут можно нарисовать какую-то графику</div>
                                <DashboardWidgetButton
                                    onClick={() => {console.log('ura!!!')}}
                                    text="Перейти в кабинет дилера"
                                />
                            </DashboardWidget>
                        </Suspense>
                </ ErrorBoundary>
                <SimpleComponent/>
            </div>
        );
    }
}

export default App;
