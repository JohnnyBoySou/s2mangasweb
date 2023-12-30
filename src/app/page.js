"use client";
import React from "react"
import { ThemeProvider } from "styled-components"
import dark from "../themes/dark"
import { GlobalStyle } from "../themes/global"

export default function ThemeClient({children}) {
  return (
   <ThemeProvider theme={dark}>
      <GlobalStyle/>
      {children}
   </ThemeProvider>
  )
}
