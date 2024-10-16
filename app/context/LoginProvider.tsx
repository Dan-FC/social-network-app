import { createContext, useContext, useState, ReactNode } from 'react';

// Definimos la interfaz para el tipo de valor que contendrá el contexto
interface LoginContextType {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

// Inicializamos el contexto, con un valor predeterminado undefined para manejar casos donde no esté envuelto por el provider.
const LoginContext = createContext<LoginContextType | undefined>(undefined);

// Este componente gestiona el estado de loggedIn.
const LoginProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [loggedIn, setLoggedIn] = useState(false);

    // Proveemos el estado y la función para actualizarlo a los componentes hijos.
    return (
        <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </LoginContext.Provider>
    );
};

// Creamos un hook personalizado para consumir el contexto de login.
export const useLogin = () => {
    // Usamos useContext para acceder al valor del contexto.
    const context = useContext(LoginContext);
    // Si el hook se usa fuera de un LoginProvider, lanzamos un error.
    if (!context) {
        throw new Error('useLogin debe usarse dentro de un LoginProvider');
    }
    return context;
};

export default LoginProvider;
