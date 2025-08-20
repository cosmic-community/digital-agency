import { getAllServices } from '@/lib/cosmic'
import ServiceCard from '@/components/ServiceCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function ServicesSection() {
  const services = await getAllServices()

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="heading-2 text-gray-900">
            Our Services
          </h2>
          <p className="body-large max-w-3xl mx-auto">
            We offer comprehensive digital solutions to help your business thrive online. 
            From custom web development to strategic marketing campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
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
      </div>
    </section>
  )
}