import React, { Component } from 'react';
import './App.css';
import FileUploader from './Modules/FileUploader';
import CheckResult from './Components/CheckResult';
import Footer from './Components/Footer';
import HttpService from './Modules/Http';
import './App.css';
import discLogo from './img/disc_logo.svg';
import bgPng from './img/bg.png';

type AppType = {
  file: any,
  isChecked: boolean,
  isCvValid: boolean
}

const AppInitialState = {
  file: null,
  isChecked: false,
  isCvValid: false
};

class App extends Component<{}, AppType> {
  state: AppType = {
    ...AppInitialState
  };
  
  fileUploadHandler = (file) => {
    this.setState({
      file: JSON.parse(file)
    })
  };
  
  requestCheckAsync = async () => {
    try {
      await HttpService.put('/checkcv', this.state.file);
      this.setState({ isCvValid: true });
    } catch (e) {
      console.log(e);
      this.setState({ isCvValid: false });
    } finally {
      this.setState({ isChecked: true });
    }
  };
  
  clearForm = () => this.setState({ ...AppInitialState });
  
  render() {
    const { isChecked, isCvValid, file } = this.state;
    return (
      <>
        <div className="page">
          <div className="container">
            <div className="logo">
              <img className="logo__img" src={discLogo} alt="Disciplina"/><span
              className="logo__text">validator</span>
            </div>
            <div className="pageLegend">
              <p className="pageLegend__text">Upload FairCV and validate it’s contents</p>
            </div>
            {!isChecked ?
              <FileUploader
                file={file}
                dispatchBaseFile={this.fileUploadHandler}
                dispatchValidate={this.requestCheckAsync}
              />
              : <section className="condition">
                <CheckResult isValid={isCvValid} />
                <button
                  className="btn btn--back condition__back"
                  type="button"
                  name="button"
                  onClick={this.clearForm}
                >
                  Check another FairCV
                </button>
              </section>
            }
          </div>
        </div>
        <div className="bg">
          <img src={bgPng} alt=""/>
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
