import React, { useState } from 'react';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });
  
      const data = await response.json();
      console.log(data)

      if (data.token) {

        const token = data.token;
        console.log(token)
        localStorage.setItem('token', token)
        const expirationTime = new Date().getTime() + 60 * 60 * 1000;
        localStorage.setItem('tokenExpiration', expirationTime);
        window.location.href = '/admin'
      } else if (data.message === 'Credenciais inválidas') {
        setError('Login errado');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h1 className="card-title text-center">Login de Administrador</h1>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="senha" className="form-label">Senha:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Entrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
