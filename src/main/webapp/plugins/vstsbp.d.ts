declare let Draw: Draw;
declare let Menu: Menu;
declare let mxResources: MxResources;

interface Draw {
    loadPlugin: (x:any) => void;
}

interface Window {
    bpIntegrator: BPIntegrator
}

interface Menu {
    new (x: any): Menu;
    addSeparator: (x: any) => void;
}

interface MxResources {
    parse: (x: any) => void;
}