const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: '/vue-product-showcase/',

  transpileDependencies: ['vuetify'],

  devServer: {
    port: 8080,
    client: {
      overlay: true,
    },
  },
})