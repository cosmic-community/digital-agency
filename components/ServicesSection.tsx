import { getAllServices } from '@/lib/cosmic'
import ServiceCard from '@/components/ServiceCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Service } from '@/types'

export default async function ServicesSection() {
  const services = await getAllServices()

  // Sort services by display_order if available
  const sortedServices = services.sort((a: Service, b: Service) => {
    const orderA = a.metadata.display_order || 999
    const orderB = b.metadata.display_order || 999
    return orderA - orderB
  })

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="heading-2 text-gray-900">
            Our Services
          </h2>
          <p className="body-large max-w-3xl mx-auto text-gray-600">
            We offer comprehensive digital solutions to help your business thrive online. 
            From custom web development to strategic marketing campaigns.
          </p>
        </div>

        {sortedServices.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {sortedServices.map((service: Service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service}
                  className="animate-fade-in"
                />
              ))}
            </div>

            <div className="text-center">
              <Link href="/services" className="button-secondary group">
                View All Services
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500">No services available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}