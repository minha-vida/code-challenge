import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class UpdateVaccine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vaccine: {
        name: '',
        appliedAt: ''
      }
    }
  }

  handleChangeVaccineName(event) {
    this.setState({
      vaccine: {
        ...this.state.vaccine,
        name: event.target.value
      }
    })
  }

  handleChangeVaccineAppliedAt(event) {
    this.setState({
      vaccine: {
        ...this.state.vaccine,
        appliedAt: event.target.value
      }
    })
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1 className="mt-5 mb-2">Update vaccine</h1>
          <hr />
          <form className="needs-validation" novalidate>
            <div className="form-row">
              <div className="col-md-8 mb-3">
                <label for="validationTooltip01">Name</label>
                <input type="text" className="form-control" id="validationTooltip01" placeholder="Name" value="" required />
                <div className="valid-tooltip">
                  Looks good!
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label for="validationTooltip02">AppliedAt</label>
                <input type="text" className="form-control" id="validationTooltip02" placeholder="AppliedAt" value="" required />
                <div className="valid-tooltip">
                  Looks good!
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

export default UpdateVaccine