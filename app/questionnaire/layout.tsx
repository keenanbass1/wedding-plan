import Header from '@/components/Header'

export default function QuestionnaireLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
