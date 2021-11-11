import React, { useState, useCallback, useEffect } from "react"
import { useDropzone } from 'react-dropzone';
import SingleFile from "./SingleFile";


function MultipleFiles() {

    useEffect(() => {
        console.log("start")

    }, [])
    const [files, setFiles] = useState([])

    const onDrop = useCallback(
        (acceptedFiles, rejectedFiles) => {
            // callback
            const mappedAcc = acceptedFiles.map(
                (file) => {
                    console.log(file)
                    return ({ file, errors: [] });
                }
            )

            setFiles(curr => [...curr, ...mappedAcc, ...rejectedFiles])
        },
        [],
    )

    const { getRootProps, getInputProps } = useDropzone({ onDrop });



    return (
        <div {...getRootProps({ className: 'dropzone disabled' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>


            {
                files.map((itm) =>
                    <SingleFile file={itm.file} />
                )
            }
            <button onClick={(e) => {
                e.preventDefault();
                console.log(files)
            }}>
                asdasd
            </button>
        </div>
    )
}

export default MultipleFiles
