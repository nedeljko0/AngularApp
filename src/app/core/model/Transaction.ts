//šablona za vsako transakcijo
//pripravim za vse podatke, ki jih hočem pobrat ven iz jsona
export interface Transaction {
  categoryCode: string;
  amount: string;
  merchant: string;
  merchantLogo: string;
  transactionDate: number;
  transactionType: string;
}
