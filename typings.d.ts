interface TrendingMeme {
  title: string;
  url: string;
  created_utc: number;
}

interface Meme {
  name: string;
  image: ImageSourcePropType;
}

declare module "@env" {
  export const RAPID_API_KEY: string;
}
