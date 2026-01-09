import { STATUSES } from '@/lib/constants';

export default function Badge({ status, className = '' }) {
    const statusConfig = STATUSES.find(s => s.value === status) || STATUSES[2];

    return (
        <span
            className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md
        text-xs font-medium
        bg-[#111] border border-[#2A2A2A]
        ${className}
      `}
        >
      <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: statusConfig.color }}
      />
            {statusConfig.label}
    </span>
    );
}