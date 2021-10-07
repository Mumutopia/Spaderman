export const gamepad = {
  loopId: null,
  pad: null,
  start: function (e) {
      this.pad = navigator.getGamepads()
      console.log(navigator.getGamepads());
    //this.pad = e.gamepad;
    this.buttons = this.pad.buttons;
    this.loopId = requestAnimationFrame(this.listen.bind(this));
    console.log(this.buttons);
  },
  connect: function () {
      this.start()
    //window.addEventListener("gamepadconnected", this.start.bind(this));
    window.addEventListener("onbeforeunload", this.disconnect.bind(this));
  },
  disconnect: function () {
    cancelAnimationFrame(this.loopId);
  },
  listen: function () {
    const pressed = {};

    console.log(this.buttons[0])
    // for (let i = 0; i < this.buttons.length; i += 1) {
    for (let i = 0; i < 1; i += 1) {
      // console.log(this.buttons[0].pressed, "press ?");
     // console.log(this.buttons[i].touched);
      //console.log(Boolean(pressed["B" + i]));
     // if (this.buttons[i].pressed) pressed["B" + i] = true;
     // else if (Boolean(pressed["B" + i]) && this.buttons[i].pressed === true) {
        //console.log("wanna delete");
        //delete pressed["B" + i];
      //}
    }

    //console.log(pressed);

    this.loopId = requestAnimationFrame(this.listen.bind(this));
  },
};

// //B0 =A
// B1 = B
// B15 = right
//  B12 = up
//  b13 = down
// b14 =left
