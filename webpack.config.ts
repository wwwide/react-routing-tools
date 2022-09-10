import { resolve } from 'path'
import { Configuration } from 'webpack'

const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default

const config: Configuration = {
  entry: './src/index.ts',
  output: {
    path: resolve(__dirname, './dist'),
    filename: 'index.js',
    publicPath: '/',
    libraryTarget: 'commonjs'
  },
  devtool: 'source-map',
  externals: {
    react: 'commonjs react',
    'react-router-dom': 'commonjs react-router-dom'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new StatoscopeWebpackPlugin({
      saveTo: './dist/report-[name]-[hash].html',
      saveStatsTo: './dist/stats-[name]-[hash].json',
      watchMode: false,
      open: 'file',
      name: 'bundles'
    })
  ]
}

export default config
