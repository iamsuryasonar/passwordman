export interface Service {
    _id: string;
    username: string;
    service: string;
    bookmarked: boolean;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    password?: string;
}