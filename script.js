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
        this.selectedLevel = 1; // デフォルトは初級
        
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
            // 基本的な漢字の読み方（レベル1）
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
            {
                type: "reading",
                question: "「空」の読み方はどれでしょう？",
                options: ["くう", "そら", "から"],
                correct: 1,
                difficulty: 1
            },
            {
                type: "reading",
                question: "「海」の読み方はどれでしょう？",
                options: ["かい", "うみ", "みず"],
                correct: 1,
                difficulty: 1
            },
            {
                type: "reading",
                question: "「花」の読み方はどれでしょう？",
                options: ["はな", "か", "け"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "reading",
                question: "「月」の読み方はどれでしょう？",
                options: ["げつ", "つき", "がつ"],
                correct: 1,
                difficulty: 1
            },
            {
                type: "reading",
                question: "「星」の読み方はどれでしょう？",
                options: ["せい", "ほし", "しょう"],
                correct: 1,
                difficulty: 1
            },

            // 基本的な語彙の意味（レベル1）
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
            {
                type: "meaning",
                question: "「きもちいい」の意味はどれでしょう？",
                options: ["きもちわるい", "すがすがしい", "つらい"],
                correct: 1,
                difficulty: 1
            },
            {
                type: "meaning",
                question: "「やさしい」の意味はどれでしょう？",
                options: ["きびしい", "しんせつ", "いじわる"],
                correct: 1,
                difficulty: 1
            },
            {
                type: "meaning",
                question: "「つよい」の反対はどれでしょう？",
                options: ["よわい", "かたい", "やわらかい"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "meaning",
                question: "「あたらしい」の反対はどれでしょう？",
                options: ["ふるい", "わるい", "きたない"],
                correct: 0,
                difficulty: 1
            },
            {
                type: "meaning",
                question: "「きれい」の意味はどれでしょう？",
                options: ["きたない", "うつくしい", "みにくい"],
                correct: 1,
                difficulty: 1
            },

            // 中級レベルの漢字（レベル2）
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
                type: "reading",
                question: "「家族」の読み方はどれでしょう？",
                options: ["かぞく", "かてい", "いえ"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "reading",
                question: "「動物」の読み方はどれでしょう？",
                options: ["どうぶつ", "どうもつ", "どうもの"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "reading",
                question: "「植物」の読み方はどれでしょう？",
                options: ["しょくぶつ", "しょくもつ", "しょくもの"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "reading",
                question: "「季節」の読み方はどれでしょう？",
                options: ["きせつ", "きせち", "きせい"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "reading",
                question: "「天気」の読み方はどれでしょう？",
                options: ["てんき", "てんけ", "てんぎ"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "reading",
                question: "「時間」の読み方はどれでしょう？",
                options: ["じかん", "ときかん", "じげん"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "reading",
                question: "「場所」の読み方はどれでしょう？",
                options: ["ばしょ", "ところ", "ばところ"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "reading",
                question: "「言葉」の読み方はどれでしょう？",
                options: ["ことば", "げんご", "はなし"],
                correct: 0,
                difficulty: 2
            },

            // 中級レベルの語彙（レベル2）
            {
                type: "meaning",
                question: "「げんき」の意味はどれでしょう？",
                options: ["つかれた", "びょうき", "ちからがある"],
                correct: 2,
                difficulty: 2
            },
            {
                type: "meaning",
                question: "「しずか」の意味はどれでしょう？",
                options: ["うるさい", "おとがしない", "おおきなこえ"],
                correct: 1,
                difficulty: 2
            },
            {
                type: "meaning",
                question: "「きもち」の意味はどれでしょう？",
                options: ["からだ", "こころ", "あたま"],
                correct: 1,
                difficulty: 2
            },
            {
                type: "meaning",
                question: "「じかん」の意味はどれでしょう？",
                options: ["ばしょ", "とき", "ひ"],
                correct: 1,
                difficulty: 2
            },
            {
                type: "meaning",
                question: "「ばしょ」の意味はどれでしょう？",
                options: ["とき", "ところ", "ひ"],
                correct: 1,
                difficulty: 2
            },

            // 応用レベルの漢字（レベル3）
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
                type: "reading",
                question: "「博物館」の読み方はどれでしょう？",
                options: ["はくぶつかん", "はくぶつけん", "はくぶつしょ"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "reading",
                question: "「美術館」の読み方はどれでしょう？",
                options: ["びじゅつかん", "びじゅつけん", "びじゅつしょ"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "reading",
                question: "「映画館」の読み方はどれでしょう？",
                options: ["えいがかん", "えいがけん", "えいがしょ"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "reading",
                question: "「遊園地」の読み方はどれでしょう？",
                options: ["ゆうえんち", "あそびえんち", "ゆうえんじ"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "reading",
                question: "「水族館」の読み方はどれでしょう？",
                options: ["すいぞくかん", "みずぞくかん", "すいぞくけん"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "reading",
                question: "「動物園」の読み方はどれでしょう？",
                options: ["どうぶつえん", "どうもつえん", "どうぶつけん"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "reading",
                question: "「植物園」の読み方はどれでしょう？",
                options: ["しょくぶつえん", "しょくもつえん", "しょくぶつけん"],
                correct: 0,
                difficulty: 3
            },
            {
                type: "reading",
                question: "「科学館」の読み方はどれでしょう？",
                options: ["かがくかん", "かがくけん", "かがくしょ"],
                correct: 0,
                difficulty: 3
            },

            // 応用レベルの語彙（レベル3）
            {
                type: "meaning",
                question: "「きもちがいい」の意味はどれでしょう？",
                options: ["きもちがわるい", "すがすがしい", "つらい"],
                correct: 1,
                difficulty: 3
            },
            {
                type: "meaning",
                question: "「たのしみ」の意味はどれでしょう？",
                options: ["かなしみ", "よろこび", "つらさ"],
                correct: 1,
                difficulty: 3
            },
            {
                type: "meaning",
                question: "「やすらぎ」の意味はどれでしょう？",
                options: ["いらだち", "おちつき", "あわただしさ"],
                correct: 1,
                difficulty: 3
            },
            {
                type: "meaning",
                question: "「わくわく」の意味はどれでしょう？",
                options: ["どきどき", "はらはら", "わくわく"],
                correct: 2,
                difficulty: 3
            },
            {
                type: "meaning",
                question: "「どきどき」の意味はどれでしょう？",
                options: ["わくわく", "はらはら", "どきどき"],
                correct: 2,
                difficulty: 3
            },

            // 使い方の問題（レベル2-3）
            {
                type: "usage",
                question: "「ありがとう」を使うのはいつでしょう？",
                options: ["おこったとき", "かんしゃするとき", "かなしいとき"],
                correct: 1,
                difficulty: 2
            },
            {
                type: "usage",
                question: "「ごめんなさい」を使うのはいつでしょう？",
                options: ["あやまるとき", "よろこぶとき", "おどろくとき"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "usage",
                question: "「おはよう」を使うのはいつでしょう？",
                options: ["よるねるとき", "あさあうとき", "ひるごはんのとき"],
                correct: 1,
                difficulty: 2
            },
            {
                type: "usage",
                question: "「いただきます」を使うのはいつでしょう？",
                options: ["ごはんをたべるとき", "ごはんをおわるとき", "ごはんをのむとき"],
                correct: 0,
                difficulty: 2
            },
            {
                type: "usage",
                question: "「ごちそうさま」を使うのはいつでしょう？",
                options: ["ごはんをたべるとき", "ごはんをおわるとき", "ごはんをのむとき"],
                correct: 1,
                difficulty: 2
            },
            {
                type: "usage",
                question: "「おめでとう」を使うのはいつでしょう？",
                options: ["かなしいとき", "よろこばしいとき", "おこったとき"],
                correct: 1,
                difficulty: 2
            },
            {
                type: "usage",
                question: "「おやすみ」を使うのはいつでしょう？",
                options: ["あさあうとき", "よるねるとき", "ひるねるとき"],
                correct: 1,
                difficulty: 2
            },
            {
                type: "usage",
                question: "「さようなら」を使うのはいつでしょう？",
                options: ["あうとき", "わかれるとき", "はなすとき"],
                correct: 1,
                difficulty: 2
            },
            {
                type: "usage",
                question: "「いただきます」の意味はどれでしょう？",
                options: ["ごちそうさま", "ありがとう", "さようなら"],
                correct: 1,
                difficulty: 3
            },
            {
                type: "usage",
                question: "「ごちそうさま」の意味はどれでしょう？",
                options: ["いただきます", "ありがとう", "さようなら"],
                correct: 1,
                difficulty: 3
            }
        ];

        // レベルに応じた問題選択
        this.questions = this.selectQuestions(allQuestions);
    }

    // Fisher-Yatesシャッフルアルゴリズム
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // レベルに応じた問題選択
    selectQuestions(allQuestions) {
        let selectedQuestions = [];
        
        // 選択されたレベルに応じて問題をフィルタリング
        switch(this.selectedLevel) {
            case 1: // 初級
                selectedQuestions = allQuestions.filter(q => q.difficulty === 1);
                break;
            case 2: // 中級
                selectedQuestions = allQuestions.filter(q => q.difficulty <= 2);
                break;
            case 3: // 上級
                selectedQuestions = allQuestions; // 全問題
                break;
            default:
                selectedQuestions = allQuestions.filter(q => q.difficulty === 1);
        }
        
        // 問題を完全にシャッフル
        const shuffled = this.shuffleArray([...selectedQuestions]);
        
        // 8問を選択（重複を防ぐため、配列の長さを確認）
        return shuffled.slice(0, Math.min(8, shuffled.length));
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

        // レベル選択ボタンのイベントリスナー
        const levelButtons = document.querySelectorAll('.btn-level');
        levelButtons.forEach(button => {
            button.addEventListener('click', () => {
                // アクティブなボタンのスタイルを更新
                levelButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // 選択されたレベルを保存
                this.selectedLevel = parseInt(button.dataset.level);
            });
        });
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
        
        // 問題を初期化してシャッフル
        this.initializeQuestions();
        
        // 問題を再度シャッフル（よりランダムな順序を保証）
        this.questions = this.shuffleArray([...this.questions]);
        
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
        
        // デバッグ情報を表示
        console.log(`レベル: ${this.selectedLevel}, 問題 ${this.currentQuestionIndex + 1}/${this.questions.length}`);
        console.log(`難易度: ${question.difficulty}, タイプ: ${question.type}`);
        console.log(`問題: ${question.question}`);
        console.log(`選択肢: ${question.options.join(', ')}`);
        console.log('------------------------');
        
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