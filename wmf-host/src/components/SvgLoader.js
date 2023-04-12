import React, { Component } from 'react';

export default class SvgLoader extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    componentDidMount() {
        fetch('https://cabinet.frontend3.melnik88.dev.avto.ru/icons-sprite.svg', {
            method: "GET",
            "Content-Type": "text/plain;charset=UTF-8"
        })
            .then(response => {
                return response.text()
            })
            .then((data) => {
                this.setState({
                    data: React.createElement('div', {
                        className: 'svg-sprites',
                        key: 'svg-sprites',
                        style: { position: 'absolute', top: '-9999px', left: '-9999px' },
                        dangerouslySetInnerHTML: {
                            __html: data,
                        },
                    })
                })
            })
    }

    render() {
        return this.state.data;
    }
}