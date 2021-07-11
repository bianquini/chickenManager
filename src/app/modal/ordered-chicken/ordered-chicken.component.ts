import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { ClientModel } from 'src/app/model/ClientModel';

@Component({
  selector: 'app-ordered-chicken',
  templateUrl: './ordered-chicken.component.html',
  styleUrls: ['./ordered-chicken.component.sass']
})
export class OrderedChickenComponent implements OnInit {
  clientes: ClientModel[] = [];
  displayedColumns: string[] = ['id', 'nome', 'pagamentoStatus', 'horarioRetirada'];

  constructor(public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { clientes: ClientModel[] }) { }

  onNoClick(): void {

    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data);
    this.clientes = this.data.clientes;
  }

}
