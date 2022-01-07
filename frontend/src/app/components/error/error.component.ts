import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

const Messages = new Map<number, string>([
  [403, 'FORBIDDEN'],
  [404, 'Sorry, an error has occured, Requested page not found!'],
]);

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  public statusCodes: number = 0;
  public message: string | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.statusCodes = this.route.snapshot.data['statusCodes'];
    this.message = Messages.get(this.statusCodes);
  }
}
