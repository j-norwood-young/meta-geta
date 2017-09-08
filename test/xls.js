import Meta from "../src/xls-meta";
import expect from "expect";

const filename = "./test/test.xls"

var metafile = new Meta(filename);

describe("get results", () => {
	it("gets xls data", (done) => {
		metafile.getMeta()
		.then(result => {
			// console.log(result);
			expect(result.properties.author).toEqual("Jeff");
		})
		.then(() => done(), done);
	});
})
