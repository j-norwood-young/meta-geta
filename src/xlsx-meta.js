import baseMeta from "./base-meta";
import fs from "fs";
import JSZip from "jszip";
import Parser from "xml-json-parser";
var parser = new Parser();

export default class xlsMeta extends baseMeta {
	constructor(props) {
		super(props);
	}

	getMeta() {
		return new Promise((resolve, reject) => {
			var result = {};
			var zip = null;
			fs.readFile(this.filename, (err, data) => {
				if (err) return reject(err);
				JSZip.loadAsync(data)
				.then(function (result) {
					zip = result;
					// console.log(zip);
					return zip.file("docProps/core.xml").async("string");
				})
				.then((xmlString) => {
					var xmlObj = parser.parseXmlString(xmlString);
					var json = parser.xml2json(xmlObj);
					if (json.coreProperties) {
						result.core = {};
						for (var i in json.coreProperties) {
							if (json.coreProperties[i].__text) {
								var s = json.coreProperties[i].toString();
								if (i.charAt(0) !== "_")
									result.core[i] = s;
							}
						}
					}
					return zip.file("docProps/app.xml").async("string");
				})
				.then((xmlString) => {
					var xmlObj = parser.parseXmlString(xmlString);
					var json = parser.xml2json(xmlObj);
					// console.log(json);
					if (json.Properties) {
						result.app = {};
						for (var i in json.Properties) {
							var s = json.Properties[i];
							if (i.charAt(0) !== "_")
								result.app[i] = s;
						}
					}
					this.meta.raw = result;
					this.meta.properties = {
						title: result.core.title || null,
						author: result.core.creator || null,
						editor: result.core.lastModifiedBy || null,
						company: result.core.Company || null,
						subject: result.core.description || null,
						keywords: result.core.keywords || null,
						created_date: result.core.created || null,
						edited_date: result.core.modified || null,
						software_creator: result.app.Application || null,
						software_editor: null,
						snippet: null,
					};
					resolve(this.meta);
				})
				.catch(err => {
					console.trace(err);
					return reject(err);
				});
			});
		});
	};
}