import { QuizInfo } from './../quiz-info/quiz-info.model';
import { Quiz } from './../quiz/quiz.model';
import { QuizService } from './../quiz/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css'],
})
export class QuizResultComponent implements OnInit {
  public quiz: Quiz | undefined;

  constructor(private url: ActivatedRoute, private service: QuizService) {}

  ngOnInit(): void {
    this.url.params.subscribe((params) => {
      const quizId = params['id'];
      this.service.getQuiz(quizId).subscribe((quiz) => {
        this.quiz = quiz;
      });
    });
  }

  isIncorrectly(quizinfo: QuizInfo, answer: string): boolean {
    return quizinfo?.answer != null && quizinfo?.answer !== answer && quizinfo?.question?.ans === answer;
  }

  isCorrectly(quizinfo: QuizInfo, answer: string): boolean {
    return quizinfo?.answer === answer && quizinfo?.question?.ans === answer;
  }

  getPoint(quizinfo: QuizInfo): number {
    return quizinfo?.answer === quizinfo?.question?.ans ? 1 : 0;
  }
}
