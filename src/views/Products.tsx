/*
OJO IMPORTANTE: Esta vista va a a mostrar todos los productos de nuestra API. 
'Products.tsx' es nuestra vista principal.

El contenido de Products se va a inyectar en el Outlet que se encuentra en
Layout
*/

/* 
El 'routing' para navegar entre páginas se hace con el componente llamado 'link'

Para pasar de la función 'loader' al componente 'Product', aqui mismo, vamos a 
usar el hook 'useLoaderData'
*/
import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom";
import {
  getProducts,
  updateProductAvailability,
} from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";
import { Product } from "../types";

/* Este loader se carga antes del componente. De esta forma obtiene los datos antes de
que el componente este listo. */
export async function loader() {
  /* Obtenemos todo el arreglo de objetos de 'data.data' de la API, a traves del return 
  que regresa 'result.output' desde la función asíncrona 'getProducts' */
  const products = await getProducts();
  /* Al retornar los productos, ahora puedo usarlos en el componente 'Product' */
  return products;
}

/* 
Este 'action' esta en el componente principal ('Products.tsx'), y entonces va a
estar disponible para el componente hijo, el cual se llama 'ProductDetails.tsx'

Desde 'useFetcher' de 'ProductDetails' se manda el value de 'availability' 
*/
export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  await updateProductAvailability(+data.id);
  return {};
}

export default function Products() {
  const products = useLoaderData() as Product[];
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to="productos/nuevo"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Agregar Producto
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          {/* Aquí se van a mostrar todos los productos. */}
          <tbody>
            {products.map((product) => (
              <ProductDetails key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
