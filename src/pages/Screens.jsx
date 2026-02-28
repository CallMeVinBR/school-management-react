import React from "react";
import RegistryTable from "../components/RegistryTable";

export default function Screens({ numScreen }) {
  if (numScreen == 1) {
    // STUDENTS
    return <RegistryTable key={numScreen} target={"students"} />;
  } else {
    // TEACHERS
    return <RegistryTable key={numScreen} target={"teachers"} />;
  }
}
