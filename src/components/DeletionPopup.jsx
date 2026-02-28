import React from "react";
import Button from "./Button";

export default function DeletionPopup({ target, targetName, confirm, cancel }) {
  return (
    <div>
      <div className="fixed z-5 top-0 left-0 h-dvh w-dvw bg-[rgba(0,0,0,0.2)] [backdrop-filter:blur(5px)]" onClick={cancel}></div>
      <div className="fixed top-[50%] left-[50%] z-20 w-fit transform-[translate(-50%,-50%)] rounded-2xl border border-yellow-300 bg-yellow-50 p-10 shadow-2xl">
        <p className="mb-10 text-center text-2xl font-medium">
          Deseja <span className="text-red-500">excluir</span> o(a)
          {target == "students"
            ? ' aluno(a) '
            : ' professor(a) '}
          <br />
          <span className="font-normal text-yellow-800">{targetName}</span>?
          <br /><br />
          <span className="text-[16px] text-red-500">
            Esta ação é irreversível!
          </span>
        </p>

        <div className="m-auto mt-10 grid w-fit grid-cols-2 gap-10">
          <Button
            e={cancel}
            txt={"Cancelar"}
            type={"primary"}
            htmlValue={"cancel"}
          />
          <Button
            e={confirm}
            txt={"Excluir"}
            type={"critical"}
            htmlValue={"delete"}
          />
        </div>
      </div>
    </div>
  );
}
