import path from 'path';
import nodeExternals from 'webpack-node-externals';
import { Configuration, Plugin, EnvironmentPlugin } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import dotenv from 'dotenv';

dotenv.config();

const config: Configuration = {
    name: 'server',
    target: 'node',
    node: { __dirname: false },
    entry: {
        server: path.resolve(__dirname, 'server/server.ts'),
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist/server'),
        filename: '[name].js',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: ['.ts', '.tsx'],
    },
    externals: ['@loadable/component', nodeExternals()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: 'null-loader',
            },
            {
                test: /\.svg$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/svg/[hash].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(gif|png|jpg|jpeg|mp3|wav)?$/,
                loader: 'null-loader',
            },
        ],
    },
    plugins: [
        new EnvironmentPlugin({
            APP_URL: process.env.APP_URL,
        }),
        new CleanWebpackPlugin(),
        new LoadablePlugin(),
    ].filter(Boolean) as Plugin[],
};

export default config;
