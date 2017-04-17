export interface IUserService
{
    Login(username: String, password: String): boolean ;
    IsAuthenticated(): boolean;
}