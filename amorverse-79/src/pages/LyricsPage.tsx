import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Download, 
  ChevronDown, 
  ChevronUp,
  Share2
} from "lucide-react";
import SongPlayer from "@/components/SongPlayer";
import { toast } from "sonner";
import ImageUpload from "@/components/ImageUpload";

interface Song {
  id: number;
  title: string;
  status: string;
  date: string;
  thumbnail: string;
  lyrics: string;
  audioUrl: string;
  audioUrl2: string;
}

// Mock data - in a real app, this would come from an API
const mockSongs: Song[] = [
  {
    id: 1,
    title: "Our First Date",
    status: "completed",
    date: "October 15, 2023",
    thumbnail: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    lyrics: "First verse:\nThe coffee shop where we first met\nYour nervous smile I can't forget\nThe rain outside made such sweet sound\nAs if the world had slowed right down\n\nChorus:\nAnd now I know, this was meant to be\nYou and I together, endlessly\nOur first date became our favorite memory\nThe start of our love story\n\nSecond verse:\nYou talked about your dreams so bright\nI listened well into the night\nTwo strangers quickly becoming more\nA connection worth fighting for\n\n[Repeat Chorus]\n\nBridge:\nLooking back now I understand\nSome things are perfectly planned\nThe universe conspired that day\nTo bring you right my way\n\n[Final Chorus]",
    audioUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/shoptalk-clip.mp3",
    audioUrl2: "https://assets.codepen.io/4358584/Anitek_-_Komorebi.mp3"
  },
  {
    id: 2,
    title: "Anniversary Love",
    status: "completed",
    date: "November 15, 2023",
    thumbnail: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    lyrics: "First verse:\nAnother year around the sun with you\nEvery moment precious, every memory true\nFrom winter's chill to summer's golden light\nYou've been my constant, holding me tight\n\nChorus:\nAnniversary love, growing stronger each day\nAnniversary love, in every possible way\nWith each passing year, our bond only grows deeper\nAnniversary love, my heart's eternal keeper\n\nSecond verse:\nThrough challenges faced and victories won\nWe've learned that two hearts beat stronger as one\nYour hand in mine as we walk this path\nFinding joy in each moment that lasts\n\n[Repeat Chorus]\n\nBridge:\nThey say true love stands the test of time\nWell darling, look how far we've come\nThrough every season, every change\nOur love remains the same\n\n[Final Chorus]",
    audioUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/shoptalk-clip.mp3",
    audioUrl2: "https://assets.codepen.io/4358584/Anitek_-_Komorebi.mp3"
  }
];

const LyricsPage = () => {
  const { songId } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState<Song | null>(null);
  const [isLyricsExpanded, setIsLyricsExpanded] = useState(false);
  const [coverImage, setCoverImage] = useState<string>("");
  
  useEffect(() => {
    // In a real app, this would be an API call
    const foundSong = mockSongs.find(s => s.id === Number(songId));
    if (foundSong) {
      setSong(foundSong);
      setCoverImage(foundSong.thumbnail);
    } else {
      navigate("/songs");
      toast.error("Song not found");
    }
  }, [songId, navigate]);
  
  const handleBack = () => {
    navigate("/songs");
  };
  
  const handleShare = () => {
    if (!song) return;
    
    // Create a unique ID for the shared song
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Create a shareable URL
    const shareUrl = `${window.location.origin}/shared-song?id=${uniqueId}`;
    
    // Try to use the Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: song.title,
        text: `Check out my love song: ${song.title}`,
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
      toast.success("Share link copied to clipboard!");
    }).catch(() => {
      toast.error("Could not copy link");
    });
  };
  
  const downloadSong = (version: number) => {
    if (!song) return;
    
    const audioUrl = version === 1 ? song.audioUrl : song.audioUrl2;
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `${song.title}_v${version}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloaded version ${version}`);
  };
  
  const handleImageUpload = (imageUrl: string) => {
    setCoverImage(imageUrl);
    
    // In a real app, you would save this to the database
    if (song) {
      setSong({
        ...song,
        thumbnail: imageUrl
      });
    }
  };
  
  if (!song) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16 flex items-center justify-center">
        <p>Loading song...</p>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="container mx-auto px-4 pt-24 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleBack}
          className="gap-2"
        >
          <ArrowLeft size={16} />
          Back to My Songs
        </Button>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
          {/* Song image and title */}
          <div className="w-full md:w-1/3">
            <div className="mb-4">
              <ImageUpload 
                onImageUpload={handleImageUpload} 
                existingImage={coverImage}
              />
            </div>
            <h1 className="text-2xl font-bold mb-1">{song.title}</h1>
            <p className="text-foreground/70 text-sm mb-4">Created on {song.date}</p>
            
            <div className="space-y-2 mb-6">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 w-full border-love-300 hover:border-love-500 hover:text-love-500"
                onClick={handleShare}
              >
                <Share2 size={16} />
                Share Song
              </Button>
            </div>
          </div>
          
          {/* Lyrics section */}
          <Card className="w-full md:w-2/3 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Lyrics</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsLyricsExpanded(!isLyricsExpanded)}
                className="gap-1"
              >
                {isLyricsExpanded ? 
                  <><ChevronUp size={16} /> Collapse</> : 
                  <><ChevronDown size={16} /> Expand</>
                }
              </Button>
            </div>
            <div className={`whitespace-pre-line text-foreground/80 leading-relaxed ${isLyricsExpanded ? '' : 'max-h-60 overflow-hidden relative'}`}>
              {song.lyrics}
              {!isLyricsExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
              )}
            </div>
          </Card>
        </div>
        
        {/* Player section */}
        <div className="mt-10">
          <Tabs defaultValue="version1" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="version1">Version 1</TabsTrigger>
              <TabsTrigger value="version2">Version 2</TabsTrigger>
            </TabsList>
            <TabsContent value="version1">
              <Card className="p-6">
                <SongPlayer song={{...song, audioUrl: song.audioUrl, thumbnail: coverImage || song.thumbnail}} />
                <Button
                  onClick={() => downloadSong(1)}
                  className="w-full mt-4 bg-love-500 hover:bg-love-600 text-white"
                >
                  <Download className="mr-2 h-4 w-4" /> Download Version 1
                </Button>
              </Card>
            </TabsContent>
            <TabsContent value="version2">
              <Card className="p-6">
                <SongPlayer song={{...song, audioUrl: song.audioUrl2, thumbnail: coverImage || song.thumbnail}} />
                <Button
                  onClick={() => downloadSong(2)}
                  className="w-full mt-4 bg-love-500 hover:bg-love-600 text-white"
                >
                  <Download className="mr-2 h-4 w-4" /> Download Version 2
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </motion.div>
  );
};

export default LyricsPage;
