export interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: number;
}

export enum AspectRatio {
  Square = "1:1",
  Portrait = "3:4",
  Landscape = "4:3",
  Wide = "16:9",
  Tall = "9:16"
}

export interface DesignConfig {
  prompt: string;
  aspectRatio: AspectRatio;
}
