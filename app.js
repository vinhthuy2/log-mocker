const fs = require("fs");
const moment = require("moment");
const { loremIpsum } = require("lorem-ipsum");

const logname = moment(new Date()).format("hhmmss");

const logger = fs.createWriteStream(`${logname}.txt`, {
  flags: "a",
});

const events = [
  {
    name: "ERROR",
    weigth: 0.1,
  },
  {
    name: "INFO",
    weigth: 0.8,
  },
  {
    name: "WARN",
    weigth: 0.1,
  },
];

const chooseWithChance = () => {
  const cSumObject = events.map((e, idx, arr) => {
    let csum = 0;
    for (let index = 0; index <= idx; index++) {
      csum += arr[index].weigth;
    }
    return { ...e, csum };
  });

  const rand = Math.random();
  const selected = cSumObject.find((el) => rand <= el.csum);
  return selected.name;
};

(() => {
  setInterval(() => {
    const time = moment(new Date()).format("yyyy-mm-dd HH:MM:SS.ss");
    const log = `${time} - ${chooseWithChance()}: ${loremIpsum()} \n`;
    console.log(log);
    logger.write(log);
  }, 1000);
})();
