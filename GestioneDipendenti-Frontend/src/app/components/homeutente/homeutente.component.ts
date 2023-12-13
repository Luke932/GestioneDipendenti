import { Component, OnInit } from "@angular/core";
import { UtentiService } from "src/app/services/utenti.service";

@Component({
  selector: "app-homeutente",
  templateUrl: "./homeutente.component.html",
  styleUrls: ["./homeutente.component.css"],
})
export class HomeutenteComponent implements OnInit {
  isIngEnabled = true;
  isExitEnabled = false;
  enterFor = true;
  username: any;
  id: any = localStorage.getItem("id");
  array: any= [];
  dataOrario: any;
  data: any;
  orarioIngresso: any = [];
  orarioUscita: any = [];
  utente: any;



  constructor(private utentiSrv: UtentiService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    console.log(this.enterFor + "!!!!!!!!!!!!!!!!!!!!!");
    
    this.getUtenteById();
    //this.enterFor = false;
  }

  clickEntrata() {
    console.log(this.id);

    this.isIngEnabled = false;
    this.isExitEnabled = true;
    this.enterFor = false;
    this.utentiSrv.dataIngresso(this.id).subscribe(
      (response) => {
        console.log("Data entrata salvata con successo", response);
        this.getUtenteById();
      },
      (error) => {
        console.error("Errore durante l'invio della data", error);
      }
    );
  }

  clickUscita() {
    this.isExitEnabled = false;
    this.isIngEnabled = true;
    this.utentiSrv.dataUscita(this.id).subscribe(
      (response) => {
        console.log("Data uscita salvata con successo", response);
        this.getUtenteById();
      },
      (error) => {
        console.error("Errore durante l'invio della data", error);
      }
    );
  }

  getUtenteById() {
    this.utentiSrv.getUtenteById(this.id).subscribe(
      (response) => {
        this.data = null;
        this.orarioIngresso = null;
        this.orarioUscita = null;

        this.utente = response;
        console.log(this.utente);
        //console.log(this.utente.orari[0].dataIngresso);
        this.dataOrario = this.utente.orari;
        console.log(this.dataOrario);

        console.log(this.enterFor + "!!!!!!!!!!!coooooooosaaaa");
        
        if(this.enterFor == true) {
          console.log("sono entratoooooooo!!!!!!");
          
          for (let i = 0; i < this.utente.orari.length; i++) {
            const orarioCorrente = this.utente.orari[i];
            this.data = orarioCorrente.dataIngresso.substring(0, 10);
            this.orarioIngresso = orarioCorrente.dataIngresso.substring(11, 19);
            this.orarioUscita = orarioCorrente.dataUscita.substring(11, 19);
            this.dataOrario =
            {
              data: this.data,
              ingresso: this.orarioIngresso,
              uscita: this.orarioUscita
            };
            this.array.push(this.dataOrario);
          }
        }

        //for (let i = 0; i < this.utente.orari.length; i++) {
          //const orarioCorrente = this.utente.orari[i];
          const orarioCorrente = this.utente.orari[this.utente.orari.length - 1];

          this.data = orarioCorrente.dataIngresso.substring(0, 10);
          console.log(this.data);

          this.orarioIngresso = orarioCorrente.dataIngresso.substring(11, 19);
          console.log(this.orarioIngresso);

          if (this.isExitEnabled == false) {
            this.orarioUscita = orarioCorrente.dataUscita.substring(11, 19);
          }
          console.log(this.orarioUscita);
          this.dataOrario =
          {
            data: this.data,
            ingresso: this.orarioIngresso,
            uscita: this.orarioUscita
          };
          
          if (this.isIngEnabled == false) {
            this.array.push(this.dataOrario);
          }
          else {
            this.array[this.array.length - 1] = this.dataOrario;
          }
          //this.array.push(this.dataOrario);
          console.log(this.array);

        //}

        //non serve in teoria
        console.log(response);
        this.utente = response;
      },
      (error) => {
        console.error("Utente non trovato", error);
      }
    );
  }
}
