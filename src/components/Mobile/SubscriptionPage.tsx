import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Crown, 
  Check, 
  Star,
  Zap,
  Heart,
  Shield,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const plans = [
  {
    id: 'free',
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
    current: true
  },
  {
    id: 'pro',
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
      'All add-ons included',
      'Custom themes',
      'Dream journal'
    ],
    popular: true,
    current: false
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: 199.99,
    period: 'one-time',
    description: 'Best value forever',
    features: [
      'Everything in Pro',
      'Lifetime access',
      'Future features included',
      'VIP support',
      'Early access to new models',
      'Exclusive content'
    ],
    popular: false,
    current: false
  }
];

const benefits = [
  {
    icon: Heart,
    title: 'Unlimited Conversations',
    description: 'Chat as much as you want with no daily limits'
  },
  {
    icon: Sparkles,
    title: 'All AI Companions',
    description: 'Access to every AI personality and specialist'
  },
  {
    icon: Zap,
    title: 'Advanced Features',
    description: 'Voice chat, mood tracking, and premium add-ons'
  },
  {
    icon: Shield,
    title: 'Priority Support',
    description: 'Get help faster with dedicated support'
  }
];

export function SubscriptionPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const currentPlan = user?.subscription?.plan || 'free';

  return (
    <div className="min-h-screen bg-gradient-to-br from-wwdc-gray-6 via-blue-50/30 to-green-50/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-wwdc-blue to-wwdc-indigo text-white safe-area-top">
        <div className="px-6 pt-4 pb-6">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => navigate('/settings')}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-display-small font-sf-pro">Subscription</h1>
              <p className="text-blue-100 text-body-medium">Choose your perfect plan</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Current Plan Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 rounded-3xl p-6 shadow-sm mb-6"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-wwdc-blue to-wwdc-green rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-title-large font-sf-pro text-slate-800">Current Plan</h3>
              <p className="text-body-medium text-slate-600 capitalize">
                {currentPlan} {currentPlan !== 'free' && '• Active'}
              </p>
            </div>
            {currentPlan !== 'free' && (
              <div className="text-right">
                <p className="text-body-small text-slate-500">Renews</p>
                <p className="text-body-medium font-semibold text-slate-800">Dec 31, 2024</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h3 className="text-headline-medium font-sf-pro text-slate-800 mb-6">Why upgrade to Pro?</h3>
          <div className="grid grid-cols-1 gap-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-center space-x-4 p-4 bg-white/50 rounded-2xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-wwdc-blue to-wwdc-green rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-body-large font-semibold text-slate-800">{benefit.title}</h4>
                    <p className="text-body-medium text-slate-600">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Plans */}
        <div className="space-y-4 mb-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`relative bg-white/70 rounded-3xl p-6 shadow-sm border-2 transition-all ${
                selectedPlan === plan.id
                  ? 'border-wwdc-blue bg-blue-50/50'
                  : 'border-transparent'
              } ${plan.current ? 'opacity-60' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-wwdc-purple to-wwdc-pink text-white px-4 py-1 rounded-full text-label-medium font-semibold flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {plan.current && (
                <div className="absolute -top-3 right-4">
                  <div className="bg-wwdc-green text-white px-3 py-1 rounded-full text-label-small font-semibold">
                    Current
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedPlan(plan.id)}
                disabled={plan.current}
                className="w-full text-left"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-title-large font-sf-pro text-slate-800">{plan.name}</h3>
                    <p className="text-body-medium text-slate-600">{plan.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-display-small font-sf-pro text-slate-800">
                      ${plan.price}
                    </div>
                    <div className="text-body-small text-slate-500">/{plan.period}</div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-wwdc-green flex-shrink-0" />
                      <span className="text-body-medium text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {!plan.current && (
                  <div className={`w-full py-3 rounded-2xl font-sf-pro font-semibold text-center transition-all ${
                    selectedPlan === plan.id
                      ? 'bg-wwdc-blue text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {plan.id === 'free' ? 'Downgrade' : 'Select Plan'}
                  </div>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        {selectedPlan !== currentPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <button className="w-full bg-gradient-to-r from-wwdc-blue to-wwdc-indigo text-white py-4 rounded-2xl font-sf-pro font-semibold shadow-wwdc hover:shadow-wwdc-lg transition-all transform hover:scale-105">
              {selectedPlan === 'free' ? 'Downgrade to Free' : 
               selectedPlan === 'lifetime' ? 'Get Lifetime Access' : 'Start Free Trial'}
            </button>
            
            <p className="text-body-small text-slate-500 text-center">
              {selectedPlan === 'pro' && 'Start with a 7-day free trial. Cancel anytime.'}
              {selectedPlan === 'lifetime' && 'One-time payment. No recurring charges.'}
              {selectedPlan === 'free' && 'You can upgrade again anytime.'}
            </p>
          </motion.div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200/50 text-center">
          <div className="flex justify-center space-x-6 text-body-small text-wwdc-blue">
            <button>Privacy Policy</button>
            <button>Terms of Service</button>
            <button>Restore Purchase</button>
          </div>
        </div>
      </div>
    </div>
  );
}