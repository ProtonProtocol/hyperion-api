/**
 * @module RPC-Error
 */
// copyright defined in eosjs/LICENSE.txt

/** Holds detailed error information */
export class RpcError extends Error {
    /** Detailed error information */
    public json: any;

    constructor(json: any) {
        if (json.error && json.error.details && json.error.details.length && json.error.details[0].message) {
            super(json.error.details[0].message);
        } else if (json.processed && json.processed.except && json.processed.except.message) {
            super(json.processed.except.message);
        } else {
            super(json.message);
        }
        Object.setPrototypeOf(this, RpcError.prototype);
        this.json = json;
    }
}

export class RpcStatusError extends Error {
    /** Detailed error information */
    public response: any;

    constructor(response: any) {
        if (response.status === 405) {
            super(response.statusText);
        }

        Object.setPrototypeOf(this, RpcStatusError.prototype);
        this.response = response;
    }
}
