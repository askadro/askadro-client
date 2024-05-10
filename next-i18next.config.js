// next-i18next.config.js

const config = {
    i18n: {
        defaultLocale: 'tr',
        locales: ['tr', 'en'],
    },
    fallbackLng: {
        default: ['tr'],
    },
    localePath:
        typeof window === 'undefined'
            ? require('path').resolve('./public/locales')
            : '/locales',
    nonExplicitSupportedLngs: true,
};

module.exports = config;
