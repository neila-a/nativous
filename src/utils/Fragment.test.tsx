/**
 * @jest-environment jsdom
*/
import * as React from "../core";
import {
    createElement,
    suspended
} from "../core";
import {
    Fragment
} from "./Fragment";
import "@testing-library/jest-dom";
describe("Fragment", () => {
    it("without suspended", () => {
        // @ts-ignore
        const fragmented = <Fragment>node1<Fragment>node2</Fragment>
        </Fragment>;
        expect(fragmented).toBeInstanceOf(DocumentFragment);
    });
    it("with suspended", () => {
        // @ts-ignore
        const fragmented = <Fragment>{[suspended, [[114514, Promise.resolve()]]]}</Fragment>;
        expect(fragmented).toHaveLength(2);
    });
});
