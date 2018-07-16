
Draw.loadPlugin(function(ui) {
    window.ui = ui
    const EDITMODE = window.ui.editor.editable

    window.onmessage = function(e) {        
        if (e.data.namespace && e.data.namespace == "vstsbp") {
            switch(e.data.action) {
                case "load":
                window.ui.loadFile(e.data.parameters[0])
                break;
                default:
                break;
            }
        }
    }

    if (EDITMODE) {
        window.parent.postMessage({
            namespace: "vstsbp",
            action: "notify",
            parameters: [
                "editPluginReady"
            ]
        }, '*')
    }
})