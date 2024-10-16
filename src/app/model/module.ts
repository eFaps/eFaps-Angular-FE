export interface UIModule {
  id: string;
  key: string;
  targetMode: 'CONNECT' | 'CREATE' | 'EDIT' | 'SEARCH' | 'UNKNOWN' | 'VIEW';
  properties: any;
}

export interface ModuleData {
  oid: string | undefined;
  parentOid: string | undefined;
}
