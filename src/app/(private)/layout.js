
import React from "react"
import { Column, Row } from "@/ui"
import SideBar from "@/ui/components/SideBar"

export default function PrivateLayout({ children }) {
  return (
    <div style={{ overflow: 'hidden', }} >
      <Row>
        <SideBar />
        <Column style={{ width: '100%', height: '97vh', overflow: 'hidden', backgroundColor: "#262626", borderRadius: 12, marginBottom: 28, marginRight: 12, }}>
          {children}
        </Column>
      </Row>
    </div>
  )
}
