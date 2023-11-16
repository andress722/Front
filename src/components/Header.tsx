import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Script from 'next/script';



const Navbar: React.FC = ({ selectedCategory, onCategorySelect }) => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fazer uma chamada à API para buscar as categorias disponíveis
    axios
      .get('http://localhost:3001/todos')
      .then((response) => {
        setCategories(response.data.rows);
		console.log(categories)
      })
      .catch((error) => {
        console.error('Erro ao buscar categorias:', error);
      });
  }, []);

  return (
    <section className="ftco-section" style={{backgroundColor: '#FDFBFC'}}>
		<div className="container-fluid" style={{backgroundColor: '#FDFBFC'}}>
			<div style={{backgroundColor: '#FDFBFC'}} className="row justify-content-center">
				<div className="text-center">
					<img className='img-fluid' style={{height: '220px', width: '800px'}} src="/img/editAutismo.png" alt=""  />
				</div>
			</div>
		</div>

		<nav className="navbar navbar-expand-lg ftco_navbar ftco-navbar-light" style={{backgroundColor: '#7265ef!important'}} id="ftco-navbar">
	    <div className="container">
	      <a className="navbar-brand" href="/"><img style={{width: '120px'}} src="img/kisspng-world-autism-awareness-day-autistic-spectrum-disor-autism-ribbon-5aae3cbcabf615.2430117815213682527044.png" alt="" /></a>
	      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
	        <span className="fa fa-bars"></span> Menu
	      </button>

	      <div className="collapse navbar-collapse" id="ftco-nav" style={{backgroundColor: '#7265ef!important'}} >
	        <ul className="navbar-nav ml-auto" style={{backgroundColor: '#7265ef!important'}}>
	        	<li className="nav-item active"><a href="/" className="nav-link">Home</a></li>
	        	<li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Page</a>
              <div className="dropdown-menu" aria-labelledby="dropdown04" style={{backgroundColor: '#453d97!important'}}>
					
				<a className="dropdown-item" style={{color: 'white', cursor: 'pointer'}} href="/conteudos">Todos</a>

				{Array.from(new Set(categories.map((category) => category.categoria))).map((uniqueCategory) => (
                   
				   <Link legacyBehavior href={`/categoria/${uniqueCategory}`}>
				   <a className="dropdown-item" style={{ color: 'white', cursor: 'pointer' }}>
					 {uniqueCategory}
				   </a>
				 </Link>
                  ))}


              </div>
            </li>
	        	<li className="nav-item"><a href="/sobre" className="nav-link">Sobre</a></li>
	          <li className="nav-item cta" style={{maxWidth: '100px'}}><a href="/contato" className="nav-link">Contato</a></li>
	        </ul>
	      </div>
	    </div>
	  </nav>
   
   


	</section>
  );
};
export default Navbar;