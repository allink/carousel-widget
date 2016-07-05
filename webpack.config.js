const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const autoprefixer = require('autoprefixer');

const PATHS = {
    app: './app',
    example: './example/example',
    build: './dist'
};

const common = {
    output: {
        filename: '[name].js',
    	path: path.resolve(PATHS.build),
        libraryTarget: 'umd',
        library: 'LibraryName'
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              presets: ['es2015'],
              plugins: ['add-module-exports']
            }
            }, {
            	test: /\.less?$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
            }, {
            	test: /\.css?$/,
            	loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
            },
            {test: /\.(gif|png)$/, loader: 'url-loader?limit=100000' },
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ],
    },
    resolve: {
        root: [
            __dirname
        ]
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new ProgressBarPlugin(),
        new CleanWebpackPlugin(['dist'], {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ]
};

var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(common, {
        entry: {
            app: PATHS.app,
        },
        output: {
            filename: '[name].js'
        },
        externals: [
        ]
    });
    break;
    default:
    config = merge(common, {
        entry: {
            example: PATHS.example,
        },
        output: {
            filename: '[name].js',
        }
    });
}

module.exports = validate(config);
