/*
OJO IMPORTANTE: Para el Backend se utiliza el 'router' de 'EXPRESS', para el Frontend se
utiliza el 'router' de 'react-router-dom'
*/

import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, {
  loader as productsLoader,
  action as updateAvailabilityAction,
} from "./views/Products";
/* 
Para conectar nuestro formulario con nuestro router para las direcciones, hacemos uso de la
función asíncrona llamada 'action'.

Todas las funciones con las que enviamos los datos se llaman 'action', entonces como
no podemos tener en un mismo archivo a varias funciones que tengan el mismo nombre, lo
que vamos a hacer es ponerle un alias a la función 'action' que obtenemos del archivo
'NewProduct' 

OJO IMPORTANTE: Los 'loaders' son para obtener datos, y los 'action' son para modificar los
datos existentes.
*/
import NewProduct, { action as NewProductAction } from "./views/NewProduct";
import EditProduct, {
  loader as editProductLoader,
  action as editProductAction,
} from "./views/EditProduct";

import { action as deleteProductAction } from "./components/ProductDetails";

/*
En este router vas declarando tus rutas en un arreglo, y después vas definiendo cada ruta
en un objeto.
*/
export const router = createBrowserRouter([
  {
    /* Esta es la página principal */
    path: "/",
    element: <Layout />,
    /* 'children' lo que va a hacer que las páginas que esten en este arreglo, van a ser hijos 
    del componente 'Layout'. Por tanto el contenido de páginas como el componente Products.tsx
    se van a inyectar en el 'Outlet', porque estamos diciendo que van a ser hijos del componente
    'Layout'. Cada hijo o página va a ser un objeto. */
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        /* El action llamado 'updateAvailabilityAction' lo importamos desde 'Products' */
        action: updateAvailabilityAction,
      },
      {
        /* Cuando alguien visite la ruta llamada 'productos/nuevo', vamos a cargar el componente
        NewProduct */
        path: "productos/nuevo",
        element: <NewProduct />,
        action: NewProductAction,
      },
      {
        path: "productos/:id/editar", // ROA Pattern - Resource-oriented design
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction,
      },
      {
        path: "productos/:id/eliminar",
        /* Este 'deleteProductAction' es una 'action' que vamos a importar del componente
        'ProductDetails' */
        action: deleteProductAction,
      },
    ],
  },
]);
