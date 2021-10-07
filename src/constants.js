let production = false 
let URL
if (production === false){
    URL = 'http://127.0.0.1:8000/'
} else {
    URL = 'https://hobby-project-tracker.herokuapp.com/'
}

export default URL