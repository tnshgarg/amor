import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useClerk, SignedIn, SignedOut } from "@clerk/clerk-react";
import { ArrowRight, Heart, MessageSquare, Music, Award } from "lucide-react";
import { useEffect, useState } from "react";
import loveQuotes from "@/data/loveQuotes";
import { Textarea } from "@/components/ui/textarea";
import { TypeAnimation } from "react-type-animation";
import { generateSong } from "@/services/songService";

const Home = () => {
  const { openSignUp } = useClerk();
  const navigate = useNavigate();
  const [quote, setQuote] = useState({ quote: "", author: "" });
  const [storyInput, setStoryInput] = useState("");

  const questions = [
    "How did you meet your special someone?",
    "What makes your love story unique?",
    "Describe a moment when you knew they were the one...",
    "What's the most romantic thing they've done for you?",
    "Share a challenge you've overcome together...",
    "What's your favorite memory together?",
    "How do you show each other love every day?",
    "What song reminds you of your relationship?",
    "Tell us about your first date together...",
    "What little things do they do that make you smile?",
    "How has your relationship grown over time?",
    "What's one thing you admire most about your partner?",
    "Tell us about a time they surprised you...",
    "What adventures have you shared together?",
    "How do they make ordinary moments special?",
    "What dreams do you share for your future?",
  ];

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && storyInput.trim()) {
      e.preventDefault();
      handleGenerateSong();
    }
  };

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * loveQuotes.length);
    setQuote(loveQuotes[randomIndex]);
  }, []);

  const handleGenerateSong = () => {
    if (storyInput.trim()) {
      localStorage.setItem("loveStory", storyInput);
    }

    navigate("/sign-in");
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const features = [
    {
      title: "AI-Powered Love Songs",
      description:
        "Our advanced AI turns your unique love story into a beautiful, personalized song that captures your journey together.",
      icon: <Music className="h-8 w-8 text-love-500" />,
    },
    {
      title: "Story to Melody",
      description:
        "Share your love story, how you met, special moments, and let our AI craft lyrics that truly represent your relationship.",
      icon: <MessageSquare className="h-8 w-8 text-love-500" />,
    },
    {
      title: "Perfect Gift",
      description:
        "Surprise your partner with a one-of-a-kind gift that celebrates your unique love story in melody and words.",
      icon: <Heart className="h-8 w-8 text-love-500" />,
    },
    {
      title: "Premium Quality",
      description:
        "Professional-grade productions with various genres and styles to match your relationship's unique vibe and energy.",
      icon: <Award className="h-8 w-8 text-love-500" />,
    },
  ];

  return (
    <div className="pt-16">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-40 z-0"></div>
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover opacity-15"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="https://cdn.coverr.co/videos/coverr-couple-holding-hands-on-beach-at-sunset-2541/1080p.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3')] bg-cover bg-center opacity-40 mix-blend-overlay z-0"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <motion.div className="mb-10 h-40" variants={fadeInUp} custom={0}>
                <TypeAnimation
                  sequence={[
                    ...questions.flatMap((question) => [question, 1200]),
                  ]}
                  wrapper="h2"
                  cursor={true}
                  repeat={Infinity}
                  speed={{ type: "keyStrokeDelayInMs", value: 68 }}
                  className="text-3xl md:text-[46px] font-bold bg-gradient-to-r from-love-500 to-purple-500 text-transparent bg-clip-text leading-tight"
                />
              </motion.div>

              <motion.div
                variants={fadeInUp}
                custom={1}
                className="mb-8 mt-14 relative"
              >
                <div className="relative">
                  <Textarea
                    placeholder="Write your love story here..."
                    className="min-h-[240px] w-[calc(100%-3px)] text-foreground text-lg resize-none p-8 rounded-xl border-love-200 dark:border-love-800/50 shadow-lg bg-background/70 backdrop-blur-sm pr-16"
                    value={storyInput}
                    onChange={(e) => setStoryInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />

                  <div className="absolute top-4 right-4">
                    <SignedOut>
                      <Button
                        className="p-2 rounded-full bg-love-500 hover:bg-love-600 text-white"
                        size="icon"
                        onClick={handleGenerateSong}
                        aria-label="Generate"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </SignedOut>
                    <SignedIn>
                      <Button
                        className="p-2 rounded-full bg-love-500 hover:bg-love-600 text-white"
                        size="icon"
                        onClick={() => navigate("/story")}
                        aria-label="Go to story"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </SignedIn>
                  </div>
                </div>

                <motion.div
                  className="mt-8 text-foreground/80 italic"
                  variants={fadeInUp}
                  custom={3}
                >
                  <blockquote className="relative">
                    <span className="block mb-2">{quote.quote}</span>
                    <cite className="text-sm">— {quote.author}</cite>
                  </blockquote>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-love-50 dark:bg-love-900/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Turn Your Love Story Into Music
            </h2>
            <p className="text-lg text-foreground/70">
              AmorAI transforms your unique relationship journey into beautiful,
              personalized songs that capture the essence of your love.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white dark:bg-love-900/10 rounded-xl p-6 shadow-sm border border-love-100 dark:border-love-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-love-100 dark:bg-love-800/30 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-foreground/70">
              Creating your personalized love song is simple with our AI-powered
              platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-love-100 dark:bg-love-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-love-500">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Share Your Story</h3>
              <p className="text-foreground/70">
                Tell us about your relationship journey, special moments, and
                what makes your love unique.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-love-100 dark:bg-love-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-love-500">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                AI Creates Your Song
              </h3>
              <p className="text-foreground/70">
                Our advanced AI analyzes your story and composes unique lyrics
                and melody that capture your relationship.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-love-100 dark:bg-love-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-love-500">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Share & Celebrate</h3>
              <p className="text-foreground/70">
                Download your song, share it with your loved one, and create a
                lasting memory of your relationship.
              </p>
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
              Ready to Turn Your Love Story Into Music?
            </motion.h2>

            <motion.p
              className="text-lg mb-8 text-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Create a timeless, personalized song that captures the essence of
              your relationship. The perfect gift for anniversaries, weddings,
              or just because.
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
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="ml-4 border-love-300 hover:border-love-500 hover:text-love-500 px-8 py-6"
                  asChild
                >
                  <Link to="/about">Learn More</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <Button
                  size="lg"
                  className="love-button px-8 py-6"
                  onClick={() => navigate("/story")}
                >
                  Create Your Song
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="ml-4 border-love-300 hover:border-love-500 hover:text-love-500 px-8 py-6"
                  asChild
                >
                  <Link to="/songs">View My Songs</Link>
                </Button>
              </SignedIn>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
