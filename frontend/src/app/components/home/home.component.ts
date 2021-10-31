import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService],
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {}

  doHome() {
    this.homeService.doHome().subscribe((data) => {
      console.log(data);
    });
  }
}
