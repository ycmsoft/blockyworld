// Circle.js
// Alexander Bateman
// arbatema@ucsc.edu
// Notes to Grader: 
// Awesomeness: Added an opacity slider for transparent paint that can be layered like real paint. 
// Resources used: 
// I was missing new Float32Array(vertices) in the gl.bufferData line and asked ChatGPT, told me to add that and it worked.  (I had just vertices before)

// Circle class
class Circle{
  constructor(x, y, radius, color, segments){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color; 
    this.segments = segments;
  }

  render(){
    let vertices = [];
    let angleStep = (2 * Math.PI) / this.segments;
    
    //Center point
    vertices.push(this.x, this.y);
    
    //Generate vertices around circle
    for(let i = 0; i <= this.segments; i++){
      let angle = i * angleStep;
      let px = this.x + this.radius * Math.cos(angle);
      let py = this.y + this.radius * Math.sin(angle);
      vertices.push(px, py);
    }

    let vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
      console.log('Failed to create the buffer object');
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length / 2);
  }
}
