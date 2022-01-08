import { CategoriesService } from './../categories/categories.service';
import { QuizService } from './quiz.service';
import { Router } from '@angular/router';
import { Quiz } from './quiz.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Category } from './../categories/category.model';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService, CategoriesService],
})
export class QuizComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef | undefined;
  @ViewChild('openModal') openModal: ElementRef | undefined;

  public categories: Category[] = [];
  public quizs: Quiz[] = [];
  public form: FormGroup = new FormGroup({
    id: new FormControl(),
    categoryId: new FormControl(),
    numberQuestion: new FormControl(),
  });

  constructor(
    private router: Router,
    private service: QuizService,
    private categoryService: CategoriesService
  ) {}

  async ngOnInit(): Promise<void> {
    this.form.controls['numberQuestion'].setValue(5);

    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      if (data.length > 0) {
        this.form.controls['categoryId'].setValue(data[0]._id);
      }

      this.service.getQuizs().subscribe((data) => {
        // maping category name
        data.forEach((quiz) => {
          this.service.formatQuiz(quiz, this.categories);
        });

        this.quizs = data;
      });
    });
  }

  showDialogInsert() {
    this.form.controls['id'].setValue('');
    this.openModal?.nativeElement.click();
  }

  showDialogUpdate(id: string) {
    this.service.getQuiz(id).subscribe((quiz) => {
      this.form.controls['id'].setValue(quiz._id);
      this.form.controls['categoryId'].setValue(quiz.categoryId);
      this.form.controls['numberQuestion'].setValue(quiz.numberQuestion);
      this.openModal?.nativeElement.click();
    });
  }

  showDialogDelete(id: string) {
    this.service.delete(id).subscribe((quiz) => {
      this.quizs = this.quizs.filter((e) => e._id !== quiz._id);
    });
  }

  onSubmit() {
    if (this.form.controls['id'].value === '') {
      this.service.insert(this.form).subscribe((quiz) => {
        this.service.formatQuiz(quiz, this.categories);
        // this.quizs.push(quiz);
        this.quizs.splice(0, 0, quiz);
        this.closeModal?.nativeElement.click();
      });
    } else {
      this.service.update(this.form).subscribe((quiz) => {
        this.quizs.forEach((q) => {
          if (q._id === quiz._id) {
            Object.assign(q, quiz);
            return;
          }
        });
        this.closeModal?.nativeElement.click();
      });
    }
  }
}
