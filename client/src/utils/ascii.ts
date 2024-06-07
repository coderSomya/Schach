export const getAsciiFromCoords = (x: number, y: number)=>{
    return String.fromCharCode(97+(y%8)) + "" + (8-x);
}