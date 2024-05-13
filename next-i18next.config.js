// next-i18next.config.js

const config = {
    debug: process.env.NODE_ENV === 'development',
    i18n: {
        defaultLocale: 'tr',
        locales: ['tr', 'en'],
    },
    // fallbackLng: {
    //     default: ['tr'],
    // },
    // react: { useSuspense: false },
    // localePath:
    //     typeof window === 'undefined'
    //         ? require('path').resolve('./public/locales')
    //         : '/locales',
};

module.exports = config;
