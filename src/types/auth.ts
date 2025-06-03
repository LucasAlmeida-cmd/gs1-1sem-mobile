// Criação do Arquivo auth.ts
// O arquivo auth.ts define os tipos utilizados para autenticação e autorização no sistema. Ele organiza os diferentes perfis de usuário, os dados necessários para login e registro, e a estrutura das respostas da API de autenticação.
// Código Criado:
/**
 * Tipos relacionados à autenticação e autorização
 */

import { Image } from "react-native-elements/dist/image/Image";

/**
 * Perfis de usuário disponíveis no sistema
 */
export type UserRole = 'user';

/**
 * Interface base do usuário
 */
export interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image: string;
}



/**
 * Interface do administrador
 */
export interface User extends BaseUser {
  role: 'user';
}

/**
 * Interface do usuário autenticado
 */

export interface Postagem {
  id: string;
  titulo: string;
  localizacao: string;
  horario: string;
  descricao: string
}

/**
 * Dados necessários para login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Dados necessários para registro
 */
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
export interface RegisterDataPostagem {
  titulo: string;
  localizacao: string;
  horario: string;
  descricao: string;
}

/**
 * Resposta da API de autenticação
 */
export interface AuthResponse {
  user: User;
  token: string;
}

/**
 * Contexto de autenticação
 */
export interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  registerPostagem: (data: RegisterDataPostagem) => Promise<void>;
  signOut: () => Promise<void>;@rneui
} 
