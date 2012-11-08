var fs      = require("fs"),
    path    = require("path"),
    util    = require("util"),
    Canvas  = require("canvas"),
    Join    = require("join");

function spriteGenerator(directory) {
  var files = fs.readdirSync(directory),
      rowData = {};

  var join = loadImages(directory, files, rowData);

  join.when(function() {
    var dimensions = calculateSize(rowData),
        canvas     = new Canvas(dimensions.width, dimensions.height);

    var json = drawImages(rowData, canvas);
    fs.writeFileSync("./sprites.png", canvas.toBuffer());
    fs.writeFileSync("./sprites.json", JSON.stringify(json));
    util.puts("\nsprites.png and sprites.json created successfully.");
  });
}

// loads files in directory and creates following json structure:
//
// {
//   'sprite_one': [
//     [ 2, Image ],
//     [ 1, Image ]
//   ],
//   'sprite_two': [
//     [ 1, Image ],
//     [ 2, Image ]
//   ]
// }
//
function loadImages(directory, files, rowData) {
  // match any character non-greedy optionally ending with numbers
  var fileRegex = /^(.*?)([0-9]*)\.[a-zA-Z]{3}$/;
      skipRegex = /^\.DS_Store$/;
  var join = Join.create();

  var processFile = function(file) {
    util.print("found file: " + file + " ... ");
    var results = file.match(fileRegex),
        img     = new Canvas.Image();
        stats   = fs.lstatSync(path.join(directory, file));

    if (stats.isDirectory()) {
      util.puts("skipping directory");
      return;
    }

    if (file.match(skipRegex)) {
      util.puts("skipping");
      return;
    }

    if (results) {
      util.puts("processing");
      var spriteName = results[1],
          fileNum    = parseInt(results[2], 10);

      img.onload = join.add();
      img.onerror = function() {
        util.puts("Error loading file: " + file);
        process.exit(1);
      };

      img.src = directory.replace(/\/$/, "") + "/" + file;

      rowData[spriteName] = rowData[spriteName] || [];
      rowData[spriteName].push([fileNum, img]);
    }
  };

  for(var i=0; i<files.length; i++) {
    processFile(files[i]);
  }

  return join;
}

var maxSpriteWidth = 1024;

// calculate width and height of image sprite
function calculateSize(rowData) {
  var maxWidth    = 0,
      totalHeight = 0;

  for(var spriteName in rowData) {
    var row = rowData[spriteName],
        firstImage = row[0][1];
        width = firstImage.width * row.length,
        rows = 1;

    util.puts("Processing " + spriteName + " ("+ row.length +" frames) ...");

    if (width > maxSpriteWidth) {
      rows = Math.ceil(width / maxSpriteWidth);
      width = maxSpriteWidth;
    }

    maxWidth = Math.max(width, maxWidth);
    totalHeight += firstImage.height * rows;
  }

  return { width: maxWidth, height: totalHeight };
}


function drawImages(rowData, canvas) {
  var context  = canvas.getContext("2d"),
      currentY = 0,
      json     = {};

  for (var spriteName in rowData) {
    var row = rowData[spriteName].sort(function(a,b) {
      return a[0] - b[0];
    });
    var firstImage = row[0][1],
        imageWidth = firstImage.width,
        rowHeight  = firstImage.height,
        rowWidth   = Math.min(imageWidth * row.length, maxSpriteWidth),
        columns    = Math.floor(rowWidth/imageWidth),
        rows       = Math.ceil(row.length/columns);

    json[spriteName] = { sx: 0, sy: currentY, columns: columns,
                         tileWidth: imageWidth, tileHeight: rowHeight,
                         frames: row.length
                       };

    for (var i=0; i<rows; i++) {
      for (var j=0; j<columns; j++) {
        if (row[j + i * columns]) {
          context.drawImage(row[j + i * columns][1], j * imageWidth, currentY);
        }
      }
      currentY += rowHeight;
    }
  }

  return json;
}

module.exports = spriteGenerator;