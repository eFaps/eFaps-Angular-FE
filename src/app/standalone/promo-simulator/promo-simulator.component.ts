import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';
import {
  ToggleSwitchChangeEvent,
  ToggleSwitchModule,
} from 'primeng/toggleswitch';
import { ToolbarModule } from 'primeng/toolbar';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-promo-simulator',
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
    DatePickerModule,
    FloatLabelModule,
    ToggleSwitchModule,
    ListboxModule,
  ],
  templateUrl: './promo-simulator.component.html',
  styleUrl: './promo-simulator.component.scss',
})
export class PromoSimulatorComponent implements OnInit {
  items: Item[] = [];
  editDialog = false;

  selectedItems: Item[] = [];

  item: Item = this.emptyItem();
  autoCompleteValue: Product | undefined;
  autoCompleteSuggestions: Product[] = [];

  calcResponse: CalcResponse | undefined;
  showPromotionModal = false;
  displayPromotion: Promotion | undefined;

  date: Date | undefined;
  dateChecked: boolean = false;

  promotions: Promotion[] = [];
  selectedPromotions: string[] | undefined;
  promotionsChecked: boolean = false;

  expandedRows = {};

  constructor(
    private http: HttpClient,
    private confirmationService: ConfirmationService,
    private utilService: UtilService,
  ) {}

  ngOnInit(): void {
    const url = `${this.utilService.evalApiUrl()}/ui/modules/promo-simulator/promotions`;
    this.http.get<any>(url).subscribe({
      next: (promotions) => {
        this.promotions = promotions;
      },
    });
  }

  emptyItem(): Item {
    return {
      index: undefined,
      quantity: undefined,
      product: undefined,
      netPrice: undefined,
      basePrice: undefined,
      netDiscount: undefined,
      crossDiscount: undefined,
      crossPrice: undefined,
      details: [],
    };
  }

  add() {
    this.item = this.emptyItem();
    this.autoCompleteValue = undefined;
    this.editDialog = true;
  }

  isValid(): boolean {
    return this.item.quantity != undefined && this.item.product != undefined;
  }

  delete() {
    this.confirmationService.confirm({
      message: 'Esta seguro?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.items = this.items.filter(
          (val) => !this.selectedItems?.includes(val),
        );
        this.selectedItems = [];
      },
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
              netUnitPrice: product.netUnitPrice,
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
      date: this.date,
      promotionOids: this.selectedPromotions,
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
      this.items.forEach((item, index) => {
        item.index = undefined;
        item.basePrice = undefined;
        item.netPrice = undefined;
        item.netDiscount = undefined;
        item.crossPrice = undefined;
        item.crossDiscount = undefined;
        item.details = [];
      });

      this.calcResponse.positions.forEach((pos, idx) => {
        this.items[idx].index = pos.index;
        this.items[idx].netPrice = pos.netPrice;
        this.items[idx].crossPrice = pos.crossPrice;

        if (this.calcResponse!.promotionInfo) {
          this.items[idx].netDiscount = 0;
          this.items[idx].crossDiscount = 0;
          this.calcResponse!.promotionInfo.details.filter((detail) => {
            return detail.positionIndex == pos.index;
          }).forEach((detail) => {
            this.items[idx].details.push(detail);
            this.items[idx].netDiscount =
              this.items[idx].netDiscount! + detail.netDiscount;
            this.items[idx].crossDiscount =
              this.items[idx].crossDiscount! + detail.crossDiscount;
          });
        }
      });
    }
  }

  getPromotionLabel(promotionOid: string) {
    return this.promotions.find((promo) => promo.oid == promotionOid)?.name;
  }

  showPromotion(promotionOid: string) {
    var promo = this.promotions.find((promo) => promo.oid == promotionOid);
    if (promo) {
      this.displayPromotion = promo;
      this.showPromotionModal = true;
    }
  }

  toggleDate(_event: ToggleSwitchChangeEvent) {
    this.date = undefined;
  }

  togglePromotions(_event: ToggleSwitchChangeEvent) {
    this.selectedPromotions = undefined;
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
  index: number | undefined;
  quantity: number | undefined;
  product: Product | undefined;
  netPrice: number | undefined;
  basePrice: number | undefined;
  netDiscount: number | undefined;
  crossDiscount: number | undefined;
  crossPrice: number | undefined;
  details: PromoDetail[];
}

export interface Product {
  oid: string;
  label: string;
  netUnitPrice: number | undefined;
}

export interface PromoDetail {
  positionIndex: Number;
  netBase: number;
  netDiscount: number;
  crossDiscount: number;
  promotionOid: string;
}

export interface PromotionInfo {
  netTotalDiscount: number;
  crossTotalDiscount: number;
  details: PromoDetail[];
}

export interface CalcPosition {
  index: number;
  netPrice: number;
  crossPrice: number;
}

export interface CalcResponse {
  netTotal: number;
  crossTotal: number;
  promotionInfo: PromotionInfo;
  positions: CalcPosition[];
}
