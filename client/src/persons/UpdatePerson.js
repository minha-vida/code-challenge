import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class UpdatePerson extends Component {
  constructor(props) {
    super(props)
    this.state = {
      person: {
        name: '',
        age: '',
        photo: ''
      },
      updated: false
    }
  }

  componentDidMount() {
    const personId = this.props.match.params.id

    fetch(`http://localhost:5000/persons/${personId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.props.idToken}`,
        "Content-Type": "application/json; charset=utf-8",
      }
    })
      .then(response => response.json())
      .then(person =>
        this.setState({
          person: {
            name: person.name,
            age: person.age,
            photo: person.photo
          }
        }))
        .catch(error => console.error(`Fetch Error =\n`, error))
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
    };
    reader.readAsDataURL(file)
  }

  handleSubmit(e) {
    e.preventDefault()

    const personId = this.props.match.params.id

    fetch(`http://localhost:5000/persons/${personId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${this.props.idToken}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(this.state.person)
    })
      .then(response => response.json())
      .then(updated =>
        this.setState({
          updated: true
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
    const personId = this.props.match.params.id

    return (
      <div>
        {this.state.updated && <Redirect to={`/persons/${personId}`}/> }
        <div className="container">
          <h1 className="mt-5 mb-2">Update Person</h1>
          <hr />
          <form className="needs-validation" onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label htmlFor="validationTooltip01">Name</label>
                <input onChange={(e) => this.handleNameChange(e)} type="text" className="form-control" id="validationTooltip01" placeholder="Name" value={this.state.person.name} required />
              </div>
              <div className="col-md-2 mb-3">
                <label htmlFor="validationTooltip02">Age</label>
                <input onChange={(e) => this.handleAgeChange(e)} type="text" className="form-control" id="validationTooltip02" placeholder="Age" value={this.state.person.age} required />
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
              <Link to={`/persons/${personId}`} className="btn btn-secondary mr-2">Go Back</Link>
              <button className="btn btn-success" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  idToken: state.oidc.user.id_token
})

export default connect(mapStateToProps)(UpdatePerson)