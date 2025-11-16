# Quadtree_subdivision
This project recursively divides an image into sections based on color variation. If a section has a high color variation, it will be subdivided further. Once a specified threshold is reached, the average color of that section is saved and later redrawn on the canvas.

## Running the p5.js Version

The project has been ported to p5.js and can be run in a web browser:

1. Open `index.html` in your web browser
2. Or use a local web server (required for loading images):
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js http-server
   npx http-server
   ```
3. Navigate to `http://localhost:8000` in your browser

### Adjustable parameters

By default, the program starts with the entire image as the initial section to divide. The threshold for subdivision is dynamically controlled by the x-coordinate of your cursor within the window (move your mouse left/right to adjust).

To change the image, edit `sketch.js` and modify the image path in the `preload()` function:
```javascript
img = loadImage('data/yourImage.jpg');
```

## Original Processing Version

The original Processing files (.pde) are still included in this repository. To use a custom image in Processing:
```processing
img = loadImage("yourImage.jpg");
```

![Example image](save.jpg)
