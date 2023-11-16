import { useState } from 'react';

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Expressão regular para validar e-mail
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(email)) {
      setError('Digite um e-mail válido.');
      return;
    }

    // Limpa qualquer mensagem de erro anterior
    setError('');

    try {
      // Enviar o e-mail para a API Express
      const response = await fetch('http://localhost:3001/registro/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Exemplo de mensagem de sucesso após o envio bem-sucedido
        alert('Inscrição bem-sucedida!');
      } else {
        console.error('Erro ao enviar inscrição:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao enviar inscrição:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <p>Receba nossas novidades por e-mail:</p>
      <input
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p style={{ color: 'red' }}>{error}</p>
      <button type="submit" className="btn btn-primary">
        Inscrever
      </button>
    </form>
  );
};

export default SignupForm;
