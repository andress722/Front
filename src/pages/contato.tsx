import { useState } from 'react';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    texto: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error('Erro ao enviar o formulário');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container h-100 mt-5">
    <div className="row h-100 justify-content-center align-items-center">
      <div className="col-md-6">
        <h1 className="text-center">Formulário de Contato</h1>
        {isSubmitted ? (
          <div className="alert alert-success mt-3" role="alert">
            Envio realizado com sucesso!
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className={`form-control ${isSubmitting ? 'disabled' : ''}`}
              id="nome"
              name="nome"
              placeholder="Seu nome"
              required
              value={formData.nome}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${isSubmitting ? 'disabled' : ''}`}
              id="email"
              name="email"
              placeholder="seu-email@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="assunto" className="form-label">
              Assunto
            </label>
            <input
              type="text"
              className={`form-control ${isSubmitting ? 'disabled' : ''}`}
              id="assunto"
              name="assunto"
              placeholder="Assunto do e-mail"
              required
              value={formData.assunto}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="texto" className="form-label">
              Texto
            </label>
            <textarea
              className={`form-control ${isSubmitting ? 'disabled' : ''}`}
              id="texto"
              name="texto"
              rows="4"
              placeholder="Digite sua mensagem aqui"
              required
              value={formData.texto}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
         
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
