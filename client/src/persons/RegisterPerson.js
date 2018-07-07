import React, { Component } from 'react'

class RegisterPerson extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      age: '',
      photo: ''
    }
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleAgeChange(event) {
    this.setState({
      age: event.target.value
    })
  }

  handlePhotoChange(event) {
    this.setState({
      photo: event.target.value
    })
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1 className="mt-2 mb-2">Cadastrar Pessoa</h1>
          <hr />
          <form class="needs-validation" novalidate>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="validationTooltip01">Name</label>
                <input type="text" class="form-control" id="validationTooltip01" placeholder="Name" value="" required />
                <div class="valid-tooltip">
                  Looks good!
                </div>
              </div>
              <div class="col-md-2 mb-3">
                <label for="validationTooltip02">Age</label>
                <input type="text" class="form-control" id="validationTooltip02" placeholder="Age" value="" required />
                <div class="valid-tooltip">
                  Looks good!
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <label for="validationTooltipUsername">Photo</label>
                <div class="input-group">
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" id="inputGroupFile01" />
                    <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                  </div>

                </div>
                <div class="invalid-tooltip">
                  Please choose a photo for the person.
                  </div>
              </div>
            </div>

            <button class="btn btn-primary float-right" type="submit">Save</button>
          </form>
        </div>
      </div>
    )
  }
}

export default RegisterPerson