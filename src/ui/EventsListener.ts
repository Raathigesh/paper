const API_URL = `http://localhost:${(window as any).port || '4545'}`;

class Listener {
    source: EventSource;
    listeners: ((path: string) => void)[] = [];

    constructor() {
        this.source = new EventSource(`${API_URL}/events`);

        this.source.addEventListener('message', message => {
            const dataObj = JSON.parse(message.data);
            this.listeners.forEach(cb => {
                console.log(dataObj);
                cb(dataObj.activeEditor);
            });
        });
    }

    addListener(cb: (path: string) => void) {
        this.listeners.push(cb);
    }
}

export default new Listener();
