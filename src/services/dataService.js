import classesData from "../data/classes.json";
import degreesData from "../data/degrees.json";
import mattersData from "../data/matters.json";
import relationshipsData from "../data/relationships.json";
import studentsData from "../data/students.json";
import teachersData from "../data/teachers.json";

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

// atribuindo ID a classes indiretamente
const classesIdData = classesData["classes"].map((item, index) => ({
  ...item,
  id: index + 1,
}));

// data mapeados para evitar a frequente ocorrencia de if() no código
const mapData = {
  classes: classesIdData,
  degrees: degreesData,
  matters: mattersData,
  relationships: relationshipsData,
  students: studentsData,
  teachers: teachersData,
};

const STORAGE_PREFIX = "memory_";

export const resetStorage = () => {
  localStorage.clear();
  window.location.reload();
};

export const storeData = (target, data) =>
  localStorage.setItem(STORAGE_PREFIX + target, JSON.stringify(data));

export const getData = (target) => {
  const localData = localStorage.getItem(STORAGE_PREFIX + target);

  if (localData && localData.length > 0) {
    return JSON.parse(localData);
  }

  const initialData = mapData[target] ?? [];
  storeData(target, initialData);

  return initialData;
};

export const getDataWithoutStoring = (target) => {
  return mapData[target] ?? [];
};

export const getObjectNameById = (obj, id) => {
  const objects = mapData[obj];
  const objFound = objects.find((value) => value.id == id);

  return objFound ? objFound.name : null;
};

export const filterTable = (data, query, searchFor) => {
  if (!query) return data;

  const lowerQuery = query.toLowerCase();

  return data.filter((item) => {
    const value = item[searchFor];

    // Caso a busca seja um Array, faz parte dos professores (relationships)
    if (Array.isArray(value)) {
      return value.some((rel) => {
        const matterFound = rel.matterName?.toLowerCase().includes(lowerQuery);

        const degreeFound = rel.degrees?.some((deg) =>
          deg.degreeName?.toLowerCase().includes(lowerQuery),
        );

        const classFound = rel.degrees?.some((deg) =>
          deg.classes?.some((c) =>
            c.className?.toLowerCase().includes(lowerQuery),
          ),
        );

        return matterFound || degreeFound || classFound;
      });
    }

    return String(value || "")
      .toLowerCase()
      .includes(lowerQuery);
  });
};

export const alphabeticOrder = (data, order, category) => {
  if (order === "A-Z") {
    return [...data].sort((a, b) =>
      String(a[category]).localeCompare(String(b[category]), undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    );
  } else {
    return [...data].sort((a, b) =>
      String(b[category]).localeCompare(String(a[category]), undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    );
  }
};

export const deleteEntityById = (entities, id) => {
  const newData = entities.filter((entity) => entity.id !== id);

  return newData;
};

export const updateEntityById = (target, id, formData, oldEntities) => {
  const newData = Object.fromEntries(formData);

  // sem alterar relationship
  if (target === "students") {
    const updatedEntities = oldEntities.map((entity) => {
      if (entity.id === Number(id)) {
        return {
          ...entity,
          name: newData.name,
          classId: newData.classId,
        };
      }

      return entity;
    });

    return updatedEntities;
  }
};

const getRandomItem = (arr) => arr[getRandomIntInclusive(0, arr.length - 1)];

export const generateEntities = (amount, entities, target) => {
  const uniqueIds = {
    classes: mapData["classes"].map((c) => c.id),
    degrees: mapData["degrees"].map((d) => d.id),
    matters: mapData["matters"].map((m) => m.id),
    teachers: mapData["teachers"].map((t) => t.id),
  };

  if (target === "students") {
    const existingRas = new Set(entities.map((e) => e.ra));
    const newStudents = [...entities];

    let currentStudentId =
      entities.length > 0 ? Math.max(...entities.map((e) => e.id)) + 1 : 1;

    for (let i = 0; i < amount; i++) {
      let randomRa;

      do {
        randomRa = getRandomIntInclusive(10000, 999999);
      } while (existingRas.has(randomRa)); // ID unico

      existingRas.add(randomRa);

      const nextName = `Nome do aluno ${currentStudentId}`;
      const randomDegreeId = getRandomItem(uniqueIds.degrees);
      const randomClassId = getRandomItem(uniqueIds.classes);

      newStudents.push({
        id: currentStudentId++,
        ra: randomRa,
        name: nextName,
        degreeId: randomDegreeId,
        classId: randomClassId,
      });
    }

    return newStudents;
  } else {
    const newTeachers = [...entities];
    const existingRelationships = getData("relationships");

    let currentTeacherId =
      entities.length > 0 ? Math.max(...entities.map((e) => e.id)) + 1 : 1;

    let currentRelationId =
      existingRelationships.length > 0
        ? Math.max(...existingRelationships.map((r) => r.id)) + 1
        : 1;

    for (let i = 0; i < amount; i++) {
      const teacherId = currentTeacherId++;

      newTeachers.push({
        id: teacherId,
        name: `Professor ${teacherId}`,
      });

      existingRelationships.push({
        id: currentRelationId++,
        teacherId: teacherId,
        matterId: getRandomItem(uniqueIds.matters),
        degrees: [
          {
            degreeId: getRandomItem(uniqueIds.degrees),
            classes: [
              { classId: getRandomItem(uniqueIds.classes) },
              { classId: getRandomItem(uniqueIds.classes) }, // Sorteia 2 classes por serie
            ],
          },
        ],
      });
    }

    storeData("relationships", existingRelationships);

    return newTeachers;
  }
};
