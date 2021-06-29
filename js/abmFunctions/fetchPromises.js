//Post fetch
//--------------------------------------------------------//
export const postAnuncioFetch = (nuevoAnuncio) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(nuevoAnuncio),
    };

    fetch("http://localhost:5000/anuncios", options)
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res);
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(`Error: ${err.status} : ${err.statusText}`);
      });
};

//Update Fetch
export const updateAnunciosFetch = (anuncioUpdate, id) => {
    
    const options = {
        method: "PUT",
        headers: {
        "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(anuncioUpdate),
    };
    
    fetch("http://localhost:5000/anuncios/" + id, options)
        .then((res) => {
          return res.ok ? res.json() : Promise.reject(res);
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.error(`Error: ${err.status} : ${err.statusText}`);
        });
};