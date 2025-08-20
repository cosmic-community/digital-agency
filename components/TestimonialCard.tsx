import { Testimonial } from '@/types'
import { Star, Quote } from 'lucide-react'

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export default function TestimonialCard({ testimonial, className = '' }: TestimonialCardProps) {
  const { metadata } = testimonial

  // Parse rating number from key
  const ratingNumber = metadata.rating ? parseInt(metadata.rating.key) : 5

  return (
    <div className={`card ${className}`}>
      <div className="p-6 space-y-6">
        {/* Quote Icon */}
        <div className="flex items-start justify-between">
          <Quote className="text-primary-300 flex-shrink-0" size={32} />
          
          {/* Rating */}
          {metadata.rating && (
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={`${
                    i < ratingNumber 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
          )}
        </div>

        {/* Testimonial Text */}
        <blockquote className="text-gray-700 leading-relaxed">
          "{metadata.testimonial_text}"
        </blockquote>

        {/* Client Info */}
        <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
          {/* Client Photo */}
          {metadata.client_photo && (
            <img
              src={`${metadata.client_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
              alt={metadata.client_name}
              className="w-12 h-12 rounded-full object-cover"
              width={48}
              height={48}
            />
          )}
          
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900">
              {metadata.client_name}
            </div>
            <div className="text-sm text-gray-600">
              {metadata.client_title && metadata.client_company ? (
                `${metadata.client_title}, ${metadata.client_company}`
              ) : metadata.client_title ? (
                metadata.client_title
              ) : metadata.client_company ? (
                metadata.client_company
              ) : null}
            </div>
          </div>

          {/* Company Logo */}
          {metadata.company_logo && (
            <img
              src={`${metadata.company_logo.imgix_url}?w=80&h=40&fit=crop&auto=format,compress`}
              alt={metadata.client_company || 'Company logo'}
              className="w-10 h-5 object-contain opacity-60"
              width={40}
              height={20}
            />
          )}
        </div>

        {/* Related Services */}
        {metadata.related_services && metadata.related_services.length > 0 && (
          <div className="pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500 mb-2">Services used:</div>
            <div className="flex flex-wrap gap-2">
              {metadata.related_services.map((service) => (
                <span 
                  key={service.id}
                  className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                >
                  {service.metadata?.service_name || service.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}