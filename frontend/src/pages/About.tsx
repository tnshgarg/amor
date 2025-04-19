
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import { Heart, Sparkles, Users, Brain, Rocket, ChevronRight } from "lucide-react";

const About = () => {
  const { openSignUp } = useClerk();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-40 z-0"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              custom={0}
            >
              About <span className="bg-gradient-to-r from-love-500 to-purple-500 text-transparent bg-clip-text">AmorAI</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-8 text-foreground/80"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              custom={1}
            >
              We're revolutionizing the way couples celebrate their love stories through AI-generated music and lyrics that capture the unique essence of every relationship.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="https://images.unsplash.com/photo-1525358180237-7399f908a1d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                alt="Couple"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-foreground/80 mb-4">
                AmorAI began with a simple idea: to help couples celebrate their unique love stories in a creative, memorable way. Our founder, a software engineer and hopeless romantic, wanted to create something special for his fifth wedding anniversary.
              </p>
              <p className="text-foreground/80 mb-4">
                Unable to find the perfect song that captured his relationship's journey, he used his expertise in AI to create a custom song based on their story. The result was so moving that friends and family asked for their own songs.
              </p>
              <p className="text-foreground/80 mb-6">
                Today, AmorAI combines cutting-edge artificial intelligence with human creativity to transform love stories into beautiful melodies and lyrics that capture the essence of each unique relationship.
              </p>
              <div className="flex items-center">
                <Heart className="h-6 w-6 text-love-500 mr-2 animate-pulse-heart" />
                <span className="text-lg font-medium text-love-500">Creating musical memories since 2022</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-love-50 dark:bg-love-900/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-foreground/70">
              We believe every love story deserves to be celebrated in a way that's as unique as the relationship itself.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white dark:bg-love-900/10 rounded-xl p-6 shadow-sm border border-love-100 dark:border-love-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-12 rounded-full bg-love-100 dark:bg-love-800/30 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-love-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Celebrate Love</h3>
              <p className="text-foreground/70">
                We're dedicated to helping couples celebrate their unique journeys through personalized music that captures their story.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-love-900/10 rounded-xl p-6 shadow-sm border border-love-100 dark:border-love-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-love-100 dark:bg-love-800/30 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-love-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovate with AI</h3>
              <p className="text-foreground/70">
                We push the boundaries of AI technology to create beautiful, emotionally resonant songs that feel genuinely personal.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-love-900/10 rounded-xl p-6 shadow-sm border border-love-100 dark:border-love-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-12 h-12 rounded-full bg-love-100 dark:bg-love-800/30 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-love-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect People</h3>
              <p className="text-foreground/70">
                We believe in strengthening relationships by creating meaningful, emotional experiences that couples can share.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-love-50 dark:bg-love-900/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl font-bold mb-6">Our Values</h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-love-100 dark:bg-love-800/30">
                      <Heart className="h-6 w-6 text-love-500" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Authenticity</h3>
                    <p className="mt-2 text-foreground/70">
                      We believe every love story is unique and deserves to be told in its most genuine form.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-love-100 dark:bg-love-800/30">
                      <Sparkles className="h-6 w-6 text-love-500" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Creativity</h3>
                    <p className="mt-2 text-foreground/70">
                      We push the boundaries of AI to create songs that are not just technologically impressive but emotionally moving.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-love-100 dark:bg-love-800/30">
                      <Users className="h-6 w-6 text-love-500" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Inclusivity</h3>
                    <p className="mt-2 text-foreground/70">
                      We celebrate love in all its forms and are committed to representing diverse relationships in our work.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-love-100 dark:bg-love-800/30">
                      <Rocket className="h-6 w-6 text-love-500" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Innovation</h3>
                    <p className="mt-2 text-foreground/70">
                      We're constantly evolving our technology to create more personalized, emotional, and beautiful songs.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Team working"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-60 z-0"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Share Your Love Story?
            </motion.h2>
            
            <motion.p 
              className="text-lg mb-8 text-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Join thousands of couples who have turned their unique journeys into beautiful melodies. Create a timeless keepsake that celebrates your love.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SignedOut>
                <Button 
                  size="lg" 
                  className="love-button px-8 py-6"
                  onClick={() => openSignUp()}
                >
                  <Sparkles className="mr-2 h-5 w-5" /> Start Your Journey
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="ml-4 border-love-300 hover:border-love-500 hover:text-love-500 px-8 py-6"
                  asChild
                >
                  <Link to="/pricing">View Pricing <ChevronRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <Button 
                  size="lg" 
                  className="love-button px-8 py-6"
                  asChild
                >
                  <Link to="/story">
                    <Sparkles className="mr-2 h-5 w-5" /> Create Your Song
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="ml-4 border-love-300 hover:border-love-500 hover:text-love-500 px-8 py-6"
                  asChild
                >
                  <Link to="/dashboard">Go to Dashboard <ChevronRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </SignedIn>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
