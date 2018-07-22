var BPIntegrator = /** @class */ (function () {
    function BPIntegrator(graphui) {
        this.ui = graphui;
        this.setupEvents();
        if (this.isEditMode()) {
            this.notifyParent("edit.ready");
        }
        else {
            this.notifyParent("view.ready");
        }
    }
    BPIntegrator.prototype.isEditMode = function () {
        return this.ui.editor.editable;
    };
    BPIntegrator.prototype.notifyParent = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        window.parent.postMessage({
            action: "notify",
            namespace: "vstsbp",
            parameters: args
        }, "*");
    };
    BPIntegrator.prototype.loadFile = function (file) {
        this.ui.loadFile(file);
    };
    BPIntegrator.prototype.updateTree = function (tree) {
        this.paths = tree;
    };
    BPIntegrator.prototype.setupEvents = function () {
        var _this = this;
        window.onmessage = function (e) {
            if (e.data.namespace && e.data.namespace === "vstsbp") {
                switch (e.data.action) {
                    case "load":
                        _this.loadFile(e.data.parameters[0]);
                        break;
                    case "tree.update":
                        _this.updateTree(e.data.parameters[0]);
                        break;
                }
            }
        };
    };
    return BPIntegrator;
}());
Draw.loadPlugin(function (ui) { return window.bpIntegrator = new BPIntegrator(ui); });
//# sourceMappingURL=vstsbp.js.map