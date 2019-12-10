export class MapNotFoundError extends Error {
    constructor(m?: string) {
        super(m);
        // Set the prototype explicitly.
        // (https://github.com/Microsoft/TypeScript-wiki/blob/
        // master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work)
        Object.setPrototypeOf(this, MapNotFoundError.prototype);
    }
}
