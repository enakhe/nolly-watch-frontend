import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Eye, Lock, Database, Users, Mail, Cookie } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            to="/signup"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign Up
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 gradient-text">Privacy Policy</h1>
            <p className="text-text-secondary text-lg">
              Last updated: January 2025
            </p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-container space-y-8"
        >
          {/* Introduction */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Introduction</h2>
            </div>
            <p className="text-text-secondary leading-relaxed">
              At NollyWatch, we respect your privacy and are committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you use our website, mobile application, and services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center mb-4">
              <Database className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Information We Collect</h2>
            </div>
            <div className="text-text-secondary leading-relaxed space-y-4">
              <h3 className="text-lg font-semibold text-white">Personal Information</h3>
              <p>When you create an account, we collect:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Full name</li>
                <li>Username</li>
                <li>Email address</li>
                <li>Password (encrypted)</li>
                <li>Profile picture (optional)</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-white">Usage Information</h3>
              <p>We automatically collect information about how you use our Service:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Movies and TV shows you view or search for</li>
                <li>Watchlists you create and modify</li>
                <li>Ratings and reviews you submit</li>
                <li>Time spent on different pages</li>
                <li>Device information and IP address</li>
                <li>Browser type and version</li>
              </ul>

              <h3 className="text-lg font-semibold text-white">Cookies and Tracking</h3>
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Remember your login status</li>
                <li>Personalize your experience</li>
                <li>Analyze usage patterns</li>
                <li>Improve our Service</li>
              </ul>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">How We Use Your Information</h2>
            </div>
            <div className="text-text-secondary leading-relaxed space-y-4">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and maintain our Service</li>
                <li>Create and manage your account</li>
                <li>Personalize content recommendations</li>
                <li>Process your requests and transactions</li>
                <li>Send you important updates and notifications</li>
                <li>Improve our Service and develop new features</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Information Sharing and Disclosure</h2>
            </div>
            <div className="text-text-secondary leading-relaxed space-y-4">
              <h3 className="text-lg font-semibold text-white">We Do Not Sell Your Data</h3>
              <p>
                We do not sell, trade, or rent your personal information to third parties for 
                marketing purposes.
              </p>
              
              <h3 className="text-lg font-semibold text-white">We May Share Information With:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Providers:</strong> Third-party companies that help us operate our Service</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                <li><strong>Consent:</strong> When you explicitly consent to sharing</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Data Security</h2>
            </div>
            <div className="text-text-secondary leading-relaxed space-y-4">
              <p>We implement appropriate security measures to protect your personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure hosting infrastructure</li>
                <li>Employee training on data protection</li>
              </ul>
              <p>
                However, no method of transmission over the Internet or electronic storage is 100% secure. 
                While we strive to protect your personal information, we cannot guarantee absolute security.
              </p>
            </div>
          </section>

          {/* Your Rights and Choices */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Your Rights and Choices</h2>
            </div>
            <div className="text-text-secondary leading-relaxed space-y-4">
              <p>You have the following rights regarding your personal information:</p>
              
              <h3 className="text-lg font-semibold text-white">Access and Portability</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Request a copy of your personal data</li>
                <li>Export your watchlists and preferences</li>
              </ul>

              <h3 className="text-lg font-semibold text-white">Correction and Updates</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Update your profile information</li>
                <li>Correct inaccurate data</li>
              </ul>

              <h3 className="text-lg font-semibold text-white">Deletion</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Delete your account and associated data</li>
                <li>Remove specific content you've created</li>
              </ul>

              <h3 className="text-lg font-semibold text-white">Communication Preferences</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Opt out of marketing communications</li>
                <li>Manage notification settings</li>
              </ul>
            </div>
          </section>

          {/* Cookies Policy */}
          <section>
            <div className="flex items-center mb-4">
              <Cookie className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Cookies and Tracking Technologies</h2>
            </div>
            <div className="text-text-secondary leading-relaxed space-y-4">
              <h3 className="text-lg font-semibold text-white">Types of Cookies We Use</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Essential Cookies:</strong> Required for basic functionality</li>
                <li><strong>Performance Cookies:</strong> Help us understand how you use our Service</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Analytics Cookies:</strong> Provide insights into usage patterns</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-white">Managing Cookies</h3>
              <p>
                You can control cookies through your browser settings. However, disabling certain 
                cookies may affect the functionality of our Service.
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <div className="flex items-center mb-4">
              <Database className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Data Retention</h2>
            </div>
            <div className="text-text-secondary leading-relaxed space-y-4">
              <p>We retain your personal information for as long as necessary to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide our Service to you</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes</li>
                <li>Enforce our agreements</li>
              </ul>
              <p>
                When you delete your account, we will delete or anonymize your personal information 
                within 30 days, except where we are required to retain it for legal purposes.
              </p>
            </div>
          </section>

          {/* International Transfers */}
          <section>
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">International Data Transfers</h2>
            </div>
            <div className="text-text-secondary leading-relaxed space-y-4">
              <p>
                Your information may be transferred to and processed in countries other than your own. 
                We ensure that such transfers are conducted in accordance with applicable data protection laws 
                and that appropriate safeguards are in place.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Children's Privacy</h2>
            </div>
            <div className="text-text-secondary leading-relaxed space-y-4">
              <p>
                Our Service is not intended for children under 13 years of age. We do not knowingly 
                collect personal information from children under 13. If you are a parent or guardian 
                and believe your child has provided us with personal information, please contact us.
              </p>
            </div>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Changes to This Privacy Policy</h2>
            </div>
            <div className="text-text-secondary leading-relaxed space-y-4">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material 
                changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p>
                We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="flex items-center mb-4">
              <Mail className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Contact Us</h2>
            </div>
            <div className="text-text-secondary leading-relaxed space-y-4">
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-white/5 rounded-lg p-4">
                <p><strong>Email:</strong> privacy@nollywatch.com</p>
                <p><strong>Data Protection Officer:</strong> dpo@nollywatch.com</p>
                <p><strong>Address:</strong> 123 Timepiece Lane, WatchVille, CA, USA</p>
                <p><strong>Phone:</strong> +1 (800) 123-4567</p>
              </div>
            </div>
          </section>
        </motion.div>

        {/* Footer Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/terms" className="secondary-button">
              View Terms of Service
            </Link>
            <Link to="/signup" className="primary-button">
              Back to Sign Up
            </Link>
          </div>
          <p className="text-text-secondary text-sm">
            By using NollyWatch, you agree to this Privacy Policy.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;