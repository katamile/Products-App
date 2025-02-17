import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import { ResponsiveDrawer } from "../ui/navbar/Navbar";
import PublicRoute from "./components/PublicRoute";
import { LoginView } from "../pages/Login/LoginView";
import { UsersView } from "../pages/Users/UsersView";
import { SucursalesView } from "../pages/Sucursales/SucursalesView";
import { CategoriasView } from "../pages/Categorias/CategoriasView";
import { ProductView } from "../pages/Product/ProductView";
import { TransaccionesView } from "../pages/Transacciones/TransaccionesView";
import { HomeView } from "../pages/Home/HomeView";
export const AppRouter = createBrowserRouter(createRoutesFromElements(
    <>
    <Route    
        path="/login"
        element={
            <PublicRoute>
                <LoginView/>   
            </PublicRoute>
        }
    />
        <Route
            path="/"
            element={
                <PublicRoute>
                    <LoginView/>   
                </PublicRoute>
            }
        /> 
    <Route path="/app" element={
        <RequireAuth>
            <ResponsiveDrawer/>
        </RequireAuth>
    }>
        <Route
            path="home"
            element = {
                <HomeView/>
            }
        />
        <Route
            path="user"
            element = {
                <UsersView/>
            }
        />
        <Route
            path="sucursales"
            element = {
                <SucursalesView />
            }
        />
        <Route
            path="categorias"
            element = {
                <CategoriasView/>
            }
        />
        <Route
            path="products"
            element = {
                <ProductView/>
            }
        />
        <Route
            path="transacciones"
            element = {
                <TransaccionesView/>
            }
        />
    </Route>
    </>
));
