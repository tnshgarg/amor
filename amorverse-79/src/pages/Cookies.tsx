
import { motion } from "framer-motion";

const Cookies = () => {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Cookie Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert mx-auto">
          <p className="text-lg text-foreground/80 mb-6">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. What Are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your device when you visit a website. 
            They are widely used to make websites work more efficiently and provide information to 
            the website owners.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Cookies</h2>
          <p>
            At AmorAI, we use cookies for various purposes, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Essential cookies: These are necessary for the website to function properly</li>
            <li>Preference cookies: These remember your settings and choices</li>
            <li>Analytics cookies: These help us understand how visitors interact with our website</li>
            <li>Marketing cookies: These track your activity on our website to deliver targeted advertising</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Types of Cookies We Use</h2>
          <h3 className="text-xl font-medium mt-6 mb-3">3.1 Essential Cookies</h3>
          <p>
            These cookies are required for basic website functionality. They enable core features like 
            security, network management, and account access. You cannot opt out of these cookies.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">3.2 Preference Cookies</h3>
          <p>
            These cookies allow us to remember choices you make and provide enhanced, personalized features. 
            They may be set by us or by third-party providers whose services we have added to our pages.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">3.3 Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting and reporting 
            information anonymously. They help us improve our website based on user behavior.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">3.4 Marketing Cookies</h3>
          <p>
            These cookies are used to track visitors across websites. The intention is to display ads that are 
            relevant and engaging for the individual user.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Managing Cookies</h2>
          <p>
            Most web browsers allow you to control cookies through their settings preferences. However, if you 
            limit the ability of websites to set cookies, you may impact your overall user experience.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Third-Party Cookies</h2>
          <p>
            Some cookies are placed by third parties on our website. We do not control the operation of these 
            cookies. You can learn more about these cookies through the privacy policies of the respective third parties.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to Our Cookie Policy</h2>
          <p>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the 
            new Cookie Policy on this page and updating the "Last Updated" date.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us at:
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

export default Cookies;
