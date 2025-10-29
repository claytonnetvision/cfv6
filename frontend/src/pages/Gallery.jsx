import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';

const GalleryContainer = styled.div`
  padding: 40px 5%;
`;

const Title = styled.h1`
  text-align: center;
  color: var(--color-primary);
  margin-bottom: 40px;
  font-size: 3em;
`;

const InfoText = styled.p`
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.2em;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 8px;
    transition: transform 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const Gallery = () => {
  // Array de fotos de exemplo. O usuário pode substituir as imagens na pasta public/assets/gallery
  const photos = [
    '/assets/gallery/photo1.jpg',
    '/assets/gallery/photo2.jpg',
    '/assets/gallery/photo3.jpg',
    '/assets/gallery/photo4.jpg',
    '/assets/gallery/photo5.jpg',
    '/assets/gallery/photo6.jpg',
  ];

  return (
    <Layout>
      <GalleryContainer>
        <Title>Galeria de Fotos do Box</Title>
        <InfoText>
          Aqui você pode ver um pouco da energia e da estrutura do CFV6 BOX.
          **Para alterar as imagens, basta substituir os arquivos na pasta `public/assets/gallery` do frontend.**
        </InfoText>
        <GalleryGrid>
          {photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Foto do Box ${index + 1}`} />
          ))}
        </GalleryGrid>
      </GalleryContainer>
    </Layout>
  );
};

export default Gallery;
