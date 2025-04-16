"use client";
import { ThemeProvider } from "styled-components"
import dark from "../../../old/themes/dark"
import { GlobalStyle } from "../../../old/themes/global"

export default function ThemeClient({children}) {
  return (
   <ThemeProvider theme={dark}>
      <GlobalStyle/>
      {children}
   </ThemeProvider>
  )
}
