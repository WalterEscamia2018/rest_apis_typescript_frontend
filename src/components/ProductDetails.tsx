/*
Con 'Link' y 'useNavigate' podemos pasar de una página a otra.

'Link' solo puede ser usado en la parte del 'return'. Mientras que 'useNavigate' puede ser
usado en el 'return' o antes del 'return', o sea que se puede usar en alguna función.

*/
import {
  useNavigate,
  Form,
  ActionFunctionArgs,
  redirect,
  useFetcher,
} from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
  product: Product;
};

/* Con este 'action' vamos a conectar la ruta: 'productos/:id/eliminar' que se encuentra
en el 'router' */
export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    /* Ponemos el 'await' para que la línea del 'return', o sea la linea que dice:
    (return redirect("/")) no se ejecute, hasta que no se realice la eliminación de
    ese producto, o sea hasta que no se ejecute la función 'deleteProduct' de
    'ProductService' */
    await deleteProduct(+params.id);
    return redirect("/");
  }
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  /*
  'fetcher' es bastante útil cuando queremos hacer interacciones en la misma página, o
  sea sin cambiar a otra página, como por ejemplo: cuando le damos like a un 'Tweet' 
  de la plataforma 'X', o cuando le damos like a una publicación de 'Facebook', o le
  damos like a una publicaión de 'Instagram'. Cuando le damos like a una publicación,
  entonces los likes se actualizan, pero no me lleva a otra página.
  */
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const isAvailable = product.availability;
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        {/* 
        El 'fetcher' es un componente que lo vamos a utilizar con el formulario.
        
        'fetcher.Form' va a hacer que nos conectemos correctamente con 'react-router-dom', y vamos
        a poder llamar correctamente al código que tenemos en la acción que se encuentra en el 
        componente 'Product.tsx'

        Gracias al 'fetcher' no es necesario tener un redirect.
        */}
        <fetcher.Form method="POST">
          <button
            /* El 'type' lo tenemos que cambiar de 'button' a 'submit'*/
            type="submit"
            name="id"
            /* Pasamos el 'id' del producto que necesitamos editar. */
            value={product.id}
            className={`${isAvailable ? "text-black" : "text-red-600"} 
            rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
          >
            {isAvailable ? "Disponible" : "No Disponible"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate(`/productos/${product.id}/editar`)}
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs 
            text-center"
          >
            Editar
          </button>
          <Form
            className="w-full"
            method="POST"
            /* Al presionar el 'input' del formulario va a ir a esta URL, y entonces va a estar dentro del 'path' 
            para eliminar del 'router.tsx', y así va a detectar el 'action' llamado 'deleteProductAction'. Ya que
            la URL del 'path' y esta URL de 'ProductDetails' son las mismas ("productos/:id/eliminar")  

            El 'action' que tenemos en este componente ('ProductDetails') es el mismo que el 'action' del 'router'
            */
            action={`productos/${product.id}/eliminar`}
            /* Este elemento llamado 'onSubmit' se va a ejecutar antes del 'action'. Lo vamos a utilizar para no
            eliminar inmediatamente el producto, si no para preguntar al usuario si lo quiere eliminar. */
            onSubmit={(e) => {
              if (!confirm("¿Está seguro que desea eliminar este producto?")) {
                /* Ponemos el 'e.preventDefault()' para que se ejecute antes del código del acción*/
                e.preventDefault();
              }
            }}
          >
            {/* Al presionar el 'input', va a ir al 'action' del componente 'Form', y de ahí va a ir hacia
            la URL (productos/${product.id}/eliminar), y llega al 'router.tsx' para ejecutar el código de 
            el 'action' que ahí se encuentra, y se redirige a la página de inicio ('http://localhost:5173/')*/}
            <input
              type="submit"
              value="Eliminar"
              className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs 
            text-center"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
