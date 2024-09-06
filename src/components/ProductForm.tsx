import { Product } from "../types";

type ProductFormProps = {
  /* El signo de interrogación(?) hace que una propiedad sea opcional en TypeScript,
  o sea que aquí le decimos que puede o no existir un producto. */
  product?: Product;
};

/* Creamos este componente porque estos dos 'divs' son comunes a los componentes:
'EditProduct' y 'NewProduct' */
export default function ProductForm({ product }: ProductFormProps) {
  return (
    <>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="name">
          Nombre Producto:
        </label>
        <input
          id="name"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Nombre del Producto"
          name="name"
          /* 'defaultValue' es para llenar el 'nombre' del producto que se quiere editar
            en el formulario, para que nosotros lo podamos ver.*/
          defaultValue={product?.name}
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="price">
          Precio:
        </label>
        <input
          id="price"
          type="number"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Precio Producto. ej. 200, 300"
          name="price"
          /* 'defaultValue' es para llenar el 'precio' del producto que se quiere editar 
            en el formulario, para que nosotros lo podamos ver.*/
          defaultValue={product?.price}
        />
      </div>
    </>
  );
}
