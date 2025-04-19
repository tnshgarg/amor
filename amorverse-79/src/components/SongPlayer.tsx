
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX, Download } from 'lucide-react';

interface Song {
  id: number;
  title: string;
  audioUrl: string;
  thumbnail: string;
}

interface SongPlayerProps {
  song: Song;
  version?: number;
  onDownload?: (version: number) => void;
}

const SongPlayer = ({ song, version = 1, onDownload }: SongPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Fast forward 10 seconds
  const seekForward = () => {
    if (audioRef.current) {
      const newTime = Math.min(audioRef.current.duration, currentTime + 10);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  // Rewind 10 seconds
  const seekBackward = () => {
    if (audioRef.current) {
      const newTime = Math.max(0, currentTime - 10);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Handle download button click
  const handleDownload = () => {
    if (onDownload) {
      onDownload(version);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4 text-center">{song.title}</h3>
      
      <div className="bg-gradient-to-br from-love-100 to-purple-100 dark:from-love-900/40 dark:to-purple-900/40 rounded-lg p-6 mb-4">
        <div className="w-16 h-16 rounded-full bg-white/90 dark:bg-black/80 shadow-lg flex items-center justify-center mx-auto mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-14 w-14 bg-white/90 dark:bg-black/80 hover:bg-white dark:hover:bg-black/90 text-love-500"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
          </Button>
        </div>
        
        {/* Hidden audio element */}
        <audio 
          ref={audioRef} 
          src={song.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
        
        {/* Time display and seek bar */}
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-foreground/70">{formatTime(currentTime)}</span>
          <span className="text-foreground/70">{formatTime(duration)}</span>
        </div>
        
        <div className="mb-6">
          <Slider 
            value={[currentTime]}
            min={0}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="w-full"
          />
        </div>
        
        {/* Skip buttons and volume */}
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            className="text-xs px-2"
            onClick={seekBackward}
          >
            -10s
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="text-xs px-2"
            onClick={seekForward}
          >
            +10s
          </Button>
          
          <div className="flex items-center gap-2 flex-grow max-w-[120px]">
            <Button
              variant="ghost" 
              size="icon"
              className="h-8 w-8 text-love-500"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </Button>
            <Slider 
              value={[isMuted ? 0 : volume]} 
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="flex-1"
            />
          </div>
        </div>
        
        {/* Download button */}
        {onDownload && (
          <Button 
            onClick={handleDownload} 
            className="w-full mt-4 bg-love-500 hover:bg-love-600 text-white"
          >
            <Download className="mr-2 h-4 w-4" /> Download Version {version}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SongPlayer;
