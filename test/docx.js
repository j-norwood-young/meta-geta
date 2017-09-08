import Meta from "../src/docx-meta";
import expect from "expect";

const filename = "./test/test.docx"

var metafile = new Meta(filename);

describe("get results", () => {
	it("gets docx data", (done) => {
		metafile.getMeta()
		.then(result => {
			// console.log(result);
			expect(result.properties.author).toEqual("Lee");
		})
		.then(() => done(), done);
	});
})
