//https://opentdb.com/api.php?amount=5&category=18&difficulty=hard
import {Quiz} from "./quiz.js"
export class Settings{

    constructor(){
        this.categoryElement = document.getElementById("category");
        this.numOfQuestionsElement = document.getElementById("numOfQuestions");
        this.difficultyElement = document.getElementsByName("difficulty");
        this.startBtn = document.getElementById("startBtn")
        this.startBtn.addEventListener("click",this.startQuiz.bind(this))
    }



    async startQuiz(){
        let category = this.categoryElement.value;
        let difficulty = [...this.difficultyElement].filter(el => el.checked)[0].value
        let numOfQuestions = this.numOfQuestionsElement.value;
        let quizApi = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}`
        let questionsArray = await this.fetchAPI(quizApi)
        if(numOfQuestions != ""){
            $("#formAlert").slideUp(200)
            if(questionsArray.length != 0){
                $("#setting").fadeOut(500,()=>{
                    $("#quiz").fadeIn(500)
                })
                new Quiz(questionsArray)
               
            }
        }else{
            $("#formAlert").slideDown(200)
        }
    }


    async fetchAPI(API){
        let response = await fetch(API);
        response = await response.json()
        return response.results;
    }
}