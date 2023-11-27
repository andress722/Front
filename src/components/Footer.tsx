// components/Footer.tsx
import React, {useState} from 'react';
import axios from 'axios';


const Footer: React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  console.log(email)
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
      // Enviar o e-mail para a rota no servidor usando axios
      await axios.post(`https://apiautism-5571b7254db2.herokuapp.com/registro/${ email }`);
      
      // Exemplo de mensagem de sucesso após o envio bem-sucedido
      alert('Inscrição bem-sucedida!');
    } catch (error) {
      console.error('Erro ao enviar inscrição:', error);
    }
  }
  console.log(email)

  return (
    <footer className="text-center text-white">
  
    <div className="container p-4 pb-0">
   
       <section className="">
           <form onSubmit={handleFormSubmit}>
     
       <div className="row d-flex justify-content-center">
        
         <div className="col-auto">
           <p className="pt-2">
             <strong>Sign up for our newsletter</strong>
           </p>
         </div>
        
         <div className="col-md-5 col-12">
        
           <div className="form-outline form-white mb-4">
             <input type="email"   placeholder="Digite seu e-mail" value={email}
             onChange={(e) => setEmail(e.target.value)} id="form5Example2" className="form-control" />
              <p style={{ color: 'red' }}>{error}</p>
             <label className="form-label" >Email address</label>
           </div>
         </div>
              
         <div className="col-auto">
         
           <button type="submit" className="btn btn-outline-light mb-4">
             Subscribe
           </button>
         </div>
        
       </div>
      
     </form>
   </section>
 
 </div>



     <div className="text-center p-3" style={{backgroundColor:" rgba(0, 0, 0, 0.2)"}}>
   © 2020 Copyright:
           <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
    </div>
   </footer>
  );
};

export default Footer;
