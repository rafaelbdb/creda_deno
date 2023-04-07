export interface BoardModelInterface {
    _id: { $oid: string };
    balance: number;
    income: number;
    expense: number;
    averageIncome: number;
    averageExpense: number;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
}
