export type Model = {
  id: number;
  name: string;
  segment: string;
  year: number;
  price: number;
  thumbnail: string;
  photo: string;
};

export type ModelFeature = {
  name: string;
  description: string;
  photo?: string | null;
};

export type ModelHighlight = {
  title: string;
  content: string;
  image: string;
};

export type ModelDetail = Model & {
  model_features: ModelFeature[];
  model_highlights: ModelHighlight[];
};