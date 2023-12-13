import { Component, OnInit } from '@angular/core';
import { UtentiService } from 'src/app/services/utenti.service';

@Component({
  selector: 'app-homeutente',
  templateUrl: './homeutente.component.html',
  styleUrls: ['./homeutente.component.css']
})
export class HomeutenteComponent implements OnInit{
  isIngEnabled = true;
  isExitEnabled = false;
  username: any;
  id: any = localStorage.getItem('id');


  public persone: any[] = [
    { data: '10/11/2020', entrata: '10:30', uscita: '18:00' },
    { data: '10/11/2020', entrata: '08:00', uscita: '16:00' },
    { data: '10/11/2020', entrata: '09:00', uscita: '17:00' }
  ];

  constructor(private utentiSrv: UtentiService){}



  ngOnInit(): void {
      this.username = localStorage.getItem('username');
  }

  clickEntrata(){
    console.log(this.id);

    this.isIngEnabled = false;
    this.isExitEnabled = true;
    this.utentiSrv.dataIngresso(this.id).subscribe(
      response => {
        console.log('Data entrata salvata con successo', response);
      },
      error => {
        console.error("Errore durante l'invio della data", error);
      }
    );
  }

  clickUscita(){
    this.isExitEnabled = false;
    this.isIngEnabled = true;
    this.utentiSrv.dataUscita(this.id).subscribe(
      response => {
        console.log('Data uscita salvata con successo', response);
      },
      error => {
        console.error("Errore durante l'invio della data", error);
      }
    );
  }
}
