import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@openng/optimus-ui/button';
import { FloatLabelModule } from '@openng/optimus-ui/floatlabel';
import { InputNumberModule } from '@openng/optimus-ui/inputnumber';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { TableModule } from '@openng/optimus-ui/table';
import { ToggleButtonModule } from '@openng/optimus-ui/togglebutton';
import { UtilService } from 'src/app/services/util.service';
interface Entry {
  stmt: string;
  creator: string;
  date: string;
}

@Component({
  selector: 'app-eql2-history',
  imports: [
    FormsModule,
    TableModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    FloatLabelModule,
    ToggleButtonModule,
  ],
  templateUrl: './eql2-history.component.html',
  styleUrl: './eql2-history.component.scss',
})
export class EQL2HistoryComponent {
  private http = inject(HttpClient);
  private utilService = inject(UtilService);

  entries = signal<Entry[]>([]);

  limit = 10;

  term = '';

  own = false;

  load() {
    const url = `${this.utilService.evalApiUrl()}/ui/modules/console-eql2/history`;
    this.http
      .get<
        Entry[]
      >(url, { params: { term: this.term, own: this.own, limit: this.limit } })
      .subscribe({
        next: (resp) => {
          this.entries.set(resp);
        },
      });
  }
}
