# slidepic

- a functional image gallery in React
  - includes controls for newest, newer, random oldest, older image
  - includes input box for skipping to image #
  - displays total number of images
  - displays image locally (or externally) with text and date
  - responsive design
  - somewhat accessible (needs improvement)
- fully useable out-of-the-box and extensible for both developers and content creators

## installation

- on the command line:

`%npm install`

## usage

- nearly everything lives in the `Slidepic` components folder (only `index.css` lives on the root)

- for developers, edit:

  - `index.css` for styling purposes
  - `components/Slidepic/Slidepic.js` for layout
  - `components/Slidepic/SlidepicConfig.js` for text configuration
  - `components/Slidepic/SlidepicData.js` for data
    - copy image files into `/public/images/` or use absolute URLs
    - update `file`, `date` and `text`
    - images will sort automatically according to date (yyyy-mm-dd format)
