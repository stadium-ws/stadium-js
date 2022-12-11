import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import theme from '../theme'

import 'sanitize.css'

const App = ({
  Component: Page,
  pageProps
}: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Page {...pageProps} />
    </ThemeProvider>
  )
}

export default App
