/**
 * Extends the default NextAuth User type to include additional properties
 * needed for our parking management system.
 */
export interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
}

/**
 * Type for user authentication credentials
 */
export interface UserCredentials {
    id: string;
    username: string;
    password: string;
    parkingLotId?: number;
}