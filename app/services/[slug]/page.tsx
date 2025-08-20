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
        <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
          <div className="container">
            <div className="text-center">
              <div className="text-6xl mb-6">{service.metadata.service_icon}</div>
              <h1 className="heading-1 text-white mb-6">
                {service.metadata.service_name}
              </h1>
              <p className="body-large text-primary-100 max-w-3xl mx-auto">
                {service.metadata.short_description}
              </p>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {service.metadata.featured_image && (
          <section className="section-padding-sm">
            <div className="container">
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
                <img
                  src={`${service.metadata.featured_image.imgix_url}?w=1400&h=600&fit=crop&auto=format,compress`}
                  alt={service.metadata.service_name}
                  className="w-full h-full object-cover"
                  width={1400}
                  height={600}
                />
              </div>
            </div>
          </section>
        )}

        {/* Service Details */}
        <section className="section-padding">
          <div className="container">
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
                  <h3 className="heading-3 text-gray-900 mb-6">Key Features</h3>
                  <ul className="space-y-3">
                    {service.metadata.key_features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 mt-0.5">
                          <svg className="h-3 w-3 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="body-text">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gray-50">
          <div className="container text-center">
            <h2 className="heading-2 text-gray-900 mb-4">
              Ready to get started?
            </h2>
            <p className="body-large text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how our {service.metadata.service_name.toLowerCase()} services can help your business grow.
            </p>
            <a
              href="/contact"
              className="button-primary group"
            >
              Get Started
              <svg className="ml-2 -mr-1 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
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
      openGraph: {
        title: `${service.metadata.service_name} | Digital Agency`,
        description: service.metadata.short_description,
        images: service.metadata.featured_image ? [
          {
            url: `${service.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
            width: 1200,
            height: 630,
            alt: service.metadata.service_name,
          }
        ] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Service Not Found',
    }
  }
}