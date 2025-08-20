# Digital Agency Portfolio Website

![App Preview](https://imgix.cosmicjs.com/939a3a20-7d71-11f0-8dcc-651091f6a7c0-photo-1460925895917-afdab827c52f-1755658720868.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, professional website for a digital agency built with Next.js 15 and powered by Cosmic CMS. Showcase your services, team, testimonials, and case studies with this fully responsive, SEO-optimized website.

## Features

- 🎯 **Service Showcase** - Dynamic service pages with detailed descriptions, features, and imagery
- 👥 **Team Profiles** - Professional team member pages with bios, social links, and department filtering
- 💬 **Client Testimonials** - Customer feedback with ratings, photos, and company logos
- 📊 **Case Studies** - Detailed project showcases with galleries, challenges, solutions, and results
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- 🚀 **Performance Optimized** - Fast loading with Next.js 15 App Router and optimized images
- 🔍 **SEO Ready** - Dynamic meta tags and structured data for better search visibility
- ♿ **Accessible** - WCAG compliant design with proper semantic markup

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=68a538ec06b0460f30fe6568&clone_repository=68a5559806b0460f30fe658c)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a content model for a digital agency company website with services, team members, testimonials, and case studies

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless CMS for content management
- **React** - UI library
- **Lucide React** - Modern icon library

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository
```bash
git clone <repository-url>
cd digital-agency-website
```

2. Install dependencies
```bash
bun install
```

3. Set up environment variables
Create a `.env.local` file with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Services
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all services
const { objects: services } = await cosmic.objects
  .find({ type: 'services' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get single service by slug
const { object: service } = await cosmic.objects
  .findOne({ type: 'services', slug: 'web-development' })
  .depth(1)
```

### Fetching Team Members
```typescript
// Get team members by department
const { objects: teamMembers } = await cosmic.objects
  .find({ 
    type: 'team-members',
    'metadata.department': 'design' 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Testimonials with Related Services
```typescript
// Get featured testimonials with related services
const { objects: testimonials } = await cosmic.objects
  .find({ 
    type: 'testimonials',
    'metadata.featured': true 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Includes related services data
```

## Cosmic CMS Integration

This website integrates with the following Cosmic object types:

### Services
- Service name, descriptions, and features
- Service icons and featured images
- Display ordering

### Team Members
- Full names, job titles, and bios
- Profile photos and contact information
- Social media links and department categorization

### Testimonials
- Client information and testimonial text
- Client photos and company logos
- Star ratings and related services
- Featured testimonial highlighting

### Case Studies
- Project details and client information
- Challenge, solution, and results sections
- Featured images and project galleries
- Related services and project URLs

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect your repository to Netlify
2. Set build command to `bun run build`
3. Set publish directory to `.next`
4. Add environment variables in Netlify dashboard

### Other Platforms
This Next.js application can be deployed to any platform that supports Node.js applications.

## Project Structure

```
├── app/                    # Next.js App Router pages
├── components/            # Reusable components
├── lib/                   # Utilities and Cosmic client
├── types.ts              # TypeScript definitions
├── tailwind.config.js    # Tailwind CSS configuration
└── next.config.js        # Next.js configuration
```
<!-- README_END -->