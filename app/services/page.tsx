import { Metadata } from 'next'
import { getAllServices } from '@/lib/cosmic'
import ServiceCard from '@/components/ServiceCard'
import { Service } from '@/types'

export const metadata: Metadata = {
  title: 'Our Services | Digital Agency',
  description: 'Comprehensive digital services including web development, UI/UX design, and digital marketing. Transform your business with our expert solutions.',
  openGraph: {
    title: 'Our Services | Digital Agency',
    description: 'Comprehensive digital services including web development, UI/UX design, and digital marketing. Transform your business with our expert solutions.',
  },
}

export default async function ServicesPage() {
  const services = await getAllServices()

  // Sort services by display_order if available
  const sortedServices = services.sort((a: Service, b: Service) => {
    const orderA = a.metadata.display_order || 999
    const orderB = b.metadata.display_order || 999
    return orderA - orderB
  })

  return (
    <div className="section-padding">
      <div className="container">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="heading-1 text-gray-900">
            Our Services
          </h1>
          <p className="body-large max-w-3xl mx-auto text-gray-600">
            We provide comprehensive digital solutions to help your business grow and succeed online. 
            From custom development to strategic marketing, we've got the expertise you need.
          </p>
        </div>

        {/* Services Grid */}
        {sortedServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedServices.map((service: Service) => (
              <ServiceCard 
                key={service.id} 
                service={service}
                className="animate-fade-in"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-6">🔧</div>
              <h3 className="heading-4 text-gray-900 mb-4">No Services Available</h3>
              <p className="body-text text-gray-500">
                We're working on adding our services. Please check back soon!
              </p>
            </div>
          </div>
        )}

        {/* CTA Section */}
        {sortedServices.length > 0 && (
          <div className="mt-20 text-center bg-gray-50 rounded-2xl p-12">
            <h2 className="heading-2 text-gray-900 mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="body-large text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can help you achieve your goals and grow your business.
            </p>
            <Link href="/contact" className="button-primary">
              Get Started Today
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}