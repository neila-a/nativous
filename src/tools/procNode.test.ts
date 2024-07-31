/**
 * @jest-environment jsdom
*/
import procNode from "./procNode";
import "@testing-library/jest-dom";
describe("procNode", () => {
    it("is a node", () => {
        const element = document.createElement("div");
        expect(procNode(element)).toBeInstanceOf(HTMLDivElement);
    });
    it("is a string", () => {
        const container = document.createElement("div");
        container.append(procNode("abc114514"));
        expect(container).toHaveTextContent("abc114514");
    });
    it("is a number", () => {
        const container = document.createElement("div");
        // eslint-disable-next-line no-magic-numbers
        container.append(procNode(114514));
        expect(container).toHaveTextContent("114514");
    });
    it("is a undefined or null", () => {
        const container = document.createElement("div");
        container.append(procNode(undefined));
        container.append(procNode(null));
        expect(container).toBeEmptyDOMElement();
    });
    it("is true", () => {
        const container = document.createElement("div");
        container.append(procNode(true));
        expect(container).toHaveTextContent("true");
    });
    it("is false", () => {
        const container = document.createElement("div");
        container.append(procNode(false));
        expect(container).toHaveTextContent("false");
    });
});
