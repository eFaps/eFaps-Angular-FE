import { Injectable, ViewContainerRef } from '@angular/core';

import { FieldCommandResponse } from '../model/field-command';
import { ModuleData, UIModule } from '../model/module';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentService {
  constructor() {}

  load(viewContainerRef: ViewContainerRef, fieldCmdResp: FieldCommandResponse) {
    import('../ui-modules/eqlresponse/eqlresponse.component').then((m) => {
      const ref = viewContainerRef.createComponent(m.EQLResponseComponent);
      ref.setInput('fieldCmdResp', fieldCmdResp);
    });
  }

  loadUIModule(
    viewContainerRef: ViewContainerRef,
    uimodule: UIModule,
    data: ModuleData,
  ) {
    switch (uimodule.key) {
      case 'SystemConfigurationAttribute':
        import(
          '../ui-modules/system-configuration-attribute/system-configuration-attribute.component'
        ).then((m) => {
          const ref = viewContainerRef.createComponent(
            m.SystemConfigurationAttributeComponent,
          );
          ref.setInput('uimodule', uimodule);
          ref.setInput('data', data);
        });
        break;
      case 'Logback':
        import('../ui-modules/logback/logback.component').then((m) => {
          const ref = viewContainerRef.createComponent(m.LogbackComponent);
          ref.setInput('uimodule', uimodule);
          ref.setInput('data', data);
        });
        break;
      case 'SystemConfigurationLink':
        import(
          '../ui-modules/system-configuration-link/system-configuration-link.component'
        ).then((m) => {
          const ref = viewContainerRef.createComponent(
            m.SystemConfigurationLinkComponent,
          );
          ref.setInput('uimodule', uimodule);
          ref.setInput('data', data);
        });
        break;
      case 'CSVImport':
        import('../ui-modules/csvimport/csvimport.component').then((m) => {
          const ref = viewContainerRef.createComponent(m.CSVImportComponent);
          ref.setInput('uimodule', uimodule);
          ref.setInput('data', data);
        });
        break;
      case 'PromoSimulator':
        import('../ui-modules/promo-simulator/promo-simulator.component').then(
          (m) => {
            const ref = viewContainerRef.createComponent(
              m.PromoSimulatorComponent,
            );
            ref.setInput('uimodule', uimodule);
            ref.setInput('data', data);
          },
        );
        break;
      case 'FilteredReport':
        import('../ui-modules/filtered-report/filtered-report.component').then(
          (m) => {
            const ref = viewContainerRef.createComponent(
              m.FilteredReportComponent,
            );
            ref.setInput('uimodule', uimodule);
            ref.setInput('data', data);
          },
        );
        break;
      case 'ProductFamily':
        import('../ui-modules/product-family/product-family.component').then(
          (m) => {
            const ref = viewContainerRef.createComponent(
              m.ProductFamilyComponent,
            );
            ref.setInput('uimodule', uimodule);
            ref.setInput('data', data);
          },
        );
        break;
      case 'POS-StatusReport':
        import(
          '../ui-modules/pos-status-report/pos-status-report.component'
        ).then((m) => {
          const ref = viewContainerRef.createComponent(
            m.PosStatusReportComponent,
          );
        });
        break;
    }
  }
}
