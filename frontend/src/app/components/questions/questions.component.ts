import { QuestionsService } from './questions.service';
import { Question } from './question.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [QuestionsService],
})
export class QuestionsComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef | undefined;
  @ViewChild('openModal') openModal: ElementRef | undefined;
  public questions: Question[] = [];
  public fQuestion: FormGroup = new FormGroup({
    id: new FormControl(),
    categories: new FormControl(),
    question: new FormControl(),
    ans: new FormControl(),
    ans1: new FormControl(),
    ans2: new FormControl(),
    ans3: new FormControl(),
    ans4: new FormControl(),
    duration: new FormControl(),
    explanation: new FormControl(),
  });
  constructor(private service: QuestionsService) {}

  ngOnInit(): void {
    this.initQuestions();
  }

  initQuestions() {
    this.service
      .getQuestions()
      .subscribe((questions) => (this.questions = questions));
  }

  insertDialog(): void {
    this.fQuestion.controls['id'].setValue('');
    this.fQuestion.controls['categories'].setValue('');
    this.fQuestion.controls['question'].setValue('');
    this.fQuestion.controls['ans'].setValue('A');
    this.fQuestion.controls['ans1'].setValue('');
    this.fQuestion.controls['ans2'].setValue('');
    this.fQuestion.controls['ans3'].setValue('');
    this.fQuestion.controls['ans4'].setValue('');
    this.fQuestion.controls['duration'].setValue('');
    this.fQuestion.controls['explanation'].setValue('');
    this.openModal?.nativeElement.click();
  }

  updateDialog(id: string): void {
    this.service.getQuestion(id).subscribe((question) => {
      this.fQuestion.controls['id'].setValue(question.id);
      this.fQuestion.controls['categories'].setValue(question.categories);
      this.fQuestion.controls['question'].setValue(question.question);
      this.fQuestion.controls['ans'].setValue(question.ans);
      this.fQuestion.controls['ans1'].setValue(question.ans1);
      this.fQuestion.controls['ans2'].setValue(question.ans2);
      this.fQuestion.controls['ans3'].setValue(question.ans3);
      this.fQuestion.controls['ans4'].setValue(question.ans4);
      this.fQuestion.controls['duration'].setValue(question.duration);
      this.fQuestion.controls['explanation'].setValue(question.explanation);
      this.openModal?.nativeElement.click();
    });
  }

  onSubmit(): void {
    if (this.fQuestion.controls['id'].value === '') {
      this.service.insert(this.fQuestion).subscribe((question: any) => {
        this.questions.push(question);
        this.closeModal?.nativeElement.click();
      });
    } else {
      this.service.update(this.fQuestion).subscribe((question: any) => {
        this.questions.forEach((q) => {
          if (q.id === question.id) {
            Object.assign(q, question);
            return;
          }
        });
        this.closeModal?.nativeElement.click();
      });
    }
  }

  deleteQuestion(id: string | undefined) {
    if (!confirm('Are you sure to delete')) {
      return;
    }

    this.service.delete(id).subscribe((question: any) => {
      this.questions = this.questions.filter((e) => e.id !== question.id);
    });
  }

  onPicked(input: HTMLInputElement) {
    const file = input.files?.[0];
    if (file) {
      input.value = '';
      this.service.upload(file).subscribe(() => {
        this.initQuestions();
      });
    }
  }
}
