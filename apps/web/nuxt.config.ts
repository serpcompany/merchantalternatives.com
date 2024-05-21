import { getBaseUrl } from "utils";

const baseUrl = getBaseUrl();

export default defineNuxtConfig({
  experimental: {
    typedPages: true,
  },

  runtimeConfig: {
    public: {
      siteUrl: baseUrl,
      analytics: {
        googleAnalyticsId: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID,
        mixpanelToken: process.env.NUXT_PUBLIC_MIXPANEL_TOKEN,
        pirschCode: process.env.NUXT_PUBLIC_PIRSCH_CODE,
        plausibleUrl: process.env.NUXT_PUBLIC_PLAUSIBLE_URL,
        umamiTrackingId: process.env.NUXT_PUBLIC_UMAMI_TRACKING_ID,
      },
      auth: {
        redirectPath: "/dashboard",
      },
    },
  },

  imports: {
    dirs: [
      "modules/saas/auth/composables/**",
      "modules/saas/dashboard/composables/**",
      "modules/saas/shared/**",
      "modules/shared/composables/**",
      "modules/shared/utils/**",
      "modules/ui/lib/**",
      "modules/marketing/shared/util/**",
      "modules/marketing/content/**",
    ],
  },

  components: [
    { path: "@/modules/shared/components", pathPrefix: false },
    { path: "@/modules/marketing/shared/components", pathPrefix: false },
    { path: "@/modules/marketing/home/components", pathPrefix: false },
    { path: "@/modules/marketing/blog/components", pathPrefix: false },
    { path: "@/modules/marketing/faq/components", pathPrefix: false },
    { path: "@/modules/marketing/changelog/components", pathPrefix: false },
    { path: "@/modules/marketing/content/components", pathPrefix: false },
    { path: "@/modules/marketing/pricing/components", pathPrefix: false },
    { path: "@/modules/saas/admin/components", pathPrefix: false },
    { path: "@/modules/saas/auth/components", pathPrefix: false },
    { path: "@/modules/saas/dashboard/components", pathPrefix: false },
    { path: "@/modules/saas/onboarding/components", pathPrefix: false },
    { path: "@/modules/saas/settings/components", pathPrefix: false },
    { path: "@/modules/saas/shared/components", pathPrefix: false },
    { path: "@/modules/profiles/components", pathPrefix: false },
  ],

  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/icon.png",
        },
      ],
    },
  },

  build: {
    transpile: ["trpc-nuxt"],
  },

  // packages/auth
  nitro: {
    moduleSideEffects: ["lucia/polyfill/node"],
  },

  modules: [
    // "./modules/ui/lib/module.ts",
    "@nuxtjs/i18n", // configured here and in i18n.config.ts
    "@nuxtjs/tailwindcss", // configured in tailwind.config.ts
    "@nuxtjs/google-fonts",
    "@nuxtjs/color-mode",
    "@nuxt/content",
    "@nuxt/image",
    "nuxt-simple-robots",
    "@vue-email/nuxt",
    "shadcn-nuxt",
  ],

  // @nuxtjs/i18n
  i18n: {
    locales: [
      {
        code: "en",
        iso: "en-US",
        file: "en.json",
        name: "English",
      },
    ],
    defaultLocale: "en",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "NUXT_LOCALE",
      redirectOn: "root",
    },
    lazy: true,
    langDir: "locales",
  },

  // @nuxtjs/google-fonts
  googleFonts: {
    display: "swap",
    families: {
      "DM Sans": [400, 500, 600, 700, 800],
    },
  },

  // @nuxtjs/color-mode
  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
    storageKey: "NUXT_COLOR_MODE",
  },

  // @nuxt/content
  content: {
    markdown: {
      anchorLinks: false,
    },
  },

  // @nuxt/image
  image: {
    domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
  },

  // nuxt-simple-robots -> nuxt-site-config
  site: {
    url: baseUrl,
  },

  shadcn: {
    prefix: "",
    componentDir: "./modules/ui/components",
  },

  // nuxt-simple-robots
  robots: {
    allow: "*",
    // sitemap: 'sitemap.xml',
  },

  // @vue-email/nuxt
  vueEmail: {
    baseUrl,
  },
});
