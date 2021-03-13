export function showNotification(setter) {
    setter(true);
    setTimeout(() => {
        setter(false);
    }, 2000);
}

export function checkWin(correctLetters, wrongLetters, word){
    let status = 'win';

    //check for win
    word.split('').forEach(letter => {
        if(!correctLetters.includes(letter)){
            status = '';
        }
    });

    //check for loss
    if(wrongLetters.length === 6) status = 'lose';

    return status;
}