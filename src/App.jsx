import { useState } from 'react';
import DepartmentForm from './components/DepartmentForm';
import DepartmentList from './components/DepartmentList';
import { useFetch } from './hooks/useFetch';

const API_URL = 'http://localhost:3000/departments';

export default function App() {
  const {
    data: departments,
    loading,
    error,
    setData: setDepartments,
  } = useFetch(API_URL);

  function handleAddDepartment(novoDepartamento) {
    // Atualização dinâmica: SEM reload e SEM novo GET
    setDepartments((prev) => [...prev, novoDepartamento]);
  }

  return (
    <main className="container py-4">
      <header className="mb-4">
        <h1 className="h3">Cadastro de Departamentos — RH</h1>
        <p className="text-muted mb-0">
          Cadastre um novo departamento e veja a lista crescer na hora.
        </p>
      </header>

      <DepartmentForm
        onCadastrar={handleAddDepartment}
        departments={departments}
      />

      {loading && (
        <p className="alert alert-info mb-0">Carregando departamentos...</p>
      )}

      {!loading && error && (
        <p className="alert alert-danger mb-0">
          Erro ao carregar departamentos: {error}
        </p>
      )}

      {!loading && !error && <DepartmentList departments={departments} />}
    </main>
  );
}