window.onload = function(){
  document.getElementById("nuevo").addEventListener("submit", function(event){
    event.preventDefault();
  });
  document.getElementById("consulta").addEventListener("submit", function(event){
    event.preventDefault();
  });
  document.getElementById("anadir").addEventListener("click", function(){
    anadir();
  });
};

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
  if (!repetido) {
  	$('#lista-dispo').append('<p class="creado">' + nuevoLibro.titulo + '</p>');
    libros.push(nuevoLibro);
  }else {
  }
}

//seleccionar el ultimo libro
$(document).ready(function(){
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

			        $('#generos').html('');
			        for (var i = 0; i < seleccionado.generos.length; i++) {
			        	$('#generos').append('<p class="seleccionado">'+ seleccionado.generos[i]+ '</p>');
          }
          //alert(seleccionado.titulo);
				}
			}
		}
	});
});

//añadir el libro al clickar en el boton de añadir
function anadir(){
$('#anadir').click(function(){
    var form = document.getElementById('nuevo');
    var titulo = form.elements[0].value;
    var autor = form.elements[1].value;
    var isbn = form.elements[2].value;
    
    var generos = [];

//esto es para que coja todos los checkboxes y no solo el primero

    $('#checkboxes').each(function(){
      if($(this).prop('checked')){
        generos.push($(this).val());
      }
    });
    var nuevoLibro = new Libro(titulo,autor,isbn,generos);
    agregarLibro(nuevoLibro);
  });
}
function prestarLibro(libro){
    $('.prestados p').each(function(){
      if($(this).html() == libro.titulo){
      }
    });
    if (existe) {
      
    }else {
      $('.prestados').append('<p class="prestado">'+libro.titulo+'</p>');
      libros.push(libro);
      $("#lista-dispo .seleccionado").remove();
    }
  }

$('#prestar').click(function(){
    var prestamo = document.getElementById('consulta');
    var titulo = prestamo.elements[0].value;
    for (var i = 0; i < libros.length; i++) {
      if (titulo == libros[i].titulo) {
        prestarLibro(libros[i]);
      }
    }
  });
/*$('#devolver').click(function(){
});*/

//Validacion JQUERY
