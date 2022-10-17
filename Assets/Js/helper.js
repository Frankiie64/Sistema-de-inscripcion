function IsNullOrWhiteSpace(string){

    string = string.trim();
    
    if(string == "" || string == null || string == undefined){
        return true;
    }else{
        return false;
    }

}


function CapitalizeCase(string){
     const FirstLetter = string[0].toUpperCase();
    const RestOfLetter =  string.slice(1);

    return `${FirstLetter}${RestOfLetter}`
}