
//Задание 1
const regexp = /\'/gm;
const str = "Let's do due 'diligence' before we begin the project. 'They've made cutbacks and closed one of their factories.'";

console.log(str.replace(regexp, '"'));

//Задание 2
const regexp2 = new RegExp("(\B'|'\B)", "gm");
const str2 = "Let's do due 'diligence' before we begin the project. 'They've made cutbacks and closed one of their factories.'";
console.log(str2.replace(regexp2, '"'));
