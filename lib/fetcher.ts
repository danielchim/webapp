export const fetcher = (...args : any[]) => fetch(...args).then(r => { return r.json();});

