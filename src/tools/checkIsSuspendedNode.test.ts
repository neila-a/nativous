import {
    suspended
} from "../core";
import checkIsSuspendedNode from "./checkIsSuspendedNode";
describe("checkIsSuspendedNode", () => {
    it("check anything isn't a suspended node", () => {
        expect(checkIsSuspendedNode("some fake data")).toBeFalsy();
    });
    it("check a suspended node is a suspended node", () => {
        expect(checkIsSuspendedNode([suspended, [[1, Promise.resolve()]]])).toBeTruthy();
    });
});
