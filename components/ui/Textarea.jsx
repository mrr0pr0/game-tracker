export default function Textarea({
                                     label,
                                     error,
                                     rows = 4,
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
            <textarea
                rows={rows}
                className={`
          w-full px-3 py-2 rounded-lg
          bg-[#000] border border-[#2A2A2A]
          text-[#FAFAFA] text-sm
          placeholder:text-[#71717A]
          focus:outline-none focus:border-[#7C3AED]
          disabled:opacity-50 disabled:cursor-not-allowed
          resize-none
          ${error ? 'border-[#EF4444]' : ''}
          ${className}
        `}
                {...props}
            />
            {error && (
                <p className="mt-1 text-xs text-[#EF4444]">{error}</p>
            )}
        </div>
    );
}