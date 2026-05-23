

export const AllowedRoles = ['contributor', 'maintainer'] as const;

export interface IUser {
    name: string;
    email: string;
    password: string;
    role?: typeof AllowedRoles[number];
}
