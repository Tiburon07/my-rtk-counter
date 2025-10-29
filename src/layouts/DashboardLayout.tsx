import { Outlet, NavLink } from "react-router-dom";
 
export function DashboardLayout() {
  return (
    <div className="dashboard">
      <h1>Dashboard layout</h1>
      <aside>
        <nav>
          <NavLink to=""><span style={{padding:'10px'}}>Overview</span></NavLink>
          <NavLink to="users"><span style={{padding:'10px'}}>Utenti</span></NavLink>
          <NavLink to="settings"><span style={{padding:'10px'}}>Impostazioni</span></NavLink>
        </nav>
      </aside>
      <main>
        <Outlet /> {/* Qui verrà renderizzata la rotta figlia */}
      </main>
    </div>
  );
}