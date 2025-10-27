import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JA Padel Academy Valencia',
  description: 'Premium padel academy in Valencia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
