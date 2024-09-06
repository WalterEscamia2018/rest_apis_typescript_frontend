/*
Con 'ProductService' nos vamos a comunicar con nuestra REST API, o sea que con este
'ProductService' vamos a hacer todos los llamados a nuestra REST API, o sea a nuestro
'BACKEND'
*/

import { safeParse } from "valibot";
import axios from "axios";
import {
  DrafProductSchema,
  ProductsSchema,
  Product,
  ProductSchema,
} from "../types";
import { toBoolean } from "../utils";

/* Este tipo de datos lo inferimos desde el 'data' que se pasa a la función
'addProduct' desde el componente 'NewProduct' */
type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    /* 'result' es lo que limpia valibot de los datos ('data') */
    const result = safeParse(DrafProductSchema, {
      /* 'name' y 'price' son los datos que queremos validar del Schema llamado
      'DrafProductSchema'. */
      name: data.name,
      price: +data.price,
    });
    if (result.success) {
      /* Ponemos el principio de nuestra dirección en una variable de entorno,
      de la siguiente manera: VITE_API_URL=http://localhost:4000, en el archivo
      llamado '.env.local' */
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Datos no validos");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    /* Para el 'GET' y el 'POST' se utiliza la misma URL. */
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios(url);
    /* 'data.data' es para entrar a la información ya guardada en la función 'addProduct' */
    const result = safeParse(ProductsSchema, data.data);
    /* Si todo esta bien */
    if (result.success) {
      /* 
      Entonces regresamos la salida, o sea lo que esta limpiado. 

      Con 'result.output' estamos regresando los productos al componente 'Products'
      */
      return result.output;
    } else {
      throw new Error("Hubo un error...");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id: Product["id"]) {
  try {
    /* Para el 'GET' y el 'POST' se utiliza la misma URL. */
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios(url);
    /* 'data.data' es para entrar a la información ya guardada en la función 'addProduct' */
    const result = safeParse(ProductSchema, data.data);
    /* Si todo esta bien */
    if (result.success) {
      /* 
      Entonces regresamos la salida, o sea lo que esta limpiado. 

      Con 'result.output' estamos regresando el producto con la 'id' seleccionada al componente
      'EditProduct'
      */
      return result.output;
    } else {
      throw new Error("Hubo un error...");
    }
  } catch (error) {
    console.log(error);
  }
}

/* 'data' es lo que el usuario ingresa en el formulario */
export async function updateProduct(data: ProductData, id: Product["id"]) {
  try {
    /* Si le damos a la opción de: console.log(result), y le damos clic al botón de 'EDITAR', y
    despues al editar un producto, le damos clic en el botón de 'Registrar Producto', entonces
    en la consola, lo que nos sale es un error (success:false) y en el arreglo de errores (issues)
    del 'result', tenemos los siguientes:

    0:{kind: 'schema', type: 'number', input: '400', expected: 'number', received: '"400"', …}
    1:{kind: 'schema', type: 'boolean', input: 'false', expected: 'boolean', received: '"false"', …}

    1. Para el primer error se esperaba que 'data.price' sea un número, no un string, por tanto la
    solución es agregarle un signo más (+) a la variable, de la siguiente manera: +data.price

    2. Para solucionar el segundo error tenemos que convertir el booleano a string. La función
    'toBoolean' del archivo 'index.ts' de la carpeta 'utils' toma el booleano llamado 'data.availability', 
    el cual previamente lo convertimos a string gracias a la función 'toString()' y regresa un string
    'true', o sea un string verdadero. Regresa un string 'true' porque estamos editando un producto, el
    cual ya pasó todas las validaciones.
    */
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: +data.price,
      availability: toBoolean(data.availability.toString()),
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, result.output);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
}

/* Esta función va a actualizar la disponibilidad de un producto. */
export async function updateProductAvailability(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    /* Como solo queremos cambiar la disponibilidad, o sea que queremos cambiar solo un campo,
    entonces usamos el Endpoint 'patch'. */
    await axios.patch(url);
  } catch (error) {
    console.log(error);
  }
}
