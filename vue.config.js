const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    title: "The Project Manager",
    name: "The Project Manager",
    short_name: "The Project Manager",
    themeColor: "#6FA8DC",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "default",
    iconPaths: {
      maskicon: null,
      favicon32: "./img/icons/favicon-32x32.png",
      favicon16: "./img/icons/favicon-16x16.png",
      appleTouchIcon: "./img/icons/apple-touch-icon.png",
      msTileImage: "./img/icons/mstile-150x150.png",
    },
    icons: [
      {
        src: "./img/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "./img/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      },
      
    ],
    // configure the workbox plugin
    manifestOptions: {
      name: "The Project Manager",
      short_name: "The Project Manager",
      start_url: "./",
      display: "standalone",
      theme_color: "#6FA8DC",
      icons: [
        {
          src: "./img/icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "./img/icons/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        
      ],
      iconPaths: {
        maskicon: null,
        favicon32: "./img/icons/favicon-32x32.png",
        favicon16: "./img/icons/favicon-16x16.png",
        appleTouchIcon: "./img/icons/apple-touch-icon.png",
        msTileImage: "./img/icons/mstile-150x150.png",
      },
    },
  }
})
