var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: "Bored Programmer API"});
});

router.post('/', function(req, res, next) {
  res.send("This shouldn't do anyting, how did you get here?")
});

function indentStuff(input) {
  const result = input
  .replace('{', '{\n  ')
  .replace(/:/g, ': ')
  .replace(',"des', ',\n  "des')
  .replace(',"cat', ',\n  "cat')
  .replace(',"tag', ',\n  "tag')
  .replace('}', '\n}')
  .replace(/,"/, ', "');
  return result;
};

module.exports = router;
