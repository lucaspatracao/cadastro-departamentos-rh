import { useState } from 'react';

const API_URL = 'http://localhost:3000/departments';

export default function DepartmentForm({ onCadastrar, departments }) {
    const [name, setName] = useState('');
    const [acronym, setAcronym] = useState('');
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');

        const trimmedName = name.trim();
        const trimmedAcronym = acronym.trim().toUpperCase();

        // Validação 1 — nome obrigatório
        if (!trimmedName) {
            setError('Informe o nome do departamento.');
            return;
        }

        // Validação 2 — sigla com 2 a 5 letras
        if (!/^[A-Za-z]{2,5}$/.test(trimmedAcronym)) {
            setError('A sigla deve conter entre 2 e 5 letras (ex: RH, TI, FIN, MKT).');
            return;
        }

        // Desafio extra — sigla duplicada
        const siglaJaExiste = departments.some(
            (dep) => dep.acronym.toUpperCase() === trimmedAcronym
        );
        if (siglaJaExiste) {
            setError(`A sigla "${trimmedAcronym}" já está cadastrada.`);
            return;
        }

        const novoDepartamento = {
            name: trimmedName,
            acronym: trimmedAcronym,
        };

        try {
            setSending(true);

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoDepartamento),
            });

            if (!response.ok) {
                throw new Error('Não foi possível cadastrar o departamento.');
            }

            const departamentoCriado = await response.json();

            // Entrega o objeto criado (já com id) para o componente pai
            onCadastrar(departamentoCriado);

            // Limpa o formulário
            setName('');
            setAcronym('');
        } catch (err) {
            setError(err.message);
        } finally {
            setSending(false);
        }
    }

    return (
        <section className="card mb-4">
            <div className="card-body">
                <h2 className="h5 card-title mb-3">Novo Departamento</h2>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="row g-3">
                        <div className="col-md-8">
                            <label htmlFor="name" className="form-label">
                                Nome do Departamento
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="form-control"
                                placeholder="Ex: Recursos Humanos"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                disabled={sending}
                            />
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="acronym" className="form-label">
                                Sigla
                            </label>
                            <input
                                id="acronym"
                                type="text"
                                className="form-control"
                                placeholder="Ex: RH"
                                maxLength={5}
                                value={acronym}
                                onChange={(event) => setAcronym(event.target.value)}
                                disabled={sending}
                            />
                        </div>
                    </div>

                    {error && <p className="text-danger mt-3 mb-0">{error}</p>}

                    <button
                        type="submit"
                        className="btn btn-primary mt-3"
                        disabled={sending}
                    >
                        {sending ? 'Enviando...' : 'Cadastrar Departamento'}
                    </button>
                </form>
            </div>
        </section>
    );
}