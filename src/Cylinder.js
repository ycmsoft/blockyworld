// Cylinder.js
// Alexander Bateman
// arbatema@ucsc.edu
// Notes to Grader: 
// Awesomeness: Cylinder for bamboo sticks
// Resources used: 
// Initial triangle geometry generated with ChatGPT, integrated and tuned (segments/scale/placement) in BlockyAnimal.js
class Cylinder {
  constructor() {
    this.type = 'cylinder';
    this.color = [0.0, 1.0, 0.0, 1.0]; // Green for bamboo
    this.matrix = new Matrix4();
    this.segments = 24; 
  }

  render() {
    let rgba = this.color;
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    for (let i = 0; i < this.segments; i++) {
      let angle1 = (i * 2 * Math.PI) / this.segments;
      let angle2 = ((i + 1) * 2 * Math.PI) / this.segments;

      let x1 = Math.cos(angle1), z1 = Math.sin(angle1);
      let x2 = Math.cos(angle2), z2 = Math.sin(angle2);

      // Side face (two triangles for a quad)
      drawTriangle3D([x1, 0, z1,  x2, 1, z2,  x1, 1, z1]);
      drawTriangle3D([x1, 0, z1,  x2, 0, z2,  x2, 1, z2]);

      // Top cap
      drawTriangle3D([0, 1, 0,  x1, 1, z1,  x2, 1, z2]);
      // Bottom cap
      drawTriangle3D([0, 0, 0,  x2, 0, z2,  x1, 0, z1]);
    }
  }
}