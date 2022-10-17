$(document).ready(function(){

const formResponse = {
    "Name" : "",
    "Province":"",
    "City":"",
    "Sector":"",
    "Street":"",
    "Career":""
};


let Selection = [];

let Subjects = [];

const Asignatures = [{
    "Name":"Software",
    "Materias":[
        {   "Name":"Programacion-1",
            "Horarios":
            ["Lunes 6:00PM - 10:00PM","Miercoles 6:00PM - 10:00PM","Viernes 6:00PM - 10:00PM"]
        },
        {   "Name":"Programacion-2",
            "Horarios":["Martes 6:00PM - 10:00PM","Jueves 6:00PM - 10:00PM","Sabado 8:00AM - 12:00PM"]
        },
        {   "Name":"Programacion-3",
            "Horarios":["Jueves 8:00PM - 10:00PM","Jueves 6:00PM - 8:00PM","Sabado 10:00AM - 12:00PM"]
        },
        {
            "Name":"Fundamento-programacion",
            "Horarios":["Jueves 8:00AM - 12:00PM","Martes 9:00AM - 1:00PM","Sabado 10:00AM - 2:00PM"]
        },
        {
            "Name":"Base-datos-avanzada",
            "Horarios":["Miercoles 6:00PM - 10:00PM","Lunes 2:00PM - 6:00PM","Viernes 10:00AM - 2:00PM"]
        }
    ]
},
{
  "Name":"Ciberseguridad",
  "Materias":[
      {   "Name":"Calculo-diferencial",
          "Horarios":
          ["Lunes 3:00PM - 8:00PM","Viernes 8:00AM - 1:00PM","Martes 9:00AM - 2:00PM"]
      },
      {   "Name":"Etica-1",
          "Horarios":["Sabdo 8:00PM - 11:00AM","Miercoles 8:00AM - 11:00AM","Miercoles 11:00AM - 2:00PM"]
      },
      {   "Name":"Etica-2",
          "Horarios":["Jueves 8:00PM - 11:00PM","Viernes 8:00AM - 11:00AM","Miercoles 2:00MM - 5:00PM"]
      },
      {
          "Name":"Calculo-integral",
          "Horarios":["Lunes 8:00AM - 1:00PM","Miercoles 5:00PM - 10:00PM","Sabado 8:00AM - 1:00PM"]
      },
      {
          "Name":"Hacker-etico",
          "Horarios":["Martes 3:00PM - 7:00PM","Jueves 6:00PM - 10:00PM","Viernes 10:00AM - 2:00PM"]
      }
  ]
},
{
  "Name":"Ciencia & Analitca de los datos",
  "Materias":[
      {   "Name":"Base-de-datos-1",
          "Horarios":
          ["Lunes 3:00PM - 8:00PM","Viernes 8:00AM - 1:00PM","Martes 9:00AM - 2:00PM"]
      },
      {   "Name":"Base-de-datos-2",
          "Horarios":["Sabdo 8:00PM - 11:00AM","Miercoles 8:00AM - 11:00AM","Miercoles 11:00AM - 2:00PM"]
      },
      {   "Name":"Base-de-datos-3",
          "Horarios":["Jueves 8:00PM - 11:00PM","Viernes 8:00AM - 11:00AM","Miercoles 2:00MM - 5:00PM"]
      },
      {
          "Name":"Programacion-1",
          "Horarios":["Lunes 8:00AM - 1:00PM","Miercoles 5:00PM - 10:00PM","Sabado 8:00AM - 1:00PM"]
      },
      {
          "Name":"Programacion-2",
          "Horarios":["Martes 3:00PM - 7:00PM","Jueves 6:00PM - 10:00PM","Viernes 10:00AM - 2:00PM"]
      }
  ]
}];

$("#container").on("click","#btn-save",function(){
    Save();
});

$("#container").on("click","#btn-clear",function(){
    Clear();
});

$("#container").on("click","#LoadForm",function(){
  ClearArr();
  BuildForm();
});

$("#container").on("click","#LoadSelectionSubject",function(){
  ClearArr();
  $("#Confirmation").remove();
  GenerateSelection();
})

$("#container").on("click","#btn-next",function(){
  BuildConfirmation();
});

$("#container").on("click","#btn-finish",function(){
  Finish()
});

function Save() {

    if(!Validate()){
        toastr.error("Debe completa toda las informaciones resaltada de color rojo.", "Oops ha ocurrido un error", {
            TimeOut: 1500,
            positionClass: "toast-top-right"
          });

          return;
    }
      
      $("#form").remove();
      GenerateSelection();
}

function Finish(){
  
  $.confirm({
      title: "Estas seguro que deseas finzalizar este proceso?",
      content: "",
      buttons: {
        cancel: {
          text: "Cancelar",
          btnClass: "btn btn-danger",
          action: function () {},
        },
        confirm: {
          text: "Aceptar",
          btnClass: "btn btn-success",
          action: function () {
            ClearArr();
            $("#Confirmation").remove();
            BuildForm();
            Clear();;
          },
        },
      },
    });
}

function Validate(){

    const form = [$("#name"),$("#province"),$("#city"),$("#sector"),$("#street"),$("#career")];
    let validated = true;

    for(x=0;x<form.length ; x++){

        if(IsNullOrWhiteSpace(form[x].val())){
            validated = false;
            form[x].addClass("input-error");
        }
        else{
            form[x].removeClass("input-error");
        }
    }

    if(validated)
    {
        formResponse.Name = $("#name").val();
        formResponse.Province = $("#province").val();
        formResponse.City = $("#city").val();
        formResponse.Sector = $("#sector").val();
        formResponse.Street = $("#street").val();
        formResponse.Career = $("#career").val();

    }

    return validated;

}


function GenerateSelection(){

    let item = GenerateNav();
    item += GenerateHeader();
    item += GenerateItems();
    item += GenerateFooter();
    $("#container").append(item);

}

function BuildForm(){
  let item = GenerateForm();
  $(`#SelectionMats`).remove();
  $(`#Confirmation`).remove();
  $("#container").append(item);
  $(`#career > option[value="${formResponse.Career}"]`).attr("selected",true);
}

function BuildConfirmation(){

  for(x=0;x< Subjects.length ; x++){
    let value = $(`input[type='radio'][name='${Subjects[x].Name}']:checked`).val();

    if(value !== null && value !== undefined){
      Selection.push(value);    
    }
    else{
      Selection.push("NO");    
    }
  }
  $(`#SelectionMats`).remove();
  $("#container").append(GenerateConfirmation());
}

function GenerateNav(){

    const nav = ` <div id="SelectionMats">
    <div class="m-3 mx-md-auto">
    <div class="row mb-2">
      <div class="col-8 col-md-8 offset-2 border border-light border-opacity-25 bg-light">
        <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li id="LoadForm" class="breadcrumb-item mt-1"><a href="#"> Datos personales</a></li>
            <li class="breadcrumb-item active mt-1" aria-current="page">Seleccion de materia</li>
          </ol>
        </nav>
      </div>
    </div>
  </div>`;

  return nav;
}

function GenerateHeader(){
    const header = ` <div class="row">
    <div class="col-8 col-md-8 offset-2">           
      <div class="card">
        <div class="card-header text-white bg-dark">
          <h4 class="text-center">Selección de materias</h4>
        </div>                     
          <div class="m-3">
            <div class="accordion accordion-flush" id="accordion-${formResponse.Career}">`;

    return header;
}

function GenerateItems(){
    let Items = ``;
    Subjects = FindCareer();

    for(x=0;x<Subjects.length;x++){

        let name = Subjects[x].Name;

        let withOutScore = splitByScore(name);

        Items += `<div class="accordion-item">
        <h2 class="accordion-header" id="flush-heading-${name}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${name}" aria-expanded="false" aria-controls="flush-collapseOne">
           ${withOutScore}
          </button>
        </h2>
        <div id="flush-collapse-${name}" class="accordion-collapse collapse" aria-labelledby="flush-heading-${name}" data-bs-parent="#accordion-${formResponse.Career}">
        <div class="accordion-body text-center">`;

        let horario = Subjects[x].Horarios;

        for(i=0;i<horario.length;i++){

            Items += `<div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="${name}" id="${name}-${i}" value="${i}">
            <label class="form-check-label fs-7" for="${name}-${i}">
              ${horario[i]}
            </label>
          </div>`;
        }

        Items += `</div>
        </div>
            </div>`;
    }

    Items += "</div>";

    return Items;
}

function GenerateFooter(){
    let foot = `</div>
    <button
      type="button"
      class="btn btn-outline-warning float-end"
      id="btn-next"
    >
      Avanzar
    </button>
  </div>
</div>
</div>
</div>
</div>`;

return foot;
}

function GenerateForm(){
  return`<div id="form" class="m-3 mx-md-auto">
  <div class="row mb-2">
      <div class="col-8 col-md-8 offset-2 border border-light border-opacity-25  bg-light">
          <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                  <li class="breadcrumb-item active mt-1" aria-current="page">Datos personales</li>
              </ol>
          </nav>
      </div>
  </div>
  <div class="row">
    <div class="col-8 col-md-8 offset-2">           
      <div class="card">
        <div class="card-header text-white bg-dark">
          <h4 class="text-center">Selección de materias</h4>
        </div>
        <div class="card-body m-1">
          <div class="card-title">
            <h4 class="p-1 ps-0">Complete los datos personales</h4>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nombre:</label>
            <input type="text" class="form-control" id="name" value = "${formResponse.Name}" />
          </div>
          <div class="mb-3">
            <label for="province" class="form-label">Provincia:</label>
            <input type="text" class="form-control" id="province" value = "${formResponse.Province}"/>
          </div>
          <div class="mb-3">
            <label for="city" class="form-label">Ciudad:</label>
            <input type="text" class="form-control" id="city" value = "${formResponse.City}" />
          </div>
          <div class="mb-3">
            <label for="sector" class="form-label">Sector:</label>
            <input type="text" class="form-control" id="sector" value = "${formResponse.Sector}"/>
          </div>
          <div class="mb-3">
            <label for="street" class="form-label">Calle:</label>
            <input type="text" class="form-control" id="street" value = "${formResponse.Street}" />
          </div>
          <div class="mb-3">
            <label for="career" class="form-label">Carrera:</label>
            <select class="form-select" id="career" value = "${formResponse.Career}">
              <option value="" selected>Seleccione una carrera:</option>
              <option value="1">Software</option>
              <option value="2">Ciberseguridad</option>
              <option value="3">Ciencia & Analita de los datos</option>
            </select>
          </div>
          <button
            type="button"
            class="btn btn-outline-primary float-end"
            id="btn-save"
          >
            Guardar
          </button>
          <button
            type="button"
            class="btn btn-outline-warning float-end me-1"
            id="btn-clear"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

function GenerateConfirmation(){
  let item = `<div id="Confirmation">
  <div class="row mb-2">
    <div class="col-8 col-md-8 offset-2 border border-light border-opacity-25  bg-light">
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
          <ol class="breadcrumb">
              <li id="LoadForm" class="breadcrumb-item mt-1"><a href="#"> Datos personales</a></li>
              <li id="LoadSelectionSubject" class="breadcrumb-item mt-1"><a href="#">Seleccion de materia</a></li>
              <li class="breadcrumb-item active mt-1" aria-current="page">Confirmacion</li>
          </ol>
        </nav>
    </div>
  </div>
  <div class="row">
    <div class="col-8 col-md-8 offset-2">    
      <div class="card">
        <div class="card-header bg-info">
          Confirmacion de datos
        </div>
        <div class="card-body">
          <h5 class="card-title fw-bolder">Informacion</h5>
          <hr class="bg-info">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">${formResponse.Name}</li>
            <li class="list-group-item">${formResponse.Province}</li>
            <li class="list-group-item">${formResponse.City}</li>
            <li class="list-group-item">${formResponse.Sector}</li>
            <li class="list-group-item">${formResponse.Street}</li>
            <li class="list-group-item">${formResponse.Career == 1 ? 'Software' : formResponse.Career == 2 ? 'Ciberseguridad' : 'Ciencia & Analitica de los datos'}</li>
          </ul>
        <div class="col-12 col-md-12">`

        item += GenerateTable();
        return item;
}

function GenerateTable(){

  let item = `<table class="table table-striped">
  <thead>
    <tr>
    <th scope="col">Asignatura</th>
    <th scope="col">Lunes</th>
    <th scope="col">Martes</th>
    <th scope="col">Miercoles</th>
    <th scope="col">Jueves</th>
    <th scope="col">Viernes</th>
    <th scope="col">Sabado</th>
  </tr>
</thead>
<tbody>`;

  for(x=0;x<Selection.length;x++){

    let withOutScore = splitByScore(Subjects[x].Name);
    item += ` <tr>
    <th scope="row"> ${withOutScore}</th>`;
    
    if(Selection[x] !== "NO"){
      
    let day = FindAtDay(Subjects[x].Horarios[Selection[x]])

      for(i=0;i<day;i++){
        item += "<td></td>";
      }
      item +=`
      <td colspan="${6 - day}">${Subjects[x].Horarios[Selection[x]]}</td>
    </tr>`;
    }else{
      item += "<td colspan='6'>No seleccionada</td>";
    }
  }
 item +=`
  </tbody>
</table>
</div>
<div class="text-end">
  <button id="btn-finish" class="btn btn-outline-success ">Finalizacion</button>
</div>
</div>
</div>
</div>          
</div>
</div>`;

return item;
}
function Clear(){
    const form = [$("#name"),$("#province"),$("#city"),$("#sector"),$("#street"),$("#career")];
    for(x=0;x<form.length ; x++){

        form[x].removeClass("input-error");
        form[x].val("");
    }

    form[0].focus();
}

function FindCareer(){

    switch(formResponse.Career){
        case '1':
            return Asignatures[0].Materias;
        case '2':
            return Asignatures[1].Materias;
        case '3':
            return Asignatures[2].Materias;
        default:
            return [];
    }
}

function splitByScore(string){

  const arr = string.split("-");
  let withOutScore ="";
  for(i = 0 ; i < arr.length; i++){
     withOutScore += `${arr[i]} `;
  }
    return withOutScore;
}

function FindAtDay(string){

  const arr = string.split(" ");

  switch(arr[0]){
    case "Lunes":
        return 0;
    case "Martes":
        return 1;
    case "Miercoles":
        return 2;
    case "Jueves":
        return 3;
    case "Viernes":
        return 4;
    case "Sabado":
        return 5;
    default:
        return "0";
  }
}

function ClearArr(){
  Selection = [];
  Subjects =[];
}

});
