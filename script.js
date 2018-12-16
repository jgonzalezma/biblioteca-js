function Libro(titulo, autor, isbn, generos){
	this.titulo = titulo;
	this.autor = autor;
	this.isbn = isbn;
	this.generos = generos;
}

//lista de libros vacia
var libros = [];

//agregar el libro
function agregarLibro(nuevoLibro){
  var repetido = false;
  $('#lista-dispo p').each(function(){
    if($(this).html() == nuevoLibro.titulo){
      repetido = true;
    }
    if($(this).hasClass('creado')){
      $(this).removeClass('creado');
    }
  });

  //si el libro no esta repetido lo agrega y sino, sale una alerta
  if (repetido) {
  }else{
      $('#lista-dispo').append('<p id="libros" class="creado">'+nuevoLibro.titulo+'</p>');
        libros.push(nuevoLibro);
        $('#nuevo')[0].reset();
    }
}

//Listeners
$(document).ready(function(){
  document.getElementById("nuevo").addEventListener("submit", function(event){
    event.preventDefault();
  });
  document.getElementById("consulta").addEventListener("submit", function(event){
    event.preventDefault();
  });
  document.getElementById("anadir").addEventListener("click", function(){
    anadir();
  });
  document.getElementById("anadir").addEventListener("click", function(){
    prestar();
  });
  document.getElementById("anadir").addEventListener("click", function(){
    devolver();
  });

  //seleccionar el ultimo libro
	$('#lista-dispo').on('click', 'p', function(){
		for(var i = 0; i < libros.length; i++){
			if($(this).html() == libros[i].titulo){
				var consulta = document.getElementById('consulta');
				var seleccionado = libros[i];
				if (consulta.elements[0].value == seleccionado.titulo) {
				}else{
					$(this).removeClass('creado');
			        $(this).addClass('seleccionado');
			        consulta.elements[0].value = seleccionado.titulo;
			        consulta.elements[1].value = seleccionado.autor;
			        consulta.elements[2].value = seleccionado.isbn;
              $('#generos-consulta').html('');
          for(var i = 0; i < seleccionado.generos.length; i++){
            $('#generos-consulta').append(seleccionado.generos[i]+ ' , ');
          }
				}
			}
		}

	});
  $('#lista-prest').on('click', 'p', function(){
    for (var i = 0; i < libros.length; i++) {
      if($(this).html() == libros[i].titulo){
        var libroSeleccionado = libros[i];
        var consultarLibro = document.getElementById('consulta');
        if(consultarLibro.elements[0].value == libroSeleccionado.titulo){
        }else{
          $(this).removeClass('prestados');
          $(this).addClass('seleccionado');
          consultarLibro.elements[0].value = libroSeleccionado.titulo;
          consultarLibro.elements[1].value = libroSeleccionado.autor;
          consultarLibro.elements[2].value = libroSeleccionado.isbn;

          $('#generos-consulta').html('');
          for (var i = 0; i < libroSeleccionado.generos.length; i++) {
            $('#generos-consulta').append(libroSeleccionado.generos[i]+ ' , ');
          }
        }
      }
    }
  });

//añadir el libro al clickar en el boton de añadir
function anadir(){
    var form = document.getElementById('nuevo');
    var titulo = form.elements[0].value;
    var autor = form.elements[1].value;
    var isbn = form.elements[2].value;
    var generos = [];
    $('#checkboxes input').each(function(){
      if($(this).prop('checked')){
        generos.push($(this).val());
      }
    });

//esto es para que coja todos los checkboxes y no solo el primero

   
    var nuevoLibro = new Libro(titulo,autor,isbn,generos);
    agregarLibro(nuevoLibro);
}
function prestar(libro){
  var esPrestado = false;
  $('#lista-prest p').each(function(){
    if($(this).html() == libro.titulo){
      esPrestado = true;
    }
  });
  if(esPrestado){
  }else{
    $('#lista-prest').append('<p class="prestado">'+libro.titulo+'</p>');
    $('#lista-dispo .seleccionado').remove();
    $('#consulta')[0].reset();
    var resetGeneros = document.getElementById('generos-consulta');
    while(resetGeneros.hasChildNodes()){
      resetGeneros.removeChild(resetGeneros.lastChild);
    }
  }
}

function devolver(libro){
  var esPrestado = false;
  $('#lista-dispo p').each(function(){
    if($(this).html() == libro.titulo){
      esPrestado = true;
    }
  });
  if(esPrestado){
  }else{
    $('#lista-dispo').append('<p id="libros" class="devuelto">'+libro.titulo+'</p>');
    $('#lista-prest .seleccionado').remove();


    $('#consulta')[0].reset();
    var resetGeneros = document.getElementById('generos-consulta');
    while(resetGeneros.hasChildNodes()){
      resetGeneros.removeChild(resetGeneros.lastChild);
    }
  }
}

  $('#prestar').click(function(){
    var prestamoLibro = document.getElementById('consulta');
     var tituloLibro = prestamoLibro.elements[0].value;
        for(var i = 0; i < libros.length; i++){
          if(tituloLibro == libros[i].titulo ){
            prestar(libros[i]);
          }
        }
  })

  $('#devolver').click(function(){
    var prestamoLibro = document.getElementById('consulta');
     var tituloLibro = prestamoLibro.elements[0].value;
        for(var i = 0; i < libros.length; i++){
          if(tituloLibro == libros[i].titulo ){
            devolver(libros[i]);
          }
        }
  })
  });
/*$('#devolver').click(function(){
});*/

