export interface UIModule {
  id: string;
  key: string;
  targetMode: 'CONNECT' | 'CREATE' | 'EDIT' | 'SEARCH' | 'UNKNOWN' | 'VIEW';
}

export interface ModuleData {
  oid: string | undefined;
  parentOid: string | undefined;
}
