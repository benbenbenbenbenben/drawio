declare let Draw: Draw;

interface Draw {
    loadPlugin: (x:any) => void;
}

interface Window {
    bpIntegrator: BPIntegrator
}