const MS_PER_S = 1000;

class Timer {

	/**
	 * Initiate the timer.
	 */
	constructor() {
		this._start_time = 0;
		this._previous_time = 0;
		this._is_paused = true;
        this._is_stopped = true;
        console.log("timer");
	}

	/**
	 * Resets the timer.
	 */
	reset() {
		this._start_time = 0;
		this._previous_time = 0;
		this._is_paused = true;
		this._is_stopped = false;
    }

	/**
	 * Starts the timer.
	 */
	start() {
		if (this._is_paused) {
			if (this._is_stopped) {
				this.reset();
			}
			this._is_paused = false;
			this._start_time = Date.now();
		}
    }

	/**
	 * Pauses the timer
	 */
	pause() {
		if (!this._is_paused) {
			this._is_paused = true;
			this._previous_time += Date.now() - this._start_time;
		}
    }

	/**
	 * Stops the timer.
	 */
	stop() {
		if (!this._is_stopped) {
			this.pause();
			this._is_stopped = true;
		}
    }

	/**
	 * Gets the time read on the timer.
	 */
	getTime() {
		if (this._start_time > 0) {
			if (!this._is_paused) {
				return (Date.now() - this._start_time) / MS_PER_S;
			} else {
				return this._previous_time / MS_PER_S;
			}
		} else {
			return 0;
		}
	}
}