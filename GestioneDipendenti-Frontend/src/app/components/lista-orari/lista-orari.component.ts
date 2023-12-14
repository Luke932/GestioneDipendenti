import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UtentiService } from "src/app/services/utenti.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-lista-orari",
  templateUrl: "./lista-orari.component.html",
  styleUrls: ["./lista-orari.component.css"],
})
export class ListaOrariComponent implements OnInit {
  userId: any;
  utente: any;
  dataOrario: any = [];
  modifyForm: FormGroup;
  idOraDaModificare: any;
  isModifyFormOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private utentiSrv: UtentiService,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe((params) => {
      this.userId = +params["userId"];
    });
    this.modifyForm = this.fb.group({
      dataIngresso: [""],
      dataUscita: [""],
    });
  }

  ngOnInit(): void {
    this.getUtenteSelezionato();
  }

  getUtenteSelezionato() {
    this.utentiSrv.getUtenteByIdAdmin(this.userId).subscribe(
      (response) => {
        this.utente = response;
        console.log(this.utente);

        this.dataOrario = this.utente.orari.map((orario: any) => {
          return {
            id: orario.idOrari,
            data: orario.dataIngresso.substring(0, 10),
            ingresso: orario.dataIngresso.substring(11, 19),
            uscita: orario.dataUscita.substring(11, 19),
          };
        });

        console.log(this.dataOrario);
      },
      (error) => {
        console.log("Errore durante il recupero dei dati", error);
      }
    );
  }

  deleteAll() {
    this.utentiSrv.deleteDate(this.userId).subscribe(
      (response) => {
        console.log("Storico eliminato correttamente", response);
        this.getUtenteSelezionato();
      },
      (error) => {
        console.log("Errore nell'eliminazione dello storico", error);
      }
    );
  }

  openModifyForm(orario: any) {
    this.modifyForm.setValue({
      dataIngresso: orario.data,
      dataUscita: orario.uscita,
    });
    this.isModifyFormOpen = true;
    this.idOraDaModificare = orario.id;
    console.log(this.idOraDaModificare);
  }

  onSubmit() {
    console.log(this.idOraDaModificare);

    const formData = this.modifyForm.value;
    formData.dataIngresso += ':00';
    formData.dataUscita += ':00';
    this.utentiSrv
      .modificaOrarioSelezionato(this.userId, this.idOraDaModificare, formData)
      .subscribe(
        (response) => {
          console.log("Orario modificato con successo", response);

          // Aggiorna solo l'elemento dell'array relativo all'orario modificato
          const index = this.dataOrario.findIndex(
            (orario: { id: any; }) => orario.id === this.idOraDaModificare
          );
          if (index !== -1) {
            this.dataOrario[index] = {
              id: this.idOraDaModificare,
              data: formData.dataIngresso.substring(0, 10),
              ingresso: formData.dataIngresso.substring(11, 19),
              uscita: formData.dataUscita.substring(11, 19),
            };
          }

          this.isModifyFormOpen = false;
        },
        (error) => {
          console.error("Errore durante la modifica dell'orario", error);
        }
      );
  }
}
