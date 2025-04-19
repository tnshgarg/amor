
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Terms of Service</h1>
        
        <div className="prose prose-lg dark:prose-invert mx-auto">
          <p className="text-lg text-foreground/80 mb-6">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using AmorAI's website and services, you agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
          <p>
            AmorAI provides AI-powered tools to create personalized songs based on your love stories and 
            relationship details. Our services are subject to change at our discretion.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
          <p>
            To access certain features, you may need to create an account. You are responsible for maintaining 
            the confidentiality of your account information and for all activities under your account.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Content</h2>
          <p>
            By submitting content to AmorAI, you grant us a non-exclusive, worldwide, royalty-free license to use, 
            reproduce, modify, and distribute your content for the purpose of providing our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Acceptable Use</h2>
          <p>
            You agree not to:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Use our services for any illegal purposes</li>
            <li>Submit content that infringes on others' rights</li>
            <li>Attempt to gain unauthorized access to any part of our services</li>
            <li>Interfere with the proper working of our services</li>
            <li>Use our services to harm, threaten, or harass others</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Payment and Subscription</h2>
          <p>
            Some of our services require payment. By subscribing to a paid plan, you agree to pay all fees 
            associated with your chosen plan. We may change our fees upon reasonable notice.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Intellectual Property</h2>
          <p>
            The content, features, and functionality of our services are owned by AmorAI and protected by 
            copyright, trademark, and other intellectual property laws.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Disclaimer of Warranties</h2>
          <p>
            Our services are provided "as is" without warranties of any kind, either express or implied. We do not 
            guarantee that our services will be uninterrupted, secure, or error-free.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, AmorAI shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages resulting from your use or inability to use our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Termination</h2>
          <p>
            We may terminate or suspend your account and access to our services at our sole discretion, without 
            notice, for conduct that we believe violates these Terms of Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Changes to Terms</h2>
          <p>
            We may modify these Terms of Service at any time. Your continued use of our services after any 
            changes indicates your acceptance of the modified terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by the laws of the United States, without regard to its 
            conflict of law provisions.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">13. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
            <br />
            <a href="mailto:contact@amorai.com" className="text-love-500 hover:underline">
              contact@amorai.com
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Terms;
