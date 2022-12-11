import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import theme from '../theme'

import 'sanitize.css'
import GlobalStyle from '@/components/GlobalStyle'
import Layout from '@/components/Layout'
import { inter } from '@/utils/fonts'
import SessionContextProvider from '@/contexts/SessionContext'

const App = ({
  Component: Page,
  pageProps
}: AppProps) => {
  return (
    <main className={inter.className}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <SessionContextProvider>
          <Layout>
            <Page {...pageProps} />
          </Layout>
        </SessionContextProvider>
      </ThemeProvider>
    </main>
  )
}

export default App
