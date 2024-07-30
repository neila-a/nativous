import {
    addGlobalUsePromiseCount,
    nowRenderCount,
    promiseResults,
    renderStage
} from "../core";
export function usePromise<promise>(promise: promise): Awaited<promise> {
    const id = addGlobalUsePromiseCount(),
        nowRenderStage = nowRenderCount[0];
    if (nowRenderStage === renderStage.initial) {
        throw [id, promise];
    }
    return promiseResults[id];
}
