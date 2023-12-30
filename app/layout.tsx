import React from "react"
export const metadata = {
  title: 'S2Mangás',
  description: 'O melhor jeito de ler mangás',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
