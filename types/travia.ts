export interface Travia {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface TraviaApiResponse {
  response_code: number;
  results: Travia[];
}

export interface TaiviaFormParams {
  amount?: number;
  category?: number;
  difficulty?: string;
  type?: string;
}

export interface User {
  name: string;
  point: number;
  imageUrl: string;
  userId: string;
}
