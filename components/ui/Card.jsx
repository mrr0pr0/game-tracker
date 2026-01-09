export default function Card({
                                 children,
                                 hover = false,
                                 className = ''
                             }) {
    return (
        <div
            className={`
        bg-[#111] border border-[#1F1F1F] rounded-xl p-4
        ${hover ? 'card-hover cursor-pointer' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
}