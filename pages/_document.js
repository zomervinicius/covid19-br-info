import Document, {Head, Html, Main, NextScript} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="google-site-verification"
            content="4EoBeuccwmG0j_AVpBVN6KbiDkfHYNQTUaepqhEcmfE"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-161038624-1"
          ></script>
          <script>
            window.dataLayer = window.dataLayer || []; function gtag()
            {typeof window !== 'undefined' && window.dataLayer.push(arguments)}
            gtag('js', new Date()); gtag('config', 'UA-161038624-1');
          </script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
