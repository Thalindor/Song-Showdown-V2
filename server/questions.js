module.exports = function getGameSetting() {
    
        const nameList = [
            'John Cena', 'R-Truth', 'Triple H', 'Shawn Michaels', 'Hulk Hogan',
            'Undertaker', 'Micheal Jackson', 'Brock Lesnar', 'Santino Marella', 'Snoop Dogg',
            'Sting', 'Shane McMahon', 'Rey Mysterio', 'Mark Henry', 'Jey Uso', 'Daniel Brayn',
            'Cm Punk', 'Chris Benoit', 'Edge', 'Jeff Hardy'
        ]
        
        const answerList = {};
        
        for(let i = 0; 5 > i; i++){
            
            let randomNumber = Math.floor(Math.random() * nameList.length);
            answerList[nameList[randomNumber]] = ['1', '2', '3', '4']
            
            
            let answerOptionList = [
                'John Cena', 'R-Truth', 'Triple H', 'Shawn Michaels', 'Hulk Hogan',
                'Undertaker', 'Micheal Jackson', 'Brock Lesnar', 'Santino Marella', 'Snoop Dogg',
                'Sting', 'Shane McMahon', 'Rey Mysterio', 'Mark Henry', 'Jey Uso', 'Daniel Brayn',
                'Cm Punk', 'Chris Benoit', 'Edge', 'Jeff Hardy'
            ]
            
            let choice = [ 0, 1, 2, 3] 
            
            for(let i = 0; 4 > i; i++){
                let randomChoiceNumber = Math.floor(Math.random() * choice.length);
                
                
                if(i == 0){
                    answerList[nameList[randomNumber]][choice[randomChoiceNumber]] = nameList[randomNumber];
                    
                    const indexAnswer = answerOptionList.indexOf(nameList[randomNumber]);
                    answerOptionList.splice(indexAnswer, 1);
                    
                    
                    const indexChoice = choice.indexOf(choice[randomChoiceNumber]);
                    choice.splice(indexChoice, 1);
                    
                }else {
                    let randomNumber2 = Math.floor(Math.random() * answerOptionList.length);
                    let randomChoiceNumber = Math.floor(Math.random() * choice.length);
                    
                    answerList[nameList[randomNumber]][choice[randomChoiceNumber]] = answerOptionList[randomNumber2];
                    
                    const indexAnswer = answerOptionList.indexOf(answerOptionList[randomNumber2]);
                    answerOptionList.splice(indexAnswer, 1);
                    
                    const indexChoice = choice.indexOf(choice[randomChoiceNumber]);
                    choice.splice(indexChoice, 1);
                    
                }
            }
            
            const index = nameList.indexOf(nameList[randomNumber]);
            nameList.splice(index, 1);
        }
        
        
        return answerList;
    
}
    
    
    