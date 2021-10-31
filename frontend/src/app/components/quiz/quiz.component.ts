import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  public fLogin: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {}
}
