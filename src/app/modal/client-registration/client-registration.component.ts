import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientModel } from 'src/app/model/clientModel';
import { PagamentoStatus } from 'src/app/model/PagamentoStatus';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.sass']
})
export class ClientRegistrationComponent implements OnInit {
  client: ClientModel = new ClientModel();
  payStatus: PagamentoStatus = PagamentoStatus.PENDENTE;

  registrationForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    payStatus: new FormControl(''),
    retrievalDate: new FormControl('')
  })

  constructor(public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }) { }
  ngOnInit(): void {
    this.client.id = this.data.id;
    this.client.pagamentoStatus = PagamentoStatus.PENDENTE;
  }

  submit() {
    this.client.nome = this.registrationForm.controls['userName'].value;
    this.client.horarioRetirada = this.registrationForm.controls['retrievalDate'].value;
  }

  getErrorMessage() {
    if (this.registrationForm.controls['name'].hasError('required')) {
      return 'Campo Obrigatório';
    }
    return null;
  }

}
