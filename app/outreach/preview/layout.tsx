import Header from '@/components/Header'

export default function OutreachPreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
