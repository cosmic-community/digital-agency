import { cosmic } from '@/lib/cosmic'
import { CaseStudy } from '@/types'

export default async function CaseStudiesPage() {
  try {
    const { objects: caseStudies } = await cosmic.objects
      .find({
        type: 'case-studies',
      })
      .props(['title', 'slug', 'metadata'])
      .depth(1) as { objects: CaseStudy[] }

    // Sort featured case studies first, then by creation date
    const sortedCaseStudies = caseStudies.sort((a, b) => {
      if (a.metadata.featured && !b.metadata.featured) return -1
      if (!a.metadata.featured && b.metadata.featured) return 1
      return 0
    })

    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Case Studies
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Discover how we've helped businesses transform their digital presence and achieve remarkable results
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {sortedCaseStudies.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No case studies found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {sortedCaseStudies.map((caseStudy) => (
                  <article key={caseStudy.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* Featured Image */}
                    <div className="aspect-video overflow-hidden">
                      {caseStudy.metadata.featured_image ? (
                        <img
                          src={`${caseStudy.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                          alt={caseStudy.metadata.project_title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L32 26M6 18h36v26a2 2 0 01-2 2H8a2 2 0 01-2-2V18z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Case Study Content */}
                    <div className="p-6">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {caseStudy.metadata.featured && (
                          <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                            Featured
                          </span>
                        )}
                        {caseStudy.metadata.client_industry && (
                          <span className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                            {caseStudy.metadata.client_industry}
                          </span>
                        )}
                      </div>

                      {/* Title and Client */}
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {caseStudy.metadata.project_title}
                      </h2>
                      <p className="text-blue-600 font-medium mb-4">
                        {caseStudy.metadata.client_name}
                      </p>

                      {/* Summary */}
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {caseStudy.metadata.summary}
                      </p>

                      {/* Services Used */}
                      {caseStudy.metadata.services_used && caseStudy.metadata.services_used.length > 0 && (
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2">
                            {caseStudy.metadata.services_used.map((service: any) => (
                              <span key={service.id} className="inline-flex items-center px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full">
                                <span className="mr-1">{service.metadata.service_icon}</span>
                                {service.metadata.service_name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Project URL */}
                      <div className="flex items-center justify-between">
                        {caseStudy.metadata.project_url && (
                          <a
                            href={caseStudy.metadata.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            View Live Project
                            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                          Read Full Case Study
                          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to create your success story?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business with innovative digital solutions.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Start Your Project
              <svg className="ml-2 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error fetching case studies:', error)
    return (
      <div className="min-h-screen bg-white">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Case Studies</h1>
            <p className="text-gray-500">Unable to load case studies at this time.</p>
          </div>
        </section>
      </div>
    )
  }
}

export const metadata = {
  title: 'Case Studies | Digital Agency',
  description: 'Discover how we\'ve helped businesses transform their digital presence and achieve remarkable results.',
}