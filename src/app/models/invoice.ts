export interface Invoice {
  item: string;
  quantity: number;
  date: Date;
  due: Date;
  rate: number;
  tax: number;
}
