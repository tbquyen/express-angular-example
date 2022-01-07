import { Quiz } from './../quiz/quiz.model';
import { Question } from './../questions/question.model';
import { Category } from './../categories/category.model';
export interface QuizInfo {
  readonly _id: string;
  quizId: string;
  questionId: string;
  answer: string;
  quiz: Quiz;
  category: Category;
  question: Question;
}
