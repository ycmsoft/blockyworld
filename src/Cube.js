// Cube.js
// Alexander Bateman
// arbatema@ucsc.edu
// Notes to Grader: 
// Resources used: Professors youtube videos, slight debugging with ChatGPT (drawArrays line, back and top vertices corrected)
class Cube {
  constructor(){
    this.type = 'cube';
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
    this.texWeight = 1.0;
    this.textureNum = 0;
  }

  static initBuffer(){
    if(Cube._buffer){
      return;
    }

    // 36 vertices, x y z u v
    const v = new Float32Array([
      //Front z = 0
      0,0,0, 0,0,   1,1,0, 1,1,   1,0,0, 1,0,
      0,0,0, 0,0,   0,1,0, 0,1,   1,1,0, 1,1,
      //Back z = 1
      0,0,1, 0,0,   1,0,1, 1,0,   1,1,1, 1,1,
      0,0,1, 0,0,   1,1,1, 1,1,   0,1,1, 0,1,
      //Top y = 1
      0,1,0, 0,0,   0,1,1, 0,1,   1,1,1, 1,1,
      0,1,0, 0,0,   1,1,1, 1,1,   1,1,0, 1,0,
      //Bottom y = 0
      0,0,0, 0,0,   1,0,0, 1,0,   1,0,1, 1,1,
      0,0,0, 0,0,   1,0,1, 1,1,   0,0,1, 0,1,
      //Right x = 1
      1,0,0, 0,0,   1,1,0, 0,1,   1,1,1, 1,1,
      1,0,0, 0,0,   1,1,1, 1,1,   1,0,1, 1,0,
      //Left x = 0
      0,0,0, 0,0,   0,0,1, 1,0,   0,1,1, 1,1,
      0,0,0, 0,0,   0,1,1, 1,1,   0,1,0, 0,1,
    ]);

    Cube._vertexCount = 36;
    Cube._FSIZE = v.BYTES_PER_ELEMENT;
    Cube._buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, Cube._buffer);
    gl.bufferData(gl.ARRAY_BUFFER, v, gl.STATIC_DRAW);
  }

  render(){
    Cube.initBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, Cube._buffer);
    const stride = 5 * Cube._FSIZE;

    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, stride, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, stride, 3 * Cube._FSIZE);
    gl.enableVertexAttribArray(a_UV);

    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
    gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
    gl.uniform1f(u_TexColorWeight, this.texWeight);
    gl.uniform1i(u_whichTexture, this.textureNum);
    //gl.drawArrays(gl.TRIANGLES, 0, 3);
    //gl.drawArrays(gl.TRIANGLES, 0, n);
    gl.drawArrays(gl.TRIANGLES, 0, Cube._vertexCount);
  }
}

/*

renderfaster(){
  var rgba = this.color;
  //Pass the texture number
  gl.uniform1i(u_whichTexture, -2);
  //Pass the color of a point to u_FragColor uniform variable
  gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
  //Pass the matrix to u_ModelMatrix attribute
  gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
  //if(g_vertexBuffer == null){
    initTriangle3D();
  //}
  gl.bufferData(gl.ARRAY_BUFFER, this.cubeVerts32, gl.DYNAMIC_DRAW);
  gl.drawArrays(gl.TRIANGLES, 0, 36);
  }
}

*/
