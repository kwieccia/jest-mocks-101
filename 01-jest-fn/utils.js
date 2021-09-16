export function runCallback(aNumber, callback) { 
   
    const xNumber = aNumber * 5;

    if (xNumber < 100) {
        callback(xNumber);
    }

}
