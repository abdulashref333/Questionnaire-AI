import { ChangeEventHandler } from "react";

interface InputProps{
  label: string;
  type: "text" | "email" | "password";
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>
}
export default function Input({label, type, value, onChange}:InputProps){
  return(
    <div className="mb-6">
      <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <input type={type} value={value} onChange={onChange} id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
    </div>
  )
}