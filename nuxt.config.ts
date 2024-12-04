// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  }, //temporary workaround for a bug
  css: ["~/assets/scss/main.scss"],
  modules: ["@vueuse/nuxt", "@pinia/nuxt", "@nuxt/eslint"],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    buildAssetsDir: 'assets',
  },
  // typescript: {
  //   typeCheck: true
  // }
});
