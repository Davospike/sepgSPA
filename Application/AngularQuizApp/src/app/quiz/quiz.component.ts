import { Component, OnInit } from '@angular/core';

import { Option, Question, Quiz, QuizConfig } from '../models/index';
import {DataService} from '../data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [DataService]
})
export class QuizComponent implements OnInit {
  quizzes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizJSON: Object;
  quizName: string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 300,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'showClock': false,
    'showPager': true,
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.quizzes = this.dataService.getQuizNames();
    this.quizName = String(this.route.snapshot.paramMap.get('id'));
    this.loadQuiz(this.quizName);
  }

  // Reminder for if backend boiz get a method for API call for single topic
  // Can check if subscribe response is an Array with Array.isArray(res)
  // If get single topic returned, as opposed to array of quiz topics and Qs,
  // Then can instantiate quiz as new Quiz(res), as opposed to new Quiz(res[0])
  loadQuiz(quizName: string) {
    this.dataService.getAll().subscribe(
      res => {
      if (quizName === 'Brexit') {
        this.quiz = new Quiz(res[0]);
        this.quiz.name = quizName;
      } else if (quizName === 'Coronavirus') {
        this.quiz = new Quiz(res[1]);
        this.quiz.name = quizName;
      } else if (quizName === 'Climate-Change') {
        this.quiz = new Quiz(res[2]);
        this.quiz.name = quizName;
      } else if (quizName === 'General') {
        this.quiz = new Quiz(res[3]);
        this.quiz.name = quizName;
      } else if (quizName === 'China') {
        this.quiz = new Quiz(res[4]);
        this.quiz.name = quizName;
      } else {
        this.quiz = new Quiz(res[0]);
        this.quiz.name = quizName;
      }
      this.pager.count = this.quiz.questions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.config.duration);
    },
      error => {
      console.log(error);
      });
    this.mode = 'quiz';
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    // use data service method to tell api result of this
    //
    // let result: Boolean = question.options.every(x => x.selected === x.isAnswer);
    // let question_id: string = question.id;
    //
    // if(result === true){
    //   this.dataService.update_question_correct(question_id).subscribe(
    //     data=>{
    //       console.log(data);
    //     },
    //     error=>{console.log(error);
    //     }
    //   );
    //   return 'correct';
    // }
    // else{
    //   this.dataService.update_question_incorrect(question_id).subscribe(
    //     data=>{
    //       console.log(data);
    //     },
    //     error=>{console.log(error);
    //     }
    //   );
    //   return 'wrong';
    // }
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };

  isRealFake(question: Question) {
    // options[0] is always Real option, so if isAnswer == true, then real
      if (question.options[0].isAnswer === true) {
        return 'real';
      } else {
      return 'fake';
    }
  };

  onSubmit() {
    let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));

    // Post your data to the server here. answers contains the questionId and the users' answer.
    console.log(this.quiz.questions);
    this.mode = 'result';
  }
}


