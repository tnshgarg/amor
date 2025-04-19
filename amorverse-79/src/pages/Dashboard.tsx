
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Heart,
  MusicIcon,
  Check,
  PlayCircle,
  FileText,
  Plus,
  Download,
  Mail,
  Music
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import SongPlayer from "@/components/SongPlayer";

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  // Sample data - in a real app, this would come from an API
  const songs = [
    {
      id: 1,
      title: "Our First Date",
      status: "completed",
      date: "October 15, 2023",
      thumbnail: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      lyrics: "First verse about how we met...\nChorus about our connection...",
      audioUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/shoptalk-clip.mp3",
      audioUrl2: "https://assets.codepen.io/4358584/Anitek_-_Komorebi.mp3"
    },
    {
      id: 2,
      title: "Anniversary Love",
      status: "completed",
      date: "November 15, 2023",
      thumbnail: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      lyrics: "Verse about our journey...\nChorus celebrating love...",
      audioUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/shoptalk-clip.mp3",
      audioUrl2: "https://assets.codepen.io/4358584/Anitek_-_Komorebi.mp3"
    }
  ];

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
  
  const handleContactSupport = () => {
    navigate('/contact');
  };

  const downloadSong = (song: any, version: number) => {
    // In a real implementation, this would trigger the actual download
    const audioUrl = version === 1 ? song.audioUrl : song.audioUrl2;
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `${song.title}_v${version}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.h1 
            className="text-3xl font-bold mb-2"
            variants={fadeInUp}
            custom={0}
          >
            Welcome back, {user?.firstName || "Friend"}
          </motion.h1>
          <motion.p 
            className="text-foreground/70"
            variants={fadeInUp}
            custom={1}
          >
            Manage your love songs and create new melodies for your special moments.
          </motion.p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div variants={fadeInUp} custom={2}>
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold">Create New Song</CardTitle>
                <CardDescription>Start a new love song creation</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="rounded-lg bg-love-50 dark:bg-love-900/20 p-3 flex justify-center">
                  <Heart className="h-8 w-8 text-love-500" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="love-button w-full" asChild>
                  <Link to="/story">
                    <Plus className="mr-2 h-4 w-4" /> New Song
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} custom={3}>
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold">Current Plan</CardTitle>
                <CardDescription>Premium Plan</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">2/3</p>
                    <p className="text-sm text-foreground/70">Songs remaining</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-love-100 dark:bg-love-800/30 flex items-center justify-center">
                    <MusicIcon className="h-6 w-6 text-love-500" />
                  </div>
                </div>
                <p className="text-xs text-love-500 mt-2 text-center">
                  <Music className="inline h-3 w-3 mr-1" /> Each credit gives you 2 versions of a song
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-love-300 hover:border-love-500 hover:text-love-500" asChild>
                  <Link to="/pricing">
                    Upgrade Plan
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} custom={4}>
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold">My Songs</CardTitle>
                <CardDescription>View all your love songs</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="rounded-lg bg-love-50 dark:bg-love-900/20 p-3 flex justify-center">
                  <MusicIcon className="h-8 w-8 text-love-500" />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full border-love-300 hover:border-love-500 hover:text-love-500"
                  asChild
                >
                  <Link to="/songs">
                    View All Songs
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content - Songs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Recent Songs</h2>
          </div>

          {songs.length === 0 ? (
            <div className="text-center py-10">
              <MusicIcon className="mx-auto h-12 w-12 text-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No songs yet</h3>
              <p className="text-foreground/70 mb-6">Create your first love song to get started.</p>
              <Button className="love-button" asChild>
                <Link to="/story">Create Your First Song</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {songs.map((song) => (
                <Dialog key={song.id}>
                  <DialogTrigger asChild>
                    <Card className="overflow-hidden cursor-pointer transition-all hover:shadow-md">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={song.thumbnail} 
                          alt={song.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <PlayCircle className="h-12 w-12 text-white opacity-80 hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="absolute top-2 right-2">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            <Check className="mr-1 h-3 w-3" /> Complete
                          </span>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>{song.title}</CardTitle>
                        <CardDescription>Created on {song.date}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <Button size="sm" variant="outline" className="flex-1 mr-2" asChild>
                          <Link to={`/song/${song.id}`}>
                            <FileText className="mr-1 h-4 w-4" /> Lyrics
                          </Link>
                        </Button>
                        <Button size="sm" className="flex-1 bg-love-500 hover:bg-love-600 text-white">
                          <Download className="mr-1 h-4 w-4" /> Download
                        </Button>
                      </CardFooter>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <ScrollArea className="max-h-[80vh]">
                      <div className="space-y-6 p-2">
                        <h2 className="text-2xl font-bold text-center">{song.title}</h2>
                        <p className="text-sm text-center text-foreground/70">Created on {song.date}</p>
                        
                        <div className="bg-love-50 dark:bg-love-900/20 rounded-lg p-4 mb-4">
                          <h3 className="font-medium mb-2 flex items-center">
                            <Music className="h-4 w-4 mr-2 text-love-500" />
                            Lyrics
                          </h3>
                          <div className="whitespace-pre-line text-foreground/80">
                            {song.lyrics}
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Version 1</h3>
                            <SongPlayer 
                              song={song} 
                              version={1}
                              onDownload={(version) => downloadSong(song, version)}
                            />
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Version 2</h3>
                            <SongPlayer 
                              song={{...song, audioUrl: song.audioUrl2}} 
                              version={2}
                              onDownload={(version) => downloadSong(song, version)}
                            />
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              ))}

              {/* Create New Card */}
              <Card className="flex flex-col items-center justify-center border-dashed border-2 bg-transparent h-full min-h-[300px]">
                <CardContent className="flex flex-col items-center p-6">
                  <div className="w-16 h-16 rounded-full bg-love-100 dark:bg-love-900/20 flex items-center justify-center mb-4">
                    <Plus className="h-8 w-8 text-love-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Create New Song</h3>
                  <p className="text-foreground/70 text-center mb-6">
                    Turn another love story into a beautiful melody
                  </p>
                  <Button className="love-button" asChild>
                    <Link to="/story">Create Song</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
