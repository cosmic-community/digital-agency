import { cosmic } from '@/lib/cosmic'
import TestimonialCard from './TestimonialCard'
import { Testimonial } from '@/types'

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ 
        type: 'testimonials',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(6)
    
    return objects || []
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export default async function TestimonialsSection() {
  const testimonials = await getTestimonials()

  if (!testimonials.length) {
    return null
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}