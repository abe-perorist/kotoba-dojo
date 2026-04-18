class KotobaDojo {
    constructor() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.timeLeft = 10;
        this.timer = null;
        this.questions = [];
        this.gameActive = false;
        this.selectedLevel = 1;
        this.audioContext = null;

        this.loadProgress();
        this.initializeQuestions();
        this.setupEventListeners();
        this.showStartScreen();
    }

    getAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        return this.audioContext;
    }

    initializeQuestions() {
        const allQuestions = [
            // ===== レベル1（初級）：3年生の基本漢字 =====

            // 漢字の読み方
            {
                type: "reading",
                question: "「泳ぐ」の読み方はどれでしょう？",
                options: ["およぐ", "ながぐ", "かぐ"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "reading",
                question: "「急ぐ」の読み方はどれでしょう？",
                options: ["いそぐ", "はやぐ", "すすぐ"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "reading",
                question: "「温かい」の読み方はどれでしょう？",
                options: ["あたたかい", "あつかい", "ぬくかい"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "reading",
                question: "「運ぶ」の読み方はどれでしょう？",
                options: ["はこぶ", "うごぶ", "なごぶ"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "reading",
                question: "「起きる」の読み方はどれでしょう？",
                options: ["おきる", "さきる", "うきる"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "reading",
                question: "「集まる」の読み方はどれでしょう？",
                options: ["あつまる", "よつまる", "きつまる"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "reading",
                question: "「終わる」の読み方はどれでしょう？",
                options: ["おわる", "しわる", "とわる"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "reading",
                question: "「進む」の読み方はどれでしょう？",
                options: ["すすむ", "さすむ", "ひすむ"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "reading",
                question: "「深い」の読み方はどれでしょう？",
                options: ["ふかい", "すかい", "むかい"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "reading",
                question: "「飲む」の読み方はどれでしょう？",
                options: ["のむ", "なむ", "ぬむ"],
                correct: 0,
                difficulty: 1
            },

            // 意味・反対語
            {
                type: "meaning",
                question: "「急ぐ」の意味はどれでしょう？",
                options: ["はやくうごくこと", "ゆっくりすること", "やすむこと"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "meaning",
                question: "「温かい」の反対の言葉はどれでしょう？",
                options: ["つめたい", "からい", "かたい"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "meaning",
                question: "「集める」の意味はどれでしょう？",
                options: ["いろいろなものをひとつにすること", "ものをわけること", "ものをすてること"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "meaning",
                question: "「勝つ」の反対の言葉はどれでしょう？",
                options: ["まける", "やめる", "とまる"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "meaning",
                question: "「明るい」の反対の言葉はどれでしょう？",
                options: ["くらい", "しろい", "きいろい"],
                correct: 0,
                difficulty: 1
            },

            // ===== レベル2（中級）：熟語・使い方 =====

            // 熟語の読み方
            {
                type: "reading",
                question: "「感謝」の読み方はどれでしょう？",
                options: ["かんしゃ", "かんか", "かんじゃ"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "reading",
                question: "「相談」の読み方はどれでしょう？",
                options: ["そうだん", "あいだん", "そうかん"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "reading",
                question: "「注意」の読み方はどれでしょう？",
                options: ["ちゅうい", "じゅうい", "ちゅうき"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "reading",
                question: "「発見」の読み方はどれでしょう？",
                options: ["はっけん", "はつけん", "はっかん"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "reading",
                question: "「昔話」の読み方はどれでしょう？",
                options: ["むかしばなし", "ふるいはなし", "こばなし"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "reading",
                question: "「幸せ」の読み方はどれでしょう？",
                options: ["しあわせ", "こうせ", "さいわせ"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "reading",
                question: "「練習」の読み方はどれでしょう？",
                options: ["れんしゅう", "れんしょう", "れいしゅう"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "reading",
                question: "「都合」の読み方はどれでしょう？",
                options: ["つごう", "とごう", "どごう"],
                correct: 0,
                difficulty: 2
            },

            // 意味・反対語
            {
                type: "meaning",
                question: "「感謝」の意味はどれでしょう？",
                options: ["ありがとうのきもち", "こわいきもち", "かなしいきもち"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "meaning",
                question: "「相談する」の意味はどれでしょう？",
                options: ["いっしょにはなしてきめること", "ひとりでかんがえること", "おしえること"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "meaning",
                question: "「重い」の反対の言葉はどれでしょう？",
                options: ["かるい", "うすい", "やわらかい"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "meaning",
                question: "「暑い」の反対の言葉はどれでしょう？",
                options: ["さむい", "ぬるい", "すずしい"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "meaning",
                question: "「悲しい」の反対に近い言葉はどれでしょう？",
                options: ["うれしい", "さびしい", "くるしい"],
                correct: 0,
                difficulty: 2
            },

            // 使い方
            {
                type: "usage",
                question: "「注意する」のはどんなときでしょう？",
                options: ["きけんなことにきをつけるとき", "うれしいとき", "ねるとき"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "usage",
                question: "「練習」はなんのためにするでしょう？",
                options: ["うまくなるため", "やすむため", "あそぶだけのため"],
                correct: 0,
                difficulty: 2
            },

            // ===== レベル3（上級）：ことわざ・難しい語彙 =====

            // ことわざ
            {
                type: "proverb",
                question: "「石の上にも（　）年」の（　）に入る数字はどれでしょう？",
                options: ["三", "五", "十"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "proverb",
                question: "「七転び（　）起き」の（　）に入る数字はどれでしょう？",
                options: ["八", "九", "十"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "proverb",
                question: "「一石（　）鳥」の（　）に入る数字はどれでしょう？",
                options: ["二", "三", "四"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "proverb",
                question: "「石の上にも三年」とはどういう意味でしょう？",
                options: ["がまんして続ければいつかうまくいく", "いしのうえは三年でぬくくなる", "三年たてばなんでもできる"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "proverb",
                question: "「七転び八起き」とはどういう意味でしょう？",
                options: ["何度失敗してもあきらめない", "七回ころんで八回おきること", "からだをきたえること"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "proverb",
                question: "「急がば（　）れ」のことわざ。（　）に入るのはどれでしょう？",
                options: ["まわ", "はや", "いそ"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "proverb",
                question: "「猿も木から（　）ちる」のことわざ。（　）に入るのはどれでしょう？",
                options: ["お", "く", "の"],
                correct: 0,
                difficulty: 3
            },

            // 難しい漢字の読み方
            {
                type: "reading",
                question: "「整理整頓」の読み方はどれでしょう？",
                options: ["せいりせいとん", "せいりせってん", "せいりせいどん"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "reading",
                question: "「反省」の読み方はどれでしょう？",
                options: ["はんせい", "はんしょう", "はんせき"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "reading",
                question: "「勝負」の読み方はどれでしょう？",
                options: ["しょうぶ", "かちまけ", "しょうふ"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "reading",
                question: "「努力」の読み方はどれでしょう？",
                options: ["どりょく", "どうりょく", "どりき"],
                correct: 0,
                difficulty: 3
            },

            // 意味
            {
                type: "meaning",
                question: "「整理整頓」の意味はどれでしょう？",
                options: ["ものをきちんとかたづけること", "ものをたくさんあつめること", "ものをすてること"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "meaning",
                question: "「反省する」の意味はどれでしょう？",
                options: ["自分のこうどうをふりかえること", "あそぶこと", "まつこと"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "meaning",
                question: "「努力」の意味はどれでしょう？",
                options: ["がんばってとりくむこと", "やすむこと", "たのしむだけのこと"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "meaning",
                question: "「一石二鳥」とはどういう意味でしょう？",
                options: ["一つのことで二つのいいことがある", "いしをなげてことり二羽とぶ", "一ついしをもつこと"],
                correct: 0,
                difficulty: 3
            }
        ];

        this.questions = this.selectQuestions(allQuestions);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    selectQuestions(allQuestions) {
        let selectedQuestions = [];
        switch(this.selectedLevel) {
            case 1: selectedQuestions = allQuestions.filter(q => q.difficulty === 1); break;
            case 2: selectedQuestions = allQuestions.filter(q => q.difficulty <= 2); break;
            case 3: selectedQuestions = allQuestions; break;
            default: selectedQuestions = allQuestions.filter(q => q.difficulty === 1);
        }
        const shuffled = this.shuffleArray([...selectedQuestions]);
        return shuffled.slice(0, Math.min(10, shuffled.length));
    }

    getPlayerLevel() {
        const totalScore = this.getTotalScore();
        if (totalScore < 100) return 1;
        if (totalScore < 300) return 2;
        if (totalScore < 600) return 3;
        return 4;
    }

    getRank() {
        const totalScore = this.getTotalScore();
        if (totalScore < 50) return "見習い";
        if (totalScore < 150) return "初段";
        if (totalScore < 300) return "二段";
        if (totalScore < 500) return "三段";
        if (totalScore < 800) return "師範代";
        return "師範";
    }

    setupEventListeners() {
        document.getElementById('start-game-btn').addEventListener('click', () => this.startGame());
        document.getElementById('reset-progress-btn').addEventListener('click', () => this.resetProgress());
        document.getElementById('play-again-btn').addEventListener('click', () => this.startGame());
        document.getElementById('back-to-start-btn').addEventListener('click', () => this.showStartScreen());

        document.querySelectorAll('.btn-level').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.btn-level').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.selectedLevel = parseInt(button.dataset.level);
            });
        });
    }

    loadProgress() {
        const saved = localStorage.getItem('kotoba-dojo-progress');
        if (saved) {
            const progress = JSON.parse(saved);
            this.totalScore = progress.totalScore || 0;
        } else {
            this.totalScore = 0;
        }
    }

    saveProgress() {
        localStorage.setItem('kotoba-dojo-progress', JSON.stringify({ totalScore: this.totalScore }));
    }

    getTotalScore() {
        return this.totalScore || 0;
    }

    resetProgress() {
        if (confirm('本当に進捗をリセットしますか？')) {
            localStorage.removeItem('kotoba-dojo-progress');
            this.totalScore = 0;
            this.showStartScreen();
        }
    }

    showStartScreen() {
        this.hideAllScreens();
        document.getElementById('start-screen').classList.add('active');
        document.getElementById('current-rank').textContent = this.getRank();
        document.getElementById('total-score').textContent = this.getTotalScore();
    }

    showGameScreen() {
        this.hideAllScreens();
        document.getElementById('game-screen').classList.add('active');
    }

    showResultScreen() {
        this.hideAllScreens();
        document.getElementById('result-screen').classList.add('active');

        const oldRank = this.getRank();
        const oldTotalScore = this.getTotalScore();

        this.totalScore = oldTotalScore + this.score;
        this.saveProgress();

        const newRank = this.getRank();

        document.getElementById('final-score').textContent = this.score;
        document.getElementById('correct-count').textContent = this.correctAnswers;
        document.querySelector('.correct-unit').textContent = `/${this.questions.length}問`;
        document.getElementById('new-rank').textContent = newRank;
        document.getElementById('new-total-score').textContent = this.getTotalScore();

        const rankUpMessage = document.getElementById('rank-up-message');
        if (oldRank !== newRank) {
            rankUpMessage.classList.remove('hidden');
            this.playSound('rankup');
        } else {
            rankUpMessage.classList.add('hidden');
        }
    }

    hideAllScreens() {
        document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    }

    startGame() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.gameActive = true;

        this.initializeQuestions();

        this.showGameScreen();
        this.showQuestion();
    }

    showQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.endGame();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];

        const typeLabels = {
            reading: '📖 よみかた',
            meaning: '💡 いみ・はんたいご',
            usage: '✏️ つかいかた',
            proverb: '🏮 ことわざ'
        };
        const badge = document.getElementById('question-type-badge');
        badge.textContent = typeLabels[question.type] || '';
        badge.className = `question-type-badge type-${question.type}`;

        document.getElementById('question-counter').textContent =
            `問題 ${this.currentQuestionIndex + 1}/${this.questions.length}`;
        document.getElementById('current-game-score').textContent = this.score;
        document.getElementById('question-text').textContent = question.question;

        const optionsContainer = document.getElementById('question-options');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => this.selectAnswer(index));
            optionsContainer.appendChild(button);
        });

        this.startTimer();
    }

    startTimer() {
        this.timeLeft = 10;
        this.updateTimerDisplay();

        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        document.getElementById('timer').textContent = this.timeLeft;

        const percentage = (this.timeLeft / 10) * 100;
        document.getElementById('timer-bar').style.width = percentage + '%';

        const timerElement = document.getElementById('timer');
        timerElement.style.color = this.timeLeft <= 3 ? '#DC143C' : '#2F1B14';
    }

    selectAnswer(selectedIndex) {
        if (!this.gameActive) return;

        clearInterval(this.timer);
        this.gameActive = false;

        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = selectedIndex === question.correct;

        document.querySelectorAll('.option-btn').forEach((button, index) => {
            button.disabled = true;
            if (index === question.correct) {
                button.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                button.classList.add('incorrect');
            }
        });

        if (isCorrect) {
            this.correctAnswers++;
            this.score += 10 + this.timeLeft;
            this.showFeedback('correct', '正解！');
            this.playSound('correct');
        } else {
            this.showFeedback('incorrect', '不正解...', question.options[question.correct]);
            this.playSound('incorrect');
        }

        setTimeout(() => {
            this.hideFeedback();
            this.currentQuestionIndex++;
            this.gameActive = true;
            this.showQuestion();
        }, 1800);
    }

    timeUp() {
        if (!this.gameActive) return;

        clearInterval(this.timer);
        this.gameActive = false;

        const question = this.questions[this.currentQuestionIndex];

        document.querySelectorAll('.option-btn').forEach((button, index) => {
            button.disabled = true;
            if (index === question.correct) {
                button.classList.add('correct');
            }
        });

        this.showFeedback('timeout', '時間切れ！', question.options[question.correct]);
        this.playSound('timeout');

        setTimeout(() => {
            this.hideFeedback();
            this.currentQuestionIndex++;
            this.gameActive = true;
            this.showQuestion();
        }, 1800);
    }

    showFeedback(type, message, correctAnswer = null) {
        const icons = { correct: '🎉', incorrect: '😅', timeout: '⏰' };
        document.getElementById('feedback-icon').textContent = icons[type] || '';
        document.getElementById('feedback-text').textContent = message;

        const hint = document.getElementById('feedback-hint');
        if ((type === 'incorrect' || type === 'timeout') && correctAnswer) {
            hint.textContent = `正解は「${correctAnswer}」`;
            hint.classList.remove('hidden');
        } else {
            hint.classList.add('hidden');
        }

        document.getElementById('feedback').classList.remove('hidden');
    }

    hideFeedback() {
        document.getElementById('feedback').classList.add('hidden');
        document.getElementById('feedback-hint').classList.add('hidden');
    }

    playSound(type) {
        const audioContext = this.getAudioContext();

        let frequency, duration;
        switch (type) {
            case 'correct':   frequency = 523.25; duration = 0.3; break;
            case 'incorrect': frequency = 220;    duration = 0.5; break;
            case 'timeout':   frequency = 196;    duration = 0.4; break;
            case 'rankup':
                this.playRankUpSound();
                return;
            default: return;
        }

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }

    playRankUpSound() {
        const audioContext = this.getAudioContext();
        [523.25, 659.25, 783.99].forEach((frequency, index) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.4);
            }, index * 200);
        });
    }

    endGame() {
        clearInterval(this.timer);
        this.showResultScreen();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new KotobaDojo();
});
