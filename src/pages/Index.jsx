import { React, useState } from "react";
import Screens from "./Screens";
import Button from "../components/Button";

export default function Index() {
  const [screen, setScreen] = useState(1);

  function handleSectionChange(e) {
    setScreen(e.target.value);
  }

  return (
    <main className="w-full m-auto">
      <header className="flex h-[4.5em] items-center bg-neutral-100">
        <div className="m-auto grid w-fit grid-cols-2 gap-x-2">
          <Button
            type={"page"}
            e={handleSectionChange}
            htmlValue={1}
            txt={"Alunos"}
            htmlClass={screen == 1 ? "bg-yellow-600 text-white" : "bg-yellow-100 text-yellow-700"}
          />
          <Button
            type={"page"}
            e={handleSectionChange}
            htmlValue={2}
            txt={"Professores"}
            htmlClass={screen == 2 ? "bg-yellow-600 text-white" : "bg-yellow-100 text-yellow-700"}
          />
        </div>
      </header>

      <div className="w-fit m-auto">
        <Screens numScreen={screen} />
      </div>
      
    </main>
  );
}
