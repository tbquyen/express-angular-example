import { QuizInfo } from './../quiz-info/quiz-info.model';
export interface Quiz {
  readonly _id: string;
  userid: string;
  categoryId: string;
  categoryName: string;
  numberQuestion: number;
  passed: number;
  timeStart: string;
  timeEnd: string;
  isFinish: boolean;
  quizInfo: QuizInfo[];
}
