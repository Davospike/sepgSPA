import { QuizConfig } from './quiz-config';
import { Question } from './question';

export class Quiz {
    id: number;
    name: string;
    description: string;
    config: QuizConfig;
    questions: Question[];

    constructor(data: any) {
      // Check all data types and if not there, set to 0 or Not Set as default
        if (data) {
            this.id = data.id ? 0 : data.id;
            this.name = data.topicName ? 'Not Set' : data.topicName;
            this.description = data.description ? 'Not Set' : data.description;
            if (data.config) {
              this.config = new QuizConfig(data.config);
            }
            this.questions = [];

            this.shuffle(data.quizquestions).forEach(q => {
              this.questions.push(new Question(q));
            });
        }
    }

      // @ts-ignore
      shuffle(array) {
        let currentIndex = array.length, temp, randomIndex;

        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          temp = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temp;
        }
        return array;
      }
}
