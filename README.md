# Quadtree_subdivision
This project recursively divides an image into sections based on color variation. If a section has a high color variation, it will be subdivided further. Once a specified threshold is reached, the average color of that section is saved and later redrawn on the canvas.

## Running the p5.js Version

The project has been ported to p5.js and can be run in a web browser:

1. Use a local web server (required for loading images):
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js http-server
   npx http-server
   ```
2. Navigate to `http://localhost:8000` in your browser
3. Open `index.html`

### Controls

- **Threshold Slider**: Adjust the subdivision threshold (5-50). Lower values create more subdivisions and detail.
- **File Input**: Click "Choose File" to load your own image directly from your computer - no code editing needed!

The quadtree is calculated only when the threshold changes, making it much faster than the original Processing version which recalculated every frame.

### Changing the Default Image

To change the default image that loads on startup, edit `sketch.js` and modify the image path in the `preload()` function:
```javascript
img = loadImage('data/yourImage.jpg');
```

## Original Processing Version

The original Processing files (.pde) are still included in this repository. To use a custom image in Processing:
```processing
img = loadImage("yourImage.jpg");
```

![Example image](save.jpg)
