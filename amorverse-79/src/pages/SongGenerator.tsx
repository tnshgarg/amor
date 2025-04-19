
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { 
  Play, 
  Pause, 
  Download, 
  Share2, 
  Volume2,
  Music
} from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import { useCredits } from "@/contexts/CreditsContext";

const SongGenerator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { deductCredits } = useCredits();
  const formData = location.state?.formData;
  const audioRef1 = useRef<HTMLAudioElement | null>(null);
  const audioRef2 = useRef<HTMLAudioElement | null>(null);
  const canvasRef1 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef2 = useRef<HTMLCanvasElement | null>(null);
  const animationRef1 = useRef<number | null>(null);
  const animationRef2 = useRef<number | null>(null);
  // Add refs to track the audio context and source
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef1 = useRef<MediaElementAudioSourceNode | null>(null);
  const audioSourceRef2 = useRef<MediaElementAudioSourceNode | null>(null);
  
  const [generationStep, setGenerationStep] = useState("generating"); // generating, lyrics, complete
  const [progress, setProgress] = useState(0);
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [currentTime1, setCurrentTime1] = useState(0);
  const [currentTime2, setCurrentTime2] = useState(0);
  const [duration1, setDuration1] = useState(0);
  const [duration2, setDuration2] = useState(0);
  const [activeVersion, setActiveVersion] = useState<1 | 2>(1);
  const [coverImage, setCoverImage] = useState<string>("");

  // Sample lyrics for demo purposes
  const [lyrics, setLyrics] = useState<string[]>([]);

  useEffect(() => {
    // Check if we have form data, if not redirect to story input
    if (!formData) {
      toast({
        title: "No story data found",
        description: "Please create your love story first.",
        variant: "destructive"
      });
      navigate("/story");
      return;
    }

    // Simulate AI generation process
    const timer = setTimeout(() => {
      // Generate lyrics based on form data
      const generatedLyrics = [
        "From that rainy day in October",
        "When our eyes first met across the room",
        "I knew there was something special",
        "Something that would bloom",
        "",
        "Through all the moments we've shared",
        "Every laugh, every tear, every smile",
        "You've been my constant, my anchor",
        "Making every second worthwhile",
        "",
        "CHORUS:",
        "This is our love story",
        "Written in the stars above",
        "Every chapter, every page",
        "Is filled with our endless love",
        "",
        "From coffee shops to mountain tops",
        "We've built our world together",
        "Hand in hand, heart to heart",
        "Through every kind of weather",
        "",
        "And as we write our future",
        "One day at a time",
        "I'm grateful for our journey",
        "Your heart next to mine",
        "",
        "(REPEAT CHORUS)",
        "",
        "Our love story continues",
        "With pages yet unwritten",
        "But I know with you beside me",
        "My heart will always be smitten"
      ];
      
      setLyrics(generatedLyrics);
      setGenerationStep("lyrics");
      
      // After some time, mark as complete with audio
      setTimeout(() => {
        setGenerationStep("complete");
        // Deduct one credit when song generation is complete
        deductCredits(1);
      }, 3000);
    }, 5000);

    return () => clearTimeout(timer);
  }, [formData, navigate, deductCredits]);

  // Simulate progress during generation
  useEffect(() => {
    if (generationStep === "generating") {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return 96;
          }
          return prev + 1;
        });
      }, 150);
      
      return () => clearInterval(interval);
    } else if (generationStep === "lyrics") {
      setProgress(97);
    } else if (generationStep === "complete") {
      setProgress(100);
    }
  }, [generationStep]);

  // Audio visualizer setup - fixed to prevent multiple connections
  useEffect(() => {
    // Only set up visualizer when generation is complete and audio elements exist
    if (generationStep === "complete") {
      // Setup for first audio player
      if (audioRef1.current && canvasRef1.current) {
        setupVisualizer(audioRef1.current, canvasRef1.current, audioSourceRef1, animationRef1, isPlaying1);
      }

      // Setup for second audio player
      if (audioRef2.current && canvasRef2.current) {
        setupVisualizer(audioRef2.current, canvasRef2.current, audioSourceRef2, animationRef2, isPlaying2);
      }
    }
    
    // Cleanup function for component unmount
    return () => {
      if (animationRef1.current) {
        cancelAnimationFrame(animationRef1.current);
        animationRef1.current = null;
      }
      
      if (animationRef2.current) {
        cancelAnimationFrame(animationRef2.current);
        animationRef2.current = null;
      }
    };
  }, [generationStep, isPlaying1, isPlaying2]);
  
  const setupVisualizer = (
    audioElement: HTMLAudioElement, 
    canvasElement: HTMLCanvasElement,
    sourceRef: React.MutableRefObject<MediaElementAudioSourceNode | null>,
    animRef: React.MutableRefObject<number | null>,
    isPlaying: boolean
  ) => {
    // Create new AudioContext if none exists
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    // Only create a new source if none exists
    if (!sourceRef.current && audioContextRef.current) {
      try {
        sourceRef.current = audioContextRef.current.createMediaElementSource(audioElement);
        const analyser = audioContextRef.current.createAnalyser();
        analyser.fftSize = 256;
        
        sourceRef.current.connect(analyser);
        analyser.connect(audioContextRef.current.destination);
        
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const canvas = canvasElement;
        const canvasCtx = canvas.getContext('2d');
        
        if (!canvasCtx) return;
        
        const renderFrame = () => {
          animRef.current = requestAnimationFrame(renderFrame);
          
          analyser.getByteFrequencyData(dataArray);
          
          canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
          
          const barWidth = (canvas.width / bufferLength) * 2.5;
          let x = 0;
          
          for (let i = 0; i < bufferLength; i++) {
            const barHeight = (dataArray[i] / 255) * canvas.height / 2;
            
            // Use gradient colors based on frequency
            const hue = i / bufferLength * 360;
            canvasCtx.fillStyle = isPlaying 
              ? `hsla(${hue}, 80%, 60%, 0.8)` 
              : `hsla(${hue}, 20%, 60%, 0.3)`;
            
            // Draw symmetric bars (top and bottom)
            const centerY = canvas.height / 2;
            canvasCtx.fillRect(x, centerY - barHeight, barWidth, barHeight);
            canvasCtx.fillRect(x, centerY, barWidth, barHeight);
            
            x += barWidth + 1;
          }
        };
        
        renderFrame();
      } catch (error) {
        console.error("Error setting up audio visualization:", error);
        sourceRef.current = null;
      }
    }
  };
  
  // Final cleanup on component unmount
  useEffect(() => {
    return () => {
      // Properly clean up everything when component unmounts
      if (animationRef1.current) {
        cancelAnimationFrame(animationRef1.current);
      }
      
      if (animationRef2.current) {
        cancelAnimationFrame(animationRef2.current);
      }
      
      if (audioSourceRef1.current) {
        audioSourceRef1.current.disconnect();
      }
      
      if (audioSourceRef2.current) {
        audioSourceRef2.current.disconnect();
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
      }
    };
  }, []);

  // Audio player controls for version 1
  const togglePlay1 = () => {
    if (audioRef1.current) {
      if (isPlaying1) {
        audioRef1.current.pause();
      } else {
        // Pause the other player if it's playing
        if (isPlaying2 && audioRef2.current) {
          audioRef2.current.pause();
          setIsPlaying2(false);
        }
        audioRef1.current.play();
      }
      setIsPlaying1(!isPlaying1);
    }
  };

  // Audio player controls for version 2
  const togglePlay2 = () => {
    if (audioRef2.current) {
      if (isPlaying2) {
        audioRef2.current.pause();
      } else {
        // Pause the other player if it's playing
        if (isPlaying1 && audioRef1.current) {
          audioRef1.current.pause();
          setIsPlaying1(false);
        }
        audioRef2.current.play();
      }
      setIsPlaying2(!isPlaying2);
    }
  };

  const handleTimeUpdate1 = () => {
    if (audioRef1.current) {
      setCurrentTime1(audioRef1.current.currentTime);
    }
  };

  const handleTimeUpdate2 = () => {
    if (audioRef2.current) {
      setCurrentTime2(audioRef2.current.currentTime);
    }
  };

  const handleLoadedMetadata1 = () => {
    if (audioRef1.current) {
      setDuration1(audioRef1.current.duration);
    }
  };

  const handleLoadedMetadata2 = () => {
    if (audioRef2.current) {
      setDuration2(audioRef2.current.duration);
    }
  };

  const handleSeek1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef1.current) {
      audioRef1.current.currentTime = seekTime;
      setCurrentTime1(seekTime);
    }
  };

  const handleSeek2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef2.current) {
      audioRef2.current.currentTime = seekTime;
      setCurrentTime2(seekTime);
    }
  };

  // Fast forward/rewind 10 seconds for version 1
  const seekForward1 = () => {
    if (audioRef1.current) {
      const newTime = Math.min(audioRef1.current.duration, currentTime1 + 10);
      audioRef1.current.currentTime = newTime;
      setCurrentTime1(newTime);
    }
  };
  
  const seekBackward1 = () => {
    if (audioRef1.current) {
      const newTime = Math.max(0, currentTime1 - 10);
      audioRef1.current.currentTime = newTime;
      setCurrentTime1(newTime);
    }
  };

  // Fast forward/rewind 10 seconds for version 2
  const seekForward2 = () => {
    if (audioRef2.current) {
      const newTime = Math.min(audioRef2.current.duration, currentTime2 + 10);
      audioRef2.current.currentTime = newTime;
      setCurrentTime2(newTime);
    }
  };
  
  const seekBackward2 = () => {
    if (audioRef2.current) {
      const newTime = Math.max(0, currentTime2 - 10);
      audioRef2.current.currentTime = newTime;
      setCurrentTime2(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleImageUpload = (imageUrl: string) => {
    setCoverImage(imageUrl);
  };

  const shareSong = (version: number) => {
    // Create a unique ID for the shared song
    const songId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Create a shareable URL 
    const shareUrl = `${window.location.origin}/shared-song?id=${songId}`;
    
    // Try to use the Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: `${formData?.title || "My Love Song"} (Version ${version})`,
        text: `Check out this version ${version} of my love song!`,
        url: shareUrl,
      }).catch(() => {
        // Fallback if share fails
        copyToClipboard(shareUrl);
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Share link copied",
        description: "Now you can share your love song with others!",
      });
    }).catch(() => {
      toast({
        title: "Couldn't copy link",
        description: "Please try again later.",
        variant: "destructive"
      });
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {generationStep === "generating" 
              ? "Creating Your Love Song" 
              : generationStep === "lyrics" 
              ? "Your Lyrics Are Ready" 
              : "Your Love Songs Are Ready"}
          </motion.h1>
          <motion.p 
            className="text-foreground/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {generationStep === "generating" 
              ? "Our AI is transforming your love story into beautiful songs..." 
              : generationStep === "lyrics" 
              ? "We're now producing the audio for your personalized love songs" 
              : "Two unique versions created just for you! Listen, download, and share your favorites."}
          </motion.p>
        </div>

        {/* Two Versions Notice */}
        {generationStep === "complete" && (
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xl font-bold text-love-500 bg-love-50 dark:bg-love-900/20 px-4 py-3 rounded-md inline-block">
              Each credit produces 2 unique versions of your song!
            </p>
          </motion.div>
        )}

        {/* Generation Progress */}
        {generationStep === "generating" && (
          <motion.div
            className="mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-love-100 dark:bg-love-900/20">
                <div 
                  style={{ width: `${progress}%` }} 
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-love-400 to-purple-500 transition-all duration-500"
                ></div>
              </div>
              <div className="flex justify-between text-xs text-foreground/60">
                <span>Analyzing your story</span>
                <span>Creating lyrics</span>
                <span>Producing music</span>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="inline-flex items-center justify-center p-4 rounded-full bg-love-50 dark:bg-love-900/20 mb-4">
                <Music className="h-8 w-8 text-love-500 animate-pulse" />
              </div>
              <p className="text-foreground/70">This usually takes 3-5 minutes.</p>
            </div>
          </motion.div>
        )}

        {/* Image Upload Section */}
        {generationStep === "complete" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold mb-4 text-center">Upload Cover Image</h2>
            <div className="max-w-sm mx-auto">
              <ImageUpload onImageUpload={handleImageUpload} existingImage={coverImage} />
            </div>
          </motion.div>
        )}

        {/* Lyrics Content */}
        {(generationStep === "lyrics" || generationStep === "complete") && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-8"
          >
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Music className="h-5 w-5 text-love-500 mr-2" />
                  {formData?.title || "Your Love Song"}
                </h2>
                
                <div className="bg-love-50 dark:bg-love-900/20 rounded-lg p-4 mb-4 overflow-y-auto max-h-[300px]">
                  <div className="whitespace-pre-line font-medium text-foreground/80">
                    {lyrics.map((line, index) => (
                      <div key={index} className={line === "" ? "mt-4" : ""}>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Audio Players (Only shown when complete) */}
        {generationStep === "complete" && (
          <>
            {/* Version 1 Player */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mb-8"
            >
              <h3 className="text-xl font-semibold mb-4 text-center">Version 1</h3>
              <Card className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden bg-love-900/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-love-200/40 to-purple-200/40 dark:from-love-900/40 dark:to-purple-900/40"></div>
                  
                  {/* Cover Image (if uploaded) */}
                  {coverImage && (
                    <div className="absolute inset-0 opacity-30">
                      <img 
                        src={coverImage} 
                        alt="Song cover" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Visualizer Canvas */}
                  <canvas 
                    ref={canvasRef1} 
                    className="absolute inset-0 w-full h-full"
                    width={1000}
                    height={400}
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-1 text-white shadow-sm">
                        {formData?.title || "Your Love Song"} - V1
                      </h3>
                      <p className="text-white/80 text-sm">Dedicated with love</p>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  {/* Audio Element (hidden) */}
                  <audio 
                    ref={audioRef1} 
                    onTimeUpdate={handleTimeUpdate1}
                    onLoadedMetadata={handleLoadedMetadata1}
                    onEnded={() => setIsPlaying1(false)}
                    // Use a sample mp3 for demo - in production would be the generated song
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/shoptalk-clip.mp3" 
                  />
                  
                  {/* Custom Player Controls */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground/70">{formatTime(currentTime1)}</span>
                      <div className="relative flex-1 mx-4">
                        <input
                          type="range"
                          min="0"
                          max={duration1 || 100}
                          value={currentTime1}
                          onChange={handleSeek1}
                          className="w-full h-1.5 bg-love-100 rounded-lg appearance-none cursor-pointer accent-love-500"
                        />
                      </div>
                      <span className="text-sm text-foreground/70">{formatTime(duration1)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground">
                          <Volume2 className="h-5 w-5" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs px-2"
                          onClick={seekBackward1}
                        >
                          -10s
                        </Button>
                        
                        <Button 
                          onClick={togglePlay1} 
                          size="icon" 
                          className="h-12 w-12 rounded-full bg-love-500 hover:bg-love-600 text-white"
                        >
                          {isPlaying1 ? (
                            <Pause className="h-6 w-6" />
                          ) : (
                            <Play className="h-6 w-6 ml-0.5" />
                          )}
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs px-2"
                          onClick={seekForward1}
                        >
                          +10s
                        </Button>
                      </div>
                      
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          className="border-love-300 hover:border-love-500 hover:text-love-500"
                          onClick={() => shareSong(1)}
                          size="sm"
                        >
                          <Share2 className="h-4 w-4 mr-2" /> Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Version 2 Player */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mb-8"
            >
              <h3 className="text-xl font-semibold mb-4 text-center">Version 2</h3>
              <Card className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden bg-love-900/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-200/40 to-love-200/40 dark:from-purple-900/40 dark:to-love-900/40"></div>
                  
                  {/* Cover Image (if uploaded) */}
                  {coverImage && (
                    <div className="absolute inset-0 opacity-30">
                      <img 
                        src={coverImage} 
                        alt="Song cover" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Visualizer Canvas */}
                  <canvas 
                    ref={canvasRef2} 
                    className="absolute inset-0 w-full h-full"
                    width={1000}
                    height={400}
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-1 text-white shadow-sm">
                        {formData?.title || "Your Love Song"} - V2
                      </h3>
                      <p className="text-white/80 text-sm">Dedicated with love</p>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  {/* Audio Element (hidden) */}
                  <audio 
                    ref={audioRef2} 
                    onTimeUpdate={handleTimeUpdate2}
                    onLoadedMetadata={handleLoadedMetadata2}
                    onEnded={() => setIsPlaying2(false)}
                    // Use a different sample mp3 for demo version 2
                    src="https://assets.codepen.io/4358584/Anitek_-_Komorebi.mp3" 
                  />
                  
                  {/* Custom Player Controls */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground/70">{formatTime(currentTime2)}</span>
                      <div className="relative flex-1 mx-4">
                        <input
                          type="range"
                          min="0"
                          max={duration2 || 100}
                          value={currentTime2}
                          onChange={handleSeek2}
                          className="w-full h-1.5 bg-love-100 rounded-lg appearance-none cursor-pointer accent-love-500"
                        />
                      </div>
                      <span className="text-sm text-foreground/70">{formatTime(duration2)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-foreground">
                          <Volume2 className="h-5 w-5" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs px-2"
                          onClick={seekBackward2}
                        >
                          -10s
                        </Button>
                        
                        <Button 
                          onClick={togglePlay2} 
                          size="icon" 
                          className="h-12 w-12 rounded-full bg-love-500 hover:bg-love-600 text-white"
                        >
                          {isPlaying2 ? (
                            <Pause className="h-6 w-6" />
                          ) : (
                            <Play className="h-6 w-6 ml-0.5" />
                          )}
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs px-2"
                          onClick={seekForward2}
                        >
                          +10s
                        </Button>
                      </div>
                      
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          className="border-love-300 hover:border-love-500 hover:text-love-500"
                          onClick={() => shareSong(2)}
                          size="sm"
                        >
                          <Share2 className="h-4 w-4 mr-2" /> Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}

        {/* Action Buttons */}
        {generationStep === "complete" && (
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="love-button">
              <Download className="mr-2 h-4 w-4" /> Download Both Versions
            </Button>
            <Button 
              variant="outline" 
              className="border-love-300 hover:border-love-500 hover:text-love-500"
              asChild
            >
              <Link to="/dashboard">
                Back to Dashboard
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongGenerator;
