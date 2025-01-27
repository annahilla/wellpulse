interface InputFieldProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const InputField = ({ type, placeholder, value, onChange }: InputFieldProps) => (
    <input
      className="border p-3 rounded focus:outline-none focus:border-2 focus:border-sky-500"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );

  export default InputField;