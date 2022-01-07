import { FormGroup, FormControl } from '@angular/forms';
import { CategoriesService } from './categories.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Category } from './category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef | undefined;
  @ViewChild('openModal') openModal: ElementRef | undefined;

  public categories: Category[] = [];
  public form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
  });

  constructor(private service: CategoriesService) {}

  ngOnInit(): void {
    this.service.getCategories().subscribe((data) => (this.categories = data));
  }

  showDialogInsert() {
    this.form.controls['id'].setValue('');
    this.form.controls['name'].setValue('');
    this.openModal?.nativeElement.click();
  }

  showDialogUpdate(id: string | undefined) {
    this.service.getCategory(id).subscribe((data) => {
      this.form.controls['id'].setValue(data._id);
      this.form.controls['name'].setValue(data.name);
      this.openModal?.nativeElement.click();
    });
  }

  showDialogDelete(id: string | undefined) {
    if (!confirm('Are you sure to delete')) {
      return;
    }

    this.service.delete(id).subscribe((data: any) => {
      this.categories = this.categories.filter((e) => e._id !== data._id);
    });
  }

  onSubmit() {
    if (this.form.controls['id'].value === '') {
      this.service.insert(this.form).subscribe((data: any) => {
        this.categories.push(data);
        this.closeModal?.nativeElement.click();
      });
    } else {
      this.service.update(this.form).subscribe((data: any) => {
        this.categories.forEach((e) => {
          if (e._id === data._id) {
            Object.assign(e, data);
          }
        });
        this.closeModal?.nativeElement.click();
      });
    }
  }
}
