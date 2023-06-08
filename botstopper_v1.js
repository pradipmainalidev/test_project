/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

var version = "1.0.0";

function getAppVersion() {
    const appVersion = navigator.appVersion;
    if (appVersion == undefined) {
        return '';
    }
    return appVersion;
}

function getRTT() {
    if (navigator.connection === undefined) {
        return -1;
    }
    if (navigator.connection.rtt === undefined) {
        return -2;
    }
    return navigator.connection.rtt;
}

function getUserAgent() {
    return navigator.userAgent;
}

const signals = {
    userAgent: getUserAgent,
    appVersion: getAppVersion,
    rtt: getRTT,
};

/**
 * Signal collection error.
 */
class SignalCollectorError extends Error {
    /**
     * Creates a new SignalCollectorError.
     *
     * @class
     */
    constructor(state, message) {
        super(message);
        this.state = state;
        this.name = 'SignalCollectorError';
        Object.setPrototypeOf(this, SignalCollectorError.prototype);
    }
}

class BotSignalCollector {
    constructor() {
        this.components = undefined;
    }
    getComponents() {
        return this.components;
    }
    getSignals() {
        return signals;
    }
    collect() {
        return __awaiter(this, void 0, void 0, function* () {
            const signals = this.getSignals();
            const components = {};
            const signalKeys = Object.keys(signals);
            yield Promise.all(signalKeys.map((signalKey) => __awaiter(this, void 0, void 0, function* () {
                const res = signals[signalKey];
                try {
                    components[signalKey] = {
                        value: yield res(),
                        state: 0 /* State.Success */,
                    };
                }
                catch (error) {
                    if (error instanceof SignalCollectorError) {
                        components[signalKey] = {
                            state: error.state,
                            error: `${error.name}: ${error.message}`,
                        };
                    }
                    else {
                        components[signalKey] = {
                            state: -3 /* State.UnexpectedBehaviour */,
                            error: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
                        };
                    }
                }
            })));
            this.components = components;
            console.log(this.components);
            return this.components;
        });
    }
    upload(apikey) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(apikey);
            return 1;
        });
    }
}

function run() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('run()...');
        console.log(version);
        const bot_stopper = new BotSignalCollector();
        yield bot_stopper.collect();
        //await bot_stopper.upload();
        return bot_stopper;
    });
}
var index = { run };

export { index as default, run };
