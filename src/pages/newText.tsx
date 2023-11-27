import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const TextForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    titulo: '',
    texto: '',
    imagem: null as File | null, // Updated type definition
    categoria: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Configuração do dropzone
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      // Accept either a single file or null
      const file: File | null = acceptedFiles.length > 0 ? acceptedFiles[0] : null;

      setFormData({
        ...formData,
        imagem: file,
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nome', formData.nome);
      formDataToSend.append('titulo', formData.titulo);
      formDataToSend.append('texto', formData.texto);
      formDataToSend.append('categoria', formData.categoria);
      formDataToSend.append('file', formData.imagem || ''); // Use empty string if imagem is null

      // Rest of the code remains unchanged
      // ...
    } catch (error) {
      console.error('Erro ao cadastrar o texto:', error);
    }
  };

  const handleBackPage = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/admin';
  };

  return (
    <div className="container">
      <h2>Cadastro de Novo Texto</h2>
      <form onSubmit={handleSubmit}>
        {/* ... (rest of the form) */}
      </form>
      <button className='btn btn-primary mt-1' onClick={handleBackPage} > Voltar</button>
    </div>
  );
};

export default TextForm;
