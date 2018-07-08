import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class UpdatePerson extends Component {
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
          <h1 className="mt-5 mb-2">Update Person</h1>
          <hr />
          <form className="needs-validation" novalidate>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label for="validationTooltip01">Name</label>
                <input type="text" className="form-control" id="validationTooltip01" placeholder="Name" value="" required />
                <div className="valid-tooltip">
                  Looks good!
                </div>
              </div>
              <div className="col-md-2 mb-3">
                <label for="validationTooltip02">Age</label>
                <input type="text" className="form-control" id="validationTooltip02" placeholder="Age" value="" required />
                <div className="valid-tooltip">
                  Looks good!
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label for="validationTooltipUsername">Photo</label>
                <div className="input-group">
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="inputGroupFile01" />
                    <label className="custom-file-label" for="inputGroupFile01">Choose file</label>
                  </div>

                </div>
                <div className="invalid-tooltip">
                  Please choose a photo for the person.
                  </div>
              </div>
            </div>
            <div className="float-right" >
              <Link to="/persons/:id" className="btn btn-primary mr-2">Go Back</Link>
              <button className="btn btn-primary" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default UpdatePerson