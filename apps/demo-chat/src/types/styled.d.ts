import 'styled-components'
import type theme from '@/theme'

export type DefaultT = typeof theme

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends DefaultT {}
}
