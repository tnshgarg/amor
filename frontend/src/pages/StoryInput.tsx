import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Heart, Sparkles } from "lucide-react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useCredits } from "@/contexts/CreditsContext";
import { getUserProfile } from "@/services/userService";
import { generateSong, SongInput } from "@/services/songService";
import api, { setAuthToken } from "@/services/api";

const StoryInput = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken, isLoaded } = useAuth();
  const { credits, deductCredits, setCredits } = useCredits();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    story: "",
  });

  useEffect(() => {
    const fetchCredits = async () => {
      const creditsData = await getUserProfile();
      setCredits(creditsData.credits);
      console.log("Credits: ", creditsData);
    };

    fetchCredits();
  }, []);

  // Load the saved form data on component mount
  useEffect(() => {
    const savedTitle = localStorage.getItem("loveTitle");
    const savedStory = localStorage.getItem("loveStory");

    const newFormData = { ...formData };
    if (savedTitle) newFormData.title = savedTitle;
    if (savedStory) newFormData.story = savedStory;

    if (savedTitle || savedStory) {
      setFormData(newFormData);
    }
  }, []);

  const storyExamples = [
    "How and where you first met",
    "Special moments or milestones in your relationship",
    "Inside jokes or unique experiences you've shared",
    "Challenges you've overcome together",
    "What makes your relationship special or unique",
    "Favorite memories or trips you've taken together",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Save to localStorage as the user types
    localStorage.setItem(
      `love${name.charAt(0).toUpperCase() + name.slice(1)}`,
      value
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit the form when Enter is pressed without shift (allowing shift+enter for newlines)
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      e.target instanceof HTMLInputElement
    ) {
      e.preventDefault();
      submitForm();
    }
  };

  const submitForm = async () => {
    console.log("Form submitting");
    // Validate form
    if (formData.title.trim() === "") {
      toast({
        title: "Please add a title for your song",
        description: "This helps us identify your creation",
        variant: "destructive",
      });
      return;
    }

    if (formData.story.trim() === "") {
      toast({
        title: "Please share your love story",
        description: "This helps our AI create a personalized song",
        variant: "destructive",
      });
      return;
    }

    console.log("Reached 0");

    const token = await getToken();
    const response = await api.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Profile Data: ", response.data);

    const credits = response.data.credits;
    // Check if user has credits
    if (credits <= 0) {
      toast({
        title: "No credits remaining",
        description: "Please purchase more credits to generate songs",
        variant: "destructive",
      });
      navigate("/pricing");
      return;
    }

    setLoading(true);

    console.log("Reached 1");

    try {
      // Create song input data
      const songInput: SongInput = {
        songTitle: formData.title,
        loveStory: formData.story,
        // coverImage: "" // This will be updated later in the process
      };

      console.log("Reached 2: ", songInput);

      setAuthToken(token);

      // Call the API to generate the song
      const songResponse = await generateSong(songInput);

      console.log("Reached 3: ", songResponse);

      // Clear localStorage when the user successfully generates a song
      localStorage.removeItem("loveTitle");
      localStorage.removeItem("loveStory");

      // Update credit display (server handles actual credit deduction)
      deductCredits(1);

      toast({
        title: "Story submitted successfully!",
        description:
          "We're generating your song now. 1 credit has been deducted.",
      });

      // Navigate to generator with the response data
      navigate("/generator", {
        state: {
          formData,
          songResponse,
        },
      });
      const userProfile = await getUserProfile();
      if (userProfile) {
        setCredits(userProfile.credits);
      }
    } catch (error) {
      console.error("Error generating song:", error);
      toast({
        title: "Failed to generate song",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Share Your Love Story
          </motion.h1>
          <motion.p
            className="text-foreground/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Tell us about your special moments, and we'll transform them into a
            beautiful song.
          </motion.p>
        </div>

        {/* Credit status */}
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {credits > 0 ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-love-50/50 dark:bg-love-950/20 border border-love-100 dark:border-love-800/30">
              <Sparkles className="h-4 w-4 text-love-500" />
              <span>
                You have{" "}
                <span className="font-semibold text-love-500">
                  {credits} credit{credits !== 1 ? "s" : ""}
                </span>{" "}
                remaining
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-800/30">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span className="text-amber-700 dark:text-amber-300">
                You have no credits - purchase some on the{" "}
                <Button
                  onClick={() => navigate("/pricing")}
                  variant="link"
                  className="p-0 text-amber-500 hover:text-amber-600 h-auto"
                >
                  pricing page
                </Button>
              </span>
            </div>
          )}
        </motion.div>

        {/* Form */}
        <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-md border border-border p-6 mb-8">
          <motion.div
            key="storyForm"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeInUp}
          >
            <div className="mb-6">
              <Label htmlFor="title" className="block mb-2">
                Give your love song a title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="E.g., Our Beautiful Journey"
                value={formData.title}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="border-input"
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <Heart className="h-5 w-5 text-primary mr-2" />
                <Label htmlFor="story" className="block">
                  Share your love story
                </Label>
              </div>

              <Textarea
                id="story"
                name="story"
                placeholder="We met on a rainy day in October..."
                value={formData.story}
                onChange={handleChange}
                className="min-h-[300px] border-input"
              />

              <div className="mt-2 text-sm text-muted-foreground">
                <p>
                  The more details you provide, the more personalized your song
                  will be.
                </p>
                <div className="mt-3">
                  <p className="font-medium mb-1">You might want to include:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {storyExamples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end">
          <Button
            onClick={submitForm}
            className="love-button"
            // disabled={loading || credits <= 0}
          >
            {loading ? (
              <>Processing...</>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" /> Generate Song (1 Credit)
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoryInput;
