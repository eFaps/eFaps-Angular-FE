import { Injectable, ViewContainerRef } from '@angular/core';

import { FieldCommandResponse } from '../model/field-command';
import { ModuleData, UIModule } from '../model/module';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentService {
  constructor() {}

  load(viewContainerRef: ViewContainerRef, fieldCmdResp: FieldCommandResponse) {
    import('../standalone/eqlresponse/eqlresponse.component').then((m) => {
      const ref = viewContainerRef.createComponent(m.EQLResponseComponent);
      ref.setInput('fieldCmdResp', fieldCmdResp);
    });
  }

  loadUIModule(
    viewContainerRef: ViewContainerRef,
    uimodule: UIModule,
    data: ModuleData
  ) {
    switch (uimodule.key) {
      case 'SystemConfigurationAttribute':
        import(
          '../standalone/system-configuration-attribute/system-configuration-attribute.component'
        ).then((m) => {
          const ref = viewContainerRef.createComponent(
            m.SystemConfigurationAttributeComponent
          );
          ref.setInput('uimodule', uimodule);
          ref.setInput('data', data);
        });
        break;
      case 'Logback':
        import('../standalone/logback/logback.component').then((m) => {
          const ref = viewContainerRef.createComponent(m.LogbackComponent);
          ref.setInput('uimodule', uimodule);
          ref.setInput('data', data);
        });
        break;
        case 'SystemConfigurationLink':
          import(
            '../standalone/system-configuration-link/system-configuration-link.component'
          ).then((m) => {
            const ref = viewContainerRef.createComponent(
              m.SystemConfigurationLinkComponent
            );
            ref.setInput('uimodule', uimodule);
            ref.setInput('data', data);
          });
          break;  
    }
  }
}
