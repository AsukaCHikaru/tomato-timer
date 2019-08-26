export const Gradient = function(colorArr) {
  if (colorArr.length === 0) throw "Number of color is zero";
  this.phase = colorArr.length - 1;
  this.ticksPerPhase = 100 / this.phase;
  this.colorsDec = colorArr.map(colorHex => {
    return [
      parseInt(colorHex.substr(0, 2), 16),
      parseInt(colorHex.substr(2, 2), 16),
      parseInt(colorHex.substr(4), 16)
    ];
  });
  this.tick = this.colorsDec
    .map((colorDec, i) => {
      if (i !== this.phase) {
        const nextColorDec = this.colorsDec[i + 1];
        return [
          (nextColorDec[0] - colorDec[0]) / this.ticksPerPhase,
          (nextColorDec[1] - colorDec[1]) / this.ticksPerPhase,
          (nextColorDec[2] - colorDec[2]) / this.ticksPerPhase
        ];
      } else return null;
    })
    .slice(0, this.phase);

  this.getColor = progress => {
    if (progress === 0) return "#" + colorArr[0];
    const currPhase = Math.ceil(progress / this.ticksPerPhase);
    const currColorDec = [
      Math.floor(
        this.colorsDec[currPhase - 1][0] +
          this.tick[currPhase - 1][0] * (progress % this.ticksPerPhase)
      ),
      Math.floor(
        this.colorsDec[currPhase - 1][1] +
          this.tick[currPhase - 1][1] * (progress % this.ticksPerPhase)
      ),
      Math.floor(
        this.colorsDec[currPhase - 1][2] +
          this.tick[currPhase - 1][2] * (progress % this.ticksPerPhase)
      )
    ];
    const currColorHex =
      Number(currColorDec[0]).toString(16) +
      Number(currColorDec[1]).toString(16) +
      Number(currColorDec[2]).toString(16);
    return "#" + currColorHex;
  };
};
