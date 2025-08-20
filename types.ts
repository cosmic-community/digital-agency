// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Service object type
export interface Service extends CosmicObject {
  type: 'services';
  metadata: {
    service_name: string;
    short_description: string;
    full_description: string;
    service_icon?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    key_features?: string[];
    display_order?: number;
  };
}

// Team Member object type
export interface TeamMember extends CosmicObject {
  type: 'team-members';
  metadata: {
    full_name: string;
    job_title: string;
    bio: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    social_links?: {
      linkedin?: string;
      twitter?: string;
      github?: string;
      dribbble?: string;
    };
    department?: {
      key: string;
      value: string;
    };
    display_order?: number;
  };
}

// Testimonial object type
export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    client_name: string;
    client_company?: string;
    client_title?: string;
    testimonial_text: string;
    client_photo?: {
      url: string;
      imgix_url: string;
    };
    company_logo?: {
      url: string;
      imgix_url: string;
    };
    rating?: {
      key: string;
      value: string;
    };
    related_services?: Service[];
    featured?: boolean;
  };
}

// Case Study object type
export interface CaseStudy extends CosmicObject {
  type: 'case-studies';
  metadata: {
    project_title: string;
    client_name: string;
    client_industry?: string;
    summary: string;
    challenge: string;
    solution: string;
    results: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    project_gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    project_url?: string;
    services_used?: Service[];
    featured?: boolean;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards for runtime validation
export function isService(obj: CosmicObject): obj is Service {
  return obj.type === 'services';
}

export function isTeamMember(obj: CosmicObject): obj is TeamMember {
  return obj.type === 'team-members';
}

export function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type === 'testimonials';
}

export function isCaseStudy(obj: CosmicObject): obj is CaseStudy {
  return obj.type === 'case-studies';
}

// Component prop types
export interface ServiceCardProps {
  service: Service;
  className?: string;
}

export interface TeamMemberCardProps {
  member: TeamMember;
  className?: string;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  className?: string;
}