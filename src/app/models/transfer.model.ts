export class TransferModel {
  id: number;
  dateTransferred: Date;
  fromLocation: number;
  toLocation: number;
  status: string;
  internalMemo: string;
  recieved: number;
  quantity: number;
  total: number;
}
