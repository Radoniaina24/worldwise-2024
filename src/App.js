import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import {ContextProvider} from "./context/contextCities";
import {AuthProvider} from "./context/FakeAuthContext";
import SpinnerFullPage from "./components/SpinnerFullPage";


/*/import HomePage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import ProtectedRoute from "./pages/ProtectedRoute"; */

const HomePage = lazy(()=>import("./pages/Homepage"))
const Product = lazy(()=>import("./pages/Product"))
const Pricing = lazy(()=>import("./pages/Pricing"))
const PageNotFound = lazy(()=>import("./pages/PageNotFound"))
const Login = lazy(()=>import("./pages/Login"))
const AppLayout = lazy(()=>import("./pages/AppLayout"))
const ProtectedRoute = lazy(()=>import("./pages/ProtectedRoute"))






function App() {

    return (
        <AuthProvider>
            <ContextProvider>
                <BrowserRouter>
                    <Suspense fallback={<SpinnerFullPage />}>
                        <Routes>
                            <Route index element={<HomePage/>}/>
                            <Route path="product" element={<Product/>}/>
                            <Route path="pricing" element={<Pricing/>}/>
                            <Route path="login" element={<Login/>}/>
                            <Route
                                path="app"
                                element={
                                <ProtectedRoute>
                                    <AppLayout/>
                                </ProtectedRoute>}
                            >
                                <Route index element={<Navigate replace to="cities"/>} />
                                <Route path="cities" element={<CityList/>} />
                                <Route path="cities/:id" element={<City/>}/>
                                <Route path="countries" element={<CountryList/>}/>
                                <Route path="form" element={<Form/>} />
                            </Route>
                            <Route path="*" element={<PageNotFound/>}/>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </ContextProvider>
        </AuthProvider>
    )
}
export default App;




