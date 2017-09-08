import Meta from "../src/pdf-meta";
import expect from "expect";

const filename = "./test/test.pdf"

var metafile = new Meta(filename);

describe("get results", () => {
	it("gets pdf data", (done) => {
		metafile.getMeta()
		.then(result => {
			// console.log(result);
			expect(result.properties.author).toEqual("Jason Norwood-Young");
		})
		.then(() => done(), done);
	});
})
