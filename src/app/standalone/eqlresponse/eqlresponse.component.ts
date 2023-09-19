import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FieldCommandResponse } from 'src/app/model/field-command';

@Component({
  selector: 'app-eqlresponse',
  standalone: true,
  templateUrl: './eqlresponse.component.html',
  imports: [CommonModule, TableModule],
  styleUrls: ['./eqlresponse.component.scss'],
})
export class EQLResponseComponent {
  _fieldCmdResp: FieldCommandResponse | undefined;

  cols: any[] = [];
  elements: any[] = [];
  simpleResponse: string | undefined;
  ci: any | undefined;

  @Input()
  set fieldCmdResp(fieldCmdResp: FieldCommandResponse) {
    this._fieldCmdResp = fieldCmdResp;
    if (fieldCmdResp.values['result'] != null) {
      const result = fieldCmdResp.values['result'];
      if (Array.isArray(result)) {
        (result[0].values as Array<any>).forEach((entry) => {
          this.cols.push({ header: entry.key });
        });
        result.forEach((rowEntry) => {
          const row: any = {};
          (rowEntry.values as Array<any>).forEach((entry) => {
            row[entry.key] = entry.value;
          });
          this.elements.push(row);
        });
      } else if (typeof result === 'object' && 'id' in result) {
        // CI response
        this.simpleResponse = JSON.stringify(result, null, 2);
      } else {
        this.simpleResponse = result;
      }
    }
  }
}
