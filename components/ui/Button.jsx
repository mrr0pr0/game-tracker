export default function Button({
                                   children,
                                   variant = 'primary',
                                   size = 'md',
                                   type = 'button',
                                   disabled = false,
                                   onClick,
                                   className = '',
                                   ...props
                               }) {
    const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-[#FAFAFA] text-black hover:bg-[#E5E5E5]',
        secondary: 'bg-transparent border border-[#2A2A2A] text-[#FAFAFA] hover:bg-[#161616] hover:border-[#3A3A3A]',
        danger: 'bg-transparent border border-[#3F1D1D] text-[#EF4444] hover:bg-[#1A0F0F]',
        ghost: 'bg-transparent text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#161616]',
    };

    const sizes = {
        sm: 'h-8 px-3 text-xs',
        md: 'h-9 px-4 text-sm',
        lg: 'h-11 px-6 text-base',
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}