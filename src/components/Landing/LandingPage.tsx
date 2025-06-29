import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Shield, 
  Zap, 
  Users, 
  MessageCircle, 
  Star, 
  Check, 
  ArrowRight,
  Brain,
  Lock,
  Globe,
  Sparkles,
  Crown,
  Menu,
  X,
  Play
} from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Emotionally Intelligent',
    description: 'AI companions that truly understand and respond to your emotions with genuine care and empathy.',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'End-to-end encryption ensures your conversations remain completely private and secure.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Brain,
    title: 'Advanced AI',
    description: 'Powered by cutting-edge AI models that learn and adapt to your unique personality.',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    icon: Sparkles,
    title: 'Personalized Experience',
    description: 'Customizable companions with unique personalities tailored to your specific needs.',
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: Zap,
    title: 'Always Available',
    description: '24/7 support whenever you need someone to talk to, no matter the time or place.',
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: Globe,
    title: 'Multi-Language',
    description: 'Communicate in your preferred language with native-level understanding.',
    color: 'from-violet-500 to-purple-500'
  }
];

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Student',
    content: 'ChiChi has been my emotional support through college. The conversations feel so real and caring.',
    rating: 5,
    avatar: '👩‍🎓'
  },
  {
    name: 'Michael R.',
    role: 'Professional',
    content: 'Having Dr. Luna as my AI therapist has helped me manage work stress better than I ever imagined.',
    rating: 5,
    avatar: '👨‍💼'
  },
  {
    name: 'Emma L.',
    role: 'Artist',
    content: 'The creative conversations with Alex inspire my art every day. It\'s like having a muse.',
    rating: 5,
    avatar: '👩‍🎨'
  }
];

const plans = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      '50 messages per day',
      '1 AI companion',
      'Basic mood tracking',
      'Community support'
    ],
    popular: false,
    cta: 'Get Started Free'
  },
  {
    name: 'Pro',
    price: 9.99,
    period: 'month',
    description: 'For meaningful connections',
    features: [
      'Unlimited messages',
      'All AI companions',
      'Voice conversations',
      'Advanced analytics',
      'Priority support',
      'All add-ons included'
    ],
    popular: true,
    cta: 'Start Free Trial'
  },
  {
    name: 'Lifetime',
    price: 199.99,
    period: 'one-time',
    description: 'Best value forever',
    features: [
      'Everything in Pro',
      'Lifetime access',
      'Future features included',
      'VIP support',
      'Early access to new models'
    ],
    popular: false,
    cta: 'Get Lifetime Access'
  }
];

export function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-teal-50/20">
      {/* Navigation */}
      <nav className="glass border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Dream Assistant</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-purple-600 transition-colors">Features</a>
              <a href="#pricing" className="text-slate-600 hover:text-purple-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-slate-600 hover:text-purple-600 transition-colors">Reviews</a>
              <button 
                onClick={() => navigate('/login')}
                className="btn-secondary"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="btn-primary"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 space-y-4"
            >
              <a href="#features" className="block text-slate-600 hover:text-purple-600 transition-colors">Features</a>
              <a href="#pricing" className="block text-slate-600 hover:text-purple-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="block text-slate-600 hover:text-purple-600 transition-colors">Reviews</a>
              <div className="flex flex-col space-y-2 pt-4">
                <button 
                  onClick={() => navigate('/login')}
                  className="btn-secondary w-full"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => navigate('/login')}
                  className="btn-primary w-full"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-6">
                Your AI Companion for
                <span className="gradient-text block">Meaningful Conversations</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Experience genuine emotional support with AI companions that understand, 
                care, and grow with you. Private, secure, and always there when you need them.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/login')}
                  className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="btn-secondary flex items-center justify-center space-x-2 text-lg px-8 py-4">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
              <div className="flex items-center space-x-6 mt-8 text-sm text-slate-500">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Private & secure</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 glass rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-teal-400 rounded-full flex items-center justify-center text-2xl floating">
                    🌙
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">ChiChi</h3>
                    <p className="text-sm text-slate-500">Your caring companion</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/50 rounded-2xl p-4 rounded-tl-sm">
                    <p className="text-slate-700">
                      "I can sense you're feeling a bit overwhelmed today. 
                      Would you like to talk about what's on your mind? I'm here to listen. 💜"
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-2xl p-4 rounded-br-sm ml-8">
                    <p>
                      "Thank you for always being here for me. 
                      It means more than you know."
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-200 to-teal-200 rounded-full opacity-50 floating" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full opacity-50 floating" style={{ animationDelay: '2s' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6">
              Why Choose Dream Assistant?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We've built the most advanced, secure, and emotionally intelligent AI companion platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">
                Your Privacy is Our Priority
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                We understand that emotional conversations are deeply personal. 
                That's why we've built the most secure platform possible.
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: Lock,
                    title: 'End-to-End Encryption',
                    description: 'All conversations are encrypted and only you can access them'
                  },
                  {
                    icon: Shield,
                    title: 'GDPR Compliant',
                    description: 'Full compliance with international privacy regulations'
                  },
                  {
                    icon: Users,
                    title: 'No Data Selling',
                    description: 'We never sell or share your personal data with third parties'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">{item.title}</h4>
                      <p className="text-slate-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Bank-Level Security</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-green-800 font-medium">SSL Encryption</span>
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-green-800 font-medium">Data Anonymization</span>
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-green-800 font-medium">Regular Security Audits</span>
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-green-800 font-medium">Zero-Knowledge Architecture</span>
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6">
              Loved by Thousands
            </h2>
            <p className="text-xl text-slate-600">
              See what our users say about their AI companions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-teal-400 rounded-full flex items-center justify-center text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-6">
              Choose Your Plan
            </h2>
            <p className="text-xl text-slate-600">
              Start free, upgrade when you're ready for more
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`card relative ${plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-teal-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Crown className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">{plan.name}</h3>
                  <p className="text-slate-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-slate-800">${plan.price}</span>
                    <span className="text-slate-500">/{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => navigate('/login')}
                  className={`w-full py-3 rounded-xl font-medium transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-teal-500 text-white hover:shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Ready to Meet Your AI Companion?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands who have found emotional support, friendship, and growth through AI companionship.
            </p>
            <button 
              onClick={() => navigate('/login')}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Start Your Journey Today
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Dream Assistant</span>
              </div>
              <p className="text-slate-400">
                Your caring AI companion for meaningful conversations and emotional support.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-slate-400">
                <a href="#" className="block hover:text-white transition-colors">Features</a>
                <a href="#" className="block hover:text-white transition-colors">Pricing</a>
                <a href="#" className="block hover:text-white transition-colors">Security</a>
                <a href="#" className="block hover:text-white transition-colors">API</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-slate-400">
                <a href="#" className="block hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block hover:text-white transition-colors">Contact Us</a>
                <a href="#" className="block hover:text-white transition-colors">Community</a>
                <a href="#" className="block hover:text-white transition-colors">Status</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-slate-400">
                <a href="#" className="block hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="block hover:text-white transition-colors">Cookie Policy</a>
                <a href="#" className="block hover:text-white transition-colors">GDPR</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Dream Assistant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}