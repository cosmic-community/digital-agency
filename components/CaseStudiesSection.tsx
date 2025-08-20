import { cosmic } from '@/lib/cosmic'
import CaseStudyCard from './CaseStudyCard'
import { CaseStudy } from '@/types'

async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ 
        type: 'case-studies',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(4)
    
    return objects || []
  } catch (error) {
    console.error('Error fetching case studies:', error)
    return []
  }
}

export default async function CaseStudiesSection() {
  const caseStudies = await getCaseStudies()

  if (!caseStudies.length) {
    return null
  }

  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Case Studies</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore how we've helped businesses achieve their goals through strategic digital solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
      </div>
    </section>
  )
}