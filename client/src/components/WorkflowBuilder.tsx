import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Users, Share2, ArrowDown } from 'lucide-react';

interface WorkflowNode {
  id: string;
  label: string;
  description: string;
  type: 'trigger' | 'action' | 'condition' | 'notification';
  icon: React.ReactNode;
  color: string;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  nodes: WorkflowNode[];
  benefits: string[];
  timeToSetup: string;
  timeSaved: string;
}

export function WorkflowBuilder() {
  const [activeWorkflow, setActiveWorkflow] = useState<'email' | 'leads' | 'social'>('email');

  const workflows: Record<string, Workflow> = {
    email: {
      id: 'email',
      name: 'Email Automation',
      description: 'Organize, categorize, and respond to emails automatically',
      icon: <Mail className="w-6 h-6" />,
      nodes: [
        {
          id: 'email-trigger',
          label: 'Email Arrives',
          description: 'Incoming email detected',
          type: 'trigger',
          icon: <Mail className="w-5 h-5" />,
          color: 'bg-green-500',
        },
        {
          id: 'email-check',
          label: 'Check Content',
          description: 'Analyze email content and sender',
          type: 'action',
          icon: <Mail className="w-5 h-5" />,
          color: 'bg-blue-500',
        },
        {
          id: 'email-categorize',
          label: 'Categorize',
          description: 'Sort into Important, Spam, or Follow-up',
          type: 'action',
          icon: <Mail className="w-5 h-5" />,
          color: 'bg-blue-500',
        },
        {
          id: 'email-reply',
          label: 'Auto-Reply',
          description: 'Send automatic response if needed',
          type: 'condition',
          icon: <Mail className="w-5 h-5" />,
          color: 'bg-purple-500',
        },
        {
          id: 'email-file',
          label: 'File Email',
          description: 'Move to appropriate folder',
          type: 'action',
          icon: <Mail className="w-5 h-5" />,
          color: 'bg-blue-500',
        },
        {
          id: 'email-notify',
          label: 'Send Notification',
          description: 'Alert team via Slack',
          type: 'notification',
          icon: <Mail className="w-5 h-5" />,
          color: 'bg-orange-500',
        },
      ],
      benefits: [
        'Save 5+ hours per week on email management',
        'Never miss important emails',
        'Automatic categorization and filing',
        'Smart auto-responses',
        'Team notifications via Slack',
      ],
      timeToSetup: '2 hours',
      timeSaved: '5+ hours/week',
    },
    leads: {
      id: 'leads',
      name: 'Lead Generation',
      description: 'Capture and qualify leads automatically',
      icon: <Users className="w-6 h-6" />,
      nodes: [
        {
          id: 'leads-trigger',
          label: 'Form Submitted',
          description: 'Website visitor fills form',
          type: 'trigger',
          icon: <Users className="w-5 h-5" />,
          color: 'bg-green-500',
        },
        {
          id: 'leads-verify',
          label: 'Verify Contact',
          description: 'Validate email and phone',
          type: 'action',
          icon: <Users className="w-5 h-5" />,
          color: 'bg-blue-500',
        },
        {
          id: 'leads-score',
          label: 'Score Lead',
          description: 'Rate as High, Medium, or Low',
          type: 'condition',
          icon: <Users className="w-5 h-5" />,
          color: 'bg-purple-500',
        },
        {
          id: 'leads-route',
          label: 'Route Lead',
          description: 'Send to CRM or nurture sequence',
          type: 'action',
          icon: <Users className="w-5 h-5" />,
          color: 'bg-blue-500',
        },
        {
          id: 'leads-email',
          label: 'Send Welcome Email',
          description: 'Automated welcome message',
          type: 'action',
          icon: <Users className="w-5 h-5" />,
          color: 'bg-blue-500',
        },
        {
          id: 'leads-notify',
          label: 'Notify Sales Team',
          description: 'Alert team of new qualified lead',
          type: 'notification',
          icon: <Users className="w-5 h-5" />,
          color: 'bg-orange-500',
        },
      ],
      benefits: [
        'Capture leads 24/7 automatically',
        'Automatic lead qualification and scoring',
        'Smart routing to sales team',
        'Reduced manual data entry',
        'Faster response times to leads',
      ],
      timeToSetup: '3 hours',
      timeSaved: '8+ hours/week',
    },
    social: {
      id: 'social',
      name: 'Content Publishing',
      description: 'Automate content across all social platforms',
      icon: <Share2 className="w-6 h-6" />,
      nodes: [
        {
          id: 'social-trigger',
          label: 'Blog Published',
          description: 'New blog post goes live',
          type: 'trigger',
          icon: <Share2 className="w-5 h-5" />,
          color: 'bg-green-500',
        },
        {
          id: 'social-extract',
          label: 'Extract Content',
          description: 'Pull key points and highlights',
          type: 'action',
          icon: <Share2 className="w-5 h-5" />,
          color: 'bg-blue-500',
        },
        {
          id: 'social-generate',
          label: 'Generate Captions',
          description: 'AI creates social media captions',
          type: 'action',
          icon: <Share2 className="w-5 h-5" />,
          color: 'bg-blue-500',
        },
        {
          id: 'social-images',
          label: 'Create Images',
          description: 'AI generates social media graphics',
          type: 'action',
          icon: <Share2 className="w-5 h-5" />,
          color: 'bg-blue-500',
        },
        {
          id: 'social-schedule',
          label: 'Schedule Posts',
          description: 'Post to Twitter, LinkedIn, Facebook, Instagram',
          type: 'action',
          icon: <Share2 className="w-5 h-5" />,
          color: 'bg-blue-500',
        },
        {
          id: 'social-report',
          label: 'Send Report',
          description: 'Daily engagement and analytics report',
          type: 'notification',
          icon: <Share2 className="w-5 h-5" />,
          color: 'bg-orange-500',
        },
      ],
      benefits: [
        'Publish to all platforms automatically',
        'AI-generated captions and graphics',
        'Consistent posting schedule',
        'Automated engagement monitoring',
        'Save 10+ hours per week on social media',
      ],
      timeToSetup: '2.5 hours',
      timeSaved: '10+ hours/week',
    },
  };

  const currentWorkflow = workflows[activeWorkflow];

  const getNodeBgColor = (type: string) => {
    switch (type) {
      case 'trigger':
        return 'from-green-500 to-green-600';
      case 'action':
        return 'from-blue-500 to-blue-600';
      case 'condition':
        return 'from-purple-500 to-purple-600';
      case 'notification':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            See Your Automation in Action
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore three powerful automation workflows included with your package. Each one saves hours of manual work every week.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-3 mb-12 justify-center flex-wrap">
          {Object.entries(workflows).map(([key, workflow]) => (
            <motion.button
              key={key}
              onClick={() => setActiveWorkflow(key as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                activeWorkflow === key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-600'
              }`}
            >
              {workflow.icon}
              {workflow.name}
            </motion.button>
          ))}
        </div>

        {/* Workflow Visualization */}
        <motion.div
          key={activeWorkflow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12"
        >
          <div className="flex flex-col gap-6">
            {currentWorkflow.nodes.map((node, index) => (
              <div key={node.id}>
                {/* Node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-r ${getNodeBgColor(node.type)} text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">{node.icon}</div>
                    <div className="flex-grow">
                      <div className="font-bold text-lg">{node.label}</div>
                      <div className="text-sm opacity-90">{node.description}</div>
                    </div>
                  </div>
                </motion.div>

                {/* Arrow */}
                {index < currentWorkflow.nodes.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.05 }}
                    className="flex justify-center py-4"
                  >
                    <div className="text-slate-400 animate-bounce">
                      <ArrowDown className="w-6 h-6" />
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Benefits & Metrics */}
        <motion.div
          key={`benefits-${activeWorkflow}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Benefits */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-6 text-slate-900">Key Benefits</h3>
            <ul className="space-y-3">
              {currentWorkflow.benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-lg">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200"
          >
            <div className="mb-8">
              <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                Time to Setup
              </div>
              <div className="text-4xl font-bold text-blue-600 mt-2">
                {currentWorkflow.timeToSetup}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                Time Saved Per Week
              </div>
              <div className="text-4xl font-bold text-green-600 mt-2">
                {currentWorkflow.timeSaved}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-slate-700 mb-6">
            This workflow builder is included with all packages
          </p>
          <a
            href="#pricing"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            View Pricing & Get Started
          </a>
        </motion.div>
      </div>
    </section>
  );
}
