type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  label: string;
  value: string | undefined;
  options: Option[];
  onChange: (event: { target: { value: string } }) => void;
};

export const Dropdown = ({
  label,
  value,
  options,
  onChange,
}: DropdownProps) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange} className='text-lg w-full'>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};
