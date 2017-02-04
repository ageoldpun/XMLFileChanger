fs = require('fs');
var parseString = require('xml2js').parseString;

fs.readFile(process.argv[2], 'utf8', function (err, data) {
  if (err) {
    return console.log('Oh snap! There was an error when reading the file: ', err);
  }

  parseString(data, function (err, parsedXML) {
    if (err) {
      return console.log('Oh snap! There was an error when parsing the file: ', err);
    }

    var mkfFileIdentifier = /[cC][lL][iI][pP]\d{4}.[mM][xX][fF]/g;
    var mtsFileIdentifier = /\d{5}.[mM][tT][sS]/g;

    // var result = data.replace(mkfRegex, 'poop').replace(mtsRegex, 'shit');

    // fs.writeFile('modified_' + process.argv[2], result, 'utf8', function (err) {
    //    if (err) {
    //      return console.log('Oh snap! There was an error when writing the file: ', err);
    //    }
    // });
  });

});

// <RelativePath>../Ruin Me Backup - Slave/13 September 2016/CAM A/A_06/XDROOT/Clip/Clip0013.MXF</RelativePath>
// <FilePath>/Volumes/G-DRIVE with Thunderbolt/Ruin Me Backup - Slave/13 September 2016/CAM A/A_06/XDROOT/Clip/Clip0013.MXF</FilePath>
// <ActualMediaFilePath>/Volumes/G-DRIVE with Thunderbolt/Ruin Me Backup - Slave/13 September 2016/CAM A/A_06/XDROOT/Clip/Clip0013.MXF</ActualMediaFilePath>

// <RelativePath>../Ruin Me Backup - Slave/02 November 2016/CAM B/B_08/PRIVATE/AVCHD/BDMV/STREAM/00026.MTS</RelativePath>
// <FilePath>/Volumes/G-DRIVE with Thunderbolt/Ruin Me Backup - Slave/02 November 2016/CAM B/B_08/PRIVATE/AVCHD/BDMV/STREAM/00026.MTS</FilePath>
// <ActualMediaFilePath>/Volumes/G-DRIVE with Thunderbolt/Ruin Me Backup - Slave/02 November 2016/CAM B/B_08/PRIVATE/AVCHD/BDMV/STREAM/00026.MTS</ActualMediaFilePath>
