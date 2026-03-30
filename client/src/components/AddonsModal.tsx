import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, CheckCircle2 } from 'lucide-react';

interface Addon {
  id: string;
  name: string;
  category: string;
  description: string;
  useCases: string[];
  icon: string;
}

interface AddonsModalProps {
  isOpen: boolean;
  tier: 'starter' | 'professional' | 'enterprise';
  onClose: () => void;
  onSelect: (selectedAddons: Addon[]) => void;
  stripeLink: string;
}

const ADDONS: Addon[] = [
  {
    id: 'email-org',
    name: 'Email Organization Bot',
    category: 'Email',
    description: 'Automatically organize, categorize, and prioritize emails',
    useCases: ['Inbox management', 'Spam filtering', 'Priority flagging'],
    icon: '📧',
  },
  {
    id: 'client-onboard',
    name: 'Client Onboarding Bot',
    category: 'Sales',
    description: 'Automate client welcome sequences and documentation',
    useCases: ['Welcome emails', 'Document collection', 'Account setup'],
    icon: '👥',
  },
  {
    id: 'lead-qualify',
    name: 'Lead Qualification Bot',
    category: 'Sales',
    description: 'Score and qualify leads automatically',
    useCases: ['Lead scoring', 'CRM sync', 'Sales routing'],
    icon: '🎯',
  },
  {
    id: 'invoice-auto',
    name: 'Invoice Automation',
    category: 'Finance',
    description: 'Generate, send, and track invoices automatically',
    useCases: ['Invoice generation', 'Payment reminders', 'Expense tracking'],
    icon: '💰',
  },
  {
    id: 'social-scheduler',
    name: 'Social Media Scheduler',
    category: 'Marketing',
    description: 'Schedule posts across all social platforms',
    useCases: ['Multi-platform posting', 'Content calendar', 'Engagement tracking'],
    icon: '📱',
  },
  {
    id: 'content-calendar',
    name: 'Content Calendar Manager',
    category: 'Marketing',
    description: 'Organize and manage your content calendar',
    useCases: ['Content planning', 'Team collaboration', 'Publishing schedule'],
    icon: '📅',
  },
  {
    id: 'support-chatbot',
    name: 'Customer Support Chatbot',
    category: 'Support',
    description: 'AI-powered chatbot for customer support',
    useCases: ['FAQ automation', 'Ticket routing', '24/7 support'],
    icon: '🤖',
  },
  {
    id: 'data-entry',
    name: 'Data Entry Automation',
    category: 'Operations',
    description: 'Automate data entry and form processing',
    useCases: ['Form filling', 'Data validation', 'Database updates'],
    icon: '📊',
  },
  {
    id: 'report-gen',
    name: 'Report Generator',
    category: 'Analytics',
    description: 'Generate and send automated reports',
    useCases: ['Daily reports', 'Performance metrics', 'Executive summaries'],
    icon: '📈',
  },
  {
    id: 'crm-sync',
    name: 'CRM Integration',
    category: 'Integration',
    description: 'Sync data with your CRM automatically',
    useCases: ['Contact sync', 'Deal tracking', 'Pipeline management'],
    icon: '🔄',
  },
  {
    id: 'slack-bot',
    name: 'Slack Bot Integration',
    category: 'Integration',
    description: 'Automate notifications and messages in Slack',
    useCases: ['Team notifications', 'Alert routing', 'Command automation'],
    icon: '💬',
  },
  {
    id: 'calendar-sync',
    name: 'Calendar Sync Automation',
    category: 'Integration',
    description: 'Sync calendars and schedule meetings automatically',
    useCases: ['Meeting scheduling', 'Calendar sync', 'Availability management'],
    icon: '🗓️',
  },
];

const TIER_LIMITS = {
  starter: 3,
  professional: 5,
  enterprise: 10,
};

const CATEGORIES = ['Email', 'Sales', 'Finance', 'Marketing', 'Support', 'Operations', 'Analytics', 'Integration'];

