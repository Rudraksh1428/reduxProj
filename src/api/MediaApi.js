import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const PIXABAY_KEY = import.meta.env.VITE_PIXABAY_KEY;
const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY;

export async function fetchPhotos(query, page = 1, per_page = 20) {
  const res = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      query,
      page,
      per_page,
    },
    headers: {
      Authorization: `Client-ID ${UNSPLASH_KEY}`,
    },
  });

  return res.data;
}

export async function fetchVideos(query, per_page = 15) {
  const res = await axios.get("https://pixabay.com/api/videos/", {
    params: {
      key: PIXABAY_KEY,
      q: query,
      per_page,
     
    },
  });
  return res.data;
}

export async function fetchGIF(query, limit = 20) {
  const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: {
      api_key: GIPHY_KEY,
      q: query,
      limit,
    },
  });

  return res.data;
}