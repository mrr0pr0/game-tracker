export default function Select({
                                   label,
                                   options = [],
                                   error,
                                   className = '',
                                   ...props
                               }) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-[#FAFAFA] mb-2">
                    {label}
                </label>
            )}
            <select
                className={`
          w-full h-10 px-3 rounded-lg
          bg-[#000] border border-[#2A2A2A]
          text-[#FAFAFA] text-sm
          focus:outline-none focus:border-[#7C3AED]
          disabled:opacity-50 disabled:cursor-not-allowed
          cursor-pointer
          ${error ? 'border-[#EF4444]' : ''}
          ${className}
        `}
                {...props}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-xs text-[#EF4444]">{error}</p>
            )}
        </div>
    );
}