import React, { useEffect, useState} from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Main.css';

import DevItem from '../src/components/DevItem';
import DevForm from '../src/components/DevForm';

//Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
// Propriedade: Informações que um componente PAI passa para o componente FILHO
// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)

function App() {
    const [devs, setDevs] = useState([]);


    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs');
            setDevs(response.data);
        }

        loadDevs();
    }, []);

    async function handleAddDev(data) {
        console.log(data);
        const response = await api.post('/devs', data)
        console.log(response);
        setDevs([...devs, response.data]); 
        console.log(devs);
    }


    return (
        <div id="app">
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev} />
            </aside>
            <main>
                <ul>
                    {
                        devs.map(dev => (
                            <DevItem key={dev._id} dev={dev} />
                        ))
                    }
                </ul>
            </main>
        </div>
    );
}

export default App;