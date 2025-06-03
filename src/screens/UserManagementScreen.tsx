import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, ViewStyle, TextStyle } from 'react-native';
import { Button, ListItem, Text } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import theme from '../styles/theme';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserManagementScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserManagement'>;
};

interface Patio {
  id: string;
  identificacao: string;
  largura: string;
  comprimento: string;
}

interface Postagem {
  id: string;
  titulo: string;
  localizacao: string;
  horario: string;
  descricao: string
}

interface StyledProps {
  role: string;
}

const UserManagementScreen: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation<UserManagementScreenProps['navigation']>();
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPostagens = async () => {
    try {
      const storedPostagens = await AsyncStorage.getItem('@MotoFindr:patios');
      if (storedPostagens) {
        const allPostagens: Postagem[] = JSON.parse(storedPostagens);
        const filteredPostagens = allPostagens;
        setPostagens(filteredPostagens);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePatio = async (patioId: string) => {
    try {
      const storedUsers = await AsyncStorage.getItem('@MotoFindr:patios');
      if (storedUsers) {
        const allPatios: Patio[] = JSON.parse(storedUsers);
        const updatedPatios = allPatios.filter(u => u.id !== patioId);
        await AsyncStorage.setItem('@MotoFindr:patios', JSON.stringify(updatedPatios));
        loadPostagens(); 
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      loadPostagens();
    }, [])
  );

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <Button
          title="Postar"
          onPress={() => navigation.navigate('Register')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.inputTextEnviar}
        />

        <Title>Postagens Antigas</Title>

        {loading ? (
          <LoadingText>Carregando Postagens...</LoadingText>
        ) : postagens.length === 0 ? (
          <EmptyText>Nenhuma postagem cadastrado</EmptyText>
        ) : (
          postagens.map((postagens) => (

            <UserCard key={postagens.id} 
            bottomDivider
            containerStyle={{ backgroundColor: '#1D617E'}}>
              <ListItem.Content>
                <ListItem.Title style={styles.postagemTitulo as TextStyle}>
                 Titulo: {postagens.titulo}
                </ListItem.Title>

                <ListItem.Subtitle style={styles.postagemLoc as TextStyle}>
                  Localização: {postagens.localizacao}
                </ListItem.Subtitle>

                <ListItem.Subtitle style={styles.postagemLoc as TextStyle}>
                  Horário: {postagens.horario}
                </ListItem.Subtitle>

                <ListItem.Subtitle style={styles.postagemLoc as TextStyle}>
                  Descrição: {postagens.descricao}
                </ListItem.Subtitle>


                <ButtonContainer>
                  <Button
                    title="Apagar"
                    onPress={() => handleDeletePatio(postagens.id)}
                    containerStyle={{ width: 'auto' }}
                    buttonStyle={styles.deleteButton}
                    titleStyle={styles.deleteButtonText}
                  />
                </ButtonContainer>
              </ListItem.Content>
            </UserCard>

          ))
        )}

        <Button
          title="Voltar"
          onPress={() => navigation.navigate('AdminDashboard')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyleVoltar}
          titleStyle={styles.inputTextVoltar}
        />
      </ScrollView>
    </Container>
  );
};

const styles = {
  scrollContent: {
    padding: 20,
  },
  button: {
    marginBottom: 20,
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: theme.colors.titulo,
    paddingVertical: 10,
    height: 50,
    borderRadius: 10,
  },
  buttonStyleVoltar: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#929292',
  },
  inputTextVoltar: {
    fontFamily: 'KdamThmorPro',
    color: '#929292',
  },
  inputTextEnviar: {
    fontFamily: 'KdamThmorPro',
    color: '#000000',
  },
  backButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
  },
  actionButton: {
    marginTop: 8,
    width: '48%',
  },
  editButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    fontFamily: 'KdamThmorPro',
    color: '#000000',
    fontSize: 16,
  },
  postagemTitulo: {
    fontSize: 18,
    fontFamily: 'KdamThmorPro',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  postagemLoc: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'KdamThmorPro',
    marginBottom: 4,
  },

  
};

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.fundoPadrao};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  font-family: 'KdamThmorPro';
  color: '#000000';
  margin-bottom: 20px;
  text-align: center;
`;

const UserCard = styled(ListItem)`
  background-color: #1D617E;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 15px;
`;

const LoadingText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;

const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;


const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

export default UserManagementScreen; 
