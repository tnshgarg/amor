
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQs = () => {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
        
        <div className="mx-auto mb-12">
          <p className="text-lg text-center text-foreground/80 mb-10 max-w-2xl mx-auto">
            Find answers to the most common questions about AmorAI's services, features, and how our AI-powered
            love song generation works.
          </p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">How does AmorAI create personalized love songs?</AccordionTrigger>
              <AccordionContent>
                AmorAI uses advanced artificial intelligence to analyze your love story, key moments, and relationship 
                details. Our AI then composes unique lyrics and melodies that capture the essence of your relationship, 
                creating a completely personalized song that's meaningful to you and your partner.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">How long does it take to generate a song?</AccordionTrigger>
              <AccordionContent>
                Most songs are generated within 5-10 minutes after you submit your story. For more complex requests 
                or during high-traffic periods, it may take up to 24 hours. You'll receive a notification when your 
                song is ready.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">What musical styles are available?</AccordionTrigger>
              <AccordionContent>
                We offer a variety of genres including pop, acoustic, R&B, country, jazz, and classical. You can 
                select your preferred style when submitting your story, or let our AI recommend the best fit based 
                on your relationship details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">Can I edit the song after it's generated?</AccordionTrigger>
              <AccordionContent>
                Yes! Premium subscribers can request up to 3 revisions per song. You can provide feedback on lyrics, 
                melody, tempo, or instrumentation, and our AI will generate a new version based on your preferences.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">Who owns the rights to my generated song?</AccordionTrigger>
              <AccordionContent>
                You retain full rights to use and share your personalized song for personal purposes. However, 
                commercial rights depend on your subscription plan. Free and Basic users receive a personal use 
                license, while Premium subscribers get full commercial rights to their songs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left">Is my love story data private and secure?</AccordionTrigger>
              <AccordionContent>
                Absolutely. We take your privacy seriously. Your love stories and personal information are encrypted 
                and stored securely. We never share your stories or use them for purposes other than generating your 
                song without your explicit permission.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left">How do I share my song with others?</AccordionTrigger>
              <AccordionContent>
                Once your song is generated, you can download it as an MP3 file, share it directly to social media, 
                or send a private link via email or messaging apps. Premium users can also receive a professionally 
                designed digital card with their song embedded.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-left">Can I cancel my subscription?</AccordionTrigger>
              <AccordionContent>
                Yes, you can cancel your subscription at any time from your account settings. If you cancel, you'll 
                continue to have access to your subscription benefits until the end of your current billing period. 
                You'll still have access to songs you've already generated after your subscription ends.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger className="text-left">What makes a good love story submission?</AccordionTrigger>
              <AccordionContent>
                The best submissions include specific details, emotions, and memorable moments from your relationship. 
                Mention how you met, inside jokes, meaningful dates, challenges you've overcome together, and what you 
                love most about your partner. The more personal details you provide, the more unique your song will be.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger className="text-left">Do you offer refunds?</AccordionTrigger>
              <AccordionContent>
                If you're not satisfied with your song, please contact our support team within 14 days of purchase. 
                We'll work with you to revise your song or provide a refund if necessary. For subscription plans, 
                we offer prorated refunds for unused periods if you decide to cancel.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-foreground/80 mb-4">
              Still have questions? We're here to help!
            </p>
            <Link to="/contact" className="text-love-500 hover:underline font-medium">
              Contact our support team
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQs;
