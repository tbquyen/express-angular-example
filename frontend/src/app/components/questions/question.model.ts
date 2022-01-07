export interface Question {
  readonly _id: string;
  categoryId: string;
  question: string;
  ans: string;
  ans1: string;
  ans2: string;
  ans3: string;
  ans4: string;
  duration: number;
  explanation: string;
}
