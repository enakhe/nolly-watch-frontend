import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Users, Eye, Lock, AlertTriangle, Mail } from 'lucide-react';

const TermsOfService = () => {
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
            <h1 className="text-4xl font-bold mb-4 gradient-text">Terms of Service</h1>
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
              Welcome to NollyWatch! These Terms of Service ("Terms") govern your use of our website, 
              mobile application, and services (collectively, the "Service") operated by NollyWatch 
              ("us", "we", or "our"). By accessing or using our Service, you agree to be bound by these Terms.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Acceptance of Terms</h2>
            </div>
            <div className="text-text-secondary leading-relaxed space-y-4">
              <p>
                By creating an account or using NollyWatch, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms and our Privacy Policy.
              </p>
              <p>
                If you do not agree to these Terms, please do not use our Service.
              </p>
            </div>
          </section>

          {/* User Accounts */}
          <section>
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">User Accounts</h2>
            </div>
            <div className="text-text-secondary leading-relaxed space-y-4">
              <h3 className="text-lg font-semibold text-white">Account Creation</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the security of your account credentials</li>
                <li>You must be at least 13 years old to create an account</li>
                <li>One person may not maintain more than one account</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-white">Account Responsibilities</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You are responsible for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Keep your contact information up to date</li>
              </ul>
            </div>
          </section>

          {/* Acceptable Use */}
          <section>
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Acceptable Use</h2>
            </div>
            <div className="text-text-secondary leading-relaxed space-y-4">
              <h3 className="text-lg font-semibold text-white">You May</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Browse and search for movies and TV shows</li>
                <li>Create and manage personal watchlists</li>
                <li>Rate and review content</li>
                <li>Share content recommendations with friends</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-white">You May Not</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Upload malicious code or viruses</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Scrape or extract data from our Service without permission</li>
              </ul>
            </div>
          </section>

          {/* Content and Intellectual Property */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Content and Intellectual Property</h2>
            </div>
            <div className="text-text-secondary leading-relaxed space-y-4">
              <h3 className="text-lg font-semibold text-white">Our Content</h3>
              <p>
                All content on NollyWatch, including but not limited to text, graphics, logos, 
                images, and software, is the property of NollyWatch or its content suppliers 
                and is protected by copyright and other intellectual property laws.
              </p>
              
              <h3 className="text-lg font-semibold text-white">User-Generated Content</h3>
              <p>
                By submitting content to NollyWatch (reviews, ratings, comments), you grant us 
                a non-exclusive, royalty-free, worldwide license to use, modify, and display 
                such content in connection with our Service.
              </p>
            </div>
          </section>

          {/* Privacy and Data */}
          <section>
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Privacy and Data Protection</h2>
            </div>
            <div className="text-text-secondary leading-relaxed space-y-4">
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also 
                governs your use of the Service, to understand our practices.
              </p>
              <p>
                We collect and use information as described in our Privacy Policy. By using 
                our Service, you consent to such collection and use.
              </p>
            </div>
          </section>

          {/* Disclaimers */}
          <section>
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Disclaimers</h2>
            </div>
            <div className="text-text-secondary leading-relaxed space-y-4">
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
                WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF 
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p>
                We do not warrant that the Service will be uninterrupted, secure, or error-free, 
                or that defects will be corrected.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Limitation of Liability</h2>
            </div>
            <div className="text-text-secondary leading-relaxed space-y-4">
              <p>
                IN NO EVENT SHALL NOLLYWATCH BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, 
                DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
            </div>
          </section>

          {/* Termination */}
          <section>
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Termination</h2>
            </div>
            <div className="text-text-secondary leading-relaxed space-y-4">
              <p>
                We may terminate or suspend your account and access to the Service immediately, 
                without prior notice or liability, for any reason, including if you breach these Terms.
              </p>
              <p>
                Upon termination, your right to use the Service will cease immediately, and we may 
                delete your account and all associated data.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold">Changes to Terms</h2>
            </div>
            <div className="text-text-secondary leading-relaxed space-y-4">
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of 
                any material changes by posting the new Terms on this page and updating the 
                "Last updated" date.
              </p>
              <p>
                Your continued use of the Service after any such changes constitutes your acceptance 
                of the new Terms.
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
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-white/5 rounded-lg p-4">
                <p><strong>Email:</strong> legal@nollywatch.com</p>
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
            <Link to="/privacy" className="secondary-button">
              View Privacy Policy
            </Link>
            <Link to="/signup" className="primary-button">
              Back to Sign Up
            </Link>
          </div>
          <p className="text-text-secondary text-sm">
            By continuing to use NollyWatch, you agree to these Terms of Service.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;