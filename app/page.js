"use client";
import React from "react"
import { ThemeProvider } from "styled-components"
import dark from "./themes/dark"
import { GlobalStyle } from "./themes/global"
import Feed from "./pages/feed";

export default function App() {
  return (
   <ThemeProvider theme={dark}>
      <Feed/>
      <GlobalStyle/>
   </ThemeProvider>
  )
}
