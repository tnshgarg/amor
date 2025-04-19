
import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert mx-auto">
          <p className="text-lg text-foreground/80 mb-6">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            At AmorAI, we respect your privacy and are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, and safeguard your information when you 
            use our website and services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
          <p>
            We may collect personal information that you voluntarily provide to us when you register 
            on our website, create songs, share your stories, or contact us. This may include:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Billing information</li>
            <li>Love stories and relationship details you choose to share</li>
            <li>Generated content and preferences</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
          <p>
            We use your information to:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and manage your account</li>
            <li>Personalize your experience</li>
            <li>Communicate with you about updates, offers, and support</li>
            <li>Enhance the security of our platform</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and 
            store certain information. You can instruct your browser to refuse all cookies or to 
            indicate when a cookie is being sent.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Sharing and Disclosure</h2>
          <p>
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Service providers who help us operate our business</li>
            <li>Legal authorities when required by law</li>
            <li>Business partners with your consent</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information. 
            However, no method of transmission over the Internet is 100% secure, and we cannot 
            guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Your Rights</h2>
          <p>
            Depending on your location, you may have rights regarding your personal data, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Accessing your data</li>
            <li>Correcting inaccuracies</li>
            <li>Erasing your data</li>
            <li>Restricting processing</li>
            <li>Data portability</li>
            <li>Objecting to processing</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by 
            posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
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

export default Privacy;
