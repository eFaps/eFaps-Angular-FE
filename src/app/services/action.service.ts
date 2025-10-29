import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

import { ModalContentComponent } from '../content/modal-content/modal-content.component';
import { ModalModuleContentComponent } from '../content/modal-module-content/modal-module-content.component';
import { isOutline } from '../model/content';
import { MenuEntry } from '../model/menu';
import { ContentService } from './content.service';

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  private readonly contentService = inject(ContentService);
  private readonly dialogService = inject(DialogService);
  private readonly messageService = inject(MessageService);

  runFormAction(
    item: MenuEntry,
    parentOid?: string,
    selectedElements?: any[],
  ): Observable<any> {
    if (item.action.modal) {
      return new Observable((subscriber) => {
        this.contentService.getContentWithCmd('none', item.id).subscribe({
          next: (outline) => {
            if (isOutline(outline)) {
              let eFapsSelectedOids: string[] | undefined;
              if (selectedElements != null) {
                eFapsSelectedOids = [];
                selectedElements.forEach((element) => {
                  if (element.data?.OID) {
                    let oid = element.data?.OID as string;
                    eFapsSelectedOids!!.push(oid);
                  }
                });
              }
              if (this.validate(item, eFapsSelectedOids)) {
                const dialogRef = this.dialogService.open(
                  ModalContentComponent,
                  {
                    data: {
                      item,
                      outline,
                      eFapsSelectedOids,
                      parentOid: parentOid,
                    },
                  },
                );
                dialogRef?.onClose.subscribe({
                  next: (execResponse) => subscriber.next(execResponse),
                });
              } else {
                subscriber.next(undefined);
              }
            } else {
              const dialogRef = this.dialogService.open(
                ModalModuleContentComponent,
                {
                  data: {
                    item,
                    uimodule: outline,
                    parentOid: parentOid,
                  },
                },
              );
              dialogRef?.onClose.subscribe({
                next: (execResponse) => subscriber.next(execResponse),
              });
            }
          },
        });
      });
    }
    return new Observable((subscriber) => {
      subscriber.next(undefined);
    });
  }

  private validate(
    item: MenuEntry,
    selectedOids: string[] | undefined,
  ): boolean {
    var ret = true;
    if (item != null) {
      if (item.action.verify && typeof item.action.verify.selectedRows != 'undefined') {
        if (selectedOids) {
          // if 0 just check that something is selected
          if (item.action.verify.selectedRows == 0 && selectedOids.length > 0
            || item.action.verify.selectedRows > 0 && item.action.verify.selectedRows == selectedOids.length) {
          } else {
            ret = false;
          }
        } else {
          ret = false;
        }
        if (!ret) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Advertencia',
            detail: item.action.verify.question,
          });
        }
      }
    }
    return ret;
  }
}
