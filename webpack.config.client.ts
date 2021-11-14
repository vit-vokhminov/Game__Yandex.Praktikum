import path from 'path';
import { Configuration, Plugin, EnvironmentPlugin } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import dotenv from 'dotenv';

dotenv.config();

const config: Configuration = {
    name: 'client/index.tsx',
    target: 'web',
    entry: {
        client: path.resolve(__dirname, 'client'),
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist/static'),
        filename: '[name].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader'],
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
                test: /\.(gif|png|jpg|jpeg)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/img/[hash].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.mp3|wav$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new EnvironmentPlugin({
            APP_URL: process.env.APP_URL,
        }),
        new MiniCssExtractPlugin({ filename: '[name].css' }),
        new LoadablePlugin(),
        new CleanWebpackPlugin(),
    ].filter(Boolean) as Plugin[],
};

export default config;
