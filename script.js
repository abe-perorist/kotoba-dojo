// ゲーム状態管理
class KotobaDojo {
    constructor() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.timeLeft = 10;
        this.timer = null;
        this.questions = [];
        this.gameActive = false;
        
        // ローカルストレージから進捗を読み込み
        this.loadProgress();
        
        // 問題データを初期化
        this.initializeQuestions();
        
        // イベントリスナーを設定
        this.setupEventListeners();
        
        // 初期画面を表示
        this.showStartScreen();
    }

    // 問題データの初期化
    initializeQuestions() {
        const allQuestions = [
            // 基本的な漢字の読み方
            {
                type: "reading",
                question: "「水」の読み方はどれでしょう？",
                options: ["みず", "かわ", "うみ"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "reading",
                question: "「火」の読み方はどれでしょう？",
                options: ["ひ", "き", "か"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "reading",
                question: "「木」の読み方はどれでしょう？",
                options: ["もく", "き", "ぼく"],
                correct: 1,
                difficulty: 1
            },
            {
                type: "reading",
                question: "「山」の読み方はどれでしょう？",
                options: ["やま", "さん", "ざん"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "reading",
                question: "「川」の読み方はどれでしょう？",
                options: ["かわ", "せん", "がわ"],
                correct: 0,
                difficulty: 1
            },
            
            // 語彙の意味
            {
                type: "meaning",
                question: "「あたたかい」の意味はどれでしょう？",
                options: ["つめたい", "あつくない", "すずしい"],
                correct: 1,
                difficulty: 1
            },
            {
                type: "meaning",
                question: "「おおきい」の反対の意味はどれでしょう？",
                options: ["ちいさい", "たかい", "ひくい"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "meaning",
                question: "「はやい」の意味はどれでしょう？",
                options: ["おそい", "すばやい", "ゆっくり"],
                correct: 1,
                difficulty: 1
            },
            {
                type: "meaning",
                question: "「あかるい」の反対はどれでしょう？",
                options: ["くらい", "しろい", "きいろい"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "meaning",
                question: "「たのしい」の意味はどれでしょう？",
                options: ["かなしい", "うれしい", "つまらない"],
                correct: 1,
                difficulty: 1
            },
            
            // 少し難しい問題
            {
                type: "reading",
                question: "「学校」の読み方はどれでしょう？",
                options: ["がっこう", "がくこう", "まなびや"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "reading",
                question: "「友達」の読み方はどれでしょう？",
                options: ["ゆうたつ", "ともだち", "とうたつ"],
                correct: 1,
                difficulty: 2
            },
            {
                type: "meaning",
                question: "「きれい」の意味はどれでしょう？",
                options: ["きたない", "うつくしい", "みにくい"],
                correct: 1,
                difficulty: 2
            },
            {
                type: "meaning",
                question: "「げんき」の意味はどれでしょう？",
                options: ["つかれた", "びょうき", "ちからがある"],
                correct: 2,
                difficulty: 2
            },
            {
                type: "usage",
                question: "「ありがとう」を使うのはいつでしょう？",
                options: ["おこったとき", "かんしゃするとき", "かなしいとき"],
                correct: 1,
                difficulty: 2
            },
            
            // 応用問題
            {
                type: "reading",
                question: "「電車」の読み方はどれでしょう？",
                options: ["でんしゃ", "でんき", "きしゃ"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "reading",
                question: "「図書館」の読み方はどれでしょう？",
                options: ["としょかん", "ずしょかん", "としょけん"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "meaning",
                question: "「しずか」の意味はどれでしょう？",
                options: ["うるさい", "おとがしない", "おおきなこえ"],
                correct: 1,
                difficulty: 3
            },
            {
                type: "usage",
                question: "「ごめんなさい」を使うのはいつでしょう？",
                options: ["あやまるとき", "よろこぶとき", "おどろくとき"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "usage",
                question: "「おはよう」を使うのはいつでしょう？",
                options: ["よるねるとき", "あさあうとき", "ひるごはんのとき"],
                correct: 1,
                difficulty: 3
            }
        ];

        // プレイヤーのレベルに応じて問題を選択
        this.questions = this.selectQuestions(allQuestions);
    }

    // レベルに応じた問題選択
    selectQuestions(allQuestions) {
        const playerLevel = this.getPlayerLevel();
        let selectedQuestions = [];
        
        // レベル1: 基本問題のみ
        if (playerLevel === 1) {
            selectedQuestions = allQuestions.filter(q => q.difficulty === 1);
        }
        // レベル2: 基本+中級
        else if (playerLevel === 2) {
            const basic = allQuestions.filter(q => q.difficulty === 1);
            const intermediate = allQuestions.filter(q => q.difficulty === 2);
            selectedQuestions = [...basic, ...intermediate];
        }
        // レベル3以上: 全問題
        else {
            selectedQuestions = allQuestions;
        }
        
        // ランダムに8問選択
        const shuffled = selectedQuestions.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 8);
    }

    // プレイヤーレベルの計算
    getPlayerLevel() {
        const totalScore = this.getTotalScore();
        if (totalScore < 100) return 1;
        if (totalScore < 300) return 2;
        if (totalScore < 600) return 3;
        return 4;
    }

    // 段位の取得
    getRank() {
        const totalScore = this.getTotalScore();
        if (totalScore < 50) return "見習い";
        if (totalScore < 150) return "初段";
        if (totalScore < 300) return "二段";
        if (totalScore < 500) return "三段";
        if (totalScore < 800) return "師範代";
        return "師範";
    }

    // イベントリスナーの設定
    setupEventListeners() {
        document.getElementById('start-game-btn').addEventListener('click', () => this.startGame());
        document.getElementById('reset-progress-btn').addEventListener('click', () => this.resetProgress());
        document.getElementById('play-again-btn').addEventListener('click', () => this.startGame());
        document.getElementById('back-to-start-btn').addEventListener('click', () => this.showStartScreen());
    }

    // 進捗の読み込み
    loadProgress() {
        const saved = localStorage.getItem('kotoba-dojo-progress');
        if (saved) {
            const progress = JSON.parse(saved);
            this.totalScore = progress.totalScore || 0;
        } else {
            this.totalScore = 0;
        }
    }

    // 進捗の保存
    saveProgress() {
        const progress = {
            totalScore: this.totalScore
        };
        localStorage.setItem('kotoba-dojo-progress', JSON.stringify(progress));
    }

    // 総スコアの取得
    getTotalScore() {
        return this.totalScore || 0;
    }

    // 進捗のリセット
    resetProgress() {
        if (confirm('本当に進捗をリセットしますか？')) {
            localStorage.removeItem('kotoba-dojo-progress');
            this.totalScore = 0;
            this.showStartScreen();
        }
    }

    // スタート画面の表示
    showStartScreen() {
        this.hideAllScreens();
        document.getElementById('start-screen').classList.add('active');
        
        // 現在の段位とスコアを表示
        document.getElementById('current-rank').textContent = this.getRank();
        document.getElementById('total-score').textContent = this.getTotalScore();
    }

    // ゲーム画面の表示
    showGameScreen() {
        this.hideAllScreens();
        document.getElementById('game-screen').classList.add('active');
    }

    // 結果画面の表示
    showResultScreen() {
        this.hideAllScreens();
        document.getElementById('result-screen').classList.add('active');
        
        const oldRank = this.getRank();
        const oldTotalScore = this.getTotalScore();
        
        // スコアを更新
        this.totalScore = oldTotalScore + this.score;
        this.saveProgress();
        
        const newRank = this.getRank();
        
        // 結果を表示
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('correct-count').textContent = this.correctAnswers;
        document.getElementById('new-rank').textContent = newRank;
        document.getElementById('new-total-score').textContent = this.getTotalScore();
        
        // 段位アップのチェック
        const rankUpMessage = document.getElementById('rank-up-message');
        if (oldRank !== newRank) {
            rankUpMessage.classList.remove('hidden');
            this.playSound('rankup');
        } else {
            rankUpMessage.classList.add('hidden');
        }
    }

    // 全画面を非表示
    hideAllScreens() {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
    }

    // ゲーム開始
    startGame() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.gameActive = true;
        
        // 問題をシャッフル
        this.initializeQuestions();
        
        this.showGameScreen();
        this.showQuestion();
    }

    // 問題表示
    showQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.endGame();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        
        // 問題番号を更新
        document.getElementById('question-counter').textContent = 
            `問題 ${this.currentQuestionIndex + 1}/${this.questions.length}`;
        
        // 現在のスコアを更新
        document.getElementById('current-game-score').textContent = this.score;
        
        // 問題文を表示
        document.getElementById('question-text').textContent = question.question;
        
        // 選択肢を生成
        const optionsContainer = document.getElementById('question-options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => this.selectAnswer(index));
            optionsContainer.appendChild(button);
        });
        
        // タイマーを開始
        this.startTimer();
    }

    // タイマー開始
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

    // タイマー表示更新
    updateTimerDisplay() {
        document.getElementById('timer').textContent = this.timeLeft;
        
        // タイマーバーの更新
        const percentage = (this.timeLeft / 10) * 100;
        document.getElementById('timer-bar').style.width = percentage + '%';
        
        // 残り時間が少ない時の警告色
        const timerElement = document.getElementById('timer');
        if (this.timeLeft <= 3) {
            timerElement.style.color = '#DC143C';
        } else {
            timerElement.style.color = '#2F1B14';
        }
    }

    // 回答選択
    selectAnswer(selectedIndex) {
        if (!this.gameActive) return;
        
        clearInterval(this.timer);
        this.gameActive = false;
        
        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = selectedIndex === question.correct;
        
        // ボタンの状態を更新
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach((button, index) => {
            button.disabled = true;
            if (index === question.correct) {
                button.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                button.classList.add('incorrect');
            }
        });
        
        // 結果に応じてスコアと正解数を更新
        if (isCorrect) {
            this.correctAnswers++;
            // 残り時間に応じてボーナスポイント
            const baseScore = 10;
            const timeBonus = this.timeLeft;
            this.score += baseScore + timeBonus;
            
            this.showFeedback('correct', '正解！');
            this.playSound('correct');
        } else {
            this.showFeedback('incorrect', '不正解...');
            this.playSound('incorrect');
        }
        
        // 1.5秒後に次の問題へ
        setTimeout(() => {
            this.hideFeedback();
            this.currentQuestionIndex++;
            this.gameActive = true;
            this.showQuestion();
        }, 1500);
    }

    // 時間切れ
    timeUp() {
        if (!this.gameActive) return;
        
        clearInterval(this.timer);
        this.gameActive = false;
        
        const question = this.questions[this.currentQuestionIndex];
        
        // 正解を表示
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach((button, index) => {
            button.disabled = true;
            if (index === question.correct) {
                button.classList.add('correct');
            }
        });
        
        this.showFeedback('timeout', '時間切れ！');
        this.playSound('timeout');
        
        // 1.5秒後に次の問題へ
        setTimeout(() => {
            this.hideFeedback();
            this.currentQuestionIndex++;
            this.gameActive = true;
            this.showQuestion();
        }, 1500);
    }

    // フィードバック表示
    showFeedback(type, message) {
        const feedback = document.getElementById('feedback');
        const icon = document.getElementById('feedback-icon');
        const text = document.getElementById('feedback-text');
        
        switch (type) {
            case 'correct':
                icon.textContent = '🎉';
                text.textContent = message;
                break;
            case 'incorrect':
                icon.textContent = '😅';
                text.textContent = message;
                break;
            case 'timeout':
                icon.textContent = '⏰';
                text.textContent = message;
                break;
        }
        
        feedback.classList.remove('hidden');
    }

    // フィードバック非表示
    hideFeedback() {
        document.getElementById('feedback').classList.add('hidden');
    }

    // 音響効果
    playSound(type) {
        // Web Audio APIを使用した簡単な音響効果
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        let frequency, duration;
        
        switch (type) {
            case 'correct':
                frequency = 523.25; // C5
                duration = 0.3;
                break;
            case 'incorrect':
                frequency = 220; // A3
                duration = 0.5;
                break;
            case 'timeout':
                frequency = 196; // G3
                duration = 0.4;
                break;
            case 'rankup':
                // 段位アップは特別な音
                this.playRankUpSound(audioContext);
                return;
            default:
                return;
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

    // 段位アップ音
    playRankUpSound(audioContext) {
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
        
        notes.forEach((frequency, index) => {
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

    // ゲーム終了
    endGame() {
        clearInterval(this.timer);
        this.showResultScreen();
    }
}

// ゲーム初期化
document.addEventListener('DOMContentLoaded', () => {
    new KotobaDojo();
});