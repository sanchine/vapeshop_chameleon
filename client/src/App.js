import { useState } from 'react';
import './App.css';
import { CatalogPage } from './components/CatalogPage/CatalogPage';
import { AdminPage } from './components/AdminPage/AdminPage';

function App() {

  const [currentPage, setCurrentPage] = useState('Каталог')

  const pages = ['Каталог', 'О нас', 'Контакты', 'Админка', 'VapeParser']

  const RenderPage = ({page}) => {
    switch (page) {
      case 'Каталог': {
        return <CatalogPage />
      };
      case 'Админка': {
        return <AdminPage />
      };
      default: break;
    }
  }

  return (
    <div className="App">


      <header className="app-header">

        <h1>Chameleon</h1>

        <nav className="app-header-nav">
          <ul className="app-header-nav-links">
            {
              pages.map(p => {
                if (p !== currentPage)
                  return <li className='app-header-nav-links-item' onClick={() => setCurrentPage(p)} >{p}</li>
                return <li className='app-header-nav-links-item' onClick={() => setCurrentPage(p)} ><b>{p}</b></li>
              })
            }
          </ul>
        </nav>

      </header>

      <RenderPage page={currentPage} />

    </div>
  );
}

export default App;
