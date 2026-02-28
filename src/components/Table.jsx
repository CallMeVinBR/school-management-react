import React from "react";
import Button from "./Button";

// implementar EDIÇÃO
export default function Table({
  data,
  target,
  onDelete,
  onEdit,
  onDegreeClick,
}) {
  return (
    <table>
      {target == "students" ? (
        <caption>Gestão de Alunos</caption>
      ) : (
        <caption>Gestão de Professores</caption>
      )}
      <thead>
        {data.length > 0 ? (
          target == "students" ? (
            <tr>
              <th>Nome do Aluno</th>
              <th>Série</th>
              <th>Classe</th>
              <th className="text-red-500">Excluir</th>
              <th>Editar</th>
            </tr>
          ) : (
            <tr>
              <th>Nome do Professor</th>
              <th>Matéria</th>
              <th>Séries</th>
              <th>Classes</th>
            </tr>
          )
        ) : (
          <tr>
            <td>Nenhum registro foi encontrado.</td>
          </tr>
        )}
      </thead>
      <tbody>
        {target == "students"
          ? data.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.degreeName}</td>
                <td id="small">{student.className}</td>
                <td id="button">
                  <Button
                    e={() => onDelete(student)}
                    txt={"Excluir"}
                    type={"critical"}
                  />
                </td>
                <td id="button">
                  <Button
                    e={() => onEdit(student)}
                    txt={"Editar"}
                    type={"primary"}
                  />
                </td>
              </tr>
            ))
          : data.map((teacher, i) => {
              return (
                <tr key={i}>
                  <td>{teacher.name}</td>

                  <td>
                    {teacher.relationship.map((relation, i) => (
                      <div key={i}>{relation.matterName}</div>
                    ))}
                  </td>

                  <td>
                    {teacher.relationship.map((relation) =>
                      relation.degrees.map((degree, i) => {
                        const degreeStudents = degree.students;

                        return (
                          <div
                            key={i}
                            className="cursor-pointer w-fit hover:underline"
                            onClick={() => onDegreeClick(degreeStudents)}>
                            {degree.degreeName}
                          </div>
                        );
                      }),
                    )}
                  </td>

                  <td className="text-center">
                    {[
                      ...new Set(
                        teacher.relationship.flatMap((relation) =>
                          relation.degrees.flatMap((degree) =>
                            degree.classes.map((c) => c.className),
                          ),
                        ),
                      ),
                    ].map((className, i) => (
                      <span key={i}>{className} </span>
                    ))}
                  </td>
                </tr>
              );
            })}
      </tbody>
    </table>
  );
}
