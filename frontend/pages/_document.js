import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="viewport" content="width=devide-width, initial-scale=1.0" />
                    <link rel="stylesheet" href="/public/styles/styles.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
