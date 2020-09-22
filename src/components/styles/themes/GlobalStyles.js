import { createGlobalStyle } from 'styled-components'
import { layout } from './themes'

export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        src:  url('https://fonts.googleapis.com/css2?family=Cantarell:ital,wght@0,400;0,700;1,400;1,700&family=Fira+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Oxygen:wght@400;700&family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&family=Ubuntu:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap') format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    body{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: ${(props) => props.theme.backgroundColor};
      color: ${(props) => props.theme.texttitleColor};
      line-height: 1.5;
      overflow-x: hidden;
      text-rendering: optimizeLegibility;
    }
    *,*::before,*::after{
        box-sizing:border-box;
    }
    .no-gutters>.wrap,
    .no-gutters>[class*='wrap-'] {
        padding-right: 0;
        padding-left: 0;
    }
    [class*='wrap-'],[class*='wrap']  {
        width: 100%;
        padding-right: ${layout.gutter};
        padding-left: ${layout.gutter};
    }
    img{
        max-width:100%;
    }
`
