import React from "react"

export default function PublicLayout({ children }) {
  return (
      <div style={{ overflow: 'hidden', }} >
        {children}
      </div>
  )
}
