import { Injectable, ViewContainerRef } from '@angular/core';
import { FieldCommandResponse } from '../model/field-command';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {

  constructor() { }


  load(viewContainerRef: ViewContainerRef, fieldCmdResp: FieldCommandResponse) {
    import('../standalone/eqlresponse/eqlresponse.component').then(m => {
      const ref = viewContainerRef.createComponent(m.EQLResponseComponent);   
      ref.setInput('fieldCmdResp', fieldCmdResp); 
   });
  }
}
