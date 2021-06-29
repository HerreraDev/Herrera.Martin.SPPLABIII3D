export function agregarSpinner() {
    let spinner = document.createElement("img");
    spinner.setAttribute("src", "./assets/spinner.gif");
    spinner.setAttribute("alt", "imagen spinner");
    spinner.setAttribute("width","60px");
  
    document.getElementById("spinner-container").appendChild(spinner);
  }
  
export function eliminarSpinner() {
    document.getElementById("spinner-container").innerHTML = "";
  }