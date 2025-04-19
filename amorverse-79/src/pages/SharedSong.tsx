
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, Volume2, VolumeX, Music, Download, ChevronDown, ChevronUp } from 'lucide-react';

interface SongData {
  id?: string;
  title: string;
  audioUrl: string;
  audioUrl2?: string;
  lyrics?: string;
  imageUrl?: string;
}

const SharedSong = () => {
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [songData, setSongData] = useState<SongData | null>(null);
  const [currentTime1, setCurrentTime1] = useState(0);
  const [currentTime2, setCurrentTime2] = useState(0);
  const [duration1, setDuration1] = useState(0);
  const [duration2, setDuration2] = useState(0);
  const [isLyricsExpanded, setIsLyricsExpanded] = useState(false);
  
  const location = useLocation();
  const params = useParams();
  const audioRef1 = useRef<HTMLAudioElement | null>(null);
  const audioRef2 = useRef<HTMLAudioElement | null>(null);
  const canvasRef1 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef2 = useRef<HTMLCanvasElement | null>(null);
  const animationRef1 = useRef<number | null>(null);
  const animationRef2 = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef1 = useRef<MediaElementAudioSourceNode | null>(null);
  const audioSourceRef2 = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    // In a real app, you would fetch the song data using an ID from the URL
    const songId = new URLSearchParams(location.search).get('id') || params.songId;
    
    // Mock fetching song data
    setSongData({
      id: songId,
      title: "Our Love Story",
      audioUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/shoptalk-clip.mp3",
      audioUrl2: "https://assets.codepen.io/4358584/Anitek_-_Komorebi.mp3",
      lyrics: "First verse:\nThe coffee shop where we first met\nYour nervous smile I can't forget\nThe rain outside made such sweet sound\nAs if the world had slowed right down\n\nChorus:\nAnd now I know, this was meant to be\nYou and I together, endlessly\nOur first date became our favorite memory\nThe start of our love story\n\nSecond verse:\nYou talked about your dreams so bright\nI listened well into the night\nTwo strangers quickly becoming more\nA connection worth fighting for\n\n[Repeat Chorus]\n\nBridge:\nLooking back now I understand\nSome things are perfectly planned\nThe universe conspired that day\nTo bring you right my way\n\n[Final Chorus]",
      imageUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    });
  }, [location, params]);

  // Audio visualizer setup
  useEffect(() => {
    if (songData) {
      if (audioRef1.current && canvasRef1.current) {
        setupVisualizer(audioRef1.current, canvasRef1.current, audioSourceRef1, animationRef1, isPlaying1);
      }

      if (audioRef2.current && canvasRef2.current) {
        setupVisualizer(audioRef2.current, canvasRef2.current, audioSourceRef2, animationRef2, isPlaying2);
      }
    }
    
    return () => {
      if (animationRef1.current) {
        cancelAnimationFrame(animationRef1.current);
        animationRef1.current = null;
      }
      
      if (animationRef2.current) {
        cancelAnimationFrame(animationRef2.current);
        animationRef2.current = null;
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
  }, [songData, isPlaying1, isPlaying2]);
  
  const setupVisualizer = (
    audioElement: HTMLAudioElement, 
    canvasElement: HTMLCanvasElement,
    sourceRef: React.MutableRefObject<MediaElementAudioSourceNode | null>,
    animRef: React.MutableRefObject<number | null>,
    isPlaying: boolean
  ) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
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
            
            const hue = i / bufferLength * 360;
            canvasCtx.fillStyle = isPlaying 
              ? `hsla(${hue}, 80%, 60%, 0.8)` 
              : `hsla(${hue}, 20%, 60%, 0.3)`;
            
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
  
  // Audio player controls for version 1
  const togglePlay1 = () => {
    if (audioRef1.current) {
      if (isPlaying1) {
        audioRef1.current.pause();
      } else {
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

  const handleVolumeChange = (newValue: number[]) => {
    const newVolume = newValue[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    
    if (audioRef1.current) {
      audioRef1.current.volume = newVolume / 100;
    }
    
    if (audioRef2.current) {
      audioRef2.current.volume = newVolume / 100;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    if (audioRef1.current) {
      audioRef1.current.volume = !isMuted ? 0 : volume / 100;
    }
    
    if (audioRef2.current) {
      audioRef2.current.volume = !isMuted ? 0 : volume / 100;
    }
  };

  const downloadSong = (version: number) => {
    if (!songData) return;
    
    const audioUrl = version === 1 ? songData.audioUrl : songData.audioUrl2;
    const link = document.createElement('a');
    link.href = audioUrl || '';
    link.download = `${songData.title}_v${version}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!songData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-love-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading song...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-love-100/50 to-purple-100/50 dark:from-love-950/50 dark:to-purple-950/50 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto pt-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-love-400 to-purple-400 text-transparent bg-clip-text">
            {songData.title}
          </h1>
          <p className="text-foreground/70">A special gift for you</p>
        </div>
        
        {/* Song Image */}
        {songData.imageUrl && (
          <div className="mb-10 max-w-md mx-auto">
            <div className="aspect-square relative overflow-hidden rounded-xl border border-love-200 dark:border-love-800 shadow-xl">
              <img 
                src={songData.imageUrl} 
                alt={songData.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        
        {/* Lyrics Section */}
        {songData.lyrics && (
          <Card className="mb-10 border-love-200 dark:border-love-800 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Music className="h-5 w-5 text-love-500 mr-2" />
                  Lyrics
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsLyricsExpanded(!isLyricsExpanded)}
                  className="gap-1 text-foreground/70"
                >
                  {isLyricsExpanded ? 
                    <><ChevronUp size={16} /> Collapse</> : 
                    <><ChevronDown size={16} /> Expand</>
                  }
                </Button>
              </div>
              <div className={`whitespace-pre-line text-foreground/80 bg-love-50 dark:bg-love-900/20 rounded-lg p-4 ${isLyricsExpanded ? '' : 'max-h-40 overflow-hidden relative'}`}>
                {songData.lyrics}
                {!isLyricsExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-love-50 to-transparent dark:from-background dark:to-transparent"></div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Song Players */}
        <div className="mb-10">
          <Tabs defaultValue="version1" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="version1">Version 1</TabsTrigger>
              <TabsTrigger value="version2">Version 2</TabsTrigger>
            </TabsList>
            
            {/* Version 1 Player */}
            <TabsContent value="version1">
              <Card className="overflow-hidden border-love-200 dark:border-love-800">
                <div className="aspect-video relative overflow-hidden bg-love-900/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-love-200/40 to-purple-200/40 dark:from-love-900/40 dark:to-purple-900/40"></div>
                  
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
                        {songData.title} - V1
                      </h3>
                      <p className="text-white/80 text-sm">A special song just for you</p>
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
                    src={songData.audioUrl} 
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
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-foreground/70 hover:text-foreground"
                          onClick={toggleMute}
                        >
                          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </Button>
                        <div className="w-20 mx-2">
                          <Slider 
                            value={[isMuted ? 0 : volume]} 
                            max={100}
                            step={1}
                            onValueChange={handleVolumeChange}
                          />
                        </div>
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
                      
                      <Button 
                        variant="outline" 
                        className="border-love-300 hover:border-love-500 hover:text-love-500"
                        onClick={() => downloadSong(1)}
                        size="sm"
                      >
                        <Download className="h-4 w-4 mr-2" /> Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Version 2 Player */}
            <TabsContent value="version2">
              <Card className="overflow-hidden border-love-200 dark:border-love-800">
                <div className="aspect-video relative overflow-hidden bg-love-900/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-200/40 to-love-200/40 dark:from-purple-900/40 dark:to-love-900/40"></div>
                  
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
                        {songData.title} - V2
                      </h3>
                      <p className="text-white/80 text-sm">A special song just for you</p>
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
                    src={songData.audioUrl2 || songData.audioUrl} 
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
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-foreground/70 hover:text-foreground"
                          onClick={toggleMute}
                        >
                          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </Button>
                        <div className="w-20 mx-2">
                          <Slider 
                            value={[isMuted ? 0 : volume]} 
                            max={100}
                            step={1}
                            onValueChange={handleVolumeChange}
                          />
                        </div>
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
                      
                      <Button 
                        variant="outline" 
                        className="border-love-300 hover:border-love-500 hover:text-love-500"
                        onClick={() => downloadSong(2)}
                        size="sm"
                      >
                        <Download className="h-4 w-4 mr-2" /> Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="text-center text-sm text-foreground/60 py-4">
          <p>This love song was created with AmorAI</p>
        </div>
      </div>
    </div>
  );
};

export default SharedSong;
