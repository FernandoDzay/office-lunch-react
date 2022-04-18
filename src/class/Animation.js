import Timer from './Timer';


class Animation {

    constructor(config, duration, clockwise = true) {
        this.config = config;
        this.duration = duration;
        this.styles = this.stylesInit();
        this.clockwise = clockwise;

        this.Timer = new Timer(duration);
    }

    calculateStyleValue = (from, to, factor) => factor * (from - to)/(0 - 1) + from;
    getStyles = () => this.styles;
    hasEnd = () => this.Timer.hasEnd();
    setClockwise = (clockwise) => this.Timer.setClockwise(clockwise);

    isRuning() {
        if(this.clockwise) return this.Timer.getTime() !== 0;
        return this.Timer.getTime() !== this.duration;
    }

    stylesInit() {
        let styles = {};
        this.config.forEach( item => {
            styles[item.style] = item.from;
        });
        return styles;
    }

    updateStyles(factor) {
        let m = 0;
        if(factor >= 1) m = 1;
        else if(factor <= 0) m = 0;
        else m = factor;

        let styles = {};
        this.config.forEach( item => {
            styles[item.style] = this.calculateStyleValue( item.from, item.to, m );
        });

        return styles;
    }

    run() {
        return new Promise((resolve, reject) => {
            if( !this.hasEnd() ) {
                this.Timer.next()
                .then(factor => {
                    this.styles = this.updateStyles(factor);
                    resolve(this.styles);
                });
            }   
        })
    }


}

export default Animation;