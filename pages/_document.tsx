import {DocumentProps, Head, Html, Main, NextScript} from 'next/document'
import i18nextConfig from '../next-i18next.config'

type Props = DocumentProps & {}

export default function Document(props:Props) {
    const currentLocale =
        props.__NEXT_DATA__.locale ??
        i18nextConfig.i18n.defaultLocale
    return (
        <Html lang={currentLocale}>
            <Head />
            <body className="bg-white text-black">
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}