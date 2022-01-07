import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from './../categories/categories.service';
import { Category } from './../categories/category.model';
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

  public categoryId: string = '';
  public categoryName: string = '';
  public categories: Category[] = [];
  public questions: Question[] = [];
  public form: FormGroup = new FormGroup({
    id: new FormControl(),
    categoryId: new FormControl(),
    categoryName: new FormControl(),
    question: new FormControl(),
    ans: new FormControl(),
    ans1: new FormControl(),
    ans2: new FormControl(),
    ans3: new FormControl(),
    ans4: new FormControl(),
    duration: new FormControl(),
    explanation: new FormControl(),
  });

  constructor(
    private service: QuestionsService,
    private categoryService: CategoriesService,
    private url: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.url.params.subscribe((params) => {
      this.categoryService.getCategories().subscribe((data) => {
        this.categories = data;
        this.categoryId = params['id'];
        const category = this.categories.find((e) => e._id === this.categoryId);
        if (category) {
          this.categoryName = category.name;
        } else {
          this.categoryId = this.categories[0]._id;
          this.categoryName = this.categories[0].name;
        }

        this.form.controls['categoryId'].setValue(this.categoryId);
        this.initQuestions(this.categoryId);
      });
    });
  }

  initQuestions(categoryId: string) {
    this.service
      .getQuestions(categoryId)
      .subscribe((questions) => (this.questions = questions));
  }

  showDialogInsert(): void {
    this.form.controls['id'].setValue('');
    this.form.controls['question'].setValue('');
    this.form.controls['ans'].setValue('A');
    this.form.controls['ans1'].setValue('');
    this.form.controls['ans2'].setValue('');
    this.form.controls['ans3'].setValue('');
    this.form.controls['ans4'].setValue('');
    this.form.controls['duration'].setValue('');
    this.form.controls['explanation'].setValue('');
    this.openModal?.nativeElement.click();
  }

  showDialogUpdate(id: string): void {
    this.service.getQuestion(id).subscribe((question) => {
      this.form.controls['id'].setValue(question._id);
      this.form.controls['question'].setValue(question.question);
      this.form.controls['ans'].setValue(question.ans);
      this.form.controls['ans1'].setValue(question.ans1);
      this.form.controls['ans2'].setValue(question.ans2);
      this.form.controls['ans3'].setValue(question.ans3);
      this.form.controls['ans4'].setValue(question.ans4);
      this.form.controls['duration'].setValue(question.duration);
      this.form.controls['explanation'].setValue(question.explanation);
      this.openModal?.nativeElement.click();
    });
  }

  showDialogDelete(id: string | undefined) {
    if (!confirm('Are you sure to delete')) {
      return;
    }

    this.service.delete(id).subscribe((question: any) => {
      this.questions = this.questions.filter((e) => e._id !== question._id);
    });
  }

  onSubmit(): void {
    if (this.form.controls['id'].value === '') {
      this.service.insert(this.form).subscribe((question: any) => {
        this.questions.push(question);
        this.closeModal?.nativeElement.click();
      });
    } else {
      this.service.update(this.form).subscribe((question: any) => {
        this.questions.forEach((q) => {
          if (q._id === question._id) {
            Object.assign(q, question);
            return;
          }
        });
        this.closeModal?.nativeElement.click();
      });
    }
  }

  onPicked(input: HTMLInputElement) {
    const file = input.files?.[0];
    if (file) {
      input.value = '';
      this.service.upload(file).subscribe(() => {
        this.initQuestions(this.categoryId);
      });
    }
  }

  onChangeCategory(categoryId: string) {
    this.router.navigate(['questions/' + categoryId]);
  }
}
