var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  fetch('http://localhost:3000/api/')
    .then(response => response.json())
    .then(data => {
      res.render('index', {
        title: "Bored Programmer API",
        code: replaceStuff(JSON.stringify(data)),
      })
    })
})
);

router.post('/', function(req, res, next) {
  res.send("This shouldn't do anyting, how did you get here?")
});

function replaceStuff(input) {
  const result = input
  .replace('{', '{\n\t')
  .replace(/:/g, ': ')
  .replace(',"des', ',\n\t"des')
  .replace(',"cat', ',\n\t"cat')
  .replace(',"tag', ',\n\t"tag')
  .replace('}', '\n}')
  .replace(/,"/, ', "');
  return result;
};

module.exports = router;
