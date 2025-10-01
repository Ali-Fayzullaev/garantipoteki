import React from 'react'
import { AppProvider } from '@/components/providers/AppProvider'
import Navigation from '@/components/ui/Navigation'
import HeroSection from '@/components/landing/HeroSection'
import QuizSection from '@/components/landing/QuizSection'
import EducationSection from '@/components/landing/EducationSection'
import SocialProofSection from '@/components/landing/SocialProofSection'
import BookingSection from '@/components/landing/BookingSection'
import FAQSection from '@/components/landing/FAQSection'
import FinalCTASection from '@/components/landing/FinalCTASection'
import FooterSection from '@/components/landing/FooterSection'

export default function Home() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main>
          <HeroSection />
          <QuizSection />
          <EducationSection />
          <SocialProofSection />
          <BookingSection />
          <FAQSection />
          <FinalCTASection />
        </main>
        <FooterSection />
      </div>
    </AppProvider>
  )
}