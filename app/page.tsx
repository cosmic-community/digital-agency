import { Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import CaseStudiesSection from '@/components/CaseStudiesSection'
import CTASection from '@/components/CTASection'

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      
      <Suspense fallback={<div className="section-padding container">Loading services...</div>}>
        <ServicesSection />
      </Suspense>
      
      <Suspense fallback={<div className="section-padding container">Loading case studies...</div>}>
        <CaseStudiesSection />
      </Suspense>
      
      <Suspense fallback={<div className="section-padding container">Loading testimonials...</div>}>
        <TestimonialsSection />
      </Suspense>
      
      <CTASection />
    </div>
  )
}