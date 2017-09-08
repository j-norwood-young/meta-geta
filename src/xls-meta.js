import baseMeta from "./base-meta";
import { exec } from "child_process";

export default class xlsMeta extends baseMeta {
	constructor(props) {
		super(props);
	}

	getMeta() {
		return new Promise((resolve, reject) => {
			exec(`exiftool -j '${this.filename}'`, (err, stdout, stderr) => {
				if (err)
					return reject(err);
				if (stderr)
					return reject(stderr);
				try {
					var result = JSON.parse(stdout).pop();
				} catch(e) {
					return reject("Could not parse exiftool result")
				}
				this.meta.raw = result;
				this.meta.properties = {
					title: (result.HeadingPairs) ? Array.isArray(result.HeadingPairs) ? result.HeadingPairs.join(", ") : result.HeadingPairs : null,
					author: result.Author || null,
					editor: result.LastModifiedBy || null,
					company: result.Company || null,
					subject: null,
					keywords: (result.TitleOfParts) ? (Array.isArray(result.TitleOfParts)) ? result.TitleOfParts.join(", ") : result.TitleOfParts : null,
					created_date: result.CreateDate || null,
					edited_date: result.ModifyDate || null,
					software_creator: result.Software || null,
					software_editor: null,
					snippet: null,
				};
				resolve(this.meta);
			});
		});
	};
}