const quizlet = require('./main.js'); 

quizlet("https://quizlet.com/193773852/nj-drivers-ed-chapter-4-flash-cards/")
.then(set => { 
     console.log(set); 
})
.catch(err => console.log(err.message)); 

