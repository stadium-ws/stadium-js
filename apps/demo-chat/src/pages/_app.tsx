import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import theme from '../theme'

import 'sanitize.css'
import GlobalStyle from '@/components/GlobalStyle'
import Layout from '@/components/Layout'

const App = ({
  Component: Page,
  pageProps
}: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Page {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default App
