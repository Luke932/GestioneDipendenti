import { Component } from '@angular/core';

@Component({
  selector: 'app-homeutente',
  templateUrl: './homeutente.component.html',
  styleUrls: ['./homeutente.component.css']
})
export class HomeutenteComponent {
  isIngEnabled = true;
  isExitEnabled = false;

  toggleButtons() {
    this.isIngEnabled = !this.isIngEnabled;
    this.isExitEnabled = !this.isExitEnabled;
  }
}
