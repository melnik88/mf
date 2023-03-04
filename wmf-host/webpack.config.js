const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index-bundle.js",
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        alias: {
            remoteApp: false,
            autoruApp: false,
        },
    },
    devServer: {
        https: true,
        allowedHosts: 'all',
        proxy: {
            "/-/ajax/jest/getCardViewPhoneShowData/": {
                "target": "https://cabinet.frontend3.melnik88.dev.avto.ru",
                pathRewrite: {"/jest/" : "/cabinet/"},
                method: 'POST',
                "changeOrigin": true,
                secure: false,
            },
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'hostApp',
            remotes: {
                remoteApp: 'remoteApp@https://wmf-remote.melnik88.dev.avto.ru:8082/remoteEntry.js',
                autoruApp: 'autoruApp@https://cabinet.frontend3.melnik88.dev.avto.ru/remoteEntry.js',
            },
            shared: {
                react: {
                    eager: true,
                    singleton: true,
                },
                "react-dom": {
                    eager: true,
                    singleton: true,
                },
                'react-redux': {
                    singleton: true,
                    eager: true,
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
    ]
};
