import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, value, handleChange, placeholder }) => {
  return (
    <div className="flex flex-col">
      <label className="text-white mb-2">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input bg-zinc-800 text-white p-3 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-[#fc1464] transition duration-300"
        placeholder={placeholder}
      />
    </div>
  );
}

export default FormField;
