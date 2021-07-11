import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientRegistrationComponent } from './modal/client-registration/client-registration.component';
import { OrderedChickenComponent } from './modal/ordered-chicken/ordered-chicken.component';
import { ClientModel } from './model/clientModel';
import { PagamentoStatus } from './model/PagamentoStatus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  showSide: boolean = false;
  id: number = 1;
  totalFrangos: number = 0;
  frangosVendidos: number = 0;
  frangosReservados: ClientModel[] = [];
  frangosDisponiveis: number = this.totalFrangos - this.frangosVendidos - this.frangosReservados.length;
  incommingClient: ClientModel = new ClientModel;

  constructor(public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) { }



  openDialog(): void {
    if (this.frangosDisponiveis > 0) {
      const dialogRef = this.dialog.open(ClientRegistrationComponent, {
        width: '300px',
        data: { id: this.id++ }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.frangosReservados.push(result);
          this.changeDetectorRefs.detectChanges();
          this.updateAvailable()
        }
      });
    } else {
      window.alert("Não há mais frangos");
    }
  }

  openOrdersDialog(): void {
    this.dialog.open(OrderedChickenComponent, {
      width: '600px',
      data: { clientes: this.frangosReservados }
    });
  }

  confirmDelivery() {
    const orderId = prompt("Id da reserva");
    const order = this.frangosReservados.find(r => r.id.toString() === orderId);
    var response: boolean = false;

    if (!order) {
      window.alert("Pedido não encontrado")
      return;
    }
    if (order?.pagamentoStatus === PagamentoStatus.PENDENTE) {
      response = window.confirm("Pagamento Pendente");
    }

    if (response) {
      const index = this.frangosReservados.indexOf(order)
      this.frangosReservados.splice(index, 1)
      this.frangosVendidos++;
      window.alert("Pedido finalizado")
    }
  }

  setChicken() {
    const tot = parseInt(prompt("Quantidade de frangos")!);
    this.totalFrangos = tot;
    this.updateAvailable();
  }

  sell() {
    const response = window.confirm("Confirmar Venda?");
    if (response) {
      this.frangosVendidos++;
      this.updateAvailable();
    }
  }

  toggleMenu() {
    this.showSide = !this.showSide;
  }

  private updateAvailable() {
    this.frangosDisponiveis = this.totalFrangos - this.frangosVendidos - this.frangosReservados.length;
  }
}
