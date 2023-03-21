const colores_body = ["#F4FDB1",  "#a9ee8a", "#BBBAFF", "#BBBAFF", "#95FFF7",  "#FFC2E2"];
const colores_header = ["#f1f58f",  "#74ed4b", "#842bd7", "#842bd7", "#a9edf1",  "#ff32b2"];
var numero_creados = 0;
var numero_creados_frames = 0;

function agregar_postit(){
  color_nota = Math.floor(Math.random() * colores_body.length);
  var nuevo_div = document.createElement("div");
  nuevo_div.setAttribute("id","postit"+numero_creados);
  nuevo_div.setAttribute("class","postit");
  nuevo_div.setAttribute("style","background-color:"+colores_body[color_nota]);
  n_postit = "<div id=\"postit"+numero_creados+"header\" onmouseenter=dragElement(document.getElementById(\"postit"+numero_creados+"\")) class=\"postitheader\" style=\"background-color:"+colores_header[color_nota]+";\">\n" +
"          \n" +
"        </div>\n" +
"        <div style=\"display:flex;flex-direction:row;\">\n" +
"        <input type=\"text\" id=\"Titulo_postit"+numero_creados+"\" class=\"titulo\" oninput=cambiar_texto(document.getElementById(\"Titulo_postit"+numero_creados+"\"))>\n" +
"        <button class=\"eliminar\" onclick=eliminar(document.getElementById(\"postit"+numero_creados+"\")) > X </button>"+
"        </div>\n" +
"        <hr class =\"dashed\">\n" +
"        <div id=\"postit"+numero_creados+"contenido\" class=\"contenido\">\n" +
"         <div><button class=\"agregar\" id=\"boton_agregar_frame"+numero_creados+"\" onclick=agregar_frame(document.getElementById(\"postit"+numero_creados+"contenido\"),document.getElementById(\"boton_agregar_frame"+numero_creados+"\"),"+numero_creados+")> + </button></div>\n" +
"        </div>\n";

nuevo_div.innerHTML = n_postit;
var pizarra = document.getElementById("pizarra");
pizarra.appendChild(nuevo_div);
numero_creados += 1;
}

function calcular(){
  let l_inicial = document.getElementById("inicial").value;
  let l_final =  document.getElementById("final").value;
  const frames = document.getElementsByClassName("item");
  for(let frame of frames){
    const inputs = frame.getElementsByTagName("input");
    inputs[1].value = Math.round((inputs[0].value/l_inicial)*l_final);
  }
}

function agregar_frame(elmnt, btn, num){
  var nuevo_div = document.createElement("div");
  nuevo_div.className = "item";
  nuevo_div.id = "frame_"+numero_creados_frames;
  nuevo_div.innerHTML = "<span>Actual:</span>\n<input type=\"number\"/>\n<span>-></span>\n<input type=\"text\" readOnly=\"true\"/> <button class=\"eliminar\" onclick=eliminar(document.getElementById(\""+nuevo_div.id+"\")) > X </button>";
  elmnt.insertBefore(nuevo_div,btn.parentNode);
  numero_creados_frames +=1;
}

function eliminar(elmnt){
  elmnt.parentNode.removeChild(elmnt);
}

function cambiar_texto(elmnt){
  elmnt.placeholder = elmnt.value;
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    let parentElement = elmnt.parentElement;
    if(elmnt.offsetTop < 0){elmnt.style.top = "0px"; return;}
    if(elmnt.offsetTop > (parentElement.offsetHeight - elmnt.offsetHeight))     {
        elmnt.style.top = (parentElement.offsetHeight - elmnt.offsetHeight) + "px"; 
        return;
      }
    if(elmnt.offsetLeft < 0){elmnt.style.left = "0px";return}
    if(elmnt.offsetLeft > (parentElement.offsetWidth - elmnt.offsetWidth)){
        elmnt.style.left = (parentElement.offsetWidth - elmnt.offsetWidth) + "px";
        return;
    }
    
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}