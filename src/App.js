import React, { Component } from 'react';
import './App.css';
import FileUploader from './Modules/FileUploader';
import CheckResult from './Components/CheckResult';
import Footer from './Components/Footer';
import HttpService from './Modules/Http';
import './App.css';
import discLogo from './img/disc_logo.svg';
import bgPng from './img/bg.png';
import LanguageSelector from './Components/LanguageSelector';
import CONSTANTS from './Constants';

type AppType = {
  selectedLanguage: string,
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

  componentDidMount(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang') || CONSTANTS.LANGUAGES.EN;
    this.changeLanguage(lang);
  }

  changeLanguage = (lang: string) => {
    this.setState({ selectedLanguage: lang.toUpperCase() });
    window.history.pushState({}, '', `?lang=${lang}`);
  };

  fileUploadHandler = (file) => {
    this.setState({
      file: file
    })
  };

  requestCheckAsync = async () => {
    try {
      const { file } = this.state
      const endpoint = file.type === 'application/pdf' ? '/checkcv-pdf' : '/checkcv'
      const checkRes = await HttpService.put(endpoint, file);

      const isCvValid = file.type === 'application/pdf' ? checkRes.checkResult.isValid : checkRes.isValid
      this.setState({ isCvValid });
    } catch (e) {
      console.log(e);
      this.setState({ isCvValid: false });
    } finally {
      this.setState({ isChecked: true });
    }
  };

  clearForm = () => this.setState(state => ({ ...AppInitialState, selectedLanguage: state.selectedLanguage }));

  render() {
    const { isChecked, isCvValid, file, selectedLanguage } = this.state;
    return (
      <>
        <div className="page">
          <LanguageSelector selectedLang={selectedLanguage} changeLanguage={this.changeLanguage} />
          <div className="container">
            <div className="logo">
              <img className="logo__img" src={discLogo} alt="Disciplina"/><span
              className="logo__text">{CONSTANTS.TRANSLATIONS.TITLE[selectedLanguage]}</span>
            </div>
            <div className="pageLegend">
              <p className="pageLegend__text">{CONSTANTS.TRANSLATIONS.SUBTITLE[selectedLanguage]}</p>
            </div>
            {!isChecked ?
              <FileUploader
                file={file}
                dispatchBaseFile={this.fileUploadHandler}
                dispatchValidate={this.requestCheckAsync}
                lang={selectedLanguage}
              />
              : <section className="condition">
                <CheckResult isValid={isCvValid} lang={selectedLanguage} />
                <button
                  className="btn btn--back condition__back"
                  type="button"
                  name="button"
                  onClick={this.clearForm}
                >
                  {CONSTANTS.TRANSLATIONS.CHECK_ANOTHER[selectedLanguage]}
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
