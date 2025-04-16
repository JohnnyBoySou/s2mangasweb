"use client";
import { ThemeProvider } from "styled-components"
import dark from "../../old/themes/dark"
import { ButtonOff, ButtonPrimary, Column, GlobalStyle, Title, Row, ButtonPrimaryLight} from "../../old/themes/global"
import Image from "next/image";
import '../../old/themes/ani.css'

export default function ThemeClient({children}) {
    return (
      <ThemeProvider theme={dark}>
      <GlobalStyle/>
      {children}
   </ThemeProvider>
  )

}
