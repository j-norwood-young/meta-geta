"use strict";

const fs = require("fs");
const { exec } = require('child_process');

var getMeta = (fname) => {
	return new Promise((resolve, reject) => {
		exec(`textutil -info '${fname}'`, (err, stdout, stderr) => {
			if (err)
				return reject(err);
			if (stderr)
				return reject(stderr);
			const lines = stdout.split("\n").map(line => {
				return line.trim().split(":").map(parts => {
					return parts.trim();
				});
			});
			var result = {};
			lines.forEach(line => {
				if (line[0])
					result[line[0]] = line[1];
			});
			resolve({ info: result });
		});
	});
};

module.exports = {
	get_meta: getMeta
};