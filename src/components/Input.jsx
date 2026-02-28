import React from "react";

export default function Input({ htmlId, type, placeholder, onChange, htmlValue, name, isRequired }) {
  return (
    <input
      id={htmlId}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={htmlValue}
      className="w-auto rounded-xl bg-amber-200 p-2 shadow outline-yellow-500 transition-all focus:bg-yellow-200"
      required={isRequired}
    />
  );
}
