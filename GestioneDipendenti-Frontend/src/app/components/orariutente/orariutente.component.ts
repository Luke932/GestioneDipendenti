import { Component } from '@angular/core';

interface Persona {
  data: string;
  entrata: string;
  uscita: string;
}

@Component({
  selector: 'app-orariutente',
  templateUrl: './orariutente.component.html',
  styleUrls: ['./orariutente.component.css']
})
export class OrariutenteComponent {

  public persone: Persona[] = [
    { data: '10/11/2020', entrata: '10:30', uscita: '18:00' },
    { data: '10/11/2020', entrata: '08:00', uscita: '16:00' },
    { data: '10/11/2020', entrata: '09:00', uscita: '17:00' }
  ];

  
}
