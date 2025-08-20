import { getFeaturedTestimonials } from '@/lib/cosmic'
import TestimonialCard from '@/components/TestimonialCard'
import { Testimonial } from '@/types'

export default async function TestimonialsSection() {
  const testimonials = await getFeaturedTestimonials()

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="heading-2 text-gray-900">
            What Our Clients Say
          </h2>
          <p className="body-large max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients 
            have to say about working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial: Testimonial) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial}
              className="animate-fade-in"
            />
          ))}
        </div>
      </div>
    </section>
  )
}