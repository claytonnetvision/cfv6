import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import api from '../services/api';

const CommunityContainer = styled.div`
  padding: 40px 5%;
`;

const Title = styled.h1`
  text-align: center;
  color: var(--color-primary);
  margin-bottom: 40px;
`;

const PostForm = styled.form`
  background-color: var(--color-white);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);

  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    margin-bottom: 10px;
  }

  input[type="file"] {
    margin-bottom: 10px;
  }

  button {
    background-color: var(--color-primary);
    color: var(--color-white);
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const PostCard = styled.div`
  background-color: var(--color-white);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 15px;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  h3 {
    margin: 0;
    font-size: 1.2em;
  }

  span {
    color: #666;
    font-size: 0.9em;
  }
`;

const PostBody = styled.div`
  img {
    max-width: 100%;
    border-radius: 8px;
    margin-top: 15px;
  }
`;

const PostActions = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 15px;
  border-top: 1px solid #eee;
  padding-top: 10px;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 1em;
    color: var(--color-text);
  }
`;

const CommentSection = styled.div`
  margin-top: 20px;
  border-top: 1px solid #eee;
  padding-top: 10px;
`;

const CommentItem = styled.div`
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }

  div {
    flex-grow: 1;
  }

  strong {
    font-weight: 600;
    margin-right: 5px;
  }

  p {
    margin: 0;
    font-size: 0.9em;
  }
`;

const CommentForm = styled.form`
  display: flex;
  margin-top: 10px;

  input {
    flex-grow: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;
  }

  button {
    padding: 8px 15px;
    border-radius: 0 4px 4px 0;
  }
`;

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostPhoto, setNewPostPhoto] = useState(null);
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data.map(post => ({
        ...post,
        like_count: parseInt(post.like_count, 10),
        comment_count: parseInt(post.comment_count, 10),
      })));
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('conteudo', newPostContent);
    if (newPostPhoto) {
      formData.append('foto_post', newPostPhoto);
    }

    try {
      await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchPosts();
      setNewPostContent('');
      setNewPostPhoto(null);
    } catch (error) {
      alert('Erro ao criar post. Verifique se está logado.');
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await api.post(`/likes/${postId}/toggle`);
      // Atualiza o post específico na lista
      setPosts(posts.map(p => p.id === postId ? { ...p, like_count: response.data.likeCount } : p));
    } catch (error) {
      alert('Erro ao registrar like. Verifique se está logado.');
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await api.get(`/comments/${postId}`);
      setComments(prev => ({ ...prev, [postId]: response.data }));
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  const toggleComments = (postId) => {
    if (!showComments[postId]) {
      fetchComments(postId);
    }
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    const input = e.target.elements.comment;
    const conteudo = input.value;
    if (!conteudo) return;

    try {
      await api.post(`/comments/${postId}`, { conteudo });
      fetchComments(postId); // Recarrega os comentários
      fetchPosts(); // Recarrega os posts para atualizar a contagem de comentários
      input.value = '';
    } catch (error) {
      alert('Erro ao comentar. Verifique se está logado.');
    }
  };

  return (
    <Layout>
      <CommunityContainer>
        <Title>Comunidade CFV6 BOX</Title>

        <PostForm onSubmit={handlePostSubmit}>
          <h3>O que você está treinando hoje?</h3>
          <textarea
            placeholder="Compartilhe seu treino, seu PR ou uma foto!"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            rows="3"
          />
          <input type="file" onChange={(e) => setNewPostPhoto(e.target.files[0])} />
          <button type="submit">Postar</button>
        </PostForm>

        <div>
          {posts.map(post => (
            <PostCard key={post.id}>
              <PostHeader>
                <img src={post.user_foto_perfil ? `http://localhost:3001/${post.user_foto_perfil}` : '/default-avatar.png'} alt="Avatar" />
                <div>
                  <h3>{post.user_nome}</h3>
                  <span>{new Date(post.data_postagem).toLocaleString()}</span>
                </div>
              </PostHeader>
              <PostBody>
                <p>{post.conteudo}</p>
                {post.foto_url && <img src={`http://localhost:3001/${post.foto_url}`} alt="Post" />}
              </PostBody>
              <PostActions>
                <button onClick={() => handleLike(post.id)}>👍 {post.like_count}</button>
                <button onClick={() => toggleComments(post.id)}>💬 {post.comment_count}</button>
              </PostActions>

              {showComments[post.id] && (
                <CommentSection>
                  {comments[post.id] && comments[post.id].map(comment => (
                    <CommentItem key={comment.id}>
                      <img src={comment.foto_perfil ? `http://localhost:3001/${comment.foto_perfil}` : '/default-avatar.png'} alt="Avatar" />
                      <div>
                        <strong>{comment.nome}</strong>
                        <p>{comment.conteudo}</p>
                      </div>
                    </CommentItem>
                  ))}
                  <CommentForm onSubmit={(e) => handleCommentSubmit(e, post.id)}>
                    <input type="text" name="comment" placeholder="Escreva um comentário..." />
                    <button type="submit">Comentar</button>
                  </CommentForm>
                </CommentSection>
              )}
            </PostCard>
          ))}
        </div>
      </CommunityContainer>
    </Layout>
  );
};

export default Community;
