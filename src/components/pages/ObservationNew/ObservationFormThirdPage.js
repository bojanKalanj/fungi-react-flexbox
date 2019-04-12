import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import '../../../UI/Button/Button';
import '../../../UI/Form/Input/Input';
import FaUpload from 'react-icons/lib/fa/upload';

class ObservationFormThirdPage extends Component{
  state = {
    selectedImages: [],
  }

  imagesField;
  renderUploadCoversButton = () => {
    let numberOfSelectedImages = this.state.selectedImages.length;
    let uploadBtnError = numberOfSelectedImages > 7? 'upload-btn-error': '';
    let wordToDisplay;
    switch(numberOfSelectedImages){
      case 1: wordToDisplay = "fotografiju"
        break;
      case 5: wordToDisplay = "fotografija"
        break;
      case 6: wordToDisplay = "fotografija"
        break;
      default: wordToDisplay = "fotografije"
    }

    return (
      <div>
        <input
          component="input"
          name="covers[]"
          ref={field => { this.imagesField = field }}
          type="file"
          multiple={true}
          accept="image/*"
          style={{
            width: 0.1,
            height: 0.1,
            opacity: 0,
            overflow: 'hidden',
            marginTop: '50px',
            zIndex: -1
          }}
          id="upload-images"
          onChange={e => this.handleImagesChange(e)}
        />
        <label
          disabled={this.state.isSubmittingForm}
          className={`upload-btn ${uploadBtnError}`}
          htmlFor="upload-images">
          <FaUpload  />
          {numberOfSelectedImages > 6? "  Maksimalan broj fotogrfija je 6":  numberOfSelectedImages === 0
            ? `  Dodaj fotografije`
            : `  ${numberOfSelectedImages} ${wordToDisplay}`}
        </label>
      </div>
    );
  }

  // image2base64 = require('image-to-base64');
  handleImagesChange() {
    let selectedFiles = this.imagesField.files;
    let  selectedImages = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      selectedImages.push(selectedFiles.item(i));
    } //end for

    this.setState(
      {
        selectedImages
      },
      () => {
        this.imagesField.value = null;
      }
    );
    let images = [];
    if(this.state.selectedImages.length < 7){
      for(let img in selectedImages){
        let reader = new FileReader();
        console.log(selectedImages[img]);
        reader.readAsDataURL(selectedImages[img]);
        reader.onload = () => {
          console.log(reader.result);
          images.push(reader.result);
          this.props.change('images', images);
        };
        reader.onerror = (error) => {
          console.log('Error: ', error);
        };
      }
    }
  }

  render(){
    const { handleSubmit, pristine, previousPage, submitting } = this.props
    return (
      <form onSubmit={handleSubmit} className="ObservationNew">
        <div className="Form-title">
          <h4>Dodaj nalaz</h4>
          <hr />
        </div>
        {/* <div className="Input">
          <label htmlFor="images">Slike { <FaFileImageO /> }</label>
          <div>
            <Field
              name="images"
              id="images"
              component="input"
              type="file"
            />
          </div>
        </div> */}
        { this.renderUploadCoversButton() }
        <div>
          <button type="button" className="previous Button" onClick={previousPage}>
            Vrati se
          </button>
          <button type="submit" className="Button Red" disabled={pristine || submitting || this.state.selectedImages.length > 7}>
            Kreiraj nalaz
          </button>
        </div>
      </form>
    )
  }
};

export default reduxForm({
  form: 'observationForm', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(ObservationFormThirdPage);
