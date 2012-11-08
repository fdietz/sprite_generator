# sprite_generator

Take a directory of images and outputs a spritemap where each row of images corresponds to a numbered list of files and a json file detailing the pixel locations and number of frames for each sprite.

Build using Node.js and published as an npm package.

## Install

    npm install sprite_generator

## Commandline usage

    sprite_generator images/

## Module usage

    var spriteGenerator = require("sprite_generator");
    spriteGenerator("images/");

## Dependencies

sprite_generator depends on the canvas module which requires cairo to be installed.

## Credits

Ideas and some code taken from the excellent book [Professional HTML5 Mobile Game Development](http://www.wrox.com/WileyCDA/WroxTitle/Professional-HTML5-Mobile-Game-Development.productCd-1118301323.html) written by [Pascal Rettig](https://github.com/cykod).

Sample images are from [http://opengameart.org/content/space-shooter-art](http://opengameart.org/content/space-shooter-art).

## License MIT

Copyright (c) 2012 Frederik Dietz, fdietz@gmail.com

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



