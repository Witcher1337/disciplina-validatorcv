// @flow
import React, { PureComponent } from 'react';
import CONSTANTS from '../Constants';

type LanguageSelectorProps = {
  selectedLang: string,
  changeLanguage: (lang: string) => void
};

type LanguageSelectorState = {
  isDropdownOpened: boolean
}

class LanguageSelector extends PureComponent<LanguageSelectorProps, LanguageSelectorState> {
  state: LanguageSelectorState = {
    isDropdownOpened: false
  };
  
  openDropdown = () => this.setState({ isDropdownOpened: true });
  
  closeDropdown = () => this.setState({ isDropdownOpened: false });
  
  toggleDropdown = () => {
    const { isDropdownOpened } = this.state;
    isDropdownOpened ? this.closeDropdown() : this.openDropdown()
  };
  
  selectLanguage = (lang: string) => {
    const { changeLanguage } = this.props;
    changeLanguage(lang);
    this.closeDropdown();
  };
  
  render() {
    const { selectedLang } = this.props;
    const { isDropdownOpened } = this.state;
    return (
      <div className={`selectBox ${isDropdownOpened ? 'active' : ''}`}>
        <div className="input" onClick={this.toggleDropdown}>{CONSTANTS.L_SELECTOR[selectedLang]}</div>
        <ul className="options" style={{display: isDropdownOpened ? 'block' : 'none'}}>
          {Object.keys(CONSTANTS.L_SELECTOR).map(key => (
            <li
              className={`option ${selectedLang === key.toString() ? 'active' : ''}`}
              key={key}
              onClick={() => this.selectLanguage(key)}
            >
              {CONSTANTS.L_SELECTOR[key]}
            </li>))
          }
        </ul>
      </div>
    );
  }
};

export default LanguageSelector;
