import type { ChangeEventHandler } from 'react'
import { ArrowDown } from 'lucide-react'

interface SelectProps {
  defaultValue: string
  selectedOption: string
  options: string[]
  onChange: ChangeEventHandler<HTMLSelectElement>
  ariaLabel?: string
}

const Select = ({
  defaultValue,
  selectedOption,
  options,
  onChange,
  ariaLabel = 'Select an option',
}: SelectProps) => {
  return (
    <div className="relative flex-1 transition-transform-300 hover:scale-105">
      <select
        name="category"
        value={selectedOption}
        aria-label={ariaLabel}
        onChange={onChange}
        className={`w-full appearance-none rounded-full border border-gray-300 px-4 py-2
                ${selectedOption || 'text-gray-400 dark:text-gray-300'}
              `}
      >
        <option
          value=""
          className="text-gray-400 dark:text-gray-300"
        >
          {defaultValue}
        </option>
        {options.map(option => (
          <option
            key={option}
            value={option}
            className="text-gray-700"
          >
            {option}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 dark:text-gray-300">
        <ArrowDown size={18} />
      </span>
    </div>
  )
}

export default Select
