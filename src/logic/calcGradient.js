export const Gradient = function(colorArr) {
  if (colorArr.length === 0) throw "Number of color is zero";
  this.colorsHex = [...colorArr];
  this.phase = colorArr.length;
  this.colorsDec = colorArr.map(colorHex => {
    return [
      parseInt(colorHex.substr(0, 2), 16),
      parseInt(colorHex.substr(2, 2), 16),
      parseInt(colorHex.substr(4), 16)
    ];
  });
  this.tick = this.colorsDec
    .map((colorDec, i) => {
      if (i !== this.phase - 1) {
        const nextColorDec = this.colorsDec[i + 1];
        return [
          (nextColorDec[0] - colorDec[0]) / (100 / this.phase),
          (nextColorDec[1] - colorDec[1]) / (100 / this.phase),
          (nextColorDec[2] - colorDec[2]) / (100 / this.phase)
        ];
      } else return null;
    })
    .slice(0, this.phase - 1);

  this.getColor = progress => {
    if (progress === 0) return "#" + this.colorsHex[0];
    const currPhase = Math.ceil(progress / (100 / this.phase));
    const currColorDec = [
      Math.floor(
        this.colorsDec[currPhase - 1][0] +
          this.tick[currPhase - 1][0] * progress
      ),
      Math.floor(
        this.colorsDec[currPhase - 1][1] +
          this.tick[currPhase - 1][1] * progress
      ),
      Math.floor(
        this.colorsDec[currPhase - 1][2] +
          this.tick[currPhase - 1][2] * progress
      )
    ];
    const currColorHex =
      Number(currColorDec[0]).toString(16) +
      Number(currColorDec[1]).toString(16) +
      Number(currColorDec[2]).toString(16);
    return "#" + currColorHex;
  };
};
