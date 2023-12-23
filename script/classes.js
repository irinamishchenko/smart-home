class Room {
  constructor(title, image, devices) {
    this.title = title;
    this.image = image;
    this.devices = devices;
  }
}

class Device {
  battery = Math.floor(Math.random() * 100) + 1;
  timer;
  functions = {};
  constructor(isOn, title, imageUrl) {
    this.isOn = isOn;
    this.title = title;
    this.imageUrl = imageUrl;
  }
  changeBattery() {
    if (this.timer > 0) {
      clearInterval(this.timer);
      this.timer = "undefined";
    } else {
      this.timer = setInterval(() => {
        if (this.battery === 1) {
          clearInterval(this.timer);
        }
        this.battery -= 1;
        changeChargePercentage();
      }, 3600000);
    }
  }
  setFunctions(functions) {
    this.functions = functions;
  }
}

export { Room, Device };
