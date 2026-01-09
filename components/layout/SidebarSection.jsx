export default function SidebarSection({ title, children, collapsed = false }) {
    return (
        <div className="mb-6">
            {!collapsed && title && (
                <h3 className="px-3 mb-2 text-xs font-semibold text-[#71717A] uppercase tracking-wider">
                    {title}
                </h3>
            )}
            <div className="space-y-1">
                {children}
            </div>
        </div>
    );
}