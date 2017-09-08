import path from "path";
import fs from "fs";

export default class BaseMeta {
	constructor(filename) {
		this.filename = filename;
		this.stats = fs.statSync(filename);
		this.meta = Object.assign({
			basename: path.basename(this.filename),
			filename,
			ext: path.extname(this.filename),
		}, this.stats, {
			location: {
				latitude: null,
				longitude: null,
				direction: null,
			},
			properties: {
				title: null,
				author: null,
				editor: null,
				company: null,
				subject: null,
				keywords: null,
				created_date: null,
				edited_date: null,
				software_creator: null,
				software_editor: null,
				snippet: null,
			},
			raw: {}
		});
		this.meta.size = +this.meta.size;
	}

	getMeta() {
		return Promise.resolve(this.meta);
	}
}