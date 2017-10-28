// Wait for the DOM to be ready
$(function() {
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("form[name='registration']").validate({
      // Specify validation rules
      rules: {
        // The key name on the left side is the name attribute
        // of an input field. Validation rules are defined
        // on the right side
        nome_completo: "required",
        username: "required",

        password: {
          required: true,
          minlength: 5
        }
      },
      // Specify validation error messages
      messages: {
        nome_completo: "Por favor entre seu nome completo.",
        password: {
          required: "Por favor escolha uma senha.",
          minlength: "Sua senha deve conter no mínimo 5 caracteres."
        },

      },
      // Make sure the form is submitted to the destination defined
      // in the "action" attribute of the form when valid
      submitHandler: function(form) {
        form.submit();
      }
    });
  });