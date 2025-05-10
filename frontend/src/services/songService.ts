import api from "./api";

export interface SongInput {
  songTitle: string;
  loveStory: string;
}

export interface SongResponse {
  taskId: string;
  callbackId: string;
  lyrics: string;
  status: string;
  creditsLeft: number;
  message: string;
}

export interface SongDetails {
  id: string;
  songTitle: string;
  lyrics: string;
  songUrls: string[];
  status: string;
  createdAt: string;
  completedAt?: string;
  shareId?: string;
  isPublic?: boolean;
}

export const generateSong = async (data: {
  songTitle: string;
  loveStory: string;
}): Promise<SongResponse> => {
  const response = await api.post("/songs/generate", {
    songTitle: data.songTitle,
    loveStory: data.loveStory,
  });
  return response.data;
};

export const getSongStatus = async (taskId: string): Promise<any> => {
  const response = await api.get(`/songs/status/${taskId}`);
  return response.data;
};

export const getCallbackStatus = async (callbackId: string): Promise<any> => {
  const response = await api.get(`/songs/callback-status/${callbackId}`);
  return response.data;
};

export const getUserSongs = async (page = 1, limit = 10): Promise<any> => {
  const response = await api.get(`/songs?page=${page}&limit=${limit}`);
  return response.data;
};

export const getSongById = async (songId: string): Promise<SongDetails> => {
  const response = await api.get(`/songs/${songId}`);
  return response.data;
};

export const shareSong = async (songId: string): Promise<any> => {
  const response = await api.post(`/songs/${songId}/share`);
  return response.data;
};

export const unshareSong = async (songId: string): Promise<any> => {
  const response = await api.delete(`/songs/${songId}/share`);
  return response.data;
};

export const getSharedSong = async (shareId: string): Promise<any> => {
  const response = await api.get(`/songs/${shareId}/share`);
  return response.data;
};
