# CSE 160 - Assignment 3 - World
Name: Alexander Bateman  
Email: arbatema@ucsc.edu  

Live Demo: https://ycmsoft.github.io/blockyworld/index.html

# Files:
- `index.html` - UI/canvas, loads all scripts.
- `src/World.js` - Main file: world rendering, game logic, input handling, textures.
- `src/Camera.js` - Camera class with movement, rotation, and mouse movement.
- `src/Cube.js` - Cube shape class with interleaved vertex/UV buffer.
- `src/Triangle.js` - Triangle drawing helpers.
- `src/Cylinder.js` - Cylinder shape class.
- `src/Circle.js` - Circle shape class.
- `lib/cuon-utils.js` - Shader utilities.
- `lib/cuon-matrix-cse160.js` - Matrix utilities.
- `lib/webgl-debug.js` - WebGL debugging utilities.
- `lib/webgl-utils.js` - WebGL utilities.
- `src/sky.jpg` - Sky texture (256x256). (not used)
- `src/brick.jpg` - Brick wall texture (256x256).
- `src/grass.jpg` - Grass ground texture (256x256).
- `README.md` - This readme.

# Controls:
- `W` - Move forward.
- `A` - Move left.
- `S` - Move backward.
- `D` - Move right.
- `Q` - Turn camera left.
- `E` - Turn camera right.
- Mouse - Rotate camera (click the canvas for pointer to lock).
- Left click - Place block.
- Right click - Remove block.
- Space -Jump.

# Notes to Grader:
Awesomeness:
- Collision detection: Can't walk through walls, can jump on top of blocks.
- Gem collectibles: Find 5 hidden gems scattered in map to win.
- Terrain ground map: Ground rendered as individual tiles with super super subtle sine wave height variation.
- Animated blocky pandas: One in a fixed place, the other is wandering in a circle, both with simplified leg animations from last assignment.
- FPS counter

# Resources used:
Professors videos for initial setup, texture loading, and cube rendering.  
- https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent  
- https://learnwebgl.brown37.net/07_cameras/camera_movement.html  

brick.jpg and grass.jpg were from a quick Google search for "minecraft brick texture jpg" and "minecraft grass texture jpg", grabbed the first ones I saw and resized them to 256x256.

Used Claude for:
- **Camera.js**: I got really close on this one. Claude replaced my panLeft/panRight rotation matrix approach with a yaw/pitch system (_updateAtFromAngles, onMouseMove) so that keyboard panning and mouse look would use the same rotation logic. It also added f/b.elements[1] = 0 in moveForward/moveBack to stay on the ground plane.
- **Collision detection**: Wasn't sure if this was required, so I asked Claude to add it. It edited updateJump() and processKeys(), and added canMoveTo(). Took a little tuning, as there were issues with getting stuck on top of bricks, which when fixed would then teleport down when falling off.
- **Terrain map**: Was confused by "Change your ground plane from a flat plane to a terrain map OR get OBJ loader working." I gave Claude my original  ground block in renderscene(), and it added a loop and some sine waves to make the terrain height vary. I didn't like how it would have gaps beneath walls where you can see the sky color, so I reduced the values so there would be no noticeable difference. My original implementation is commented below that block.
- **Gems**: Consulted Claude for getting the gems to float and spin around.
- **General debugging**: Mostly with mouse movement and errors when typing stuff up from professors videos.
- Mouse movement reused some lines from last assignment, along with various other functions as I used assignment 2 as starter code.

**Cube.js**: Professors videos,slight debugging with ChatGPT (drawArrays line, back and top vertices corrected)
**Triangle.js**: Professors videos.  
