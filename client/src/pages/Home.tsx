import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Users, Zap, TrendingUp, Clock, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { WorkflowBuilder } from "@/components/WorkflowBuilder";
import { AddonsModal } from "@/components/AddonsModal";
import { ConsultationPopup } from "@/components/ConsultationPopup";

export default function Home() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();
  const [selectedTier, setSelectedTier] = useState<'starter' | 'professional' | 'enterprise' | null>(null);
  const [isAddonsModalOpen, setIsAddonsModalOpen] = useState(false);
  const [isConsultationPopupOpen, setIsConsultationPopupOpen] = useState(false);
  const [showConsultationPopupAfterDelay, setShowConsultationPopupAfterDelay] = useState(false);

  // Stripe payment links
  const stripeLinks = {
    starter: 'https://buy.stripe.com/dRmeVccoG3FW5712rGdwc04',
    professional: 'https://buy.stripe.com/14A8wOfAS2BS0QL9U8dwc03',
    enterprise: 'https://buy.stripe.com/5kQ3cudsK7Wc2YTgiwdwc02',
  };

  // Calendly link
  const calendlyLink = 'https://calendly.com/adminscsf/15min?hide_event_type_details=1&hide_gdpr_block=1';

  // Load Calendly script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Show consultation popup after 15 minutes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConsultationPopupAfterDelay(true);
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearTimeout(timer);
  }, []);

  const handleTierSelect = (tier: 'starter' | 'professional' | 'enterprise') => {
    setSelectedTier(tier);
    setIsAddonsModalOpen(true);
  };

  const handleConsultationYes = () => {
    setIsConsultationPopupOpen(false);
    // Scroll to pricing
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScheduleZoom = () => {
    setIsConsultationPopupOpen(false);
    // Open Calendly for 30-min Zoom call
    window.open(calendlyLink, '_blank');
  };

  const testimonials = [
    {
      name: "Sarah M.",
      role: "E-commerce Manager",
      text: "I was skeptical about AI automation. I thought it would be complicated and expensive. Within the first week, we saved 15 hours of manual work. Within a month, we'd automated three entire processes. This is a game-changer.",
      rating: 5,
    },
    {
      name: "James T.",
      role: "Operations Director",
      text: "The ROI was immediate. We implemented this on a Friday. By Monday, we were already seeing results. Our team can now focus on strategy instead of busywork.",
      rating: 5,
    },
    {
      name: "Maria L.",
      role: "Small Business Owner",
      text: "We tried three other automation platforms before this. They were either too technical or didn't work for our use case. This one just works. Support is incredible too.",
      rating: 5,
    },
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Smart Workflow Builder",
      description: "No coding required. Drag-and-drop interface that anyone can use.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "AI-Powered Decision Making",
      description: "Your automation understands context and makes intelligent decisions.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multi-Channel Integration",
      description: "Connect to email, Slack, Zapier, your CRM, and any tool you use.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-Time Monitoring",
      description: "Track every automation with detailed logs and performance metrics.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">AI Automation</div>
          <div className="flex gap-4 items-center">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-700">{user?.name}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  Stop Wasting 20+ Hours Per Week on Repetitive Tasks
                </h1>
                <p className="text-xl text-slate-600 mb-8">
                  Get AI-powered automation set up in 48-72 hours. Proven with $1M+ in client success and 100% satisfaction rate.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <a
                    href="#pricing"
                    className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-lg"
                  >
                    View Pricing
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                  <button
                    onClick={() => {
                      const calendlyWidget = document.querySelector('.calendly-inline-widget');
                      if (calendlyWidget) {
                        calendlyWidget.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition"
                  >
                    Schedule Free Consultation
                  </button>
                  <a
                    href="https://cdn.manus.space/webdev-static-assets/workflow-builder-demo.mp4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg font-bold text-lg hover:border-slate-400 hover:bg-slate-50 transition"
                  >
                    Watch Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  No credit card required
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-4">48-72</div>
                  <p className="text-xl mb-8">Hours to Full Automation</p>
                  <div className="space-y-4">
                    <div className="bg-white/20 rounded-lg p-4">
                      <p className="font-semibold">$1M+</p>
                      <p className="text-sm">Client Success</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                      <p className="font-semibold">100%</p>
                      <p className="text-sm">Success Rate</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                      <p className="font-semibold">5,000+</p>
                      <p className="text-sm">Businesses Automated</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-12 text-center">The Problem You're Facing</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-800 rounded-lg p-8">
                <div className="text-4xl font-bold text-red-400 mb-4">20+</div>
                <p className="text-lg">Hours wasted on repetitive tasks every week</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-8">
                <div className="text-4xl font-bold text-red-400 mb-4">$2,500</div>
                <p className="text-lg">Monthly cost of manual labor that could be automated</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-8">
                <div className="text-4xl font-bold text-red-400 mb-4">3x</div>
                <p className="text-lg">Slower than competitors who use automation</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-12 text-center text-slate-900">The Solution</h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12 border border-blue-200">
              <p className="text-xl text-slate-700 mb-6">
                We build custom AI automations that work exactly how your business operates. No generic templates. No complicated setup. Just results.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">48-72 Hour Delivery</h3>
                    <p className="text-slate-600">Most agencies take weeks. We deliver in days.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">200+ Add-ons</h3>
                    <p className="text-slate-600">Customize your automation exactly how you need it.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Proven Results</h3>
                    <p className="text-slate-600">$1M+ in client success with 100% satisfaction.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Full Support</h3>
                    <p className="text-slate-600">30-90 days of support included with every package.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-12 text-center text-slate-900">What You Get</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition">
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Builder Section */}
        <WorkflowBuilder />

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-4xl font-bold mb-4 text-center text-slate-900">Simple, Transparent Pricing</h2>
            <p className="text-xl text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Choose the perfect plan for your needs. All packages include our workflow builder and 30-90 days of support.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Starter */}
              <div className="border-2 border-slate-200 rounded-xl p-8 hover:border-blue-600 transition">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Starter</h3>
                <p className="text-slate-600 mb-6">Perfect for testing automation</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">$297</span>
                  <p className="text-slate-600 text-sm mt-2">One-time investment</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">30-min consultation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">Basic setup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">30 days support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">Choose 3 add-ons</span>
                  </li>
                </ul>
                <button
                  onClick={() => handleTierSelect('starter')}
                  className="w-full bg-slate-200 text-slate-900 py-3 rounded-lg font-bold hover:bg-slate-300 transition"
                >
                  Get Started
                </button>
              </div>

              {/* Professional (Recommended) */}
              <div className="border-2 border-blue-600 rounded-xl p-8 shadow-lg relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  RECOMMENDED
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Professional</h3>
                <p className="text-slate-600 mb-6">Best for most businesses</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">$597</span>
                  <p className="text-slate-600 text-sm mt-2">One-time investment</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">1-hour consultation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">Full implementation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">60 days support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">Choose 5 add-ons</span>
                  </li>
                </ul>
                <button
                  onClick={() => handleTierSelect('professional')}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Get Started
                </button>
              </div>

              {/* Enterprise */}
              <div className="border-2 border-slate-200 rounded-xl p-8 hover:border-blue-600 transition">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Enterprise</h3>
                <p className="text-slate-600 mb-6">For complex needs</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">$1,497</span>
                  <p className="text-slate-600 text-sm mt-2">One-time investment</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">2-hour consultation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">Comprehensive solution</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">90 days support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">Choose 10 add-ons</span>
                  </li>
                </ul>
                <button
                  onClick={() => handleTierSelect('enterprise')}
                  className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-12 text-center text-slate-900">What Our Clients Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg p-8 shadow-md">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-slate-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calendly Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-4xl font-bold mb-4 text-center text-slate-900">Schedule Your Free Consultation</h2>
            <p className="text-center text-slate-600 mb-12">
              Get a personalized assessment of your automation needs. No credit card required.
            </p>
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/adminscsf/15min?hide_event_type_details=1&hide_gdpr_block=1"
              style={{ minWidth: '320px', height: '630px' }}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Reclaim Your Time?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join 5,000+ businesses that have already automated their workflows and saved thousands of hours.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition shadow-lg"
            >
              View Pricing
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">AI Automation Service</h3>
              <p className="text-slate-400 text-sm">Fast, affordable automation for your business.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2026 AI Automation Service. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedTier && (
        <AddonsModal
          isOpen={isAddonsModalOpen}
          tier={selectedTier}
          onClose={() => {
            setIsAddonsModalOpen(false);
            setSelectedTier(null);
          }}
          onSelect={() => {
            setIsAddonsModalOpen(false);
            setSelectedTier(null);
          }}
          stripeLink={stripeLinks[selectedTier]}
        />
      )}

      <ConsultationPopup
        isOpen={isConsultationPopupOpen || showConsultationPopupAfterDelay}
        onClose={() => {
          setIsConsultationPopupOpen(false);
          setShowConsultationPopupAfterDelay(false);
        }}
        onYes={handleConsultationYes}
        onScheduleZoom={handleScheduleZoom}
      />
    </div>
  );
}
