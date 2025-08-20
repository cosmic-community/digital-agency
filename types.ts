export interface CosmicFile {
  url: string
  imgix_url: string
}

export interface CosmicOption {
  key: string
  value: string
}

export interface Service {
  id: string
  title: string
  slug: string
  metadata: {
    service_name: string
    short_description: string
    full_description: string
    service_icon?: string
    featured_image?: CosmicFile
    key_features?: string[]
    display_order?: number
  }
}

export interface TeamMember {
  id: string
  title: string
  slug: string
  metadata: {
    full_name: string
    job_title: string
    bio: string
    profile_photo?: CosmicFile
    email?: string
    social_links?: {
      linkedin?: string
      twitter?: string
      github?: string
      dribbble?: string
    }
    department?: CosmicOption
    display_order?: number
  }
}

export interface Testimonial {
  id: string
  title: string
  slug: string
  metadata: {
    client_name: string
    client_company?: string
    client_title?: string
    testimonial_text: string
    client_photo?: CosmicFile
    company_logo?: CosmicFile
    rating?: CosmicOption
    related_services?: Service[]
    featured?: boolean
  }
}

export interface CaseStudy {
  id: string
  title: string
  slug: string
  metadata: {
    project_title: string
    client_name: string
    client_industry?: string
    summary: string
    challenge: string
    solution: string
    results: string
    featured_image?: CosmicFile
    project_gallery?: CosmicFile[]
    project_url?: string
    services_used?: Service[]
    featured?: boolean
  }
}