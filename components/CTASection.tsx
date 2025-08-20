import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="section-padding bg-gradient-primary">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="heading-2 text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl leading-relaxed text-blue-100 max-w-3xl mx-auto">
              Let's discuss how we can help you achieve your digital goals. 
              Get in touch today for a free consultation and project estimate.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 hover:bg-gray-50 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              Start Your Project
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold rounded-lg transition-all duration-200 group"
            >
              <MessageCircle size={20} className="mr-2" />
              Schedule a Call
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 border-t border-blue-400/30">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-blue-100">Support Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">30 Day</div>
                <div className="text-blue-100">Money Back Guarantee</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">Free</div>
                <div className="text-blue-100">Initial Consultation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}