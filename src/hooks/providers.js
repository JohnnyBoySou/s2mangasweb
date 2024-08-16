'use client';
import { ThemeProvider } from "styled-components"
import dark from "@theme/dark"
import { GlobalStyle } from "@theme/global"
import StyledComponentsRegistry from "@hooks/registry";

export default function Providers({ children }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={dark}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  )
}
