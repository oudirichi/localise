"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exitSuccess = exports.exitFailure = void 0;
function exitFailure() {
    process.exit(1);
}
exports.exitFailure = exitFailure;
function exitSuccess() {
    process.exit(0);
}
exports.exitSuccess = exitSuccess;
//# sourceMappingURL=exit-status.js.map