const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index-bundle.js"
    },
    devServer: {
        https: true,
        allowedHosts: 'all'
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
    plugins: [
        new ModuleFederationPlugin({
            name: 'remoteApp',
            filename: "remoteEntry.js",
            exposes: {
                "./RemoteComponent": "./src/components/RemoteComponent.js",
            },
            shared: {
                react: {
                    requiredVersion: deps.react,
                    singleton: true,
                },
                "react-dom": {
                    requiredVersion: deps['react-dom'],
                    singleton: true,
                },
            }
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
    ]
};
