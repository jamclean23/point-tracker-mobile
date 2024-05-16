// Async sleep function for debug
/**
 * 
 * @param {Number} timer - Time in ms to sleep for 
 * @returns undefined
 */
export default function sleep (timer = 3000) {
    return new Promise((resolve) => {
        setTimeout(resolve, timer)
    });
}