/* En este componente vamos a tener el formulario para crear nuevos productos. */

/* 
El 'routing' para navegar entre páginas se hace con el componente llamado 'link'.

Usamos el componente Form para procesar la entrada de datos en un formulario y enviarla
al Endpoint Post
*/
import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

/* Esta función llamada 'action' nos sirve para procesar todos los datos del formulario (del componente
Form de 'react-router-dom') y enviarlos los datos al 'router'. */
/*
Por medio del parámetro 'request' vamos a recuperar y pasar los datos del formulario. 

Los datos del formulario ya no se recuperan mediante useState.
*/
export async function action({ request }: ActionFunctionArgs) {
  /* Para recuperar los datos del formulario */
  const data = Object.fromEntries(await request.formData());

  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }
  if (error.length) {
    return error;
  }

  /* 
  Gracias al 'await' el 'return' de abajo no se ejecuta hasta que la función 'addProduct' 
  ha ejecutado completamente todo su código.

  Si el código se inserta correctamente en la API, entonces finaliza el bloqueo del 'await',
  y podemos redireccionar al usuario por medio del 'return'.
  */
  await addProduct(data);

  /* 
  En la función 'action' siempre tenemos que retornar algo para que no nos salga error.

  Vamos a redireccionar con el return, una vez que se agregue el producto. Para pasar 
  de una página a otra en el 'action' vamos a usar el 'redirect'
  */
  return redirect("/");
}

export default function NewProduct() {
  /* Desde el momento que nosotros retornamos algo en nuestras acciones, van a estar disponibles para
  usarse en nuestro componente, mediante un hook de 'react-router-dom' llamado useActionData() */
  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Registrar Producto
        </h2>
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
        <ProductForm />
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}
