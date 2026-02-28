import React from "react";
import Button from "./Button";

export default function StudentsPopup({ data, cancel }) {
  return (
    <div>
      <div
        className="fixed top-0 left-0 z-5 h-dvh w-dvw bg-[rgba(0,0,0,0.2)] [backdrop-filter:blur(5px)]"
        onClick={cancel}></div>
      <div className="fixed top-[50%] left-[50%] z-20 w-full max-w-md transform-[translate(-50%,-50%)] rounded-2xl border border-yellow-300 bg-yellow-50 p-10 shadow-2xl">
        <Button
          type={"primary"}
          e={cancel}
          txt={"X"}
          htmlClass={"fixed right-2 top-2 !min-w-[50px] "}
        />
        <h1 className="text-center text-2xl font-medium">Lista de alunos</h1>
        <div className="w-fit mt-8 ml-auto mr-auto">
          <table>
            <thead>
              <tr>
                <th>RA</th>
                <th>Nome</th>
                <th>Classe</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((student, i) => {
                  return (
                    <tr key={i}>
                      <td>{student.studentRa}</td>
                      <td>{student.studentName}</td>
                      <td>{student.studentClass}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>Nenhum estudante.</td>
                  <td>Nenhum estudante.</td>
                  <td>Nenhum estudante.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
