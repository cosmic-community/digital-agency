import { getFeaturedCaseStudies } from '@/lib/cosmic'
import CaseStudyCard from '@/components/CaseStudyCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function CaseStudiesSection() {
  const caseStudies = await getFeaturedCaseStudies()

  if (caseStudies.length === 0) {
    return null
  }

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="heading-2 text-gray-900">
            Success Stories
          </h2>
          <p className="body-large max-w-3xl mx-auto">
            Explore our recent projects and see how we've helped businesses 
            achieve their digital goals with measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard 
              key={caseStudy.id} 
              caseStudy={caseStudy}
              className="animate-fade-in"
            />
          ))}
        </div>

        <div className="text-center">
          <Link href="/case-studies" className="button-secondary group">
            View All Case Studies
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}