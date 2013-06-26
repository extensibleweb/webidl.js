var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlurpEvent = (function (_super) {
    __extends(BlurpEvent, _super);
    function BlurpEvent() {
        var self = this;

        return self;
    }
    Object.defineProperty(BlurpEvent.prototype, "blurp", {
        get: function () {
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(BlurpEvent.prototype, "maybe", {
        get: function () {
        },
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });

    BlurpEvent.prototype.checkIfOkay = function (potentialIssues) {
        if (typeof potentialIssues === "undefined") { potentialIssues = null; }
    };
    return BlurpEvent;
})(CustomEvent);
//@ sourceMappingURL=SomeFile.js.map
