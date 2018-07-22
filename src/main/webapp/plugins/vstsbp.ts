class BPIntegrator {
    public ui: any
    public tree: any;
    constructor(graphui: any) {
        this.ui = graphui
        this.setupEvents()
        this.setupMenus()
        if (this.isEditMode()) {
            this.notifyParent("edit.ready")
        } else {
            this.notifyParent("view.ready")
        }
    }
    public isEditMode() {
        return this.ui.editor.editable
    }
    public notifyParent(...args) {
        window.parent.postMessage({
            action: "notify",
            namespace: "vstsbp",
            parameters: args
        }, "*");
    }
    public loadFile(file) {
        this.ui.loadFile(file)
    }
    public updateTree(tree) {
        this.tree = tree
    }
    private setupMenus() {
        // tree menu
        const ui = this.ui
        mxResources.parse("vstsbp_project=Project")
        this.ui.menus.put("vstsbp_diagrams", new Menu((menu: Menu, parent: Menu) => {
            // menu.addSeparator(parent)
            // this.ui.menus.addMenuItems(menu, ["vstsbp_item_0"], parent)
            ui.menus.addMenuItems(menu, ["foo, bar, zip"], parent)
        }))

        const openFromMenu = this.ui.menus.get("openFrom");
        const funct = openFromMenu.funct;
        openFromMenu.funct = function(menu, parent) {
            funct.apply(this, arguments);
            menu.addSeparator(parent);
            ui.menus.addSubmenu("vstsbp_diagrams", menu, parent);
        };
    }
    private setupEvents() {
        window.onmessage = (e) => {
            if (e.data.namespace && e.data.namespace === "vstsbp") {
                switch (e.data.action) {
                    case "load":
                        this.loadFile(e.data.parameters[0]);
                        break;
                    case "tree.update":
                        this.updateTree(e.data.parameters[0])
                        break;
                }
            }
        };
    }
}

Draw.loadPlugin(ui => window.bpIntegrator = new BPIntegrator(ui))
