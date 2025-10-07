import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { AppProvider } from '@/components/providers/AppProvider'

export const metadata: Metadata = {
  title: 'GARANT IPOTEKI - Максимальные суммы кредитов',
  description: 'Получите в 2-3 раза больше денег, чем предлагает банк напрямую. Профессиональное сопровождение кредитных заявок.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}