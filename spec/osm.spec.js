const request = require("request");
const base_url = "http://localhost:8080/portaldata/categories";

describe("GET/ categories", function() {
    it("returns status code 200", function(done) {
        request.get(base_url, function(error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});