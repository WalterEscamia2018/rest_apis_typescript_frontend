import { object, string, number, boolean, InferOutput, array } from "valibot";

/*
'DrafProduct' solo tiene el 'nombre' y el 'precio', ya que el 'id' y la 'disponibilidad' 
lo genera la base de datos.
*/
export const DrafProductSchema = object({
  name: string(),
  price: number(),
});

/*
Este ProductSchema ya viene desde la base de datos, por tanto ya tiene el 'id' y la
'disponibilidad'
*/
export const ProductSchema = object({
  id: number(),
  name: string(),
  price: number(),
  availability: boolean(),
});

/* Esto lo hacemos así porque de 'data.data' vemos que es un arreglo de objetos. */
export const ProductsSchema = array(ProductSchema);
export type Product = InferOutput<typeof ProductSchema>;
