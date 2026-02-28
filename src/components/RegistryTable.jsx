import { React, useMemo, useEffect, useState } from "react";
import {
  filterTable,
  alphabeticOrder,
  resetStorage,
  getData,
  getDataWithoutStoring,
  getObjectNameById,
  generateEntities,
  deleteEntityById,
  storeData,
  updateEntityById,
} from "../services/dataService";
import Table from "./Table";
import Input from "./Input";
import Button from "./Button";
import DeletionPopup from "./DeletionPopup";
import EditPopup from "./EditPopup";
import StudentsPopup from "./StudentsPopup";
import ReportChart from "./ReportChart";

export default function RegistryTable({ target }) {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchFor, setSearchFor] = useState("name");
  const [alphaOrder, setAlphaOrder] = useState("A-Z");
  const [entities, setEntities] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [studentsInfo, setStudentsInfo] = useState([]);

  function handleQueryChange(e) {
    setSearchInput(e.target.value);
  }

  function handleSearchForChange(e) {
    setSearchFor(e.target.value);
  }

  function handleAlphaOrderChange(e) {
    setAlphaOrder(e.target.value);
  }

  const handleShowDelete = (entity) => {
    setSelectedId(entity.id);
    setSelectedName(entity.name);
    setShowDelete(true);
  };

  const handleConfirmDelete = () => {
    setEntities(deleteEntityById(entities, selectedId));

    setShowDelete(false);
    setSelectedId(null);
  };

  const handleCancelDelete = () => {
    setShowDelete(false);
    setSelectedId(null);
  };

  const handleShowEdit = (entity) => {
    setSelectedEntity(entity);
    setSelectedId(entity.id);
    setShowEdit(true);
  };

  const handleCancelEdit = () => {
    setSelectedEntity([]);
    setSelectedId(null);
    setShowEdit(false);
  };

  const handleConfirmEdit = (formSent) => {
    setEntities(updateEntityById(target, selectedId, formSent, entities));
    setSelectedId(null);
    setShowEdit(false);
  };

  const handleShowStudents = (students) => {
    setStudentsInfo(students);
    setShowStudents(true);
  };

  const handleCloseStudents = () => {
    setStudentsInfo([]);
    setShowStudents(false);
  };

  const handleGenerateRandomData = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      const newData = generateEntities(300, entities, target);

      setEntities(newData);
    } catch (error) {
      console.log("Falha ao gerar entidades:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // evita sobrecarga
    const debounce = setTimeout(() => {
      setQuery(searchInput);
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchInput]);

  useEffect(() => {
    setEntities(getData(target));
  }, [target]);

  useEffect(() => {
    const existingData = localStorage.getItem("memory_" + target);

    if (existingData && entities.length > 0) {
      storeData(target, entities);
    }
  }, [target, entities]); // toda operacao nas entidades ira atualizar o localStorage automaticamente

  const crossedData = useMemo(() => {
    if (target !== "students") {
      const relationshipsData = getData("relationships");
      const studentsData = getData("students");

      const relationsMap = {};

      relationshipsData.forEach((r) => {
        if (!relationsMap[r.teacherId]) {
          relationsMap[r.teacherId] = [];
          relationsMap[r.teacherId].push(r);
        }
      });

      return entities.map((teacher) => {
        const teacherRels = relationsMap[teacher.id] || [];

        return {
          ...teacher,
          relationship: teacherRels.map((relation) => ({
            matterName: getObjectNameById("matters", relation.matterId),

            degrees: relation.degrees.map((degree) => ({
              degreeName: getObjectNameById("degrees", degree.degreeId),

              classes: degree.classes.map((c) => ({
                classId: c.classId,
                className: getObjectNameById("classes", c.classId),
              })),

              students: studentsData
                .filter((student) => student.degreeId == degree.degreeId)
                .map((student) => ({
                  studentRa: student.ra,
                  studentName: student.name,
                  studentClass: getObjectNameById("classes", student.classId),
                })),
            })),
          })),
        };
      });
    }

    // Puxa os valores atuais de student e acrescenta cruzamentos via IDs
    return entities.map((student) => ({
      ...student,
      degreeName: getObjectNameById("degrees", student.degreeId),
      className: getObjectNameById("classes", student.classId),
    }));
  }, [entities, target]);

  const finalData = useMemo(() => {
    let result = filterTable(crossedData, query, searchFor);

    // Ordena de A-Z por padrao
    let orderedResult = alphabeticOrder(result, alphaOrder, searchFor);

    return orderedResult;
  }, [crossedData, query, searchFor, alphaOrder]);

  return (
    <div>
      <div className="w-full p-4">
        <div className="flex w-fit">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="grid grid-cols-2 gap-x-10">
              <label htmlFor="searchFor" className="self-center">
                Buscar por:
              </label>
              {target === "students" ? (
                <select
                  id="searchFor"
                  className="cursor-pointer rounded-[7px] border border-yellow-400 bg-yellow-50 p-2 outline-none"
                  onChange={handleSearchForChange}>
                  <option value="name">Nome</option>
                  <option value="degreeName">Série</option>
                  <option value="className">Classe</option>
                </select>
              ) : (
                <select
                  id="searchFor"
                  className="cursor-pointer rounded-[7px] border border-yellow-400 bg-yellow-50 p-2 outline-none"
                  onChange={handleSearchForChange}>
                  <option value="name">Nome</option>
                  <option value="relationship">Matéria</option>
                  <option value="relationship">Série</option>
                  <option value="relationship">Classe</option>
                </select>
              )}
            </div>

            <Input
              htmlId={"searchInput"}
              type={"text"}
              placeholder={"Pesquisar..."}
              onChange={handleQueryChange}
              htmlValue={searchInput}
              isRequired={true}
            />

            <div className="grid grid-cols-2 gap-10">
              <label htmlFor="alphaOrder" className="self-center">
                Ordenar de:
              </label>
              <select
                className="cursor-pointer rounded-[7px] border border-yellow-400 bg-yellow-50 p-2 outline-none"
                id="alphaOrder"
                onChange={handleAlphaOrderChange}>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>
            </div>
          </div>
        </div>
        <br />
        <Button
          e={resetStorage}
          htmlValue={"resetStorage"}
          txt={"Redefinir Dados"}
        />
        <Button
          e={handleGenerateRandomData}
          htmlValue={"generateEntities"}
          htmlClass={"ml-2"}
          txt={loading ? "Gerando..." : "+300 entidades"}
        />
      </div>

      <div className="grid w-fit h-fit lg:grid-cols-2 md:grid-cols-1 gap-4">
        <Table
          data={finalData}
          target={target}
          onDelete={handleShowDelete}
          onEdit={handleShowEdit}
          onDegreeClick={handleShowStudents}
        />

        {/* 
        O grafico reage com as entidades finais,
        então é possível realizar buscas e alterar
        a visualização como quiser!
         */}
        <ReportChart target={target} entities={finalData} />
      </div>
        

      {showDelete && (
        <DeletionPopup
          target={target}
          targetName={selectedName}
          confirm={handleConfirmDelete}
          cancel={handleCancelDelete}
        />
      )}

      {showEdit && (
        <EditPopup
          target={target}
          entity={selectedEntity}
          auxData={getDataWithoutStoring("classes")}
          confirm={handleConfirmEdit}
          cancel={handleCancelEdit}
        />
      )}

      {showStudents && (
        <StudentsPopup data={studentsInfo} cancel={handleCloseStudents} />
      )}
    </div>
  );
}