import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { UtilService } from 'src/app/services/util.service';
import { FloatLabelModule } from 'primeng/floatlabel';


@Component({
  selector: 'app-promo-simulator',
  standalone: true,
  providers: [ConfirmationService],
  imports: [
    AutoCompleteModule,
    ButtonModule,
    CommonModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    InputNumberModule,
    TableModule,
    ToolbarModule,
    CalendarModule,
    FloatLabelModule
  ],
  templateUrl: './promo-simulator.component.html',
  styleUrl: './promo-simulator.component.scss',
})
export class PromoSimulatorComponent {
  items: Item[] = [];
  editDialog = false;

  selectedItems: Item[] = [];

  item: Item = this.emptyItem();
  autoCompleteValue: Product | undefined;
  autoCompleteSuggestions: Product[] = [];

  calcResponse: CalcResponse | undefined;
  showPromotionModal =  false;
  displayPromotion: Promotion | undefined;

  date: Date | undefined

  constructor(private http: HttpClient, 
    private confirmationService: ConfirmationService,
    private utilService: UtilService) { }

  emptyItem(): Item {
    return {
      quantity: undefined,
      product: undefined,
      netPrice: undefined,
      basePrice: undefined,
      netDiscount: undefined,
      crossDiscount: undefined,
      crossPrice: undefined,
      promotions: [],
    };
  }

  add() {
    this.item = this.emptyItem();
    this.autoCompleteValue = undefined;
    this.editDialog = true;
  }

  delete() {
    this.confirmationService.confirm({
      message: 'Esta seguro?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.items = this.items.filter((val) => !this.selectedItems?.includes(val));
        this.selectedItems = [];
      }
    });
  }

  save() {
    this.items.push(this.item);
    this.calculate();
    this.editDialog = false;
  }

  cancel() {
    this.editDialog = false;
  }

  search(term: string | undefined) {
    if (term) {
      const url = `${this.utilService.evalApiUrl()}/ui/modules/promo-simulator/products`;
      this.http.get<any[]>(url, { params: { term: term } }).subscribe({
        next: (products) => {
          this.autoCompleteSuggestions = [];
          products.forEach((product) => {
            this.autoCompleteSuggestions.push({
              oid: product.oid,
              label: `${product.name} - ${product.description}`,
            });
          });
        },
      });
    }
  }

  onSelect(product: Product) {
    this.item.product = product;
  }

  calculate() {
    const url = `${this.utilService.evalApiUrl()}/ui/modules/promo-simulator/calculate`;
    const positions: any[] = [];
    let i = 1;
    this.items.forEach((item) => {
      positions.push({
        index: i,
        quantity: item.quantity,
        productOid: item.product?.oid,
      });
      i++;
    });

    const body = {
      items: positions,
      date: this.date
    };

    this.http.post<any>(url, body).subscribe({
      next: (result) => {
        this.calcResponse = result;
        this.mapResponse();
      },
    });
  }

  mapResponse() {
    if (this.calcResponse) {
      this.calcResponse.positions.forEach((pos, index) => {
        this.items[index].netPrice = pos.netPrice;
        this.items[index].crossPrice = pos.crossPrice;
        
        if (this.calcResponse?.promotionInfo) {
          this.items[index].basePrice =
            this.calcResponse?.promotionInfo.details[index].netBase;
          this.items[index].crossDiscount =
            this.calcResponse?.promotionInfo.details[index].crossDiscount;
          this.items[index].netDiscount =
            this.calcResponse?.promotionInfo.details[index].netDiscount;
          this.items[index].promotions = [];
          this.calcResponse?.promotionInfo.details[index].promotionOids.forEach(
            (oid) => {
              const url = `${this.utilService.evalApiUrl()}/ui/modules/promo-simulator/promotions/${oid}`;
              this.http.get<any>(url).subscribe({
                next: (promotion) => {
                  this.items[index].promotions.push({
                    oid: promotion.oid,
                    name: promotion.name,
                    label: promotion.label,
                    description: promotion.description,
                    priority: promotion.priority,
                    endDateTime: promotion.endDateTime,
                    startDateTime: promotion.startDateTime,
                  });
                },
              });
            }
          );
        }
      });
    }
  }

  showPromotion(promotion: Promotion) {
    this.displayPromotion = promotion;
    this.showPromotionModal = true;
  }
}

export interface Promotion {
  oid: string;
  name: string;
  label: string;
  description: string;
  priority: number;
  endDateTime: string;
  startDateTime: string;
}

export interface Item {
  quantity: number | undefined;
  product: Product | undefined;
  netPrice: number | undefined;
  basePrice: number | undefined;
  netDiscount: number | undefined;
  crossDiscount: number | undefined;
  crossPrice: number | undefined;
  promotions: Promotion[];
}

export interface Product {
  oid: string;
  label: string;
}

export interface PromoDetail {
  netBase: number;
  netDiscount: number;
  crossDiscount: number;
  promotionOids: string[];
}

export interface PromotionInfo {
  netTotalDiscount: number;
  crossTotalDiscount: number;
  details: PromoDetail[];
}

export interface CalcPosition {
  netPrice: number;
  crossPrice: number;
}

export interface CalcResponse {
  netTotal: number;
  crossTotal: number;
  promotionInfo: PromotionInfo;
  positions: CalcPosition[];
}
