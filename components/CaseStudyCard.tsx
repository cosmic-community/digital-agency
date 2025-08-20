import Link from 'next/link'
import { CaseStudy } from '@/types'
import { ArrowRight, ExternalLink } from 'lucide-react'

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  className?: string;
}

export default function CaseStudyCard({ caseStudy, className = '' }: CaseStudyCardProps) {
  const { metadata } = caseStudy

  return (
    <div className={`card group ${className}`}>
      {/* Featured Image */}
      {metadata.featured_image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={`${metadata.featured_image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={metadata.project_title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={400}
            height={250}
          />
        </div>
      )}
      
      <div className="p-6 space-y-4">
        {/* Client & Industry */}
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-primary-600">
            {metadata.client_name}
          </div>
          {metadata.client_industry && (
            <div className="text-sm text-gray-500">
              {metadata.client_industry}
            </div>
          )}
        </div>

        {/* Project Title */}
        <h3 className="heading-4 text-gray-900 group-hover:text-primary-600 transition-colors">
          {metadata.project_title}
        </h3>

        {/* Summary */}
        <p className="body-text line-clamp-3">
          {metadata.summary.split('\n')[0]}
        </p>

        {/* Services Used */}
        {metadata.services_used && metadata.services_used.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {metadata.services_used.slice(0, 3).map((service) => (
              <span 
                key={service.id}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {service.metadata?.service_name || service.title}
              </span>
            ))}
            {metadata.services_used.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{metadata.services_used.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Link 
            href={`/case-studies/${caseStudy.slug}`}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors group"
          >
            Read Case Study
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>

          {metadata.project_url && (
            <a
              href={metadata.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="View live project"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}