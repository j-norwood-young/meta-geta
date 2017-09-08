import Meta from "../base-meta";

var metafile = new Meta("test.xls");

metafile.getMeta()
.then(result => {
	console.log(result);
});