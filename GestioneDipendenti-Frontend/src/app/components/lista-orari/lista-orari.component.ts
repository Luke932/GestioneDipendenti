import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtentiService } from 'src/app/services/utenti.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-lista-orari',
  templateUrl: './lista-orari.component.html',
  styleUrls: ['./lista-orari.component.css']
})
export class ListaOrariComponent implements OnInit {
userId: any;
utente: any;
dataOrario: any;
  data: any;
  orarioIngresso: any = [];
  orarioUscita: any = [];
  array: any = [];
  modifyForm!: FormGroup;

  constructor(private route: ActivatedRoute, private utentiSrv: UtentiService, private fb: FormBuilder){
    this.route.params.subscribe(params => {
      this.userId = +params['userId'];
    });
    this.modifyForm = this.fb.group({
      dataIngresso: [''],
      dataUscita: ['']
    });
  }

  ngOnInit(): void {
this.getUtenteSelezionato();
  }

  getUtenteSelezionato(){
    this.utentiSrv.getUtenteByIdAdmin(this.userId).subscribe(
      response => {
        this.utente = response;
        console.log(this.utente);
        //console.log(this.utente.orari[0].dataIngresso);
        this.dataOrario = this.utente.orari;
        console.log(this.dataOrario);

        console.log(this.utente.orari.length + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        
        for (let i = 0; i < this.utente.orari.length; i++) {
          const orarioCorrente = this.utente.orari[i];

          this.data = orarioCorrente.dataIngresso.substring(0, 10);
          console.log(this.data);

          this.orarioIngresso = orarioCorrente.dataIngresso.substring(11, 19);
          console.log(this.orarioIngresso);

          this.orarioUscita = orarioCorrente.dataUscita.substring(11, 19);
          console.log(this.orarioUscita);
            this.dataOrario =
            {
              data: this.data,
              ingresso: this.orarioIngresso,
              uscita: this.orarioUscita
            };
          this.array.push(this.dataOrario);
          console.log(this.array);

        }

        if (this.utente.orari.length == 0) {
          this.array = [];
        }
      },
      error => {
        console.log("Errore durante il recupero dei tati", error);
      }
    )
  }

  deleteAll(){
    this.utentiSrv.deleteDate(this.userId).subscribe(
      response => {
        console.log("Storico eliminato correttamente", response);
        this.getUtenteSelezionato();
      },
      error => {
        console.log("Errore nell'eliminazione dello storico", error);

      }
    )
  }
}
