import { Link } from 'react-router-dom';

const Sidebar = ({ setIsCollapsed, isCollapsed,isMobile }) => {

 

    return (
        <div
            className={` transition-all duration-200 ease-in-out fixed bg-slate-800 text-white p-4 z-10 shadow-xl
            ${isCollapsed ? 'w-full h-16  sm:h-screen sm:w-16' : ' h-screen w-full sm:w-52'} 
          `}
        >
            <div className="flex items-center justify-between mb-6">
                 <h2 className={`text-xl font-bold text-white ${isCollapsed ? "flex sm:hidden" : ""}`}>Menu</h2>
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

            {!isCollapsed &&
             <ul className="space-y-2">
  {[
    { name: 'Dashboard', icon: '🏠', path: '/dashboard' },
    { name: 'Expenses', icon: '💰', path: '/dashboard/expenses' },
    { name: 'Reports', icon: '📊', path: '/reports' },
    { name: 'Settings', icon: '⚙️', path: '/settings' },
  ].map((item) => (
    <li key={item.name} 
    onClick={()=>{
      if(isMobile){
        console.log("asddas")
        setIsCollapsed((prev)=>!prev)}
      }
      
    }>
      <Link
        to={item.path}
        className={`flex items-center rounded-lg p-3 cursor-pointer transition-colors duration-200 hover:bg-slate-700 ${
          !isCollapsed ? 'justify-start' : 'justify-center'
        }`}
      >
        <span className={`${!isCollapsed ? 'mr-3' : ''} text-lg`}>{item.icon}</span>
        {!isCollapsed && <span className="font-medium">{item.name}</span>}
      </Link>
    </li>
  ))}
</ul>
            }

        </div>
    );
};

export default Sidebar;