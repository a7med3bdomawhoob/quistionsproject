export class Quiz {
    constructor(questionsArray) {
        this.questionsArray = questionsArray;
        this.numOfQuistions = questionsArray.length
        console.log(questionsArray)

        this.currentElement = document.getElementById("current")
        this.totalAmountElement = document.getElementById("totalAmount")
        this.questionElement = document.getElementById("question")
        this.rowAnswerElement = document.getElementById("rowAnswer")
        this.nextBtn = document.getElementById("next")
        this.nextBtn.addEventListener("click", this.submitAnswer.bind(this))

        this.currentQuistion = 0;
        this.score = 0;


        this.showQuestion();
    }


    showQuestion() {
        this.currentElement.innerHTML = this.currentQuistion + 1;
        this.totalAmountElement.innerHTML = this.numOfQuistions;
        this.questionElement.innerHTML = this.questionsArray[this.currentQuistion].question;
        let answers = [this.questionsArray[this.currentQuistion].correct_answer, ...this.questionsArray[this.currentQuistion].incorrect_answers]
        console.log(answers)


        function shuffle(array) {
            let currentIndex = array.length,
                randomIndex;

            // While there remain elements to shuffle...
            while (currentIndex != 0) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]
                ];
            }

            return array;
        }

        answers = shuffle(answers);
        let temp = ""

        for (let i = 0; i < answers.length; i++) {
            temp += `
            <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="answer" id="q${i}" value="${answers[i]}" >
                ${answers[i]}
                </label>
            </div>
        `
        }

        this.rowAnswerElement.innerHTML = temp
    }

    checkAnswer() {
        let answerElement = document.getElementsByName("answer")

        let correctAnswer = this.questionsArray[this.currentQuistion].correct_answer;
        let userAnswer = [...answerElement].filter(el => el.checked)[0]
        if (userAnswer != undefined) {
            $(".alert").slideUp(200)
            if (correctAnswer == userAnswer.value) {
                this.score++;
                $("#Correct").fadeIn(1000, () => {
                    $("#Correct").fadeOut(500)
                })
            } else {
                $("#inCorrect").fadeIn(500, () => {
                    $("#inCorrect").fadeOut(500)
                })
            }

            this.currentQuistion++;
            if(this.currentQuistion < this.numOfQuistions){
                this.showQuestion()
            }else{
                $("#quiz").fadeOut(500,()=>{
                    document.getElementById("score").innerHTML = this.score;
                    $("#finish").fadeIn(500)
                    document.getElementById("tryBtn").addEventListener("click",()=>{
                        location.reload()
                    })

                })
            }
        }else{
            $(".alert").slideDown(200)
        }

    }


    submitAnswer() {
        this.checkAnswer()
    }
}