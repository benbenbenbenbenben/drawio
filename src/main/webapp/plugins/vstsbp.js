var BPIntegrator = /** @class */ (function () {
    function BPIntegrator(graphui) {
        this.ui = graphui;
        this.setupEvents();
        this.setupMenus();
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
        this.tree = tree;
    };
    BPIntegrator.prototype.setupMenus = function () {
        // tree menu
        var ui = this.ui;
        mxResources.parse("vstsbp_project=Project");
        this.ui.menus.put("vstsbp_project", new Menu(function (menu, parent) {
            // menu.addSeparator(parent)
            // this.ui.menus.addMenuItems(menu, ["vstsbp_item_0"], parent)
            ui.menus.addMenuItems(menu, ["foo, bar, zip"], parent);
        }));
        var openFromMenu = this.ui.menus.get("openFrom");
        var funct = openFromMenu.funct;
        openFromMenu.funct = function (menu, parent) {
            funct.apply(this, arguments);
            menu.addSeparator(parent);
            ui.menus.addSubmenu("vstsbp_project", menu, parent);
        };
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