const http = require('axios'); 
const { parse } = require('node-html-parser'); 

const q_set = async (url , callback) => { 
    try { 
         const raw_set = (await http.get(url, { 
             headers: { 
                 Accept: "text/html"
             }
         })).data;    
         const root = parse(raw_set); 

         const getText = selector => { 
              return root.querySelector(selector).childNodes[0]._rawText
         }


         const qArray = new Array(); 
         const qRoot = root.querySelector('.SetPageTerms-termsList');
             
               
                  for (let i = 0; i < qRoot.parentNode.childNodes[1].childNodes.length; i++) { 
                        qArray.push({
                              term: qRoot.parentNode.childNodes[1].childNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]._rawText, 
                              definition: qRoot.parentNode.childNodes[1].childNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0]._rawText
                        })
                  }

            if (callback) { 
                callback();
            }

            return { 
                title: `${getText('title')}`, 
                author: `${getText('.UserLink-username')}`, 
                cards: qArray
            }

    }     
    catch (e) { 
        console.log('Cannot Fetch the Quizlet Cards!');
        console.error(e);
    }
}

module.exports = q_set; 