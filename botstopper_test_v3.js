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

function getUserAgent() {
    return navigator.userAgent;
}

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

function getWindowSize() {
    return {
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
    };
}

function getPluginsLength() {
    if (navigator.plugins === undefined) {
        return -2;
    }
    if (navigator.plugins.length) {
        return -1;
    }
    return navigator.plugins.length;
}

function getPluginsArray() {
    if (navigator.plugins === undefined) {
        return false;
    }
    if (window.PluginArray === undefined) {
        return false;
    }
    return navigator.plugins instanceof PluginArray;
}

function getErrorTrace() {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        null[0]();
    }
    catch (error) {
        if (error instanceof Error && error['stack'] != null) {
            return error.stack.toString();
        }
    }
    return '';
}

function getProductSub() {
    const { productSub } = navigator;
    if (productSub === undefined) {
        return '';
    }
    return productSub;
}

function getWindowExternal() {
    if (window.external === undefined) {
        return 'undefined';
    }
    const { external } = window;
    if (typeof external.toString !== 'function') {
        return 'not a function';
    }
    return external.toString();
}

function getMimeTypesConsistency() {
    if (navigator.mimeTypes === undefined) {
        return false;
    }
    const { mimeTypes } = navigator;
    let isConsistent = Object.getPrototypeOf(mimeTypes) === MimeTypeArray.prototype;
    for (let i = 0; i < mimeTypes.length; i++) {
        isConsistent && (isConsistent = Object.getPrototypeOf(mimeTypes[i]) === MimeType.prototype);
    }
    return isConsistent;
}

function getEvalLength() {
    return eval.toString().length;
}

function getWebGL() {
    const canvasElement = document.createElement('canvas');
    if (typeof canvasElement.getContext !== 'function') {
        return {
            vendor: '',
            renderer: '',
        };
    }
    const webGLContext = canvasElement.getContext('webgl');
    if (webGLContext === null) {
        return {
            vendor: '',
            renderer: '',
        };
    }
    if (typeof webGLContext.getParameter !== 'function') {
        return {
            vendor: '',
            renderer: '',
        };
    }
    const vendor = webGLContext.getParameter(webGLContext.VENDOR);
    const renderer = webGLContext.getParameter(webGLContext.RENDERER);
    return { vendor: vendor, renderer: renderer };
}

function getWebDriver() {
    if (navigator.webdriver == undefined) {
        return false;
    }
    return navigator.webdriver;
}

function getLanguages() {
    const n = navigator;
    const result = [];
    const language = n.language || n.userLanguage || n.browserLanguage || n.systemLanguage;
    if (language !== undefined) {
        result.push([language]);
    }
    if (Array.isArray(n.languages)) {
        result.push(n.languages);
    }
    else if (typeof n.languages === 'string') {
        const languages = n.languages;
        if (languages) {
            result.push(languages.split(','));
        }
    }
    return result;
}

function getNotificationPermissions() {
    return __awaiter(this, void 0, void 0, function* () {
        if (window.Notification === undefined) {
            return false;
        }
        if (navigator.permissions === undefined) {
            return false;
        }
        const { permissions } = navigator;
        if (typeof permissions.query !== 'function') {
            return false;
        }
        try {
            const permissionStatus = yield permissions.query({ name: 'notifications' });
            return window.Notification.permission === 'denied' && permissionStatus.state === 'prompt';
        }
        catch (e) {
            return false;
        }
    });
}

function getDocumentElementKeys() {
    if (document.documentElement === undefined) {
        return [''];
    }
    const { documentElement } = document;
    if (typeof documentElement.getAttributeNames !== 'function') {
        return [''];
    }
    return documentElement.getAttributeNames();
}

function getFunctionBind() {
    if (Function.prototype.bind === undefined) {
        return '';
    }
    return Function.prototype.bind.toString();
}

function getProcess() {
    if (window.process === undefined) {
        return { type: '' };
    }
    return window.process;
}

function getObjectProps(obj) {
    return Object.getOwnPropertyNames(obj);
}
function getDocumentProperties() {
    if (window.document === undefined) {
        return [''];
    }
    return getObjectProps(window.document);
}

function getWindowProps() {
    return Object.getOwnPropertyNames(window);
}

function getDeviceMemory() {
    if (navigator.deviceMemory === undefined) {
        return -1;
    }
    return navigator.deviceMemory;
}

//interface IPCheckResponse {
//    'ip':string
//    'country': string
//    'geo-ip': string
//    'API-help': string
//}
function getBrowserSideIP() {
    //const ip_resp;
    return fetch('http://jsonip.com/').then(res => res.json());
}

function getWindowData() {
    return {
        windowsOpenNum: window.window.length,
        devicePixelRatio: window.devicePixelRatio,
        windowFrames: window.length,
        windowPageXOffset: window.scrollX,
        windowPageYOffset: window.scrollY,
        windowPixelDepth: window.screen.pixelDepth,
    };
}

function getTimeStamp() {
    return new Date().toString();
}

const signals = {
    userAgent: getUserAgent,
    appVersion: getAppVersion,
    rtt: getRTT,
    windowSize: getWindowSize,
    pluginsLength: getPluginsLength,
    pluginsArray: getPluginsArray,
    errorTrace: getErrorTrace,
    productSub: getProductSub,
    windowExternal: getWindowExternal,
    mimeTypesConsistent: getMimeTypesConsistency,
    evalLength: getEvalLength,
    webGL: getWebGL,
    webDriver: getWebDriver,
    languages: getLanguages,
    notificationPermissions: getNotificationPermissions,
    documentElementKeys: getDocumentElementKeys,
    functionBind: getFunctionBind,
    process: getProcess,
    documentProps: getDocumentProperties,
    windowProps: getWindowProps,
    deviceMemory: getDeviceMemory,
    browsersideip: getBrowserSideIP,
    windowData: getWindowData,
    timestamp: getTimeStamp,
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
