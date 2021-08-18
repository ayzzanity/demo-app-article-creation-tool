const CracoLessPlugin = require('craco-less');
const path = require('path');

const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#3283a8', //"#168a3e",
              '@border-radius-base': '5px',
              '@input-bg': '#f6f6f6',
              '@input-border-color': 'transparent',
              '@card-radius': '20px',
              '@select-background': '#f6f6f6',
              '@select-border-color': 'transparent'
            }, //#a25506"#168a3e"
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  babel: {
    presets: [],
    plugins: [
      ['import', { libraryName: 'antd', libraryDirectory: 'es' }, 'antd'],
      [
        'import',
        {
          libraryName: '@ant-design/icons',
          camel2DashComponentName: false,
          customName: (transformedMethodName) => {
            if (transformedMethodName === 'default') {
              return '@ant-design/icons/es/components/Icon';
            }
            return `@ant-design/icons/es/icons/${transformedMethodName}`;
          }
        }
      ]
    ],

    loaderOptions: {
      /* Any babel-loader configuration options: https://github.com/babel/babel-loader. */
    },
    loaderOptions: (babelLoaderOptions, { env, paths }) => {
      return babelLoaderOptions;
    }
  },

  webpack: {
    alias: {
      '@core_assets': path.resolve(__dirname, 'src/core/assets'),
      '@core_modules': path.resolve(__dirname, 'src/core/modules'),
      '@core_common': path.resolve(__dirname, 'src/core/common'),
      '@core_routing': path.resolve(__dirname, 'src/core/routing'),
      '@core_state_management': path.resolve(__dirname, 'src/core/state_management'),
      '@core_data': path.resolve(__dirname, 'src/core/data'),
      '@app_assets': path.resolve(__dirname, 'src/app/assets'),
      '@app_modules': path.resolve(__dirname, 'src/app/modules'),
      '@app_common': path.resolve(__dirname, 'src/app/common'),
      '@app_routing': path.resolve(__dirname, 'src/app/routing'),
      '@app_state_management': path.resolve(__dirname, 'src/app/state_management'),
      '@app_data': path.resolve(__dirname, 'src/app/data')
    },
    plugins: {
      add: [new AntdDayjsWebpackPlugin()] /* An array of plugins */,
      remove:
        [] /* An array of plugin constructor's names (i.e. "StyleLintPlugin", "ESLintWebpackPlugin" ) */
    },
    configure: {
      /* Any webpack configuration options: https://webpack.js.org/configuration */
    },
    configure: (webpackConfig, { env, paths }) => {
      return webpackConfig;
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@(.*)$': '<rootDir>/src$1'
      }
    }
  }
};
