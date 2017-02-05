fs = require('fs');

// Identifies files in the Clip####.mxf format
var mkfFileIdentifier = /[cC][lL][iI][pP]\d{4}.[mM][xX][fF]/g;

// Identifies files in #####.mts format
var mtsFileIdentifier = /\d{5}.[mM][tT][sS]/g;

// Identifies what to append to the file name A_##
var appendIdentifier = /[a-zA-Z]_\d{2}/g;

fs.readFile(process.argv[2], 'utf8', function (err, data) {
  if (err) {
    return console.log('Oh snap! There was an error when reading the file: ', err);
  }

  var returnData = data;

  var makeReplacementElements = function (element) {
    var replacementElements = [];
    element.forEach(function (oldElement) {
      var append = oldElement.match(appendIdentifier);
      var oldFileName = oldElement.match(mkfFileIdentifier) || oldElement.match(mtsFileIdentifier);
      if (append && oldFileName) {
        var newFileName = append[0] + '_' + oldFileName;
        var newElement = oldElement.replace(oldFileName, newFileName);
        var matchReplacementObj = {
          oldElement: oldElement,
          newElement: newElement
        };
        replacementElements.push(matchReplacementObj);
      }
    });
    return replacementElements;
  };

  var replaceElements = function (replacementElements) {
    replacementElements.forEach(function (elementObj) {
      returnData = returnData.replace(elementObj.oldElement, elementObj.newElement);
    });
  };

  var relativePathElement = /<RelativePath>[\s\S]*?<\/RelativePath>/g;
  var filePathElement = /<FilePath>[\s\S]*?<\/FilePath>/g;
  var actualMediaFilePathElement = /<ActualMediaFilePath>[\s\S]*?<\/ActualMediaFilePath>/g;

  var matchingRelativePathElement = data.match(relativePathElement);
  var matchingFilePathElement = data.match(filePathElement);
  var matchingActualMediaFilePathElement = data.match(actualMediaFilePathElement);
  var replacementRelativePathElements = makeReplacementElements(matchingRelativePathElement);
  var replacementFilePathElements = makeReplacementElements(matchingFilePathElement);
  var replacementActualMediaPathElements = makeReplacementElements(matchingActualMediaFilePathElement);
  var masterReplacementArray = replacementRelativePathElements.concat(replacementFilePathElements, replacementActualMediaPathElements);

  replaceElements(masterReplacementArray);

  fs.writeFile('modified_' + process.argv[2], returnData, 'utf8', function (err) {
     if (err) {
       return console.log('Oh snap! There was an error when writing the file: ', err);
     }
  });
});
