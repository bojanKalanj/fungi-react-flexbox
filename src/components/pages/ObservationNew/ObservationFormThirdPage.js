import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import '../../../UI/Button/Button';
import '../../../UI/Form/Input/Input';
import FaFileImageO from 'react-icons/lib/fa/file-image-o';

class ObservationFormThirdPage extends Component{
  state = {
    selectedImages: [],
    // imagesField: []
  }

  getNumberOfSelectedFiles() {
    return this.state.selectedImages.filter(el => {
      return el._destroy !== true;
    }).length;
  }

  imagesField;
  renderUploadCoversButton = () => {
    let numberOfSelectedImages = this.getNumberOfSelectedFiles();
    
    return (
      <div>
        <input
          component="input"
          name="covers[]"
          ref={field => { this.imagesField = field }}
          type="file"
          disabled={this.state.isSubmittingForm}
          multiple={true}
          // accept="image/*"
          style={{
            width: 0.1,
            height: 0.1,
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: -1
          }}
          id="book_covers"
          onChange={e => this.handleImagesChange(e)}
          className="form-control"
        />
        <label
          disabled={this.state.isSubmittingForm}
          className="btn btn-success"
          htmlFor="book_covers">
          <span className="glyphicon glyphicon-cloud-upload" />
          &nbsp; &nbsp;
          {numberOfSelectedImages === 0
            ? 'Dodaj fotografije'
            : `${numberOfSelectedImages} fotografija${numberOfSelectedImages !== 1
                ? 's'
                : ''} selektovano`}
        </label>
      </div>
    );
  }

  image2base64 = require('image-to-base64');
  handleImagesChange() {
    let selectedFiles = this.imagesField.files;
    let { selectedImages } = this.state;
    for (let i = 0; i < selectedFiles.length; i++) {
      selectedImages.push(selectedFiles.item(i));
    } //end for
  
    this.setState(
      {
        selectedImages: selectedImages
      },
      () => {
        this.imagesField.value = null;
      }
    );
    // this.props.change('images', this.state.selectedImages);
    console.log(this.state.selectedImages);
    let images = [];
    for(let img in selectedImages){
      console.log(selectedImages[img].name);
      this.image2base64(selectedImages[img].name) // you can also to use url
        .then(
            (response) => {
              images.push(response)
              this.props.change('images', images);
              console.log(images);
            }
        )
        .catch(
            (error) => {
                console.log(error); //Exepection error....
            }
        )
    }

    // console.log(images);
  }

  render(){
    console.log(this.imagesField);
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
          <button type="submit" className="Button Red" disabled={pristine || submitting}>
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