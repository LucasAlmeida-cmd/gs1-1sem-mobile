/**
 * Tipos relacionados à navegação
 * Este arquivo contém todas as definições de tipos necessárias para a navegação entre telas
 */

/**
 * Define as rotas disponíveis na aplicação e seus parâmetros
 * @property Login - Tela de login
 * @property Home - Tela inicial da aplicação
 * @property CreateAppointment - Tela de criação de consulta
 * @property Profile - Tela de perfil do usuário
 * @property AdminDashboard - Tela do painel de administração
 * @property UserManagement - Tela de gerenciamento de usuários
 */
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: undefined;
  AdminDashboard: undefined;
  UserManagement: undefined;
};
