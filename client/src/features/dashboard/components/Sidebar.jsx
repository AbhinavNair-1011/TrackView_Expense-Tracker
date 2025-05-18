const Sidebar = ({ setIsCollapsed, isCollapsed }) => {
    return (
        <div
            className={`transition-all duration-300 ease-in-out fixed bg-slate-800 text-white h-screen p-4 z-20 shadow-xl
            ${isCollapsed ? 'w-16' : 'w-52'}
          `}
        >
            <div className="flex items-center justify-between mb-6">
                {!isCollapsed && <h2 className="text-xl font-bold text-white">Menu</h2>}
                <button
                    className="p-2 rounded-full hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    
                >
                    <div className="space-y-1.5">
                        <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${!isCollapsed ? 'rotate-45 translate-y-1.5' : ''}`} />
                        <div className={`w-5 h-0.5 bg-white transition-opacity duration-300 ${!isCollapsed ? 'opacity-0' : ''}`} />
                        <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${!isCollapsed ? '-rotate-45 -translate-y-1.5' : ''}`} />
                    </div>
                </button>
            </div>

                       <ul className="space-y-2">
                {[
                    { name: 'Dashboard', icon: '🏠' },
                    { name: 'Expenses', icon: '💰' },
                    { name: 'Reports', icon: '📊' },
                    { name: 'Settings', icon: '⚙️' }
                ].map((item) => (
                    <li 
                        key={item.name}
                        className={`flex items-center rounded-lg p-3 cursor-pointer transition-colors duration-200 hover:bg-slate-700 ${!isCollapsed ? 'justify-start' : 'justify-center'}`}
                    >
                        <span className={`${!isCollapsed ? 'mr-3' : ''} text-lg`}>{item.icon}</span>
                        {!isCollapsed && <span className="font-medium">{item.name}</span>}
                    </li>
                ))}
            </ul>

            {!isCollapsed && (
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="border-t border-slate-700 pt-4">
                        <div className="text-sm text-slate-400">v1.0.0</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;