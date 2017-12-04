import React, { Component } from 'react';
import '../../css/profile.css';
import { Redirect } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { withRouter } from 'react-router-dom';
import apiFetch from '../../utils/api.js';
import ModalConductor from '../components/modal/ModalConductor';

class Profile extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies)
  };
  constructor(props) {
    super(props);
    const { cookies } = this.props;
    let tokenFromCookie = '';
    if (cookies.get('token') !== '') {
      tokenFromCookie = cookies.get('token');
    } else {
      let url = this.props.location.search;
      let parsedToken = '';
      url = url.split('=');
      if (url) {
        parsedToken = url[1];
      }
      tokenFromCookie = parsedToken;
    }
    this.state = {
      name: '',
      email: '',
      preferEmailUpdates: false,
      error: null,
      editMode: false,
      redirect: false,
      file: '',
      imagePreviewUrl: '',
      token: tokenFromCookie,
      showTutorial: false,
      showFeedback: false,
      toFeedback: false
    };
  }
  linkGoogleAccount = () => {
    const { cookies } = this.props;
    if (cookies.get('token') !== '') {
      this.setState({
        error: "You are already successfully linked to a Google account!!"
      });
      return;
    }
    var e = document.createElement("a");
    let token = this.state.token;
    if (typeof this.state.token === 'undefined') {
      token = '';
    }
    apiFetch('loginToGoogle',{
        headers: {
         'Content-Type': 'text/plain'
        },
        method: 'POST',
        body: JSON.stringify({
          googleCode: token
        })
    }).then((response) => response.json())
        .then((json) => {
          if(json.success === false) {
              console.log('error', json.error);
              e.href = json.authorizeURL;
              e.click();
          }
          else {
            const { cookies } = this.props;
            cookies.set('token', JSON.stringify(json.googleToken));
            console.log('saved token', cookies.get('token'));
            this.setState({
              token: json.googleToken,
              error: "You successfully linked your Google account"
            });
            window.setTimeout(function() {
              this.setState({
                error: ''
              });
            }.bind(this), 4000);
          }
        });
  }
  seeFeedback = () => {
      this.setState({toFeedback: true});
  }
  componentWillMount() {
    if (this.state.token && this.state.token.length > 0) {
      this.linkGoogleAccount();
    }
  }
  componentDidMount() {
    const { cookies } = this.props;
    const email = cookies.get('email');
    if (this.state.token === '') {
      let url = this.props.location.search;
      let parsedToken = '';
      url = url.split('=');
      if (url) {
        parsedToken = url[1];
      }
      this.setState({
        token: parsedToken,
        error: '',
      });
    }
    if (this.state.token && this.state.token.length > 0) {
      this.linkGoogleAccount();
    }
    apiFetch('getPicture', {
      headers: {
       'Content-Type': 'text/plain'
      },
      method: 'POST',
      body: JSON.stringify({
        email: email
      })
    }).then((response) => response.blob())
        .then((json) => {
          const url = window.URL.createObjectURL(json);
              if(json.success === false) {
                  console.log('error', json.error);
                  this.setState({ error: json.error });
              }
              else {
                this.setState({
                  imagePreviewUrl: url
                });
              }
            });

    return apiFetch('profile', {
        headers: {
         'Content-Type': 'text/plain'
        },
        method: 'POST',
        body: JSON.stringify({
          email: email
        })
    }).then((response) => response.json())
        .then((json) => {
          if(json.success === false) {
              console.log('error', json.error);
              this.setState({ error: json.error });
          }
          else {
            let preferEmailUpdates = false;
            console.log('json.preferEmailUpdates',json.prefersEmailUpdates);
            if (json.prefersEmailUpdates === 1) {
              preferEmailUpdates = true;
            }
            console.log('preferEmailUpdates', preferEmailUpdates);
            this.setState({
              error: null,
              name: json.name,
              email: json.email,
              preferEmailUpdates
            });
          }
        });
  }
  editProfile = (e) => {
    this.setState({ editMode: false });
    e.persist();
    return apiFetch('editProfile',{
        headers: {
         'Content-Type': 'text/plain'
        },
        method: 'POST',
        body: JSON.stringify({
          email: this.state.email,
          newEmail: e.target.email.value,
          newName: e.target.name.value
        })
    }).then((response) => response.json())
        .then((json) => {
          if(json.success === false) {
              console.log('error', json.error);
              this.setState({ error: json.error });
          }
          else {
            const { cookies } = this.props;
            this.setState({
              error: null,
              name: e.target.name.value,
              email: e.target.email.value
            });
            cookies.set('email', e.target.email.value);
          }
        });
  }
  toggleEditMode = (e) => {
    this.setState({ editMode: true });
  }
  clickTutorialModal = (e) => {
      this.setState({showTutorial: true});
  }
  clickFeedbackModal = (e) => {
    this.setState({showFeedback: true});
  }
  deleteAccount = (e) => {
    const { cookies } = this.props;
    const email = cookies.get('email');
    return apiFetch('deleteAccount',{
        headers: {
         'Content-Type': 'text/plain'
        },
        method: 'POST',
        body: JSON.stringify({
          email: email
        })
    }).then((response) => response.json())
        .then((json) => {
          if(json.success === false) {
              console.log('error', json.error);
              this.setState({ error: json.error });
          }
          else {
            const { cookies } = this.props;
            cookies.set('isAuthenticated', false);
            cookies.remove('jwt');
            cookies.remove('email');
            this.setState({ redirect: true });
          }
        });
  }
  savePicture = (e) => {
    e.preventDefault();
    const formData  = new FormData();
    const { cookies } = this.props;
    const email = cookies.get('email');
    formData.append('file', this.state.file);
    formData.append('email', email);
    apiFetch('addpicture', {
      body: formData,
      method: 'POST'
    }).then(response =>
      response.text()
    ).then((json) => {
        json = JSON.parse(json);
        console.log('json', json);
        if (json.success === false) {
            console.log('error', json.error);
        }
        else {
          console.log('success',json, 'The profile pic was saved!');
          window.location.reload();
        }
      });
  }

  handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
  }
  toggleScheme = () => {
    const { cookies } = this.props;
    cookies.get('scheme') === 'bgred' ? cookies.set('scheme','') : cookies.set('scheme','bgred');
    window.location.reload();
  }
  toggleState = (state, val) => {
    this.setState({
      state: val
    });
    if (state === "showTutorial") {
      this.setState({
        showTutorial:false
      });
    }
    else if (state === "showFeedback") {
      this.setState({
        showFeedback:false
      });
    }
  }
  clearEditMode = (e) => {
    e.preventDefault();
    this.setState({
      editMode: false
    });
  }
  togglepreferEmailUpdates = () => {
    this.setState({
      preferEmailUpdates: !this.state.preferEmailUpdates
    });
  }
  updateEmailPreference = (e) => {
    e.preventDefault();
    const { cookies } = this.props;
    const email = cookies.get('email');
    let checked = 0;
    if (this.state.preferEmailUpdates === true) {
      checked = 1;
    }
    return apiFetch('preferEmailUpdates',{
      headers: {
        'Content-Type': 'text/plain'
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        prefersEmailUpdates: checked
      })
    }).then((response) => response.json())
        .then((json) => {
          console.log('json after /preferEmailUpdates', json);
          if(json.success === true) {
            this.setState({ error: 'You were able to update preferEmailUpdates' });
            window.setTimeout(function() { this.setState({ error: null }); }.bind(this), 4000);
          }
          else {
            this.setState({ error: json.error });
            window.setTimeout(function() { this.setState({ error: null }); }.bind(this), 4000);
          }
        });
  }
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    if (isAuthenticated === "false" || !isAuthenticated || this.state.redirect === true) {
      return (<Redirect to="/"/>);
    }
    let {imagePreviewUrl} = this.state;
    if (this.state.toFeedback === true) {
       return (<Redirect to="/view-feedback"/>);
    }
    return (
      <div className="page bgorange">
        {this.state.error ? <p>{this.state.error}</p> : null}
        <div className="profile-page">
          <div className="profileCard">
            <img src={imagePreviewUrl} alt="upload a pic"/>
            <h2 className="topSpacing questrial">{this.state.name}</h2>
            <p className="title">{this.state.email}</p>
          </div>
          <div className="profile-info">
            <form className="image-upload" onSubmit={this.savePicture}>
              <h1>Upload a Picture</h1>
              <input className="fileInput"
                type="file"
                onChange={this.handleImageChange} required />
              <button className="submitButton" type="submit" >Upload Image</button>
            </form>
            <button onClick={this.toggleEditMode}>Edit Profile</button>
            {this.state.editMode ? (
              <form className="form-width" onSubmit={this.editProfile}>
              <h1>Edit Profile</h1>
              <div className = "errorClass">
              {this.state.error ? `Error= ${this.state.error}` : null}
              </div>
              <label htmlFor="name">Name </label>
              <input type="text" name="name" />
              <label htmlFor="email">Email </label>
              <input type="email" name="email" />
              <br/>
              <input className="btn" type="submit" name="submit" value="Save" />
              <input onClick={this.clearEditMode} className="btn" type="button" name="cancel" value="Cancel" />
            </form>
              ) : null
            }
            <button onClick={this.clickTutorialModal}>Tutorial</button>
            {this.state.showTutorial ? <ModalConductor name={'showTutorial'} showModal={this.state.showTutorial} toggleState = {this.toggleState} currentModal='TUTORIAL'/> : null }

            {this.state.showFeedback ? <ModalConductor name={'showFeedback'} showModal={this.state.showFeedback} toggleState = {this.toggleState} currentModal='FEEDBACK'/> : null }

            <h1>Prefer Email Updates</h1>
            <div className="check-con">
              <input type="checkbox" name="preferEmailUpdates" onChange={this.togglepreferEmailUpdates} checked={this.state.preferEmailUpdates} />
              <label htmlFor="preferEmailUpdates">Prefer Email Updates</label>
            </div>
            <button onClick={this.updateEmailPreference}>Save Email Preference</button>
            <button onClick={this.toggleScheme}>Toggle Scheme</button>
            <button onClick={this.deleteAccount}>Delete Account</button>
            <button onClick={this.linkGoogleAccount}>Authorize Google Account</button>
            <button onClick={this.seeFeedback}>View Submitted Feedback</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(withRouter(Profile));
