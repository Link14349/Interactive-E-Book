# Interactive-E-Book Standard Format
## Brief
Interactive-E-Book is a interactive e-book format for storing multimedia files including interactive program samples and videos.
## Format
It is stored in the form of a zip package and stored in the folder format after decompression.
```text
|- content.html # Main content
|- info.json # Store files about e-book format version, etc
|- medias # Storing multimedia files
  |- xx.mp3
  |- xx.mp4
  |- ...
|- library # Libraries used by interactive samples
  |- styles # Style library
    |- xx
      |- main.css
      |- xx.css
      |- ...
  |- scripts # Script library
    |- xx
      |- main.js
      |- xx.js
      |- ...
```
