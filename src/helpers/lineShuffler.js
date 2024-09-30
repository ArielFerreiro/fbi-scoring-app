

export const linesInArray = (lines) => {

    //Generate an array with x consecutive numbers
    const arr = Array.from({length: lines}, (e, i)=> i)
    return arr;
}

export const shuffle = (array) => {
    var i = array.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }

    return array;
}