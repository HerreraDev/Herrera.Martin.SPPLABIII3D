import Anuncio_Auto from "./Anuncio_Auto.js";

//ajax asinc
import {getAnunciosFetchAsync, deleteAnunciosFetchAsync} from "./abmFunctions/fetchAsync.js";
//Fetch promises
import {postAnuncioFetch, updateAnunciosFetch} from "./abmFunctions/fetchPromises.js";
//Funciones auxiliares
import {agregarSpinner, eliminarSpinner} from "./abmFunctions/auxFunctions.js";



let anuncios;

const btnFiltrarTodos = document.getElementById( 'btnFiltroTodos' );
const btnFiltrarAlquiler = document.getElementById( 'btnFiltroAlquiler' );
const btnFiltrarVentas = document.getElementById( 'btnFiltroVenta' );
const cxBoxs = document.querySelectorAll( '.cBox' );
const txtFiltro = document.getElementById( 'txtFiltro' );

window.addEventListener( 'DOMContentLoaded', loadPageHandler );

async function loadPageHandler(){
  
  //cargo anuncios
  try{
    agregarSpinner();
    anuncios = await getAnunciosFetchAsync();
    console.log(anuncios);
  }
  catch(err){
    console.error(err);
  }
  finally{
    eliminarSpinner();
  }
  
  //hanlder del click
  document.addEventListener("click", handlerClick);
  
  //cargar lista
  if (anuncios.length > 0) {
    handlerLoadList(anuncios);
  }
  
  //hanlder submit
    document.forms[0].addEventListener('submit', handlerSubmbit);

    //botones filtros
    btnFiltrarTodos.addEventListener( 'click', async( e ) => { e.preventDefault(); 
      try{
        agregarSpinner();
        filtroTodos( await getAnunciosFetchAsync() ); 
      }catch(err){
        console.log(err);
      }
      finally{
        eliminarSpinner();
      }
    });

    //botones filtros
    btnFiltrarAlquiler.addEventListener( 'click', async( e ) => { e.preventDefault();      
      try{
        agregarSpinner();
        filtroAlquiler( await getAnunciosFetchAsync() ); 
      }catch(err){
        console.log(err);
      }
      finally{
        eliminarSpinner();
      }})

      //botones filtros
      btnFiltrarVentas.addEventListener( 'click', async( e ) => { e.preventDefault();       
      try{
        agregarSpinner();
        filtroVenta( await getAnunciosFetchAsync() ); 
      }catch(err){
        console.log(err);
      }
      finally{
        eliminarSpinner();
      }})

      //botones filtros
      cxBoxs.forEach( el  =>  { mapearTabla( el, anuncios ); });

}

function limpiarFormulario(frm) {
  //saco los datos de los campos
  frm.reset();

  //oculto el boton eliminar
  document.getElementById("btnEliminar").classList.add("oculto");

  //oculto el boton cancelar
  document.getElementById("btnCancelar").classList.add("oculto");


  //vuelvo el boton de alta al original
  document.getElementById("btnSubmit").value = "Guardar";

  //seteo en cadena vacia el valor del id
  document.forms[0].id.value = "";
}

const handlerSubmbit = async(e) => {
  console.log(e);
  e.preventDefault();
  try{  

    const frm = e.target;
  
    if (frm.id.value) {
      const anuncioEditado = new Anuncio_Auto(
        parseInt(frm.id.value),
        frm.titulo.value,
        frm.transaccion.value,
        frm.descripcion.value,
        parseFloat(frm.precio.value),
        parseInt(frm.cantPuertas.value),
        parseInt(frm.cantKMS.value),
        parseInt(frm.potencia.value)
      );
  
      if (confirm("Confirma Modificacion?")) {
         try{
           agregarSpinner();
           await updateAnunciosFetch(anuncioEditado,frm.id.value);
           let anuncios = await getAnunciosFetchAsync();
           //refresco la tabla
           handlerLoadList(anuncios);
          }
         catch(err){
           console.log(err);
         }
         finally{
           eliminarSpinner();
         }
      }
    } else {
      console.log("Dando de alta");
      const nuevoAnuncio = new Anuncio_Auto(
          0,
          frm.titulo.value,
          frm.transaccion.value,
          frm.descripcion.value,
          parseFloat(frm.precio.value),
          parseInt(frm.cantPuertas.value),
          parseInt(frm.cantKMS.value),
          parseInt(frm.potencia.value)
        );
        try{
          agregarSpinner();
          await postAnuncioFetch(nuevoAnuncio);
          let anuncios = await getAnunciosFetchAsync();
          //refresco la tabla
          handlerLoadList(anuncios);
         }
        catch(err){
          console.log(err);
        }
        finally{
          eliminarSpinner();
        }

    }
  }
  catch(err){
    console.log(err);
  }
  
}





//----------------------Renderizar y crear tablas--------------------------//
function handlerLoadList(e) {
    renderizarLista(crearTabla(e), document.getElementById("divLista"));
}

