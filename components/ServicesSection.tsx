import { cosmic } from '@/lib/cosmic'
import ServiceCard from './ServiceCard'
import { Service } from '@/types'

async function getServices(): Promise<Service[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'services' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    // Sort by display_order with proper null checks
    return objects.sort((a, b) => {
      const aOrder = a.metadata?.display_order ?? 999
      const bOrder = b.metadata?.display_order ?? 999
      return aOrder - bOrder
    })
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

export default async function ServicesSection() {
  const services = await getServices()

  if (!services.length) {
    return null
  }

  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive digital solutions that help businesses grow and succeed in the modern marketplace.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}