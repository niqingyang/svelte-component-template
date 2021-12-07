const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    // https://github.com/storybookjs/presets/issues/220
    // core: {
    //     builder: 'webpack5',
    // },
    stories: [
        "../stories/**/*.stories.mdx",
        "../stories/**/*.stories.@(js|jsx|ts|tsx|svelte)"
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-svelte-csf"
    ],
    framework: "@storybook/svelte",
    // custom webpack config
    webpackFinal: (config) => {
        config.resolve.plugins = [
            ...(config.resolve.plugins || []),
            // 配置别名
            // https://storybook.js.org/docs/react/configure/webpack#typescript-module-resolution
            new TsconfigPathsPlugin({
                extensions: config.resolve.extensions,
            }),
        ];
        return config;
    },
}
