import {agregarSpinner, eliminarSpinner} from "./auxFunctions.js";

export const getAnunciosFetchAsync = async () => {
  let data;
  try {
    const res = await fetch("http://localhost:5000/anuncios");

    if (!res.ok) {
      throw new Error("Ocurrio un error");
    }

    data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

  //Delete Fetch Asincronico
export const deleteAnunciosFetchAsync = async (id) => {
    try {
      const res = await fetch("http://localhost:5000/anuncios/"+ id, {method: "DELETE"});
    
      if (!res.ok) {
        throw new Error("Ocurrio un error");
      }
    }
    catch (error) {
        console.error(error);
    }
  };

  //AJAX

  
