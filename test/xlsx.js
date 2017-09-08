import Meta from "../src/xlsx-meta";
import expect from "expect";

const filename = "./test/test.xlsx"

var metafile = new Meta(filename);

describe("get results", () => {
	it("gets xlsx data", (done) => {
		metafile.getMeta()
		.then(result => {
			// console.log(result);
			expect(result.properties.author).toEqual("Maarten Balliauw");
		})
		.then(() => done(), done);
	});
})
