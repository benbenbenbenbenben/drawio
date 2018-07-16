
Draw.loadPlugin(function(ui) {
    window.ui = ui
    window.parent.postMessage({
        action: "notify",
        parameters: [
            "pluginReady"
        ]
    }, '*')
    
})