import { useInventoryContext } from './useInventoryContext'
import { ILoginRepository } from '../data/Interfaces/ILoginRepository';
import { LoginRepository } from '../data/Repositories/LoginRepository';
import { UserLogin } from '../data/Entities/UserLogin';
import { baseStorage } from '../services/baseStorage';
import { IAuthState } from '../state/Interfaces/IAuthState';
import { useNavigate } from 'react-router-dom';
const repo:ILoginRepository = LoginRepository; 
const {SaveData, RemoveData} = baseStorage();
type AuthStateProps = {
    loginAsync(user: UserLogin): Promise<void>;
    logout(): void;
} & IAuthState;

export const useAuth = () => {
  const {user, setUser} = useInventoryContext();
  const navigate = useNavigate();
  return {
    async loginAsync(newUser: UserLogin){
        try{
            const handle = await repo.loginAsync(newUser);
            setUser(handle);
            SaveData(handle, "products-app");
        }
        catch(e: any){
            console.error(e)
            throw e;
        }
    },
    logout(){
        RemoveData('products-app');
        setUser({
            Name: "",
            Role: "",
            Token: "",
            IsLogged: false
        });
        navigate("/");
    },
    IsUserLogged() {
        return user.IsLogged;
    },
  } as AuthStateProps;
}
