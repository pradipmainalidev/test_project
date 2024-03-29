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
    let document_Focus;
    if (document.hasFocus === undefined) {
        document_Focus = 0;
    }
    else {
        document_Focus = document.hasFocus() ? 1 : 0;
    }
    return {
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        documentFocus: document_Focus,
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
        return '-2';
    }
    return Function.prototype.bind.toString();
}

function getProcess() {
    if (window.process === undefined) {
        return { type: '' };
    }
    return window.process;
}

function getDocumentProperties() {
    if (window.document === undefined) {
        return [''];
    }
    //return getObjectProps(window.document)
    return Object.getOwnPropertyNames(window.document);
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

//http://jsonip.com/
//https://ipinfo.io/json?token=5b07c130860f26
//export default function getBrowserSideIP(): any {
//    return fetch('https://jsonip.com/').then(res => res.json())
//}
// https://ipapi.is/
// https://ipapi.is/json/?whois=24.218.0.0
// https://www.npmjs.com/package/ip-to-hosting
function getBrowserSideIP() {
    return fetch('https://ipinfo.io/json?token=5b07c130860f26').then(res => res.json());
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

function getBrowserSideIPipInfo() {
    return fetch('https://jsonip.com/').then(res => res.json());
}

function getBrowserSideIPipApi() {
    return fetch('https://ipapi.is/json/').then(res => res.json());
}

function getMaxTouchPoints() {
    return navigator.maxTouchPoints;
}

function getHardwareConcurrency() {
    return navigator.hardwareConcurrency;
}

function getCookieEnabled() {
    if (navigator.cookieEnabled)
        return 1;
    else
        return 0;
}

function getPdfViewEnabled() {
    if (navigator.pdfViewerEnabled)
        return 1;
    else
        return 0;
}

function getNavigatorProps() {
    return Object.getOwnPropertyNames(window.navigator);
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
    browserSideIP: getBrowserSideIP,
    browserSideIPipInfo: getBrowserSideIPipInfo,
    browserSideIPipAPI: getBrowserSideIPipApi,
    windowData: getWindowData,
    maxTouchPoints: getMaxTouchPoints,
    hardwareConcurrency: getHardwareConcurrency,
    cookiedEnabled: getCookieEnabled,
    pdfviewEnabled: getPdfViewEnabled,
    navigatorProps: getNavigatorProps,
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
            return this.components;
        });
    }
    upload(websiteid, backend_url) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log('upload...')
            //console.log(websiteid)
            const components = this.getComponents();
            if (components !== undefined) {
                const json_appversion = JSON.parse(JSON.stringify(components['appVersion']));
                const json_documentelmkeys = JSON.parse(JSON.stringify(components['documentElementKeys']));
                const json_documentprops = JSON.parse(JSON.stringify(components['documentProps']));
                const json_errortrace = JSON.parse(JSON.stringify(components['errorTrace']));
                const json_evaluationlen = JSON.parse(JSON.stringify(components['evalLength']));
                const json_funcbind = JSON.parse(JSON.stringify(components['functionBind']));
                const json_lang = JSON.parse(JSON.stringify(components['languages']));
                const json_mimetype = JSON.parse(JSON.stringify(components['mimeTypesConsistent']));
                const json_notificationperms = JSON.parse(JSON.stringify(components['notificationPermissions']));
                const json_process = JSON.parse(JSON.stringify(components['process']));
                const json_productsub = JSON.parse(JSON.stringify(components['productSub']));
                const json_rtt = JSON.parse(JSON.stringify(components['rtt']));
                const json_useragent = JSON.parse(JSON.stringify(components['userAgent']));
                const json_webdriver = JSON.parse(JSON.stringify(components['webDriver']));
                const json_webgl = JSON.parse(JSON.stringify(components['webGL']));
                const json_windowext = JSON.parse(JSON.stringify(components['windowExternal']));
                const json_windowprops = JSON.parse(JSON.stringify(components['windowProps']));
                const json_windowsize = JSON.parse(JSON.stringify(components['windowSize']));
                const json_browsersideip = JSON.parse(JSON.stringify(components['browserSideIP']));
                const json_browsersideipinfo = JSON.parse(JSON.stringify(components['browserSideIPipInfo']));
                const json_browsersideipapi = JSON.parse(JSON.stringify(components['browserSideIPipAPI']));
                const json_devicememory = JSON.parse(JSON.stringify(components['deviceMemory']));
                const json_windowdata = JSON.parse(JSON.stringify(components['windowData']));
                const json_timestamp = JSON.parse(JSON.stringify(components['timestamp']));
                const json_maxtouchpoints = JSON.parse(JSON.stringify(components['maxTouchPoints']));
                const json_hardwareconcurrency = JSON.parse(JSON.stringify(components['hardwareConcurrency']));
                const json_cookieenabled = JSON.parse(JSON.stringify(components['cookiedEnabled']));
                const json_pdfviewenabled = JSON.parse(JSON.stringify(components['pdfviewEnabled']));
                const json_navigatorprops = JSON.parse(JSON.stringify(components['navigatorProps']));
                //console.log('Navigator props len: ', json_navigatorprops.value.toString().length);
                //console.log(json_windowprops.value.toString().length)
                //console.log(json_browsersideipapi);
                //console.log(JSON.stringify(json_browsersideipapi.value['asn']).slice(0, 511));
                const data_visitor = {
                    id: 0,
                    AppVersion: json_appversion.value.slice(0, 255),
                    DocumentElementKeys: json_documentelmkeys.value['0'],
                    DocumentProperties: json_documentprops.value['0'],
                    ErrorTrace: json_errortrace.value.toString().slice(0, 511),
                    EvaluationLength: json_evaluationlen.value,
                    FunctionBind: json_funcbind.value.toString().slice(0, 63),
                    Languages: json_lang.value.toString(),
                    MimeType: Number(json_mimetype.value),
                    NotificationPermissions: Number(json_notificationperms.value),
                    Process: json_process.value['type'],
                    ProductStub: json_productsub.value,
                    Rtt: json_rtt.value,
                    UserAgent: json_useragent.value.slice(0, 255),
                    WebDriver: json_webdriver.value,
                    WebGLVendor: json_webgl.value['vendor'],
                    WebGLRenderer: json_webgl.value['renderer'],
                    WindowExternal: json_windowext.value,
                    WindowProperties: json_windowprops.value.toString().slice(0, 32767),
                    WindowOuterWidth: json_windowsize.value['outerWidth'],
                    WindowOuterHeight: json_windowsize.value['outerHeight'],
                    WindowInnerWidth: json_windowsize.value['innerWidth'],
                    WindowInnerHeight: json_windowsize.value['innerHeight'],
                    DocumentHasFocus: json_windowsize.value['documentFocus'],
                    BrowserSideIP: json_browsersideip.value['ip'].slice(0, 127),
                    BrowserSideIPInfo: json_browsersideipinfo.value['ip'].slice(0, 127),
                    BrowserSideCity: json_browsersideip.value['city'].slice(0, 63),
                    BrowserSideCountry: json_browsersideip.value['country'].slice(0, 63),
                    BrowserSidePostal: json_browsersideip.value['postal'].slice(0, 31),
                    BrowserSideTimeZone: json_browsersideip.value['timezone'].slice(0, 63),
                    BrowserSideRegion: json_browsersideip.value['region'].slice(0, 63),
                    BrowserSideOrg: json_browsersideip.value['org'].slice(0, 63),
                    DeviceMemory: json_devicememory.value,
                    WindowOpenNum: json_windowdata.value['windowsOpenNum'],
                    WindowDevicePixelRatio: json_windowdata.value['devicePixelRatio'],
                    WindowFrames: json_windowdata.value['windowFrames'],
                    WindowPageXOffset: json_windowdata.value['windowPageXOffset'],
                    WindowPageYOffset: json_windowdata.value['windowPageYOffset'],
                    WindowPixelDepth: json_windowdata.value['windowPixelDepth'],
                    MaxTouchPoints: json_maxtouchpoints.value,
                    HardwareConcurrency: json_hardwareconcurrency.value,
                    CookieEnabled: json_cookieenabled.value,
                    PdfViewEnabled: json_pdfviewenabled.value,
                    NavigatorProperties: json_navigatorprops.value.toString().slice(0, 32767),
                    BrowserSideIPAPI: json_browsersideipapi.value['ip'].slice(0, 127),
                    IPAPIRIR: json_browsersideipapi.value['rir'].slice(0, 15),
                    IPAPIisBogon: JSON.stringify(json_browsersideipapi.value['is_bogon']).slice(0, 7),
                    IPAPIisDatacenter: JSON.stringify(json_browsersideipapi.value['is_datacenter']).slice(0, 7),
                    IPAPIisTor: JSON.stringify(json_browsersideipapi.value['is_tor']).slice(0, 7),
                    IPAPIisProxy: JSON.stringify(json_browsersideipapi.value['is_proxy']).slice(0, 7),
                    IPAPIisVPN: JSON.stringify(json_browsersideipapi.value['is_vpn']).slice(0, 7),
                    IPAPIisAbuser: JSON.stringify(json_browsersideipapi.value['is_abuser']).slice(0, 7),
                    IPAPICompany: JSON.stringify(json_browsersideipapi.value['company']).slice(0, 255),
                    IPAPIAsn: JSON.stringify(json_browsersideipapi.value['asn']).slice(0, 511),
                    IPAPILocation: JSON.stringify(json_browsersideipapi.value['location']).slice(0, 511),
                    BrowserIPTimeStamp: json_browsersideipapi.value['location']['local_time'].slice(0, 127),
                    BrowserTimeStamp: json_timestamp.value.slice(0, 127),
                };
                console.log(data_visitor);
                //fetch(`http://localhost:8000/api/ingest/${websiteid}`, {method: "POST", mode: 'no-cors', body: JSON.stringify(data_visitor)});
                //   https://ecdf-2601-18f-1080-aeb0-6c62-3587-f679-9aed.ngrok-free.app 
                //fetch(`https://ecdf-2601-18f-1080-aeb0-6c62-3587-f679-9aed.ngrok-free.app/api/ingest/${websiteid}`, {method: "POST", mode: 'no-cors', body: JSON.stringify(data_visitor)});
                const result = yield fetch(`${backend_url}/api/ingest/${websiteid}`, { method: "POST", mode: 'no-cors', body: JSON.stringify(data_visitor) });
                return yield result.json();
            }
            return { bot: 'error', botType: '' };
        });
    }
}

//import { BotSignalInterface, BotDetectionResult } from './types';
function run(website_id, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const bot_stopper = new BotSignalCollector();
        yield bot_stopper.collect();
        const result = yield bot_stopper.upload(website_id, url);
        return result;
    });
}
var index = { run };

export { index as default, run };
