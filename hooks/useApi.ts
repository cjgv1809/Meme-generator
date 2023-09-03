import axios from "axios";
import trending from "../assets/trending.json";
import { memes } from "../assets/list";
import { RAPID_API_KEY } from "@env";

const useApi = () => {
  const getTrending = async (): Promise<TrendingMeme[]> => {
    try {
      const response = await axios.get(
        "https://reddit-meme.p.rapidapi.com/memes/trending",
        {
          headers: {
            "X-RapidAPI-Key": RAPID_API_KEY,
            "X-RapidAPI-Host": "reddit-meme.p.rapidapi.com",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }

    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(trending);
    //   }, 1000);
    // });
  };

  const getMemes = async (): Promise<Meme[]> => {
    return new Promise((resolve, reject) => {
      let results: Meme[] = [];

      Object.entries(memes).forEach(([key, value]) => {
        results.push({
          name: key,
          image: value,
        });
      });
      resolve(results);
    });
  };

  const createMeme = async (
    top: string,
    bottom: string,
    meme: string
  ): Promise<any> => {
    return axios.get("https://ronreiter-meme-generator.p.rapidapi.com/meme", {
      params: { top, bottom, meme },
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": "ronreiter-meme-generator.p.rapidapi.com",
      },
      responseType: "blob",
    });

    // return new Promise((resolve, reject) => {
    //   setTimeout(async () => {
    //     const response = await axios.get(
    //       `https://upload.wikimedia.org/wikipedia/commons/b/b4/JPEG_example_JPG_RIP_100.jpg`,
    //       { responseType: "blob" }
    //     );
    //     resolve(response);
    //   }, 1000);
    // });
  };

  return {
    getTrending,
    getMemes,
    createMeme,
  };
};

export default useApi;
