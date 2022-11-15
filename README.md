## Example

> **Note** CommonJS usage
>following approach:

```js
import getFileSpecs from 'dtuploader';
 
      let fileSpecs = new  getFileSpecs(file);

      function fileDimension(dimensions) {
        console.log(dimensions)
      }
      let type = fileSpecs.getType();
      let extension = fileSpecs.getExtension();
      let size = fileSpecs.getFileSize()
      fileSpecs.getDimensions(fileDimension);
      console.log(type, extension, size)
 
 
 

```js