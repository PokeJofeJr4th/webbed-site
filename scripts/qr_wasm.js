import * as wasm from "./qr_wasm_bg.wasm";
import { __wbg_set_wasm } from "./qr_wasm_bg.js";
__wbg_set_wasm(wasm);
export * from "./qr_wasm_bg.js";
