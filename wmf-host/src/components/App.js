import React, {Component, Suspense} from 'react';
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';
import {SimpleComponent} from './SimpleComponent';
import {ErrorBoundary} from './ErrorBoundary';
import SvgLoader from './SvgLoader';
import {metrika} from '../contexts/Metrika';

const DashboardWidgetHeader = React.lazy(async () => await import('autoruApp/DashboardWidgetHeader'));
//компонент со стилями
const CabinetWrapper = React.lazy(async () => await import('autoruApp/CabinetWrapper'));
const DashboardWidget = React.lazy(async () => await import('autoruApp/DashboardWidget'));
const DashboardWidgetButton = React.lazy(async () => await import('autoruApp/DashboardWidgetButton'));
const CardViewPhoneShow = React.lazy(async () => await import('autoruApp/CardViewPhoneShow'));
const CallsListingItem = React.lazy(async () => await import('autoruApp/CallsListingItem'));
const CallsFilters = React.lazy(async () => await import('autoruApp/CallsFilters'));

import offerMock from '../mocks/offer.json';
import {store} from '../store/store';

//динамически загружаем reducer из autoruApp
import ('autoruApp/clientReducer').then((module) => {
    store.injectReducer('client', module.default);
});

import '../styles/App.css';


const call = {
    call_id: '123',
    external_id: {
        id: 'B7AYiqFl5ro',
        service: 'TELEPONY',
    },
    result: 'SUCCESS',
    targeting: {
        is_target: true,
        by_review: true,
    },
    source: {
        raw: '89133332211',
    },
    target: {
        raw: '89093217799',
    },
    proxy: {
        object_id: 'dealer-1313',
        tag: 'category=CARS#section=NEW#offer_id=1088884102-2861029d',
        target_number: {
            raw: '89093217799',
        },
        proxy_number: {
            raw: '89990001122',
        },
    },
    timestamp: '2020-01-09T15:00:20.021Z',
    call_duration: {
        seconds: 72,
    },
    talk_duration: {
        seconds: 62,
    },
    wait_duration: {
        seconds: 10,
    },
    record_available: true,
    transcription_available: true,
    is_callback: true,
    is_unique: true,
    offer: offerMock,
    billing: {
        state: 'ON_REVIEW',
        cost: {
            amount: 7200,
        },
        complaint_state: 'SATISFIED',
    },
    tags: [
        {
            value: 'кредит',
        },
        {
            value: 'трейдин',
        },
    ],
    actions: {
        can_complain: true,
    },
    platform: 'autoru',
};
const baseProps = {
    isActive: false,
    isPlaying: false,
    hasCallTariff: true,
    dealerId: 20101,
    isClient: true,
    callsSettings: {
        calltracking_enabled: true,
        calltracking_classifieds_enabled: true,
        offers_stat_enabled: true,
        notification_email: 'kek@pek@ya.ru',
        auto_tags: [],
        tags: [],
    },
    sendComplaint: () => {},
    sendRedirectComplaint: () => {},
    downloadRecord: () => {},
    addTag: () => Promise.resolve(),
    removeTag: () => Promise.resolve(),
    getTags: () => Promise.resolve([]),
    playCallRecord: () => {},
    pauseCallRecord: () => {},
    onTranscriptionClick: () => {},
};


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
        return {metrika}
    }

    getClient() {
        store.dispatch({
            type: 'PAGE_LOADING_SUCCESS', payload: {
                client: {
                    result: {
                        username: 'user'
                    }
                }
            }
        })
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <Header title="React App (Host)"/>
                    <h1>Компоненты раздела звонки</h1>
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <CallsFilters initialFilters={{}}/>
                    </Suspense>
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <CallsListingItem
                            { ...baseProps }
                            isMultipostingEnabled={ true }
                            call={ call }
                            isActive={ true }
                            isPlaying={ true }
                            hasCallTariff={ false }
                        />
                    </Suspense>
                    <h1>Другие компоненты</h1>
                    <ErrorBoundary>
                        <Suspense fallback={<div>Загрузка...</div>}>
                            <CabinetWrapper>
                                <DashboardWidget>
                                    <DashboardWidgetHeader
                                        title="Заголовок"
                                    />
                                    <div>Тут можно нарисовать какую-то графику</div>
                                    <DashboardWidgetButton
                                        onClick={this.getClient}
                                        text="Перейти в кабинет дилера"
                                    />
                                </DashboardWidget>
                            </CabinetWrapper>
                        </Suspense>

                        <div style={{width: 600}}>
                            <Suspense fallback={<div>Загрузка...</div>}>
                                <CabinetWrapper>
                                    <CardViewPhoneShow
                                        offer={offerMock}
                                    />
                                </CabinetWrapper>
                            </Suspense>
                        </div>
                    </ErrorBoundary>
                    <SimpleComponent/>
                </div>
                <SvgLoader />
            </Provider>
        );
    }
}

export default App;
