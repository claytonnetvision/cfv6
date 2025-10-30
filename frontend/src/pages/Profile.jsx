import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/Layout';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth.jsx'; // Adicionado
import RatingSection from '../components/RatingSection'; // Novo Componente

const ProfileContainer = styled.div`
  padding: 40px 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileCard = styled.div`
  background-color: var(--color-white);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin-bottom: 30px;
  text-align: center;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 4px solid var(--color-primary);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const Button = styled.button`
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 10px 20px;
  margin-top: 10px;
  margin-right: 10px;
`;

const Detail = styled.p`
  margin: 5px 0;
  font-size: 1.1em;
`;

const Profile = () => {
  const { id } = useParams(); // Pega o ID da URL se estiver presente
  const { user: loggedInUser } = useAuth(); // Pega o usuário logado
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [newAvatar, setNewAvatar] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, [id]); // Refaz o fetch se o ID da URL mudar

  const fetchProfile = async () => {
    try {
      const url = id ? `/users/${id}` : '/users/profile';
      const response = await api.get(url);
      setUser(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      // Redirecionar para login se não estiver autenticado E estiver tentando acessar o próprio perfil
      if (!id && error.response && error.response.status === 401) {
        window.location.href = '/login';
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // A edição só é permitida se o usuário estiver na sua própria página de perfil (sem ID na URL)
  const isOwnProfile = !id;

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { nome, bio, data_nascimento, telefone, endereco } = formData;
      const response = await api.put('/users/profile', { nome, bio, data_nascimento, telefone, endereco });
      setUser(response.data.user);
      setIsEditing(false);
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      alert(`Erro ao atualizar perfil: ${error.response.data.message}`);
    }
  };

  const handleAvatarChange = (e) => {
    setNewAvatar(e.target.files[0]);
  };

  const handleAvatarUpload = async () => {
    if (!newAvatar) return;

    const data = new FormData();
    data.append('foto_perfil', newAvatar);

    try {
      const response = await api.post('/users/profile/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Atualiza o estado do usuário com a nova URL da foto
      setUser({ ...user, foto_perfil: response.data.foto_url });
      setNewAvatar(null);
      alert('Foto de perfil atualizada com sucesso!');
    } catch (error) {
      alert(`Erro ao fazer upload: ${error.response.data.message}`);
    }
  };

  if (!user) return <Layout>Carregando perfil...</Layout>;

  // Determina o ID do usuário cujo perfil está sendo visualizado
  const profileUserId = id ? parseInt(id, 10) : loggedInUser?.id;

  if (!profileUserId) return <Layout>Erro: ID do perfil não encontrado.</Layout>;

  return (
    <Layout>
      <ProfileContainer>
        <ProfileCard>
          <Avatar src={user.foto_perfil ? `${api.defaults.baseURL}/${user.foto_perfil}` : '/default-avatar.png'} alt="Avatar" />
          
          <h2>{user.nome}</h2>
          <Detail>Email: {user.email}</Detail>
          <Detail>Telefone: {user.telefone || 'Não informado'}</Detail>
          <Detail>Endereço: {user.endereco || 'Não informado'}</Detail>
          <Detail>Membro desde: {new Date(user.data_cadastro).toLocaleDateString()}</Detail>
          
	          {isOwnProfile && (
	            <div style={{ marginTop: '20px' }}>
	              <Input type="file" onChange={handleAvatarChange} />
	              <Button onClick={handleAvatarUpload} disabled={!newAvatar}>
	                {newAvatar ? 'Enviar Nova Foto' : 'Selecione uma Foto'}
	              </Button>
	            </div>
	          )}
	
	          <h3 style={{ marginTop: '30px', color: 'var(--color-primary)' }}>Bio</h3>
	          <p>{user.bio || 'Nenhuma bio informada.'}</p>
	
	          {isOwnProfile && (
	            <Button onClick={() => setIsEditing(!isEditing)} style={{ marginTop: '20px' }}>
	              {isEditing ? 'Cancelar Edição' : 'Editar Perfil'}
	            </Button>
	          )}
        </ProfileCard>

	        {/* Seção de Avaliação de Perfil (Votação) */}
        <RatingSection profileUserId={profileUserId} />

        {isEditing && isOwnProfile && (
          <ProfileCard>
            <h3 style={{ color: 'var(--color-primary)' }}>Editar Informações</h3>
            <form onSubmit={handleUpdate}>
              <Input type="text" name="nome" value={formData.nome || ''} onChange={handleChange} placeholder="Nome" required />
              <Input type="tel" name="telefone" value={formData.telefone || ''} onChange={handleChange} placeholder="Telefone" />
              <Input type="text" name="endereco" value={formData.endereco || ''} onChange={handleChange} placeholder="Endereço" />
              <Input type="date" name="data_nascimento" value={formData.data_nascimento ? formData.data_nascimento.split('T')[0] : ''} onChange={handleChange} />
              <TextArea name="bio" value={formData.bio || ''} onChange={handleChange} placeholder="Fale um pouco sobre você..." rows="4" />
              <Button type="submit">Salvar Alterações</Button>
            </form>
          </ProfileCard>
        )}
      </ProfileContainer>
    </Layout>
  );
};

export default Profile;
