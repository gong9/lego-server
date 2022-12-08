const fs = require('fs')
const path = require('path')
const express = require('express')
const multer = require('multer')

const router = express.Router()
const upload = multer({
  temp: path.join(__dirname, 'db'),
})

const resMesSuccess = {
  code: 0,
  data: {},
  message: 'success',
}

const resMesFail = {
  code: -1,
}

router.post('/save', (req, res) => {
  const schemaStr = JSON.stringify(req.body.params)

  try {
    fs.writeFileSync(path.join(__dirname, '../../db/db.txt'), schemaStr)
  }
  catch (err) {
    console.error(err)
  }
  res.json({
    ...resMesSuccess,
  })
})

router.get('/getSchema', (req, res) => {
  let resData = {}
  try {
    resData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../db/db.txt'), 'utf8'))
  }
  catch (err) {
    console.error(err)
  }
  res.json({
    ...resMesSuccess,
    data: {
      resData,
    },
  })
})

router.get('/download', (req, res) => {
  const filepath = path.join(__dirname, '../../db/db.txt')
  res.download(filepath)
})

router.post('/upload', upload.single('file'), (req, res) => {
  const compFileBuffer = req.file.buffer
  let resData = {}
  try {
    fs.writeFileSync(path.join(__dirname, '../../db/db.txt'), compFileBuffer)
    resData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../temp/db.txt'), 'utf8'))
  }
  catch (error) {
    res.json({
      ...resMesFail,
      message: error,
    })
  }

  res.json({
    ...resMesSuccess,
    data: {
      resData,
    },
  })
})

module.exports = router
