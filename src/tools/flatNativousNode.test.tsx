import flatNativousNode from "./flatNativousNode";
import "@testing-library/jest-dom";
import flatten from "./flatten";
describe("flatNativousNode", () => {
    test("flat a 2D-list array", () => {
        const twoD = [1, 2, 3].map(item => [-1, -2].map(j => ({
            [item]: j
        }))),
            // @ts-ignore
            flated = flatNativousNode(twoD);
        expect(flated).toHaveLength(6);
    });
    test("flat a not-flatable", () => {
        expect(flatten([123456])).toHaveLength(1);
    });
});
