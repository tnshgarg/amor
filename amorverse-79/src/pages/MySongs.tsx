
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, Download, FileText, Plus, Heart } from "lucide-react";

const MySongs = () => {
  // Sample data - in a real app, this would come from an API
  const songs = [
    {
      id: 1,
      title: "Our First Date",
      status: "completed",
      date: "October 15, 2023",
      thumbnail: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 2,
      title: "Anniversary Love",
      status: "completed",
      date: "November 15, 2023",
      thumbnail: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    }
  ];

  return (
    <div className="pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">My Songs</h1>
          <p className="text-foreground/70">All your personalized love songs in one place.</p>
        </motion.div>

        {/* Song Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {songs.map((song) => (
              <Card key={song.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={song.thumbnail} 
                    alt={song.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link to={`/song/${song.id}`}>
                      <PlayCircle className="h-12 w-12 text-white opacity-80 hover:opacity-100 transition-opacity" />
                    </Link>
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
                  <Button size="sm" className="flex-1 bg-love-500 hover:bg-love-600 text-white" asChild>
                    <Link to={`/song/${song.id}`}>
                      <Heart className="mr-1 h-4 w-4" /> Listen
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
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
        </motion.div>
      </div>
    </div>
  );
};

export default MySongs;
