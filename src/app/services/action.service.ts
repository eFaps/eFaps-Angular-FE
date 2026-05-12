import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
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

    const selectedOids = this.toOids(selectedElements)
    if (item.action.modal && this.validate(item, selectedOids)) {
      return new Observable((subscriber) => {
        this.contentService.getContentWithCmd('none', item.id, selectedOids).subscribe({
          next: (outline) => {
            if (isOutline(outline)) {
                const dialogRef = this.dialogService.open(
                  ModalContentComponent,
                  {
                    data: {
                      item,
                      outline,
                      parentOid: parentOid,
                      eFapsSelectedOids: selectedOids
                    },
                  },
                )
                dialogRef?.onClose.subscribe({
                  next: (execResponse) => subscriber.next(execResponse),
                })
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

  private toOids(selectedElements?: any[]): string[] | undefined {
    if (selectedElements) {
      const oids: string[] = [];
      selectedElements.forEach((element) => {
        if (element.data?.OID) {
          let oid = element.data?.OID as string;
          oids.push(oid);
        } else if (element.OID) {
          oids.push(element.OID);
        }
      });
      return oids
    } else {
      return undefined
    }
  }


  private validate(
    item: MenuEntry,
    selectedOids: string[] | undefined,
  ): boolean {
    var ret = true;
    if (item != null) {
      if (
        item.action.verify &&
        typeof item.action.verify.selectedRows != 'undefined'
      ) {
        if (selectedOids) {
          // if smaller than 1 just check that something is selected
          if (
            (item.action.verify.selectedRows < 1 && selectedOids.length > 0) ||
            (item.action.verify.selectedRows > 0 &&
              item.action.verify.selectedRows == selectedOids.length)
          ) {
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
