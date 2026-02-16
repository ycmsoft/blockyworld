// Triangle.js
// Alexander Bateman
// arbatema@ucsc.edu
// Notes to Grader: 
// Resources used: Professors videos


// Triangle helpers


let g_vertexBuffer = null;
function initTriangle3D(){
  //Create a buffer object
  g_vertexBuffer = gl.createBuffer();
  if (!g_vertexBuffer){
    console.log('Failed to create the buffer object');
    return -1;
  }
  //Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexBuffer);
  //Assign the buffer object to a_ Position variable
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

  //Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  //console.log('initTriangle3D');
  
}


function drawTriangle3D(vertices){
  var n = vertices.length/3; //The number of vertices

  if(g_vertexBuffer == null){
    initTriangle3D();
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  gl.drawArrays(gl.TRIANGLES, 0, n);
}



function drawTriangleUV(vertices, uv){
  //var n = 3; //Number of vertices
  var n = vertices.length/3; //The number of vertices


  //Create a buffer object for positions
  var vertexBuffer = gl.createBuffer();
  if(!vertexBuffer){
    console.log('Failed to create the buffer object');
    return -1;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);


  
  //Create a buffer object for uv
  var uvBuffer = gl.createBuffer();
  if(!uvBuffer){
    console.log('Failed to create the buffer object');
    return -1;
  }

  //Bind buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);

  //Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv),gl.DYNAMIC_DRAW);
  //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv),gl.STATIC_DRAW);

  //Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);

  //Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_UV);

  //Draw the triangles
  gl.drawArrays(gl.TRIANGLES, 0, n);

  //g_vertexBuffer = null; 
  
  //Free buffer?

}



/*
function drawTriangle3D(verts) {
  if (!g_tri3DBuffer) {
    g_tri3DBuffer = gl.createBuffer();
    if (!g_tri3DBuffer) {
      console.log('Failed to create the buffer object');
      return;
    }
  }

  const vertices = new Float32Array(verts);

  gl.bindBuffer(gl.ARRAY_BUFFER, g_tri3DBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
*/



/*
  function drawTriangle3D(verts){
    //Create buffer for triangle vertices
    const vertices = new Float32Array(verts);

    const vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
      console.log('Failed to create the buffer object');
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    //gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
    */

