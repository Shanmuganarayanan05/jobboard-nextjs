'use client';
import React from 'react';

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  name: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  required?: boolean;
  error?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  name,
  id,
  value,
  onChange,
  options,
  required = false,
  error
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className='text-red-500'>{" "}*</span>}
      </label>
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2.5 border rounded-lg ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Dropdown;
