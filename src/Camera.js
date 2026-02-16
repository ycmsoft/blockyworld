// Camera.js
// Alexander Bateman
// arbatema@ucsc.edu
// Notes to Grader: 
// Awesomeness: 
// Resources used: 
// I got really close on this one. Claude replaced my panLeft/panRight rotation matrix approach with a yaw/pitch
// system (_updateAtFromAngles, onMouseMove) so that keyboard panning and mouse look would use the same rotation logic. 
// It also added f/b.elements[1] = 0 in moveForward/moveBack to stay on the ground plane.

class Camera{
  constructor(){
    this.fov = 60;

    //this.eye = new Vector3([0, 0, 3]);
    //this.at  = new Vector3([0, 0, -100]);
    //this.up  = new Vector3([0, 1, 0]);

    //this.eye = new Vector3([0, 0, 0]);
    //this.at  = new Vector3([0, 0, -1]);
    //this.up  = new Vector3([0, 1, 0]);

    this.eye = new Vector3([0, 0.5, 3]);
    this.at = new Vector3([0, 0.5, 2]);
    this.up = new Vector3([0, 1, 0]);

    this.viewMatrix = new Matrix4();
    this.projectionMatrix = new Matrix4();

    this.yaw = -90;
    this.pitch = 0;

    this._updateAtFromAngles();
    this.updateView();
    this.updateProjection();
  }

  //Helpers
  _updateAtFromAngles(){
    let yawRad = this.yaw * Math.PI / 180;
    let pitchRad = this.pitch * Math.PI / 180;
    let fx = Math.cos(pitchRad) * Math.cos(yawRad);
    let fy = Math.sin(pitchRad);
    let fz = Math.cos(pitchRad) * Math.sin(yawRad);
    this.at.elements[0] = this.eye.elements[0] + fx;
    this.at.elements[1] = this.eye.elements[1] + fy;
    this.at.elements[2] = this.eye.elements[2] + fz;
  }

  updateView(){
    this.viewMatrix.setLookAt(
      this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
      this.at.elements[0], this.at.elements[1], this.at.elements[2],
      this.up.elements[0], this.up.elements[1], this.up.elements[2]
    );
  }

  updateProjection(){
    const aspect = canvas.width / canvas.height;
    this.projectionMatrix.setPerspective(this.fov, aspect, 0.1, 1000);
  }

  moveForward(speed){
    let f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);
    f.elements[1] = 0;      
    f.normalize();
    f.mul(speed);
    this.eye.add(f);
    this.at.add(f);
    this.updateView();
  }

  moveBackwards(speed){
    let b = new Vector3();
    b.set(this.eye);
    b.sub(this.at);
    b.elements[1] = 0;
    b.normalize();
    b.mul(speed);
    this.eye.add(b);
    this.at.add(b);
    this.updateView();
  }

  moveLeft(speed){
    let f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);
    f.normalize();
    let s = Vector3.cross(this.up, f);
    s.normalize();
    s.mul(speed);
    this.eye.add(s);
    this.at.add(s);
    this.updateView();
  }

  moveRight(speed){
    let f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);
    f.normalize();
    let s = Vector3.cross(f, this.up);
    s.normalize();
    s.mul(speed);
    this.eye.add(s);
    this.at.add(s);
    this.updateView();
  }

  //Pan with Q and E
  panLeft(deg){ 
    this.yaw -= deg;
    this._updateAtFromAngles(); 
    this.updateView(); 
  }

  panRight(deg){
    this.yaw += deg;
    this._updateAtFromAngles();
    this.updateView(); 
  }

  //Mouse look
  onMouseMove(dx, dy){
    const sensitivity = 0.15;
    this.yaw += dx * sensitivity;
    this.pitch -= dy * sensitivity;
    if (this.pitch >  89) this.pitch = 89;
    if (this.pitch < -89) this.pitch = -89;
    this._updateAtFromAngles();
    this.updateView();
  }
}
