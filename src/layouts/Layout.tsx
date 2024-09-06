import { Outlet } from "react-router-dom";

/* Este 'Layout' lo utilizamos para tener contenido o elementos que se comparten a lo 
largo de diferentes páginas, pero cada página va a tener su propio contenido. */
export default function Layout() {
  return (
    <>
      {/* Este 'div' se va a mantener para todas las páginas. */}
      <header className="bg-slate-800">
        <div className="mx-auto max-w-6xl py-10">
          <h1 className="text-4xl font-extrabold text-white">
            Administrador de Productos
          </h1>
        </div>
      </header>

      <main className="mt-10 mx-auto max-w-6xl p-10 bg-white shadow">
        {/* Por medio del 'Outlet' el contenido de todos los productos (Product.tsx) 
      se va a inyectar aquí.*/}
        <Outlet />
      </main>
    </>
  );
}
