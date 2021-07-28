class Field {
  errors = [];
  input

  constructor(input) {
    this.input = input;
    this.errors = [];

    let errorMessage = document.createElement('p')
    errorMessage.className = 'text-danger'
    this.input.parentNode.insertBefore(errorMessage, this.input.nextSibling)

    this.input.addEventListener('input', () => {
      this.errors = []
      this.validation()//para ampliar
      errorMessage.innerText = this.errors[0] || ''
    })
  }
  validation() { }
}

function RequiredFieldDecorator(field) {
  let validation = field.validation;
  field.validation = () => { //no modificamos función interna de la clase solo de la instancia
    validation();
    let value = field.input.value;
    if (!value) {
      field.errors.push("Required");
      return;
    }
  };
  return field;
}

function EmailFieldDecorator(field) {
  let validation = field.validation;
  field.validation = () => {
    validation();
    let value = field.input.value;
    if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {//no lo encontró
      field.errors.push("Must be an email");
      return;
    }
  };
  return field;
}

let field = new Field(document.querySelector('#email'));
field = RequiredFieldDecorator(field);
field = EmailFieldDecorator(field);