function renderizarLista(lista, contenedor) {
  //vaciar el contenedor
  while (contenedor.hasChildNodes()) {
    contenedor.removeChild(contenedor.firstChild);
  }

  if (lista) {
    contenedor.appendChild(lista);
  }
}

function crearTabla(items) {
  const tabla = document.createElement("table");

  tabla.appendChild(crearThead(items[0]));
  tabla.appendChild(crearTbody(items));

  tabla.setAttribute("class","table table-bordered table-striped table-light table-hover");
  tabla.firstChild.firstChild.setAttribute("class","table-success")
  return tabla;
}

function crearThead(item) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  for (const key in item) {
      const th = document.createElement("th");
      const texto = document.createTextNode(key);
      th.appendChild(texto);
      tr.appendChild(th);
    
  }
  thead.appendChild(tr);

  return thead;
}

function crearTbody(items) {
  const tbody = document.createElement("tbody");

  items.forEach((item) => {
    const tr = document.createElement("tr");

    for (const key in item) {
      if (key === "id") {
        tr.setAttribute("data-id", item[key]);
        const td = document.createElement("td");
        const texto = document.createTextNode(item[key]);
        td.appendChild(texto);
        tr.appendChild(td);
      } else {
        const td = document.createElement("td");
        const texto = document.createTextNode(item[key]);
        td.appendChild(texto);
        tr.appendChild(td);
      }
    }
    tbody.appendChild(tr);
  });

  return tbody;
}

//---------------------------------------------------------------//


//--------------Click y carga form----------------------------//
async function handlerClick(e) {
  if (e.target.matches("td")) {
    //dataset.id es porque al tr le puse atributo "data-id"
    let id = e.target.parentNode.dataset.id;
    console.log(id);
    cargarFormulario(id);
  } else if (e.target.matches("#btnEliminar")) {
    let id = parseInt(document.forms[0].id.value);
    if (confirm("Confirma Eliminacion?")) {
      e.preventDefault();
      try{
        agregarSpinner();
        await deleteAnunciosFetchAsync(id);
        //refresco tabla
        let anuncios = await getAnunciosFetchAsync();
        handlerLoadList(anuncios); 
      }
      catch(err){
        console.error(err);
      }
      finally{
        eliminarSpinner();
      }
    }

    limpiarFormulario(document.forms[0]);
  }
  else if (e.target.matches("#btnCancelar")){
    limpiarFormulario(document.forms[0]);
  }
}

function cargarFormulario(id) {
  //desestructuro y devuelvo a la persona
  const { titulo, transaccion, descripcion, precio, cantPuertas, cantKMS, potencia } = anuncios.filter(
    (p) => p.id === parseInt(id)
  )[0];

  //referencia al form
  const frm = document.forms[0];

  //cargo el form con los datos
  frm.titulo.value = titulo;
  frm.transaccion.value = transaccion;
  frm.descripcion.value = descripcion;
  frm.id.value = id;
  frm.precio.value = precio;
  frm.cantPuertas.value = cantPuertas;
  frm.cantKMS.value = cantKMS;
  frm.potencia.value = potencia;

  document.getElementById("btnSubmit").value = "Modificar";
  document.getElementById("btnEliminar").classList.remove("oculto");
  document.getElementById("btnCancelar").classList.remove("oculto");
  
}

//-------------------------------------------------------------------------//
//Filtros:
function filtroTodos(listAux) {
  
  txtFiltro.value = "N/A";
  cxBoxs.forEach( el  =>  { mapearTabla( el, listAux ); });
  handlerLoadList(listAux);
  
}

function filtroAlquiler(listAux) {

  const anunciosAlquiler = listAux.filter( an => an.transaccion === 'Alquiler' );
  const precios = anunciosAlquiler.map( an => an.precio );
  const totalPrecios = precios.reduce( ( acc, an ) => acc + an, 0);
  const resultado = totalPrecios / precios.length;

  txtFiltro.value = resultado;

  cxBoxs.forEach( el  =>  { mapearTabla( el, anunciosAlquiler ); });
  handlerLoadList(anunciosAlquiler);
}

function filtroVenta(listAux) {

  const anunciosVentas = listAux.filter( an => an.transaccion === 'Venta' );
  const precios = anunciosVentas.map( an => an.precio );
  const totalPrecios = precios.reduce( ( acum, val ) => acum + val, 0);
  const resultado = totalPrecios / precios.length;

  txtFiltro.value = resultado;

  //mapeo los checkbox de nuevo por q la lista esta filtrada
  cxBoxs.forEach( el  =>  { mapearTabla( el, anunciosVentas ); });
  //renderizo la nueva lista porque sino no se actualiza hasta tocar un checkbox
  handlerLoadList(anunciosVentas);

}

async function mapearTabla(cbox, anunciosAux) {
  cbox.addEventListener( 'click', async() => { 
          let listAux = anunciosAux.map( anuncio => {
          let auxObj = {};  
          for (const key in anuncio) {
              if (document.getElementById('cBox'+key).checked){
                auxObj[key] = anuncio[key];
              }
          }
          
          return auxObj;
      })
      handlerLoadList(listAux);
  });
};
