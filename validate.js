$(document).ready(function(){
  $('#nuevo').validate({
    rules: {
      titulo:{
        required: true,
        minlength: 2
      },

      autor:{
        required: true,
        minlength: 2
      },
      isbn:{
        number: true
      }
    },
    messages: {
      titulo: "Introduce el titulo del libro.",
      autor: "Introduce el autor del libro.",
      isbn: "Introduce el ISBN del libro."
    }
  })
});