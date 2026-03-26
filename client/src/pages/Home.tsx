import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Users, Zap, TrendingUp, Clock } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const handleStripeCheckout = async () => {
    setIsLoading(true);
    try {
      // Create a Stripe Payment Link - you'll need to set this up in your Stripe dashboard
      // For now, we'll redirect to a generic Stripe payment link
      const stripePaymentLink = "https://buy.stripe.com/test_placeholder";
      window.open(stripePaymentLink, "_blank");
    } catch (error) {
      console.error("Error initiating checkout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const testimonials = [
    {
      name: "Sarah M.",
      role: "E-commerce Manager",
      text: "I was skeptical about AI automation. I thought it would be complicated and expensive. Within the first week, we saved 15 hours of manual work. Within a month, we'd automated three entire processes. This is a game-changer.",
    },
    {
      name: "James T.",
      role: "Operations Director",
      text: "The ROI was immediate. We implemented this on a Friday. By Monday, we were already seeing results. Our team can now focus on strategy instead of busywork.",
    },
    {
      name: "Maria L.",
      role: "Small Business Owner",
      text: "We tried three other automation platforms before this. They were either too technical or didn't work for our use case. This one just works. Support is incredible too.",
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
      description: "Know exactly what's happening with your automations 24/7.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900">AI Automation</span>
          </div>
          <Button
            onClick={handleStripeCheckout}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? "Processing..." : "Get Started"}
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
                  Stop Wasting 20+ Hours Per Week on Repetitive Tasks
                </h1>
                <p className="text-xl text-slate-600">
                  The AI Automation System That Turns Your Business Into a 24/7 Money Machine—Even While You Sleep
                </p>
              </div>

              <p className="text-lg text-slate-700 leading-relaxed">
                You already know automation works. The problem? Most solutions are either too complicated or too generic. We built something different—a system that handles 80% of your repetitive work without requiring developers, coding knowledge, or months of setup.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleStripeCheckout}
                  disabled={isLoading}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg h-14 px-8 group"
                >
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg h-14 px-8 border-slate-300"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>No credit card required • 14-day free trial</span>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663471530202/PNCpxKYmPVTbSXwnrkasqj/ai-automation-hero-Puyu29cB5zXzUSs9LVBQUP.webp"
                alt="AI Automation Dashboard"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-6">You're Losing Money Every Single Day</h2>
            <p className="text-lg text-slate-300 mb-6">
              Here's what happens when you don't automate: Your team spends 20+ hours per week on repetitive tasks. That's not just wasted time—that's wasted money. If your team member makes $50/hour, that's $1,000+ per week in lost productivity. Over a year, that's $50,000+ just sitting on the table.
            </p>
            <p className="text-lg text-slate-300">
              But it gets worse. Manual processes are error-prone. One mistake costs you. One missed follow-up costs you a customer. One delayed response costs you a deal. And you're competing against businesses that have already automated. They're faster. They're cheaper. They're winning.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              The AI Automation System Built for Business Owners
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              No complicated setup. No expensive developers. No months of implementation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 border border-slate-200 rounded-lg hover:shadow-lg transition-shadow bg-white"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">What You Get:</h3>
            <ul className="space-y-3">
              {[
                "Complete automation audit (we identify all your automation opportunities)",
                "Custom workflow design (built specifically for your business)",
                "Full implementation and setup (we handle the technical work)",
                "30 days of hands-on support (we make sure everything works)",
                "Access to our automation library (pre-built workflows you can customize)",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-slate-50 py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">
            Trusted by Business Owners Everywhere
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "5,000+", label: "Businesses Automated" },
              { number: "50M+", label: "Tasks Automated Monthly" },
              { number: "80%", label: "Average Time Saved" },
              { number: "$2.5M+", label: "Revenue Generated for Clients" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <p className="text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Stop Wasting Time?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of business owners who are saving time and making more money with AI automation.
          </p>
          <Button
            onClick={handleStripeCheckout}
            disabled={isLoading}
            size="lg"
            className="bg-white text-blue-600 hover:bg-slate-100 text-lg h-14 px-8"
          >
            {isLoading ? "Processing..." : "Start Your Free Trial Today"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-blue-100 text-sm mt-4">No credit card required • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; 2026 AI Automation Service. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
