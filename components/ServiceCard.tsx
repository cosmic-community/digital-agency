import Link from 'next/link'
import { Service } from '@/types'
import { ArrowRight } from 'lucide-react'

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export default function ServiceCard({ service, className = '' }: ServiceCardProps) {
  const { metadata } = service

  return (
    <div className={`card group ${className}`}>
      {/* Featured Image */}
      {metadata.featured_image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={`${metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={metadata.service_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={300}
            height={200}
          />
        </div>
      )}
      
      <div className="p-6 space-y-4">
        {/* Service Icon & Name */}
        <div className="flex items-center space-x-3">
          {metadata.service_icon && (
            <span className="text-2xl">{metadata.service_icon}</span>
          )}
          <h3 className="heading-4 text-gray-900">
            {metadata.service_name}
          </h3>
        </div>

        {/* Description */}
        <p className="body-text">
          {metadata.short_description}
        </p>

        {/* Key Features */}
        {metadata.key_features && metadata.key_features.length > 0 && (
          <ul className="space-y-1">
            {metadata.key_features.slice(0, 3).map((feature, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 flex-shrink-0"></span>
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Learn More Link */}
        <Link 
          href={`/services/${service.slug}`}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors group"
        >
          Learn More
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}