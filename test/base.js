import Meta from "../src/base-meta";
import expect from "expect";

const filename = "./test/test.xls"

var metafile = new Meta(filename);

describe("get results", () => {
	it("gets file stats", (done) => {
		metafile.getMeta()
		.then(result => {
			// console.log(result);
			expect(result.basename).toEqual("test.xls"); 
		})
		.then(() => done(), done);
	});
})
