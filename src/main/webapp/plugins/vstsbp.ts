class BPIntegrator {
    public ui: any
    public paths: any;
    constructor(graphui: any) {
        this.ui = graphui
        this.setupEvents()
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
        this.paths = tree
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
