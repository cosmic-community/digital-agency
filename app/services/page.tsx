import { Metadata } from 'next'
import { getAllServices } from '@/lib/cosmic'
import ServiceCard from '@/components/ServiceCard'
import { Service } from '@/types'

export const metadata: Metadata = {
  title: 'Our Services | Digital Agency',
  description: 'Comprehensive digital services including web development, UI/UX design, and digital marketing. Transform your business with our expert solutions.',
}

export default async function ServicesPage() {
  const services = await getAllServices()

  return (
    <div className="section-padding">
      <div className="container">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="heading-2 text-gray-900">
            Our Services
          </h1>
          <p className="body-large max-w-3xl mx-auto">
            We provide comprehensive digital solutions to help your business grow. 
            From custom development to strategic marketing, we've got you covered.
          </p>
        </div>

        {/* Services Grid */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: Service) => (
              <ServiceCard 
                key={service.id} 
                service={service}
                className="animate-fade-in"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500">No services available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}