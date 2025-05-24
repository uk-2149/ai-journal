type Mood = {
  happy: number;
  sad: number;
  angry: number;
  stressed: number;
};

export interface Journal {
    id: string;
    content: string;
    createdAt: Date;
    mood: Mood;
  }