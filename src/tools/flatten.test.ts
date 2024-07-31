import flatten from "./flatten";
describe("flatten", () => {
    it("is a string", () => {
        expect(flatten(["a string"])).toMatchObject(["a string"]);
    });
    it("is a iterable", () => {
        expect(flatten([[1]])).toMatchObject([1]);
    });
});
