import { QuizInfo } from './quiz-info.model';
import { FormGroup, FormControl } from '@angular/forms';
import { QuizInfoService } from './quiz-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-quiz-info',
  templateUrl: './quiz-info.component.html',
  styleUrls: ['./quiz-info.component.css'],
  providers: [QuizInfoService],
})
export class QuizInfoComponent implements OnInit {
  @ViewChild('progressbar') progressbar: ElementRef | undefined;

  public quizId: string = "";
  public index: number = 0;
  public isExplanation: boolean | undefined;
  public quizInfo: QuizInfo | undefined;
  public form: FormGroup = new FormGroup({
    id: new FormControl(),
    answer: new FormControl(),
  });
  constructor(private router: Router, private url: ActivatedRoute, private service: QuizInfoService) {}

  ngOnInit(): void {
    this.url.params.subscribe((params) => {
      this.quizId = params['id'];
      this.index = params['index'];

      this.service.getQuizInfo(this.quizId, this.index).subscribe((quizinfo) => {
        if(quizinfo == null) {
          this.router.navigate(["/quiz"]);
          return;
        }
        this.quizInfo = quizinfo;
        this.form.controls['answer'].setValue(quizinfo.answer);

        const progressbar = this.progressbar;
        const timeStart = moment(this.quizInfo.quiz.timeStart);
        const timeEnd = moment(this.quizInfo.quiz.timeEnd);
        const duration = timeEnd.diff(timeStart, 'seconds');
        const coutTime = setInterval(() => {
          const currentDuration = 0 - timeStart.diff(Date.now(), 'seconds');
          const p = (currentDuration * 100 / duration).toFixed(2);
          if(progressbar) progressbar.nativeElement.style.width = p + '%';
          if(progressbar) progressbar.nativeElement.textContent = currentDuration + '/' + duration;
          if(parseFloat(p) >= 100) {
            clearInterval(coutTime);
            this.onFinish();
          }
        }, 1000);
      });
    });
  }

  onSubmit(): void {
    this.form.controls['id'].setValue(this.quizInfo?._id);
    this.service.anser(this.form, false).subscribe((status: number) => {
      if(status === 1){
        if(this.quizInfo?.quiz?.numberQuestion && this.index >= this.quizInfo?.quiz?.numberQuestion) {
          this.index = 0;
        }

        this.index++;
        this.quizInfo = undefined;
        this.router.navigate(["/quiz", this.quizId, this.index]);
      } else {
        this.quizInfo = undefined;
        this.router.navigate(["/quiz"]);
      }
    });
  }

  onFinish(): void {
    this.form.controls['id'].setValue(this.quizInfo?._id);
    this.service.anser(this.form, true).subscribe(() => {
      this.quizInfo = undefined;
      this.router.navigate(["/quiz"]);
    });
  }
}
