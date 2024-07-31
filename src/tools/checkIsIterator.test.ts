import checkIsIterator from "./checkIsIterator";
describe("checkIsIterator", () => {
    it("check array is a iterable", () => {
        expect(checkIsIterator([[]])).toBeTruthy();
    });
    it("check string isn't a iterable", () => {
        expect(checkIsIterator("")).toBeFalsy();
    });
});
