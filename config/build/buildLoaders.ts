import webpack from 'webpack';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    const cssLoader = buildCssLoader(isDev);

    const babelLoader = {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                //presets: ['@babel/preset-env']
            }
        }
    };

    // Если не используем тайпскрипт - нужен babel-loader
    // const typescriptLoader = {
    //     test: /\.(js|jsx|ts|tsx)$/,
    //     enforce: "pre",
    //     use: ["source-map-loader"],
    // };

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack']
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff|mp3|wav)$/i,
        use: [
            {
                loader: 'file-loader'
            }
        ]
    };

    return [fileLoader, svgLoader, babelLoader, cssLoader];
}
