import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

library.add(faPlusCircle);

function FileUpload({ imagesHandler, reset }) {

  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setFiles] = useState([]);
  const [errorMessage, setMessage] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: files => {
      if (uploadedFiles.length > 3) {
        setMessage('Too many images');
        return;
      }
      setUploading(true);
      let formData = new FormData();
      const config = {
        header: { 'content-type': 'multipart/form-data' }
      };
      formData.append('file', files[0]);

      axios
        .post('/api/users/uploadImage', formData, config)
        .then(res => {
          setUploading(false);
          setFiles([
            ...uploadedFiles,
            res.data
          ]);
        });
    }
  });

  const onRemove = id => {
    axios
      .get(`/api/users/removeImage?public_id=${id}`)
      .then(() => {
        let images = uploadedFiles.filter(item => {
          return item.public_id !== id;
        });

        setFiles(images);
      });
  };

  const showUploadedImages = () => {
    return uploadedFiles.map((item, i) => (
      <div
        key={i}
        onClick={() => onRemove(item.public_id)}
        className="img"
        style={{
          background: `url(${item.url}) no-repeat`,
          backgroundSize: 'cover',
        }}
      />
    ));
  };

  useEffect(() => { imagesHandler(uploadedFiles); }, [uploadedFiles, imagesHandler]);
  useEffect(() => { if (reset) setFiles([]); }, [reset]);

  return (
    <>
      <section className='dropzone clear formBlock' >
        <div {...getRootProps({ className: 'dropzone_box' })}>
          <input {...getInputProps()} />
          <div className="wrap">
            <FontAwesomeIcon
              icon="plus-circle"
              className="icon"
            />
          </div>
        </div>
        {
          !reset ?
            <div className="images">
              {showUploadedImages()}
            </div> : ''
        }
        {
          uploading ?
            <CircularProgress
              className="loader"
              style={{ color: '#00bcd4' }}
              thickness={7}
            /> : ''
        }
      </section>
      {
        errorMessage !== '' ?
          <div className="err">
            {errorMessage}
          </div> : ''
      }
    </>
  );
}

FileUpload.propTypes = {
  imagesHandler: PropTypes.func,
  reset: PropTypes.bool,
};

export default FileUpload;
