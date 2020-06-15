class Echo {

    constructor(url) {
        this._url = url;
        this._socket = new WebSocket(url);
        console.log(`Socket pointing to: ${url}`);
    }

    waitForOpenConnection(socket) {
        return new Promise((resolve, reject) => {
            const maxNumberOfAttempt = 10;
            const intervalTime = 200;

            let currentAttempt = 0;
            const interval = setInterval(() => {
                if (currentAttempt > maxNumberOfAttempt - 1) {
                    clearInterval(interval);
                    reject(new Error('Maximum number of attempts.'));
                } else if (socket.readyState === socket.OPEN) {
                    clearInterval(interval);
                    resolve();
                }
                currentAttempt++;
            }, intervalTime);
        });
    }

    async send(data) {
        if (this._socket.readyState !== WebSocket.OPEN) {
            try {
                await this.waitForOpenConnection(this._socket);
                this._socket.send(data);
            } catch (err) {
                console.error(err);
            }
        } else {
            this._socket.send(data);
        }
    }

    generate(callback, reqNumber){
        for (let i = 0; i < reqNumber; i++){
            let object = callback();
            this.send(JSON.stringify(object));
        }
    }

    generateEverySecond(callback, second, numberOfMessage) {
        this._loop = setInterval(() => {
            this.generate(callback, numberOfMessage);
        }, second * 1000);
    }

    stop() {
        if (this._loop !== null) {
            clearInterval(this._loop);
        }
    }

    
    whenReply(callback){
        this._socket.onmessage = callback;
    }

}

export { Echo };