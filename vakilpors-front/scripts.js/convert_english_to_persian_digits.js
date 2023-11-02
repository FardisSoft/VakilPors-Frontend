// Define a function that takes an integer as a parameter
function convertToPersianDigits (num) {
    // Define an array of persian digits
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

    // Convert the integer to a string and split it into an array of characters
    const numStr = num.toString ().split ("");

    // Map each character to its corresponding persian digit using the array index
    const persianNumStr = numStr.map ((char) => persianDigits [char]);

    // Join the array of persian digits into a string and return it
    return persianNumStr.join ("");
}

export default convertToPersianDigits;