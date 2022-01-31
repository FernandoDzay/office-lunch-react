
class Timer {

    constructor(duration) {
        const steps = duration / .01;

        this.duration = duration;
        this.step = duration / steps;
        this.time = 0;
        this.clockwise = true;

        this.setTime();
    }

    setClockwise = (clockwise) => this.clockwise = clockwise;
    setTime = () => this.time = this.clockwise ? 0 : this.duration;
    getTime = () => this.time;
    clear = () => clearInterval(this.intervalID);

    nextStep() {
        this.time = this.time + this.step;
        if(this.time > this.duration)  this.time = this.duration;
    }
    
    prevStep() {
        this.time = this.time - this.step;
        if(this.time < 0) this.time = 0;
    }

    hasEnd() {
        if(this.clockwise) return this.time >= this.duration;
        else return this.time <= 0;
    }

    next() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(this.clockwise) this.nextStep();
                else this.prevStep();
                resolve(this.time/this.duration);
            }, this.step * 1000);
        });
    }


}

export default Timer;