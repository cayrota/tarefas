import './App.css';
import { useState } from 'react'

function App() {
    const [tarefas, setTarefas] = useState([]);
    const [filtro, setFiltro] = useState('todas');
    const [filtroAtivo, setFiltroAtivo] = useState('todas');
    const [todasConcluidas, setTodasConcluidas] = useState(false);
    let contadorTarefasRestantes = tarefas.filter(tarefa => !tarefa.concluida).length;
    const stringTarefa = contadorTarefasRestantes === 1 ? 'tarefa' : 'tarefas';
    const stringRestante = contadorTarefasRestantes === 1 ? 'restante' : 'restantes';

    function handleEnter(e) {
        if (e.key !== "Enter" || !e.target.value) {
            return;
        };

        const tarefa = {
            tarefa: e.target.value,
            concluida: false
        }

        setTarefas([tarefa, ...tarefas]);
        e.target.value = "";
    };

    function completarTodasTarefas(e) {
        setTodasConcluidas(!todasConcluidas);
        const tarefasCompletas = tarefas.map(tarefa => tarefa = { tarefa: tarefa.tarefa, concluida: !todasConcluidas });
        setTarefas(tarefasCompletas);
    };

    function limparTarefa(i) {
        const novasTarefas = [...tarefas];
        novasTarefas.splice(i, 1);

        setTarefas(novasTarefas);
    }

    function handleCheckbox(tarefa) {
        const tarefasConcluidas = [...tarefas]
        tarefasConcluidas.map(t => {
            if (t.tarefa === tarefa.tarefa) {
                t.concluida = !t.concluida;
            }
        });

        setTarefas(tarefasConcluidas);
    };


    function handleFiltro(novoFiltro) {
        setFiltro(novoFiltro);
        setFiltroAtivo(novoFiltro);
    };


    function filtrarTarefas(tarefa) {
        if (filtro === 'todas') return tarefas;
        if (filtro === 'ativas' && !tarefa.concluida) return tarefas;
        if (filtro === 'completadas' && tarefa.concluida) return tarefas;
    };

    function handleLimpar() {
        const tarefasLimpar = [...tarefas];
        const tarefasAtivas = tarefasLimpar.filter(tarefa => !tarefa.concluida);

        setTarefas(tarefasAtivas);
        setTodasConcluidas(false);
    };

    function AddTarefa() {
        return (
            <div className="AddTarefa">
                <input className="checkbox" type="checkbox" onClick={(e) => completarTodasTarefas(e)} checked={todasConcluidas} id="ckbTarefas" />
                <label htmlFor="ckbTarefas"></label>
                <input className="nova-tarefa" onKeyDown={(e) => handleEnter(e)} placeholder="Criar uma nova tarefa" />
            </div>
        )
    };

    function Tarefas() {
        return (
            <ul>
                {tarefas.filter(filtrarTarefas).map((tarefa, i) => {
                    return (
                        <li>
                            <input type="checkbox" checked={tarefa.concluida} onChange={() => handleCheckbox(tarefa)} id={`tarefa-${i}`} />
                            <label htmlFor={`tarefa-${i}`}></label>
                            <span>
                                <p>{tarefa.tarefa}</p>
                                <button className="botao-fechar" onClick={() => limparTarefa(i)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" /></svg>
                                </button>
                            </span>
                        </li>
                    )
                })}
            </ul>
        )
    };

    function Filtros() {
        return (
            <div className="filtros">
                <p>{contadorTarefasRestantes} {stringTarefa} {stringRestante}</p>
                <button className={filtroAtivo === 'todas' ? "filtro-ativo" : ""} onClick={() => handleFiltro('todas')}>Todas</button>
                <button className={filtroAtivo === 'ativas' ? "filtro-ativo" : ""} onClick={() => handleFiltro('ativas')}>Ativas</button>
                <button className={filtroAtivo === 'completadas' ? "filtro-ativo" : ""} onClick={() => handleFiltro('completadas')}>Completadas</button>
            </div>
        )
    };

    function LimparCompletadas() {
        return (
            <div>
                <button onClick={() => handleLimpar()}>Limpar completadas</button>
            </div>
        )
    }

    return (
        <div className="App">
            <h1>TAREFAS</h1>
            <AddTarefa />
            <div className="card">
                <Tarefas />
                <div className="controles">
                    <Filtros />
                    <LimparCompletadas />
                </div>
            </div>
        </div>
    )
};

export default App;
