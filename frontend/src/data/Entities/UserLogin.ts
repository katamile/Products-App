export type UserState = {
    Name: string;
    Role: string;
    Token: string;
    IsLogged: boolean;
};

export type UserLogin = {
    email: string;
    password: string;
}