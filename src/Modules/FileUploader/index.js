// @flow
/*
* File upload module. Implemented as React class component.
* Accepts file type ( accept ), multiple uploading ( isMultiple ) and dispatcher,
* that handles FileReader result. Error console.log added for debug.
* */
import * as React from 'react';

type FileUploaderProps = {
  isMultiple: boolean,
  accept: string,
  dispatchBaseFile: (file: any) => void,
  file: any,
  dispatchValidate: () => Promise<any>
}

export default class FileUploader extends React.Component<FileUploaderProps, {}> {
  static defaultProps = {
    isMultiple: false,
    accept: 'application/json',
    file: null
  };
  
  state = {
    fileName: ''
  };
  
  onSelectFile = (e: SyntheticInputEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      this.proceedFile(e.target.files[ 0 ]);
    }
  };
  
  onDrop = (e: { dataTransfer: { files: any[] }, preventDefault: () => void }): void => {
    e.preventDefault();
    this.proceedFile(e.dataTransfer.files[ 0 ]);
  };
  
  onFileLoaded = (file: any): void => {
    const { dispatchBaseFile } = this.props;
    dispatchBaseFile(file);
  };
  
  onErrorFileLoader = (error: any): void => {
    console.log(error);
  };
  
  handleDragOver = (e: SyntheticEvent<any>) => e.preventDefault();
  
  proceedFile = (file: File): void => {
    const reader = new FileReader();
    reader.onload = () => this.onFileLoaded(reader.result);
    reader.onerror = error => this.onErrorFileLoader(error);
    reader.readAsText(file);
    this.setState({ fileName: file.name });
  };
  
  onDragEnterHandler = (e: SyntheticEvent<any>) => {
    e.preventDefault();
    document.getElementsByClassName('fileupload-dropzone')[ 0 ].classList.add('dropzone--dragging');
  };
  
  onDragLeaveHandler = (e: SyntheticEvent<any>) => {
    e.preventDefault();
    document.getElementsByClassName('fileupload-dropzone')[ 0 ].classList.remove('dropzone--dragging');
  };
  
  render() {
    const { isMultiple, accept, file, dispatchValidate } = this.props;
    const { fileName } = this.state;
    return (
      <section
        className="fileupload-dropzone dropzone"
        onDragEnter={this.onDragEnterHandler}
        onDragExit={this.onDragLeaveHandler}
        onDragOver={this.handleDragOver}
        onDrop={this.onDrop}
      >
        {file ?
          <>
            <p className="text-center dropzone__legend">You selected<br/><strong>{fileName}</strong></p>
            <label
              className="button dropzone__file-uploader btn btn--filled"
              onClick={dispatchValidate}
            >
              Validate FairCV
            </label>
          </>
          :
          <>
            <p className="text-center dropzone__legend">Drag FairCV file here<br/>or&nbsp;select it&nbsp;on&nbsp;your
              computer
            </p>
            <label htmlFor="file-uploader" className="button dropzone__file-uploader btn btn--filled">
              Browse
              <input className="dropzone__input"
                     id="file-uploader"
                     type="file"
                     multiple={isMultiple}
                     accept={accept}
                     onChange={this.onSelectFile}
              />
            </label>
          </>
        }
      
      </section>
    );
  }
}
