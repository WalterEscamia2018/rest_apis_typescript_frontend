/* En este componente vamos a tener el formulario para crear nuevos productos. */

/* 
El 'routing' para navegar entre páginas se hace con el componente llamado 'link'.

Usamos el componente Form para procesar la entrada de datos en un formulario y enviarla
al Endpoint Post.
*/
import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

/* 
Para habilitar la edición desde la URL. Por ejemplo para que podamos editar al entrar
directamente a la siguiente URL: http://localhost:5173/productos/3/editar

Con este loader vamos a obtener el 'id' del producto desde la URL.  

Por medio de 'params' vamos a obtener la 'id' del producto.

Esto nos va a servir para cuando queramos editar un producto.
*/
export async function loader({ params }: LoaderFunctionArgs) {
  /* Primero comprobamos que 'params.id' no sea 'undefined' */
  if (params.id !== undefined) {
    /* Si 'params.id' no es 'undefined', entonces lo pasamos y convertimos a número para
    hacia 'getProductById'  */
    const product = await getProductById(+params.id);
    if (!product) {
      return redirect("/");
    }
    return product;
  }
}

/* Esta función llamada 'action' nos sirve para procesar todos los datos del formulario (del componente
Form de 'react-router-dom') y enviarlos los datos al 'router'. */
/*
Por medio del parámetro 'request' vamos a recuperar y pasar los datos del formulario. 

Los datos del formulario ya no se recuperan mediante useState.
*/
export async function action({ request, params }: ActionFunctionArgs) {
  /* Para recuperar los datos del formulario */
  const data = Object.fromEntries(await request.formData());

  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }
  if (error.length) {
    return error;
  }

  if (params.id !== undefined) {
    /* 
  Gracias al 'await' el 'return' de abajo no se ejecuta hasta que la función 'updateProduct' 
  ha ejecutado completamente todo su código.

  Si el código se inserta correctamente en la API, entonces finaliza el bloqueo del 'await',
  y podemos redireccionar al usuario por medio del 'return'.
  */
    await updateProduct(data, +params.id);

    /* 
  En la función 'action' siempre tenemos que retornar algo para que no nos salga error.
  Por el momento vamos a retornar un objto vacio ({})

  Más adelante vamos a redireccionar con el return, una vez que se agregue el producto.
  */
    return redirect("/");
  }
}

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

export default function EditProduct() {
  const product = useLoaderData() as Product;
  /* Desde el momento que nosotros retornamos algo en nuestras acciones, van a estar disponibles para
  usarse en nuestro componente, mediante un hook de 'react-router-dom' llamado useActionData() */
  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Volver a Productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {/* El componente Form de 'react-router-dom' nos sirve para procesar los datos y enviarlos al 
      Endpoint 'POST' */}
      <Form className="mt-10" method="POST">
        <ProductForm product={product} />
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            /* Como la disponibilidad ('availability') nosotros la habiamos definido en el Schema
            como un 'boolean', entonces tenemos que usar el método 'toString()' para pasarlo a
            'string' y que no nos marque ningún error en el código HTML. */
            /* Este product.availability lo pasamos a 'string' con el método 'toString()'
            porque HTML no puede leer booelans o numbers, si no que todo lo trata como 
            'strings'. */
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Guardar Cambios"
        />
      </Form>
    </>
  );
}
