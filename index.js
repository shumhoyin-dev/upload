var http = require('http');
var express = require('express')
var cors = require('cors')
var app = express()
var fs = require('graceful-fs')
var path = require('path');
const multer = require('multer')
var os = require("os");
var router = require('router');
const { findByRole } = require('@testing-library/dom');



app.use(cors({
    origin: '*'
}));


// 設定 Multer
const upload = multer({
    //destination, if dont exist , create one
    dest:
        'docs/'
    ,
    limit: {
        // 限制上傳檔案的大小為 10MB
        fileSize: 1048576, // 10 Mb
    },
    fileFilter: (req, file, cb) => {
        // 只接受pdf格式
        if (!file.originalname.match(/\.pdf$/)) {
            cb(new Error('Please upload an image'))
        }


        if (file.size > 1048576) {
            cb(new Error('more tha 10mb'))
        }


        cb(null, true)
    }
})


const port = 3030;

app.listen(port, () => {
    console.log('Server started');
    console.log('Server Listening port 3030');
});

// 接收名為 avatar 欄位的單一檔案
//upload.single(‘avatar’)

app.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
        // console.log(req.file);
        console.log(req.file)
        const url = process.env.UPLOAD_URL || 'localhost:3030/docs';
        // console.log(url)
        const newName = req.file.originalname;
        fs.rename(req.file.path, path.join('docs', newName), (err) => {
            if (err) throw new Error('rename error');
            res.json({

                status: 'ok',
                location: `${url}${newName}`,

            });
        });
    } catch (err) {
        console.log(err.message)
        res.status(404).json({ error: err.message });
    }
});

app.get('/health-check', (req, res) => {
    try {


        console.log("inside index.route");

        //return res with this format if success
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.json({
            resCode: 1,
            msg: 'success',
            payload: "",
        });

    } catch (e) {
        //return res with this format if fail
        console.log(e);
        return res.json({
            resCode: 0,
            msg: 'fail',
            payload: ""
        });
    }
});