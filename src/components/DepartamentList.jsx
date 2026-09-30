export default function DepartmentList({ departments }) {
    if (departments.length === 0) {
        return (
            <p className="alert alert-warning mb-0">
                Nenhum departamento cadastrado.
            </p>
        );
    }

    return (
        <section className="card">
            <div className="card-body">
                <h2 className="h5 card-title mb-3">Departamentos Cadastrados</h2>

                <ul className="list-group">
                    {departments.map((department) => (
                        <li
                            key={department.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <span>{department.name}</span>
                            <span className="badge bg-secondary">{department.acronym}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}