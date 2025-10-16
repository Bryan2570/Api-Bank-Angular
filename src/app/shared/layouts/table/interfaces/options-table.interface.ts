
/*---- Table ---*/

export type TypeTable = '';

export interface TableColumn {
  name: string;
  key: string;
  table?: string;
  dataType: 'specialCharacter' | 'text' | 'status' | 'statusName' | 'dateTime' | 'currency' | 'requestType' | 'payments' | 'date' | 'date-military' | 'boolean-to-status' | 'number';
}

export interface TableActions {
  add: boolean,
  edit?: boolean,
  addByDocument: boolean,
  return?: boolean;
  update?: boolean,
}


