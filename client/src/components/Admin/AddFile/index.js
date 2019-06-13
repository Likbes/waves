import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

import UserLayout from '../../../hoc/user';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

library.add(faPlusCircle);

function AddFile() {
  const [formSuccess, setSuccess] = useState(false);
  const [formError, setError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: files => {
      setUploading(true);
      let formData = new FormData();
      const config = {
        header: { 'content-type': 'multipart/form-data' }
      };
      formData.append('file', files[0]);

      axios
        .post('/api/users/uploadFile', formData, config)
        .then(res => {
          const { success } = res.data;
          if (success) {
            setSuccess(true);
            setError(false);
            setUploading(false);

            setTimeout(() => setSuccess(false), 2000);
          }
        });
    }
  });

  const showFiles = () => {
    return files ?
      files.map((file, i) => (
        <li key={`${file}-${i}`}>
          <Link
            to={`/api/users/download/${file}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {file}
          </Link>
        </li>
      )) : '';
  };

  const updateFiles = () => {
    return axios
      .get('/api/users/adminFiles')
      .then(res => {
        setFiles(res.data);
      });
  };

  useEffect(() => {
    return () => {
      updateFiles();
    };
  }, [formSuccess]);

  updateFiles();

  return (
    <UserLayout>
      <>
        <h1>Upload file</h1>
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
            uploading ?
              <CircularProgress
                className="loader"
                style={{ color: '#00bcd4' }}
                thickness={7}
              /> : ''
          }
        </section>
        <div style={{ clear: 'both' }}>
          {
            formSuccess ?
              <div className="form_success">
                Success
              </div> : ''
          }
          {
            formError ?
              <div className="error_label">
                Please check your data
              </div> : ''
          }
        </div>
        <hr />
        <ul>
          {showFiles()}
        </ul>
      </>
    </UserLayout>
  );
}

AddFile.propTypes = {

};

export default AddFile;
