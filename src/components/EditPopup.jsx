import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";

export default function EditStudentPopup({
  target,
  entity,
  auxData,
  confirm,
  cancel,
}) {
  const [entityName, setEntityName] = useState(entity.name);
  const [_, setClassId] = useState(null);

  function handleEntityNameChange(e) {
    setEntityName(e.target.value);
  }

  function handleClassIdChange(e) {
    setClassId(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;

    const formData = new FormData(form);
    console.log(Object.fromEntries(formData));

    return confirm(formData);
  }

  return (
    <div>
      <div
        className="fixed top-0 left-0 z-5 h-dvh w-dvw bg-[rgba(0,0,0,0.2)] [backdrop-filter:blur(5px)]"
        onClick={cancel}></div>
      <div className="fixed top-[50%] left-[50%] z-20 w-full max-w-sm [transform:translate(-50%,_-50%)] rounded-2xl border border-yellow-300 bg-yellow-50 p-10 shadow-2xl">
        <form className="grid grid-cols-1" onSubmit={handleSubmit}>
          <legend className="text-center text-2xl font-medium">
            Edição de Registro
          </legend>
          <label
            htmlFor="inputNome"
            className="mt-8 font-medium text-yellow-800">
            Nome
          </label>
          <Input
            htmlId={"inputNome"}
            htmlValue={entityName}
            name={"name"}
            onChange={handleEntityNameChange}
            placeholder={"Nome..."}
            type={"text"}
            isRequired={true}
          />
          {target === "students" ? (
            <div className="grid grid-cols-1">
              <label
                htmlFor="selectSerie"
                className="mt-8 font-medium text-yellow-800">
                Classe
              </label>
              <select
                id="selectSerie"
                name="classId"
                className="cursor-pointer rounded-[7px] border border-yellow-400 bg-yellow-50 p-2 outline-none"
                onChange={handleClassIdChange}>
                {auxData.map((data) => {
                  return (
                    <option value={data.id} key={data.id}>
                      {data.name}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : (
            <p>Professores viriam aqui em futuras implementações.</p>
          )}

          <div className="m-auto mt-10 grid w-fit gap-10 sm:grid-cols-1 md:grid-cols-2">
            <Button txt={"Confirmar"} type={"primary"} htmlType={"submit"} />
            <Button txt={"Cancelar"} e={cancel} />
          </div>
        </form>
      </div>
    </div>
  );
}
