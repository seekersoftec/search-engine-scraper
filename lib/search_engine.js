const google = require("./search_engines/google");
const bing = require("./bing.js");
const aol = require("./aol.js");
const ask = require("./ask.js");
const yahoo = require("./yahoo.js");
const duckduckgo = require("./duckduckgo.js");
const baidu = require("./baidu.js");
const dogpile = require("./dogpile.js");
const exalead = require("./exalead.js");
const crtsh = require("./crtsh.js");
const netcraft = require("./netcraft.js");

const searchEngines = {
	google: google,
	bing: bing,
	aol: aol,
	ask: ask,
	yahoo: yahoo,
	duckduckgo: duckduckgo,
	baidu: baidu,
    dogpile: dogpile,
    exalead: exalead,
    crtsh: crtsh,
    netcraft: netcraft
};

module.exports = searchEngines;
