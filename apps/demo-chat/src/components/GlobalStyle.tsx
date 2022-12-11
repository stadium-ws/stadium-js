import { createGlobalStyle } from 'styled-components'

const globalStyle = createGlobalStyle`
  html {
    font-size: 16px;
    font-family: ${({ theme }) => theme.fonts.families.primary};
    background-color: black;
    color: white;
  }
`

export default globalStyle
