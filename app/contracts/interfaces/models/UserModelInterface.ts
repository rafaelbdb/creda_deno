export interface UserModelInterface {
    _id: { $oid: string };
    name: string;
    email: string;
    password: string;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
}
