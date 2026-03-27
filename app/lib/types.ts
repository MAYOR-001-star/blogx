/**
 * Shared TypeScript types derived from Mongoose schemas in models.ts.
 * Use these types in components instead of relying on implicit globals.
 */

export interface Post {
    id: string;
    title: string;
    desc: string;
    img?: string;
    userId: string;
    slug: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface User {
    id: string;
    username: string;
    email: string;
    password?: string;
    img?: string;
    isAdmin?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
