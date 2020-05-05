export interface Invoice {
  _id: string;
  item: string;
  quantity: number;
  date: Date;
  due: Date;
  rate: number;
  tax: number;
}
