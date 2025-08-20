// app/services/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { Service } from '@/types'
import { notFound } from 'next/navigation'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params

  try {
    const { object: service } = await cosmic.objects
      .findOne({
        type: 'services',
        slug: slug,
      })
      .props(['title', 'slug', 'metadata'])
      .depth(1) as { object: Service }

    if (!service) {
      notFound()
    }

    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-6xl mb-6">{service.metadata.service_icon}</div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {service.metadata.service_name}
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                {service.metadata.short_description}
              </p>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {service.metadata.featured_image && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
                <img
                  src={`${service.metadata.featured_image.imgix_url}?w=1400&h=600&fit=crop&auto=format,compress`}
                  alt={service.metadata.service_name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>
        )}

        {/* Service Details */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Description */}
              <div>
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: service.metadata.full_description }}
                />
              </div>

              {/* Key Features */}
              {service.metadata.key_features && Array.isArray(service.metadata.key_features) && service.metadata.key_features.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
                  <ul className="space-y-3">
                    {service.metadata.key_features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                          <svg className="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how our {service.metadata.service_name.toLowerCase()} services can help your business grow.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Get Started
              <svg className="ml-2 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error fetching service:', error)
    notFound()
  }
}

export async function generateStaticParams() {
  try {
    const { objects: services } = await cosmic.objects
      .find({
        type: 'services',
      })
      .props(['slug'])

    return services.map((service: { slug: string }) => ({
      slug: service.slug,
    }))
  } catch (error) {
    console.error('Error generating static params for services:', error)
    return []
  }
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params

  try {
    const { object: service } = await cosmic.objects
      .findOne({
        type: 'services',
        slug: slug,
      })
      .props(['title', 'metadata']) as { object: Service }

    if (!service) {
      return {
        title: 'Service Not Found',
      }
    }

    return {
      title: `${service.metadata.service_name} | Digital Agency`,
      description: service.metadata.short_description,
    }
  } catch (error) {
    return {
      title: 'Service Not Found',
    }
  }
}