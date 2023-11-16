import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';



const TextForm = () => {

  
  
  const [formData, setFormData] = useState({
    nome: '',
    titulo: '',
    texto: '',
    imagem: null, // Agora, isso deve ser um objeto de arquivo
    categoria: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Configuração do dropzone
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      // Ao selecionar um arquivo, armazená-lo como parte do estado
      const file = acceptedFiles[0];
      if (file) {
        setFormData({
          ...formData,
          imagem: file, // Salve o arquivo no estado
        });
      }
    },
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nome', formData.nome);
      formDataToSend.append('titulo', formData.titulo);
      formDataToSend.append('texto', formData.texto);
      formDataToSend.append('categoria', formData.categoria);
      formDataToSend.append('file', formData.imagem); // Adicione a imagem ao FormData

      const token = localStorage.getItem('token');
      const expirationTime = Number(localStorage.getItem('tokenExpiration'));

      if (token && expirationTime) {
        const currentTime = new Date().getTime();
        console.log(currentTime);
          if (currentTime < expirationTime) {
            const response = await fetch('http://localhost:3001/admin/save-text', {
            method: 'POST', headers: {
              Authorization: token, // Envia o token no cabeçalho
            },
            body: formDataToSend,
          });
          if (response.ok) {
            alert('Texto cadastrado com sucesso!');
            // Limpar o formulário após o envio bem-sucedido
            setFormData({
              nome: '',
              titulo: '',
              texto: '',
              imagem: null, // Limpe a imagem
              categoria: '',
            });
          }else {
        alert('Erro ao cadastrar o texto. Tente novamente.');
      }
          }
        }
      } catch (error) {
      console.error('Erro ao cadastrar o texto:', error);
    }
  }

  function handleBackPage(e){
    e.preventDefault()
    window.location.href = '/admin'
  }
  
  return (
    <div className="container">
      <h2>Cadastro de Novo Texto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome do Autor
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
            Título
          </label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="texto" className="form-label">
            Texto
          </label>
          <textarea
            className="form-control"
            id="texto"
            name="texto"
            value={formData.texto}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imagem" className="form-label">
            Imagem
          </label>
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {formData.imagem ? (
              <p>Arquivo selecionado: {formData.imagem.name}</p>
            ) : (
              <p>Arraste e solte uma imagem aqui ou clique para selecionar</p>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">
            Categoria
          </label>
          <input
            type="text"
            className="form-control"
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
      <button className='btn btn-primary mt-1' onClick={handleBackPage} > Voltar</button>
    </div>
  );
};

export default TextForm;
