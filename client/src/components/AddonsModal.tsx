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
  // Email Automation
  { id: 'email-org', name: 'Email Organization Bot', category: 'Email', description: 'Automatically organize, categorize, and prioritize emails', useCases: ['Inbox management', 'Spam filtering', 'Priority flagging'], icon: '📧' },
  { id: 'email-follow', name: 'Email Follow-up Automation', category: 'Email', description: 'Send automatic follow-up emails based on triggers', useCases: ['Follow-ups', 'Reminders', 'Engagement'], icon: '📧' },
  { id: 'email-template', name: 'Email Template Generator', category: 'Email', description: 'Generate and send personalized email templates', useCases: ['Personalization', 'Bulk sending', 'A/B testing'], icon: '📧' },
  { id: 'email-signature', name: 'Email Signature Manager', category: 'Email', description: 'Automatically add signatures and disclaimers', useCases: ['Branding', 'Compliance', 'Consistency'], icon: '📧' },
  { id: 'email-unsubscribe', name: 'Unsubscribe List Manager', category: 'Email', description: 'Manage unsubscribe lists automatically', useCases: ['Compliance', 'List hygiene', 'GDPR'], icon: '📧' },
  
  // Sales & Lead Generation
  { id: 'lead-qualify', name: 'Lead Qualification Bot', category: 'Sales', description: 'Score and qualify leads automatically', useCases: ['Lead scoring', 'CRM sync', 'Sales routing'], icon: '🎯' },
  { id: 'client-onboard', name: 'Client Onboarding Bot', category: 'Sales', description: 'Automate client welcome sequences and documentation', useCases: ['Welcome emails', 'Document collection', 'Account setup'], icon: '👥' },
  { id: 'sales-pipeline', name: 'Sales Pipeline Automation', category: 'Sales', description: 'Automatically move deals through sales pipeline', useCases: ['Pipeline management', 'Stage tracking', 'Forecasting'], icon: '📈' },
  { id: 'proposal-gen', name: 'Proposal Generator', category: 'Sales', description: 'Generate proposals automatically from templates', useCases: ['Quick proposals', 'Customization', 'E-signature'], icon: '📄' },
  { id: 'quote-builder', name: 'Quote Builder Bot', category: 'Sales', description: 'Create and send quotes automatically', useCases: ['Quote generation', 'Pricing rules', 'Approval workflow'], icon: '💵' },
  { id: 'lead-nurture', name: 'Lead Nurture Sequences', category: 'Sales', description: 'Automated multi-touch lead nurturing campaigns', useCases: ['Drip campaigns', 'Engagement', 'Conversion'], icon: '🔄' },
  { id: 'sales-alert', name: 'Sales Alert System', category: 'Sales', description: 'Real-time alerts for important sales events', useCases: ['Notifications', 'Urgency', 'Response time'], icon: '🔔' },
  
  // Finance & Accounting
  { id: 'invoice-auto', name: 'Invoice Automation', category: 'Finance', description: 'Generate, send, and track invoices automatically', useCases: ['Invoice generation', 'Payment reminders', 'Expense tracking'], icon: '💰' },
  { id: 'expense-tracking', name: 'Expense Tracker', category: 'Finance', description: 'Automatically categorize and track expenses', useCases: ['Receipt scanning', 'Categorization', 'Reporting'], icon: '💳' },
  { id: 'payment-reminder', name: 'Payment Reminder Bot', category: 'Finance', description: 'Send automatic payment reminders', useCases: ['Overdue alerts', 'Follow-ups', 'Collections'], icon: '⏰' },
  { id: 'receipt-scanner', name: 'Receipt Scanner', category: 'Finance', description: 'Scan and process receipts automatically', useCases: ['Data extraction', 'OCR', 'Categorization'], icon: '🧾' },
  { id: 'tax-calculator', name: 'Tax Calculator', category: 'Finance', description: 'Calculate taxes automatically', useCases: ['Tax prep', 'Compliance', 'Reporting'], icon: '📊' },
  { id: 'budget-tracker', name: 'Budget Tracker', category: 'Finance', description: 'Track spending against budgets automatically', useCases: ['Budget alerts', 'Forecasting', 'Analysis'], icon: '💹' },
  
  // Marketing & Content
  { id: 'social-scheduler', name: 'Social Media Scheduler', category: 'Marketing', description: 'Schedule posts across all social platforms', useCases: ['Multi-platform posting', 'Content calendar', 'Engagement tracking'], icon: '📱' },
  { id: 'content-calendar', name: 'Content Calendar Manager', category: 'Marketing', description: 'Organize and manage your content calendar', useCases: ['Content planning', 'Team collaboration', 'Publishing schedule'], icon: '📅' },
  { id: 'blog-publisher', name: 'Blog Publisher Bot', category: 'Marketing', description: 'Automatically publish blog posts to multiple platforms', useCases: ['Multi-platform publishing', 'SEO optimization', 'Distribution'], icon: '📝' },
  { id: 'email-campaign', name: 'Email Campaign Manager', category: 'Marketing', description: 'Create and manage email marketing campaigns', useCases: ['Campaign creation', 'Segmentation', 'Analytics'], icon: '📧' },
  { id: 'seo-optimizer', name: 'SEO Optimizer', category: 'Marketing', description: 'Optimize content for search engines automatically', useCases: ['Keyword optimization', 'Meta tags', 'Analytics'], icon: '🔍' },
  { id: 'social-listener', name: 'Social Media Listener', category: 'Marketing', description: 'Monitor brand mentions and sentiment', useCases: ['Brand monitoring', 'Sentiment analysis', 'Alerts'], icon: '👂' },
  { id: 'landing-page', name: 'Landing Page Builder', category: 'Marketing', description: 'Generate landing pages automatically', useCases: ['A/B testing', 'Conversion optimization', 'Analytics'], icon: '🌐' },
  { id: 'video-editor', name: 'Video Editor Bot', category: 'Marketing', description: 'Automatically edit and optimize videos', useCases: ['Video creation', 'Thumbnails', 'Captions'], icon: '🎥' },
  
  // Customer Support
  { id: 'support-chatbot', name: 'Customer Support Chatbot', category: 'Support', description: 'AI-powered chatbot for customer support', useCases: ['FAQ automation', 'Ticket routing', '24/7 support'], icon: '🤖' },
  { id: 'ticket-routing', name: 'Support Ticket Router', category: 'Support', description: 'Automatically route support tickets to right team', useCases: ['Ticket routing', 'Priority assignment', 'SLA tracking'], icon: '🎫' },
  { id: 'faq-generator', name: 'FAQ Generator', category: 'Support', description: 'Generate FAQs from customer questions', useCases: ['FAQ creation', 'Knowledge base', 'Self-service'], icon: '❓' },
  { id: 'feedback-collector', name: 'Feedback Collector', category: 'Support', description: 'Automatically collect customer feedback', useCases: ['Surveys', 'NPS tracking', 'Sentiment analysis'], icon: '⭐' },
  { id: 'knowledge-base', name: 'Knowledge Base Manager', category: 'Support', description: 'Organize and manage knowledge base articles', useCases: ['Documentation', 'Search optimization', 'Versioning'], icon: '📚' },
  
  // Operations & Data
  { id: 'data-entry', name: 'Data Entry Automation', category: 'Operations', description: 'Automate data entry and form processing', useCases: ['Form filling', 'Data validation', 'Database updates'], icon: '📊' },
  { id: 'database-sync', name: 'Database Sync Bot', category: 'Operations', description: 'Sync data across multiple databases', useCases: ['Data sync', 'Consistency', 'Real-time updates'], icon: '🔗' },
  { id: 'workflow-automation', name: 'Workflow Automation', category: 'Operations', description: 'Automate complex business workflows', useCases: ['Process automation', 'Approval workflows', 'Task routing'], icon: '⚙️' },
  { id: 'document-processor', name: 'Document Processor', category: 'Operations', description: 'Process and extract data from documents', useCases: ['OCR', 'Data extraction', 'Classification'], icon: '📄' },
  { id: 'backup-manager', name: 'Backup Manager', category: 'Operations', description: 'Automatically backup important data', useCases: ['Data backup', 'Disaster recovery', 'Compliance'], icon: '💾' },
  { id: 'inventory-tracker', name: 'Inventory Tracker', category: 'Operations', description: 'Automatically track inventory levels', useCases: ['Stock alerts', 'Reorder automation', 'Forecasting'], icon: '📦' },
  
  // Analytics & Reporting
  { id: 'report-gen', name: 'Report Generator', category: 'Analytics', description: 'Generate and send automated reports', useCases: ['Daily reports', 'Performance metrics', 'Executive summaries'], icon: '📈' },
  { id: 'dashboard-builder', name: 'Dashboard Builder', category: 'Analytics', description: 'Create automated dashboards', useCases: ['Real-time dashboards', 'KPI tracking', 'Visualization'], icon: '📊' },
  { id: 'analytics-tracker', name: 'Analytics Tracker', category: 'Analytics', description: 'Track and analyze business metrics', useCases: ['Metrics tracking', 'Trend analysis', 'Alerts'], icon: '📉' },
  { id: 'data-visualization', name: 'Data Visualization', category: 'Analytics', description: 'Automatically create data visualizations', useCases: ['Charts', 'Graphs', 'Infographics'], icon: '📊' },
  { id: 'predictive-analytics', name: 'Predictive Analytics', category: 'Analytics', description: 'Predict trends and outcomes', useCases: ['Forecasting', 'Trend prediction', 'Risk analysis'], icon: '🔮' },
  
  // Integrations & Connections
  { id: 'crm-sync', name: 'CRM Integration', category: 'Integration', description: 'Sync data with your CRM automatically', useCases: ['Contact sync', 'Deal tracking', 'Pipeline management'], icon: '🔄' },
  { id: 'slack-bot', name: 'Slack Bot Integration', category: 'Integration', description: 'Automate notifications and messages in Slack', useCases: ['Team notifications', 'Alert routing', 'Command automation'], icon: '💬' },
  { id: 'calendar-sync', name: 'Calendar Sync Automation', category: 'Integration', description: 'Sync calendars and schedule meetings automatically', useCases: ['Meeting scheduling', 'Calendar sync', 'Availability management'], icon: '🗓️' },
  { id: 'zapier-integration', name: 'Zapier Integration', category: 'Integration', description: 'Connect to 5000+ apps via Zapier', useCases: ['App connections', 'Workflow automation', 'Data sync'], icon: '⚡' },
  { id: 'webhook-setup', name: 'Webhook Setup', category: 'Integration', description: 'Set up webhooks for real-time data', useCases: ['Real-time updates', 'Event triggers', 'Custom integrations'], icon: '🔗' },
  { id: 'api-connector', name: 'API Connector', category: 'Integration', description: 'Connect to any API automatically', useCases: ['Custom integrations', 'Data exchange', 'Third-party services'], icon: '🔌' },
  { id: 'shopify-sync', name: 'Shopify Integration', category: 'Integration', description: 'Sync Shopify store data automatically', useCases: ['Order sync', 'Inventory sync', 'Customer data'], icon: '🛍️' },
  { id: 'stripe-sync', name: 'Stripe Integration', category: 'Integration', description: 'Sync Stripe payment data', useCases: ['Payment tracking', 'Invoice sync', 'Customer data'], icon: '💳' },
  
  // HR & People
  { id: 'hr-onboarding', name: 'HR Onboarding Bot', category: 'HR', description: 'Automate employee onboarding', useCases: ['New hire setup', 'Document collection', 'Training'], icon: '👔' },
  { id: 'attendance-tracker', name: 'Attendance Tracker', category: 'HR', description: 'Automatically track employee attendance', useCases: ['Time tracking', 'Attendance reports', 'Payroll'], icon: '⏱️' },
  { id: 'payroll-processor', name: 'Payroll Processor', category: 'HR', description: 'Automate payroll processing', useCases: ['Salary calculation', 'Tax withholding', 'Direct deposit'], icon: '💸' },
  { id: 'performance-review', name: 'Performance Review Bot', category: 'HR', description: 'Automate performance reviews', useCases: ['Review scheduling', 'Feedback collection', 'Analytics'], icon: '⭐' },
  { id: 'leave-management', name: 'Leave Management', category: 'HR', description: 'Manage employee leave automatically', useCases: ['Leave requests', 'Approval workflow', 'Balance tracking'], icon: '🏖️' },
  
  // Custom & Advanced
  { id: 'custom-workflow', name: 'Custom Workflow Builder', category: 'Custom', description: 'Build custom automation workflows', useCases: ['Custom logic', 'Complex automation', 'Business rules'], icon: '🛠️' },
  { id: 'ai-training', name: 'AI Model Training', category: 'Custom', description: 'Train custom AI models for your business', useCases: ['Custom AI', 'Prediction models', 'Classification'], icon: '🧠' },
  { id: 'advanced-scripting', name: 'Advanced Scripting', category: 'Custom', description: 'Write custom scripts for automation', useCases: ['Custom code', 'Advanced logic', 'Integration'], icon: '⚙️' },
  { id: 'multi-language', name: 'Multi-Language Support', category: 'Custom', description: 'Automate in multiple languages', useCases: ['Translation', 'Localization', 'Global reach'], icon: '🌍' },
  { id: 'security-setup', name: 'Security & Encryption', category: 'Custom', description: 'Set up security and encryption', useCases: ['Data protection', 'Compliance', 'Privacy'], icon: '🔒' },
];

const TIER_LIMITS = {
  starter: 3,
  professional: 5,
  enterprise: 10,
};

const CATEGORIES = ['Email', 'Sales', 'Finance', 'Marketing', 'Support', 'Operations', 'Analytics', 'Integration', 'HR', 'Custom'];

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
