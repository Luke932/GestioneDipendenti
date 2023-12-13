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
    this.getUtenteById();
  }

  clickEntrata() {
    console.log(this.id);

    this.isIngEnabled = false;
    this.isExitEnabled = true;
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
        this.utente = response;
        console.log(this.utente);
        console.log(this.utente.orari[0].dataIngresso);
        this.dataOrario = this.utente.orari;
        console.log(this.dataOrario);
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

        console.log(response);
        this.utente = response;
      },
      (error) => {
        console.error("Utente non trovato", error);
      }
    );
  }
}
