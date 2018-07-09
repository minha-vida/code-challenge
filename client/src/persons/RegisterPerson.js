import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'

class RegisterPerson extends Component {
  constructor(props) {
    super(props)
    this.state = {
      person: {
        name: '',
        age: '',
        photo: ''
      },
      registered: false
    }
  }

  handleNameChange(event) {
    this.setState({
      person: {
        ...this.state.person,
        name: event.target.value
      }
    })
  }

  handleAgeChange(event) {
    this.setState({
      person: {
        ...this.state.person,
        age: event.target.value
      }
    })
  }

  handlePhotoChange(event) {
    var self = this;
    var reader = new FileReader();
    var file = event.target.files[0];

    reader.onload = function (e) {
      self.setState({
        person: {
          ...self.state.person,
          photo: e.target.result
        }
      });
      console.log(self.state.photo)
    };
    reader.readAsDataURL(file)
  }

  handleSubmit(e) {
    e.preventDefault()

    fetch(`http://localhost:5000/persons`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(this.state.person)
    })
      .then(response => response.json())
      .then(registered =>
        this.setState({
          registered: true
        }))
      .catch(error => console.error(`Fetch Error =\n`, error))

    this.setState({
      person: {
        name: '',
        age: '',
        photo: ''
      }
    })
  }

  render() {
    return (
      <div>
        {this.state.registered && <Redirect to="/persons" />}
        <div className="container">
          <h1 className="mt-5 mb-2">Register Person</h1>
          <hr />
          <form className="needs-validation" onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label htmlFor="validationTooltip01">Name</label>
                <input onChange={(e) => this.handleNameChange(e)} value={this.state.person.name} type="text" className="form-control" id="validationTooltip01" placeholder="Name" required />
              </div>
              <div className="col-md-2 mb-3">
                <label htmlFor="validationTooltip02">Age</label>
                <input onChange={(e) => this.handleAgeChange(e)} value={this.state.person.age} type="text" className="form-control" id="validationTooltip02" placeholder="Age" required />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="validationTooltipUsername">Photo</label>
                <div className="input-group">
                  <div className="custom-file">
                    <input onChange={(e) => this.handlePhotoChange(e)} type="file" className="custom-file-input" id="inputGroupFile01" />
                    <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="float-right" >
              <Link to="/persons" className="btn btn-primary mr-2">Go Back</Link>
              <button className="btn btn-primary" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default RegisterPerson