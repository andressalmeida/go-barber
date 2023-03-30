import React, { createContext, ReactNode, useContext, useState } from "react";
import api from "../services/api";

interface AuthState {
    token: string;
    user: object;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: object;
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signOut: () => void
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem("@goBarber:token");
        const user = localStorage.getItem("@goBarber:user");

        if (token && user) {
            return { token, user: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    const signIn = async ({ email, password }: SignInCredentials) => {
        const response = await api.post("sessions", {
            email,
            password,
        });

        const { token, user } = response.data;

        localStorage.setItem("@goBarber:token", token);
        localStorage.setItem("@goBarber:user", JSON.stringify(user));

        setData({ token, user });
    };

    const signOut = () => {
        localStorage.removeItem("@goBarber:token");
        localStorage.removeItem("@goBarber:user");

        setData({} as AuthState)
    };

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    return context;
}