export function AddonsModal({ isOpen, tier, onClose, onSelect, stripeLink }: AddonsModalProps) {
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Email');
  const maxSelections = TIER_LIMITS[tier];

  const addonsByCategory = useMemo(() => {
    const grouped: Record<string, Addon[]> = {};
    CATEGORIES.forEach(cat => {
      grouped[cat] = ADDONS.filter(addon => addon.category === cat);
    });
    return grouped;
  }, []);

  const handleToggleAddon = (addonId: string) => {
    const newSelected = new Set(selectedAddons);
    if (newSelected.has(addonId)) {
      newSelected.delete(addonId);
    } else if (newSelected.size < maxSelections) {
      newSelected.add(addonId);
    }
    setSelectedAddons(newSelected);
  };

  const handleProceedToCheckout = () => {
    const selected = ADDONS.filter(addon => selectedAddons.has(addon.id));
    onSelect(selected);
    // Redirect to Stripe with selected add-ons info
    window.open(stripeLink, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center z-10">
              <div>
                <h2 className="text-2xl font-bold">Choose Your Premium Add-ons</h2>
                <p className="text-blue-100 mt-1">
                  {tier === 'starter' && 'Select up to 3 add-ons'}
                  {tier === 'professional' && 'Select up to 5 add-ons'}
                  {tier === 'enterprise' && 'Select up to 10 add-ons'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-blue-500 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Selection Counter */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-semibold text-slate-700">
                  Selected: <span className="text-blue-600">{selectedAddons.size}</span> of{' '}
                  <span className="text-blue-600">{maxSelections}</span>
                </p>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(selectedAddons.size / maxSelections) * 100}%` }}
                  />
                </div>
              </div>

              {/* Add-ons by Category */}
              <div className="space-y-4">
                {CATEGORIES.map(category => {
                  const categoryAddons = addonsByCategory[category];
                  if (categoryAddons.length === 0) return null;

                  return (
                    <div key={category} className="border border-slate-200 rounded-lg overflow-hidden">
                      {/* Category Header */}
                      <button
                        onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                        className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 transition flex items-center justify-between"
                      >
                        <span className="font-semibold text-slate-900">{category}</span>
                        <motion.div
                          animate={{ rotate: expandedCategory === category ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-5 h-5 text-slate-600" />
                        </motion.div>
                      </button>

                      {/* Category Add-ons */}
                      <AnimatePresence>
                        {expandedCategory === category && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-slate-200"
                          >
                            <div className="p-4 space-y-3">
                              {categoryAddons.map(addon => (
                                <motion.button
                                  key={addon.id}
                                  onClick={() => handleToggleAddon(addon.id)}
                                  whileHover={{ scale: 1.02 }}
                                  className={`w-full p-4 rounded-lg border-2 transition text-left ${
                                    selectedAddons.has(addon.id)
                                      ? 'border-blue-600 bg-blue-50'
                                      : 'border-slate-200 bg-white hover:border-blue-300'
                                  } ${selectedAddons.size >= maxSelections && !selectedAddons.has(addon.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                  disabled={selectedAddons.size >= maxSelections && !selectedAddons.has(addon.id)}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-grow">
                                      <div className="flex items-center gap-2">
                                        <span className="text-2xl">{addon.icon}</span>
                                        <h3 className="font-semibold text-slate-900">{addon.name}</h3>
                                        {selectedAddons.has(addon.id) && (
                                          <CheckCircle2 className="w-5 h-5 text-blue-600 ml-auto flex-shrink-0" />
                                        )}
                                      </div>
                                      <p className="text-sm text-slate-600 mt-1">{addon.description}</p>
                                      <div className="flex flex-wrap gap-2 mt-2">
                                        {addon.useCases.map(useCase => (
                                          <span
                                            key={useCase}
                                            className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded"
                                          >
                                            {useCase}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 p-6 flex gap-4 justify-end">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-lg font-semibold text-slate-700 hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleProceedToCheckout}
                disabled={selectedAddons.size === 0}
                className="px-8 py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout ({selectedAddons.size} selected)
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
