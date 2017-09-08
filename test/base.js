import Meta from "../base-meta";
import assert from "assert";

const filename = "test.xls"

var metafile = new Meta(filename);

describe("get results", () => {
	it("gets file stats", async () => {
		metafile.getMeta()
		.then(result => {
			expect(result.basename).to.equal(filename); 
			
		});
	});
})
