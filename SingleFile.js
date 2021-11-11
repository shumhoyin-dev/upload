import React, { useState, useCallback, useEffect } from "react"
import { useDropzone } from 'react-dropzone';

import axios from "axios";


async function uploading(url, data, config) {
    const response = await axios.post(url, data, config)
    console.log(response)
    return response
}

//api url?
function uploadFile(file, onProgress) {

    // const key = 'docs_upload_example_us_preset';
    const bodyFormData = new FormData();
    bodyFormData.append("Content-Type", "multipart/form-data");
    bodyFormData.append("pdf", file)

    var config = {
        onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percentCompleted)
        },

    };

    let response = uploading('http://localhost:3030/upload', bodyFormData, config)
    return new Promise((res) => response, (err) => err.message)


    // const xhr = new XMLHttpRequest();

    //axios actions

    //axios
    // xhr.open('POST', url);

    // xhr.onload = () => {
    //     const resp = JSON.parse(xhr.responseText)
    //     res(resp.secure_url)
    // }


    // xhr.onerror = (evt) => rej(evt);
    //upload progress can get in axios config
    // xhr.upload.onprogress = (event) => {
    //     if (event.lengthComputable) {
    //         const percentage = (event.loaded / event.total) * 100;
    //         console.log(percentage)
    //         onProgress(Math.round(percentage));
    //     }
    // };




    //create a form data with file
    // const formData = new FormData();
    // formData.append('file', file)
    // formData.append('upload_preset', key)




    //start send action
    // xhr.send(formData)


}


//signle component
function SingleFile({ file }) {

    const [progress, setProgress] = useState(0)
    useEffect(() => {

        //行upload function
        async function upload() {

            //await uploadFile FUNCTION
            const res = await uploadFile(file, setProgress)
            console.log(res)
        }

        upload();
    }, [])
    return (
        <div>
            <div>
                {file.name}
            </div>
            <div>
                {progress}

            </div>
        </div>
    )
}

export default SingleFile
