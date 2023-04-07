export interface MovementModelInterface {
    _id: { $oid: string };
    description: string;
    amount: number;
    type: string; // income/expense
    category: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
}
