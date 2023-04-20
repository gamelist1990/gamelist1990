var Typing;
!function(t) {
    class i {
        constructor(t, i) {
            this.type = t,
            this.data = i
        }
    }
    class e {
        constructor() {
            this.listeners = []
        }
        hasEventListener(t, i) {
            var e, s, n = this.listeners.length;
            for (e = 0; e < n; e++)
                if ((s = this.listeners[e]).type === t && s.listener === i)
                    return !0;
            return !1
        }
        addEventListener(t, i) {
            this.hasEventListener(t, i) || this.listeners.push({
                type: t,
                listener: i
            })
        }
        removeEventListener(t, i) {
            var e, s, n = this.listeners.length;
            for (e = 0; e < n; e++)
                (s = this.listeners[e]).type === t && s.listener === i && this.listeners.splice(e, 1)
        }
        removeAllEventListeners(t) {
            var i, e, s = this.listeners.length;
            for (i = 0; i < s; i++)
                e = this.listeners[i],
                t && e.type !== t || this.listeners.splice(i, 1)
        }
        dispatchEvent(t) {
            var i, e, s = this.listeners.length;
            for (i = 0; i < s; i++)
                (e = this.listeners[i]).type === t.type && e.listener.call(this, t)
        }
    }
    class s extends e {
        constructor(t) {
            super(),
            this.MIN_MILLISECOND = 20,
            this._interval = 1e3,
            this._performance = window.performance,
            this.bind = jQuery.proxy,
            this._performance && this._performance.now ? this._getTimer = function() {
                return this._performance.now()
            }
            : Date.now ? this._getTimer = function() {
                return Date.now()
            }
            : this._getTimer = function() {
                return (new Date).getTime()
            }
            ,
            this.init(t)
        }
        init(t, i) {
            NaN !== t && t >= this.MIN_MILLISECOND && (this._interval = t),
            (NaN === i || i < 0) && (i = -1),
            this._repeat = i,
            this.stop(),
            this.removeAllEventListeners()
        }
        play() {
            this._isPlaying || (this._count = 0,
            this._start = this._getTimer(),
            this._repeatCount = this._repeat,
            this._setTimer(),
            this._isPlaying = !0,
            this.dispatchEvent(new i(s.START,{})))
        }
        stop() {
            this._isPlaying = !1,
            this._isPaused = !1,
            this._count = 0,
            this._start = 0,
            this._paused = 0,
            this._repeatCount = this._repeat,
            this._clearTimer(),
            this.dispatchEvent(new i(s.STOP,{}))
        }
        pause() {
            this._isPlaying && !this._isPaused && (this._paused = this._getTimer(),
            this._clearTimer(),
            this._isPaused = !0)
        }
        restart() {
            this._isPlaying && this._isPaused && (this._start += this._getTimer() - this._paused,
            this._paused = 0,
            this._setTimer(),
            this._isPaused = !1)
        }
        delay(t, i) {
            this.init(i);
            var e = function(i) {
                this.removeEventListener(s.TICK, e),
                this.stop(),
                t.call(this)
            };
            this.addEventListener(s.TICK, e),
            this.play()
        }
        isPlaying() {
            return this._isPlaying
        }
        isPaused() {
            return this._isPaused
        }
        _onTick() {
            if (this._isPlaying && !this._isPaused) {
                var t = this._getTimer() - this._start | 0;
                t >= (this._count + 1) * this._interval && (this._count++,
                this.dispatchEvent(new i(s.TICK,{
                    count: this._count,
                    time: t
                })),
                this._repeat > -1 && --this._repeatCount < 0 && (this.stop(),
                this.dispatchEvent(new i(s.COMPLETE,{
                    count: this._count,
                    time: t
                }))))
            }
        }
        _setTimer() {
            this._timer = setInterval(()=>{
                this._onTick()
            }
            , this.MIN_MILLISECOND)
        }
        _clearTimer() {
            -1 !== this._timer && clearInterval(this._timer),
            this._timer = -1
        }
    }
    s.START = "event.timer.start",
    s.STOP = "event.timer.stop",
    s.TICK = "event.timer.tick",
    s.COMPLETE = "event.timer.complete",
    t.Timer = s;
    class n {
        constructor() {
            this.STATE_NEXT = "next",
            this.STATE_DOWN = "down",
            this.STATE_ERROR = "error",
            this.STATE_DISABLED = "disabled",
            this.STATE_SHIFT = "shift",
            this.STATE_HIGHLIGHT = "highlight",
            this.STATE_UP = [this.STATE_DOWN, this.STATE_ERROR].join(" "),
            this.STATE_RESET = [this.STATE_NEXT, this.STATE_DOWN, this.STATE_ERROR, this.STATE_DISABLED].join(" "),
            this.jqKeyboard = jQuery("#keyboard"),
            this.jqKeys = this.jqKeyboard.find(".key"),
            this.jqLeftShiftKey = this.jqKeys.filter(".key" + n.KEYCODE_SHIFT + ".location1"),
            this.jqRightShiftKey = this.jqKeys.filter(".key" + n.KEYCODE_SHIFT + ".location2"),
            this.highLightKeyPosition = ""
        }
        setKeyboardType(t) {
            t === n.TYPE_KANA ? this.jqKeyboard.removeClass(n.TYPE_ROMAN).addClass(n.TYPE_KANA) : this.jqKeyboard.removeClass(n.TYPE_KANA).addClass(n.TYPE_ROMAN)
        }
        resetKeys(t=!0) {
            this.jqKeys.removeClass(t ? this.STATE_RESET : this.STATE_UP),
            this.jqKeyboard.removeClass(this.STATE_SHIFT)
        }
        keyDown(t=null) {
            if (!t)
                return null;
            var i = this.getKeyElement(t);
            return t.code === n.KEYCODE_SHIFT && (i = i.filter(".location" + t.location),
            this.jqKeyboard.addClass(this.STATE_SHIFT)),
            i.addClass(this.STATE_DOWN),
            i
        }
        keyError(t=null) {
            if (!t)
                return null;
            var i = this.getKeyElement(t);
            return t.code === n.KEYCODE_SHIFT && (i = i.filter(".location" + t.location),
            this.jqKeyboard.addClass(this.STATE_SHIFT)),
            i.addClass(this.STATE_DOWN + " " + this.STATE_ERROR),
            i
        }
        keyUp(t=null) {
            if (!t)
                return null;
            var i = this.getKeyElement(t);
            return i.removeClass(this.STATE_UP),
            t.code !== n.KEYCODE_SHIFT || t.shifted || this.jqKeyboard.removeClass(this.STATE_SHIFT),
            i
        }
        highLight(t=null, i=!1) {
            if (this.jqKeys.removeClass(this.STATE_NEXT),
            this.highLightKeyPosition = "",
            !t)
                return null;
            var e = this.getKeyElement(t)
              , s = e.parent();
            return s[0] && (this.highLightKeyPosition = s.attr("class").slice(5),
            i && t.shifted && (this.highLightKeyPosition += " " + this.STATE_SHIFT,
            e.parent().hasClass("right") ? this.jqLeftShiftKey.addClass(this.STATE_NEXT) : this.jqRightShiftKey.addClass(this.STATE_NEXT))),
            e.addClass(this.STATE_NEXT),
            e
        }
        removeKey(t=null) {
            if (!t)
                return null;
            var i = this.getKeyElement(t);
            t.code === n.KEYCODE_SHIFT && (i = i.filter(".location" + t.location)),
            i.remove()
        }
        setKeyEnabled(t=null, i=!0) {
            if (!t)
                return null;
            var e = this.getKeyElement(t);
            t.code === n.KEYCODE_SHIFT && (e = e.filter(".location" + t.location)),
            i ? e.removeClass(this.STATE_DISABLED) : e.addClass(this.STATE_DISABLED)
        }
        iskeyDown(t=null) {
            return this.getKeyElement(t).hasClass(this.STATE_DOWN)
        }
        setHighLightVisible(t) {
            t ? this.jqKeyboard.addClass(this.STATE_HIGHLIGHT) : this.jqKeyboard.removeClass(this.STATE_HIGHLIGHT)
        }
        getHighLightKeyPosition() {
            return this.highLightKeyPosition
        }
        getKeyElement(t=null) {
            return this.jqKeys.filter(".key" + t.code)
        }
    }
    n.TYPE_KANA = "kana",
    n.TYPE_ROMAN = "roman",
    n.TYPE_EIJI = "eiji",
    n.KEYCODE_BACKSPACE = 8,
    n.KEYCODE_TAB = 9,
    n.KEYCODE_ENTER = 13,
    n.KEYCODE_SHIFT = 16,
    n.KEYCODE_CTRL = 17,
    n.KEYCODE_ALT = 18,
    t.TypingKeyboard = n;
    class h {
        constructor(i, e, h, r=!1) {
            this.KEYCODE_SHOW_ANSWER = n.KEYCODE_ENTER,
            this.TIME_TYPING_START = 800,
            this.TIME_TYPING_FINISH = 2400,
            this.START_KEY = " ",
            this.START_COUNT = 3,
            this.jqWindow = jQuery(window),
            this.jqDocument = jQuery(window.document),
            this.typingKeyboard = new n,
            this.bind = jQuery.proxy,
            this.result = null,
            this.methodType = n.TYPE_EIJI,
            this.showAnswer = !0,
            this.timeLimitSec = 300,
            this.useShowAnswer = !1,
            this.isStartkeyDown = !1,
            this.firstAnswerFlag = !1,
            this.timer = new s(1e3),
            this.keyEnabled = !0,
            this.isProofRead = !1,
            this.created = 0,
            this.isProofRead = r,
            e && (this.methodType = e.methodType,
            this.timeLimitSec = 60 * e.time,
            this.showAnswer = e.showAnswer),
            this.data = i,
            this.params = h,
            this.result = null,
            this.methodType === n.TYPE_KANA ? (this.method = new t.TMKana,
            this.START_KEY = "　",
            this.typingKeyboard.setKeyboardType(n.TYPE_KANA)) : (this.methodType === n.TYPE_ROMAN ? this.method = new t.TMRoman : this.method = new t.TMEiji,
            this.typingKeyboard.setKeyboardType(n.TYPE_ROMAN)),
            this.showAnswerKeyInfo = this.method.codeToKeyInfo(this.KEYCODE_SHOW_ANSWER, !1, 0),
            this.backspaceKeyInfo = this.method.codeToKeyInfo(n.KEYCODE_BACKSPACE, !1, 0),
            this.showAnswer && this.typingKeyboard.removeKey(this.showAnswerKeyInfo),
            this.created = (new Date).getTime()
        }
        init() {
            this.engine = new t.TypingEngine(this.method,this.data,this,this.params),
            this.timer.init(1e3),
            this.typingKeyboard.resetKeys(),
            this.inputCountTotal = 100,
            this.updateLimit(),
            this.isStartkeyDown = !1,
            this.keyEnabled = !0,
            this.jqDocument.off("keydown keyup"),
            this.jqDocument.on("keydown", this.bind(this.handleStartKeyDown, this)),
            this.dispatchEvent(h.INIT_COMPLETE, {
                isCorrect: !0,
                isNoMiss: !0,
                isUndo: !1,
                hasNext: !1,
                down: null,
                next: this.typingKeyboard.highLight(this.method.charToKeyInfo(this.START_KEY), !1),
                shifted: !1,
                inputted: "",
                remaining: "",
                inputted2: "",
                remaining2: "",
                inputted3: "",
                remaining3: "",
                inputCount: 10,
                inputCountTotal: 100,
                questionData: null
            })
        }
        start() {
            this.timer.delay(()=>{
                this.typingKeyboard.resetKeys(),
                this.result = null,
                this.timer.init(1e3),
                this.timer.addEventListener(s.TICK, this.bind(this.updateLimit, this)),
                this.timer.play(),
                this.jqDocument.off("keydown"),
                this.engine.start(),
                this.keyEnabled = !0
            }
            , this.TIME_TYPING_START),
            this.dispatchEvent(h.START)
        }
        pause() {
            this.timer && !this.timer.isPaused() && this.timer.pause(),
            this.keyEnabled = !1
        }
        restart() {
            this.timer && this.timer.isPaused() && this.timer.restart(),
            !this.showAnswer && this.useShowAnswer && this.typingKeyboard.setKeyEnabled(this.showAnswerKeyInfo, !1),
            this.typingKeyboard.resetKeys(!1),
            this.keyEnabled = !0
        }
        end() {
            this.keyEnabled = !1,
            this.typingKeyboard.resetKeys(),
            this.timer.stop(),
            this.timer.delay(()=>{
                this.result = this.engine.end(),
                this.dispatchEvent(h.SHOW_RESULT)
            }
            , this.TIME_TYPING_FINISH),
            this.dispatchEvent(h.FINISH)
        }
        interrupt() {
            this.timer.stop(),
            this.result = this.engine.end(),
            this.dispatchEvent(h.SHOW_RESULT)
        }
        getResult() {
            return this.result
        }
        handleQuestionStart(t, i) {
            this.showAnswer || (this.typingKeyboard.setKeyEnabled(this.showAnswerKeyInfo, !0),
            this.useShowAnswer = !1),
            i || (i = this.engine.nextKey),
            this.dispatchEvent(h.SET, {
                isCorrect: !0,
                isNoMiss: !0,
                isUndo: !1,
                hasNext: !!i,
                down: null,
                next: this.typingKeyboard.highLight(i, this.params.smallBigLetter),
                shifted: !!i && i.shifted,
                inputted: this.engine.inputedString,
                remaining: this.engine.guideString.slice(this.engine.inputedString.length),
                inputted2: "0" != this.params.typedCharacter ? t.typingchar.substr(0, this.engine.getInputCharCount()) : "",
                remaining2: "0" != this.params.typedCharacter ? t.typingchar.substr(this.engine.getInputCharCount()) : "",
                inputted3: "2" == this.params.typedCharacter ? t.answer.substr(0, this.engine.getTypedQesCharCount()) : "",
                remaining3: "2" == this.params.typedCharacter ? t.answer.substr(this.engine.getTypedQesCharCount()) : "",
                inputCount: 100,
                inputCountTotal: this.inputCountTotal,
                questionData: t
            })
        }
        handleCorrectKeydown(t, i, e, s) {
            this.keyEnabled && (e || (e = this.engine.nextKey),
            this.dispatchEvent(h.KEYDOWN, {
                isCorrect: !0,
                isNoMiss: s.noMissFlag,
                isUndo: !1,
                hasNext: !!e,
                down: this.typingKeyboard.keyDown(i),
                next: this.typingKeyboard.highLight(e, this.params.smallBigLetter),
                shifted: !!e && e.shifted,
                inputted: this.engine.inputedString,
                inputted2: "0" !== this.params.typedCharacter ? t.typingchar.substr(0, this.engine.getInputCharCount()) : "",
                remaining2: "0" !== this.params.typedCharacter ? t.typingchar.substr(this.engine.getInputCharCount()) : "",
                inputted3: "2" === this.params.typedCharacter ? t.answer.substr(0, this.engine.getTypedQesCharCount()) : "",
                remaining3: "2" === this.params.typedCharacter ? t.answer.substr(this.engine.getTypedQesCharCount()) : "",
                remaining: this.engine.guideString.slice(this.engine.inputedString.length),
                inputCount: s.inputCharCount,
                inputCountTotal: this.inputCountTotal + s.inputCharCount,
                questionData: t
            }),
            e || (this.inputCountTotal += s.inputCharCount))
        }
        handleMistakeKeydown(t, i, e) {
            this.keyEnabled && this.dispatchEvent(h.KEYDOWN, {
                isCorrect: !1,
                isNoMiss: !1,
                isUndo: !1,
                hasNext: !0,
                down: this.typingKeyboard.keyError(i),
                next: null,
                shifted: !1,
                inputted: this.engine.inputedString,
                remaining: this.engine.guideString.slice(this.engine.inputedString.length),
                inputted2: "0" != this.params.typedCharacter ? t.typingchar.substr(0, this.engine.getInputCharCount()) : "",
                remaining2: "0" != this.params.typedCharacter ? t.typingchar.substr(this.engine.getInputCharCount()) : "",
                inputted3: "2" == this.params.typedCharacter ? t.answer.substr(0, this.engine.getTypedQesCharCount()) : "",
                remaining3: "2" == this.params.typedCharacter ? t.answer.substr(this.engine.getTypedQesCharCount()) : "",
                inputCount: e.inputCharCount,
                inputCountTotal: this.inputCountTotal + e.inputCharCount,
                questionData: t
            })
        }
        handleUndoKey(t, i, e) {
            this.keyEnabled && (i || (i = this.engine.nextKey),
            this.dispatchEvent(h.KEYDOWN, {
                isCorrect: !0,
                isNoMiss: e.noMissFlag,
                isUndo: !0,
                hasNext: !!i,
                down: this.typingKeyboard.keyDown(this.backspaceKeyInfo),
                next: this.typingKeyboard.highLight(i, this.params.smallBigLetter),
                shifted: !!i && i.shifted,
                inputted: this.engine.inputedString,
                remaining: this.engine.guideString.slice(this.engine.inputedString.length),
                inputted2: "0" != this.params.typedCharacter ? t.typingchar.substr(0, this.engine.getInputCharCount()) : "",
                remaining2: "0" != this.params.typedCharacter ? t.typingchar.substr(this.engine.getInputCharCount()) : "",
                inputted3: "2" == this.params.typedCharacter ? t.answer.substr(0, this.engine.getTypedQesCharCount()) : "",
                remaining3: "2" == this.params.typedCharacter ? t.answer.substr(this.engine.getTypedQesCharCount()) : "",
                inputCount: e.inputCharCount,
                inputCountTotal: this.inputCountTotal + e.inputCharCount,
                questionData: t
            }))
        }
        handleQuestionEnd(t, i) {
            setTimeout(()=>{
                this.engine.next()
            }
            , 200)
        }
        handleTypingEnd(t) {
            this.end()
        }
        handleSpecialKey(t, i) {
            this.keyEnabled && (this.isProofRead ? this.engine.next() : (this.typingKeyboard.keyDown(i),
            this.showAnswer || this.useShowAnswer || i.code !== this.KEYCODE_SHOW_ANSWER || (this.useShowAnswer = !0,
            this.dispatchEvent(h.SHOW_ANSWER))))
        }
        handleKeyUp(t) {
            this.keyEnabled && (this.typingKeyboard.keyUp(t),
            !this.showAnswer && this.useShowAnswer && t.code === this.KEYCODE_SHOW_ANSWER && this.typingKeyboard.setKeyEnabled(this.showAnswerKeyInfo, !1))
        }
        handleKeyDown(t) {
            return this.keyEnabled && 3 !== t.location
        }
        setNextKeyHighLight(t) {
            this.typingKeyboard.setHighLightVisible(t)
        }
        updateLimit(t=null) {
            if (!this.isProofRead) {
                var i = this.timeLimitSec;
                t && (i -= 1 * t.data.count);
                var e = i % 60
                  , s = (i - e) / 60;
                this.dispatchEvent(h.UPDATE_LIMIT, {
                    minute: s,
                    second: e,
                    progress: i / this.timeLimitSec
                }),
                i <= 0 && this.end()
            }
        }
        handleStartKeyDown(t) {
            if (this.keyEnabled) {
                var i = this.method.codeToKeyInfo(t.keyCode, !1, 0);
                if (!this.isStartkeyDown && i && i.chara === this.START_KEY) {
                    if (this.keyEnabled = !1,
                    this.isStartkeyDown = !0,
                    this.jqDocument.off("keydown"),
                    this.jqDocument.on("keyup", this.handleStartKeyUp.bind(this)),
                    this.isProofRead)
                        return this.result = null,
                        this.jqDocument.off("keydown"),
                        this.engine.start(),
                        void (this.keyEnabled = !0);
                    this.timer.addEventListener(s.TICK, t=>{
                        var i = this.START_COUNT - parseInt(t.data.count, 10);
                        i > 0 ? this.dispatchEvent(h.COUNTDOWN, {
                            count: i
                        }) : (this.timer.stop(),
                        this.start())
                    }
                    ),
                    this.timer.play(),
                    this.dispatchEvent(h.COUNTDOWN, {
                        count: this.START_COUNT
                    })
                }
            }
        }
        handleStartKeyUp(t) {
            this.jqDocument.off("keyup"),
            this.typingKeyboard.keyUp(this.method.codeToKeyInfo(t.keyCode, !1, 0))
        }
        dispatchEvent(t, i) {
            this.jqWindow.trigger(t, [i])
        }
    }
    h.INIT_COMPLETE = "event.typingview.init.complete",
    h.COUNTDOWN = "event.typingview.countdown",
    h.UPDATE_LIMIT = "event.typingview.limit.update",
    h.SHOW_ANSWER = "event.typingview.show.answer",
    h.START = "event.typingview.start",
    h.FINISH = "event.typingview.finish",
    h.INTERRUPT = "event.typingview.interrupt",
    h.SET = "event.typingview.question.set",
    h.KEYDOWN = "event.typingview.question.keydown",
    h.SHOW_RESULT = "event.typingview.show.result",
    t.TypingController = h
}(Typing || (Typing = {})),
function(t) {
    let i;
    class e {
        constructor(t, e) {
            this.jqWindow = jQuery(window),
            this.jqMetaData = jQuery("meta"),
            this.jqDocument = jQuery(window.document),
            this.jqApplication = jQuery("#application"),
            this.jqDialogs = jQuery("#dialogs"),
            this.jqNavButtons = jQuery("#actionBar button"),
            this.jqViewButtons = jQuery("#views button"),
            this.jqRadios = jQuery('#views input[type="radio"]'),
            this.jqSettingButton = jQuery("#goSettingButton"),
            this.jqHelpButton = jQuery("#goHelpButton"),
            this.jqGoHomeButton = jQuery(".goHomeButton"),
            this.jqTypingStartButton = jQuery(".typingButton"),
            this.jqRetryButton = jQuery("#resultView .retryButton"),
            this.jqPrintReadyButton = jQuery("#resultView .printReadyButton"),
            this.jqBannerButton = jQuery("#banners a"),
            this.jqExitButton = jQuery("#exitButton"),
            this.jqExitOkButton = jQuery("#exitDialog .okButton"),
            this.jqExitCancelButton = jQuery("#exitDialog .cancelButton"),
            this.jqInterruptOkButton = jQuery("#interruptDialog .okButton"),
            this.jqInterruptCancelButton = jQuery("#interruptDialog .cancelButton"),
            this.jqPrintOkButton = jQuery("#printDialog .printButton"),
            this.jqPrintCancelButton = jQuery("#printDialog .cancelButton"),
            this.DEFAULT_INPUT_MODE = "eiji",
            this.jqInputModeComponent = jQuery("#settingInputMode"),
            this.hasInputModeComponent = !!this.jqInputModeComponent.get(0),
            this.DEFAULT_TIME_PROGRESS = 5,
            this.jqProgressComponent = jQuery("#timeLimitProgress"),
            this.jqProgressButton = jQuery("#timeLimitButton"),
            this.jqProgressLabel = jQuery("#timeLimitValue"),
            this.hasProgressComponent = !!this.jqProgressComponent.get(0),
            this.progressValue = this.DEFAULT_TIME_PROGRESS,
            this.progressRange = this.jqProgressComponent.hasClass("short") ? 70 : 100,
            this.DEFAULT_ANSWER_VISIBLE = !0,
            this.jqAnswerVisibleComponent = jQuery("#settingAnswerVisible"),
            this.hasAnswerVisibleComponent = !!this.jqAnswerVisibleComponent.get(0),
            this.jqRemainingTime = jQuery("#remainingTime"),
            this.jqRemainingProgress = jQuery("#remainingTimeProgressCurrent"),
            this.jqRemainingMinutes = jQuery("#remainingTimeMinutes"),
            this.jqRemainingSeconds = jQuery("#remainingTimeSeconds"),
            this.hasRemainingTime = !!this.jqRemainingTime.get(0),
            this.remainingTime = 60,
            this.remainingTimeToSet = 300,
            this.remainingTimer = -1,
            this.jqCountDownMessage = jQuery("#countDownMessage .countdown"),
            this.hasCountDownMessage = !!this.jqCountDownMessage.get(0),
            this.jqQuestion = jQuery("#question"),
            this.jqQuestionText1 = jQuery("#questionText1"),
            this.jqQuestionText2 = jQuery("#questionText2"),
            this.jqQuestionText3 = jQuery("#questionText3"),
            this.jqAnswerText1 = jQuery("#answerText1"),
            this.jqAnswerText2 = jQuery("#answerText2"),
            this.hasQuestionText1 = !!this.jqQuestionText1.get(0),
            this.hasQuestionText2 = !!this.jqQuestionText2.get(0),
            this.hasQuestionText3 = !!this.jqQuestionText3.get(0),
            this.hasAnswerText1 = !!this.jqAnswerText1.get(0),
            this.hasAnswerText2 = !!this.jqAnswerText2.get(0),
            this.jqTypingCharRemaining2 = jQuery("#remaining2"),
            this.jqTypingCharInputted2 = jQuery("#inputted2"),
            this.jqTypingCharRemaining3 = jQuery("#remaining3"),
            this.jqTypingCharInputted3 = jQuery("#inputted3"),
            this.jqTypingCharRemaining = jQuery("#remaining"),
            this.jqTypingCharInputted = jQuery("#inputted"),
            this.jqAnimeBlinkSpaceKey = null,
            this.INPUT_COUNT_BASIS_JA = 750,
            this.INPUT_COUNT_BASIS_EN = 1275,
            this.jqInputCount = jQuery("#inputtedWordsCount"),
            this.jqInputBalloon = jQuery("#inputtedWordsBalloon").children().first(),
            this.hasInputCount = !!this.jqInputCount.get(10),
            this.hasInputBalloon = !!this.jqInputBalloon.get(0),
            this.inputCountValue = 100,
            this.inputCountBasis = this.INPUT_COUNT_BASIS_EN,
            this.inputCountGrade = 5,
            this.jqFingers = jQuery("#fingers"),
            this.hasFingers = !!this.jqFingers.get(0),
            this.jqCharacter = jQuery("#typingView .characterNavigation").children().first(),
            this.hasCharacter = !!this.jqCharacter.get(0),
            this.characterState = 1,
            this.jqCheeringMessage = jQuery("#cheeringMessage").children().first(),
            this.hasCheeringMessage = !!this.jqCheeringMessage.get(0),
            this.cheeringState = 1,
            this.jqUserNameInput = jQuery("#username"),
            this.jqResultScore = jQuery("#resultView_result"),
            this.jqResultJudge = jQuery("#resultView_judge"),
            this.jqPrintUserName = jQuery("#printUserName"),
            this.jqPrintDate = jQuery("#printDate"),
            this.jqPrintScore = jQuery("#printScore"),
            this.jqPrintPkenCategory = jQuery("#printPkenCategory"),
            this.jqPrintMark = jQuery("#printMark"),
            this.jqViews = jQuery("#views"),
            this.jqHelpView = jQuery("#helpView"),
            this.jqHelpWrapper = jQuery("#helpWrapper"),
            this.isHelpView = !1,
            this.bind = jQuery.proxy,
            this.countShowAnswer = 0,
            this.chkPkenCategory = !1,
            this.isProofRead = !1,
            this.questionNumber = 0,
            this.questionTotal = 0,
            this.totalScore = 10,
            this.correctCountRatio = 0,
            this.SRC_ANALYTICS_START = "https://manabi-gakushu.benesse.ne.jp/gakushu/typing/typingstart.html",
            this.SRC_ANALYTICS_END = "https://manabi-gakushu.benesse.ne.jp/gakushu/typing/typingend.html",
            this.appScale = 1,
            this.isAndroidReverse = !1,
            this.queries = this.getQueries(),
            i = this,
            this.checkParam("proofread", "1") && (this.isProofRead = !0),
            this.jqWindow.on("resize", ()=>{
                this.jqWindow.height() < 600 ? this.appScale = .8 : this.appScale = 1
            }
            ),
            this.jqWindow.height() < 600 ? this.appScale = .8 : this.appScale = 1,
            this.typingQuestionData = t,
            this.questionTotal = t.length || 0,
            this.initButton(),
            this.initSettingComponent(),
            this.setApplicationState("home"),
            $(window).on("orientationchange", function() {
                let t = i;
                t.isHelpView && (0 === window.orientation ? (t.jqViews.removeAttr("style"),
                t.jqViews.css("overflow-y", "none"),
                t.jqViews.css("align-items", "center")) : (t.jqViews.removeAttr("style"),
                t.jqViews.css("overflow-y", "auto"),
                t.jqViews.css("align-items", "flex-start")))
            })
        }
        setClass(t, i) {
            var e, s = t.length;
            if (i)
                for (e = 0; e < s; e++)
                    t.get(0).setAttribute("class", i);
            else
                for (e = 0; e < s; e++)
                    t.get(0).removeAttribute("class");
            return t
        }
        setMainButtonEnable(t) {
            this.jqNavButtons.prop("disabled", !t),
            this.jqViewButtons.prop("disabled", !t),
            this.jqRadios.prop("disabled", !t),
            this.jqBannerButton.prop("disabled", !t)
        }
        getQueries() {
            var t, i, e, s, n, h, r = {};
            for (e = 0,
            s = (t = (window.location.hash || "").slice(1).split("&")).length; e < s; e++)
                n = (i = (t[e] || "").split("="))[0] ? decodeURIComponent(i[0]) : void 0,
                h = i[1] ? decodeURIComponent(i[1]) : void 0,
                n && h && (r[n] = h);
            return r
        }
        checkParam(t, i) {
            return this.queries && this.queries.hasOwnProperty(t) && this.queries[t] === i
        }
        getMetaDataValue(t, i=null) {
            var e = "[" + t;
            return e += i ? '="' + i + '"]' : "]",
            this.jqMetaData.filter(e).attr("content")
        }
        getTypingParams() {
            return {
                shuffle: this.hasApplicationData("shuffle"),
                loop: this.hasApplicationData("loop"),
                smallBigLetter: this.hasApplicationData("sbl"),
                errCheck: this.hasApplicationData("chk-error"),
                typedCharacter: this.getApplicationData("typed")
            }
        }
        openMainWindow(t) {
            window.open(t)
        }
        closeApplicationWindow() {
            window.opener && Object.keys(window.opener).length > 0 ? window.opener !== window && (window.opener = window,
            window.close()) : location.href = "https://manabi.benesse.ne.jp/gakushu/typing/"
        }
        setAnalyticFrame(t) {
            this.hasApplicationData("offline") || (this.jqInlineFrame || (this.jqInlineFrame = jQuery('<iframe width="1" height="1"></iframe>'),
            jQuery("body").append(this.jqInlineFrame)),
            this.jqInlineFrame.attr("src", t))
        }
        printResult() {
            window.print()
        }
        shareOnTwitter() {
            var t = "https://twitter.com/intent/tweet?"
              , i = this.getMetaDataValue("property", "og:title") || ""
              , e = this.getMetaDataValue("property", "og:url") || ""
              , s = this.getMetaDataValue("property", "og:hashtags") || "";
            t += "text=",
            i && (t += "『" + i + "』で、"),
            t += "得点" + this.totalScore + "点、",
            t += "正タイプ率" + this.correctCountRatio + "％でした",
            e && (t += "&url=" + e),
            s && (t += "&hashtags=" + s),
            this.openMainWindow(encodeURI(t))
        }
        shareOnFacebook() {
            var t = this.getMetaDataValue("property", "og:title") || ""
              , i = "";
            t && (i += "『" + t + "』で、"),
            i += "得点" + this.totalScore + "点、",
            i += "正タイプ率" + this.correctCountRatio + "％でした",
            window.hasOwnProperty("FB") && window.FB.ui({
                method: "feed",
                name: this.getMetaDataValue("property", "og:site_name") || "",
                link: this.getMetaDataValue("property", "og:url") || "",
                caption: this.getMetaDataValue("property", "og:caption") || "",
                description: i
            }, function(t) {
                console
            })
        }
        setApplicationState(t) {
            t !== this.applicationState && (this.setClass(this.jqApplication, t),
            this.applicationState = t)
        }
        hasApplicationData(t) {
            return "1" === this.jqApplication.attr("data-" + t)
        }
        getApplicationData(t) {
            return this.jqApplication.attr("data-" + t)
        }
        setDialogState(t) {
            t !== this.dialogState && (this.setMainButtonEnable(!t),
            this.setClass(this.jqDialogs, t),
            this.dialogState = t)
        }
        initButton() {
            this.jqExitButton.on("click", ()=>{
                this.typingController && this.typingController.pause(),
                this.applicationState.indexOf("typing trying") > -1 ? this.setDialogState("interrupt") : this.setDialogState("exit")
            }
            ),
            this.jqSettingButton.on("click", ()=>{
                this.setApplicationState("setting")
            }
            ),
            this.jqHelpButton.on("click", ()=>{
                this.setApplicationState("help"),
                this.isHelpView = !0,
                this.jqApplication.height() < this.jqHelpWrapper.height() + 48 && (this.jqViews.removeAttr("style"),
                this.jqViews.css("overflow-y", "auto"),
                this.jqViews.css("align-items", "flex-start"))
            }
            ),
            this.jqGoHomeButton.on("click", ()=>{
                this.setApplicationState("home"),
                this.isHelpView && (this.jqViews.removeAttr("style"),
                this.isHelpView = !1)
            }
            ),
            this.jqTypingStartButton.on("click", ()=>{
                this.jqTypingStartButton.prop("disabled", !0),
                this.initTypingController(),
                this.typingController.init(),
                this.jqWindow.focus()
            }
            ),
            this.jqExitOkButton.on("click", ()=>{
                this.closeApplicationWindow()
            }
            ),
            this.jqExitCancelButton.on("click", ()=>{
                this.setDialogState(""),
                this.typingController && this.typingController.restart()
            }
            ),
            this.jqInterruptOkButton.on("click", ()=>{
                this.typingController.interrupt(),
                this.setDialogState("")
            }
            ),
            this.jqInterruptCancelButton.on("click", ()=>{
                this.typingController.restart(),
                this.setDialogState("")
            }
            ),
            this.jqRetryButton.on("click", ()=>{
                this.initUserName(),
                this.typingController.init(),
                this.jqWindow.focus()
            }
            ),
            this.jqPrintReadyButton.on("click", ()=>{
                this.setDialogState("print")
            }
            ),
            this.jqPrintOkButton.on("click", ()=>{
                var t = this.jqUserNameInput.val();
                t ? (this.jqPrintUserName.text("　" + t + " 様　"),
                this.printResult(),
                this.setDialogState("")) : alert("お名前を入力してください")
            }
            ),
            this.jqPrintCancelButton.on("click", ()=>{
                this.setDialogState("")
            }
            ),
            this.jqBannerButton.on("click", t=>{
                t.preventDefault(),
                this.openMainWindow(jQuery(t.currentTarget).attr("href"))
            }
            )
        }
        initSettingComponent() {
            var t = !1
              , i = !1
              , e = t=>{
                t = t < 1 ? 1 : t > 5 ? 5 : t,
                this.progressValue !== t && (this.jqProgressComponent.attr("data-progress", t.toString()),
                this.jqProgressLabel.text(t + "分"),
                this.progressValue = t)
            }
              , s = t=>{
                var i = t - this.jqProgressComponent.offset().left + 35;
                return Math.ceil(i / this.progressRange / this.appScale)
            }
              , n = i=>{
                t && (e(s(i.clientX)),
                this.jqProgressButton.focus(),
                t = !1)
            }
            ;
            e(this.DEFAULT_TIME_PROGRESS),
            this.jqProgressButton.on({
                focus: this.bind(()=>{
                    i = !0
                }
                , this),
                blur: this.bind(()=>{
                    i = !1
                }
                , this),
                keydown: this.bind(t=>{
                    if (i) {
                        var s = t.keyCode;
                        37 === s ? (t.preventDefault(),
                        this.progressValue > 1 && e(this.progressValue - 1)) : 39 === s && (t.preventDefault(),
                        this.progressValue < 5 && e(this.progressValue + 1))
                    }
                }
                , this)
            }),
            this.jqProgressComponent.on({
                mousedown: this.bind(i=>{
                    t = !0,
                    e(s(i.clientX))
                }
                , this),
                mousemove: this.bind(i=>{
                    t && e(s(i.clientX))
                }
                , this),
                mouseup: this.bind(n, this),
                mouseleave: this.bind(n, this)
            })
        }
        getInputModeValue() {
            return this.hasInputModeComponent ? this.jqInputModeComponent.find('input[name="inputMode"]:checked').val() : this.DEFAULT_INPUT_MODE
        }
        getTimeProgressValue() {
            return this.hasProgressComponent ? this.progressValue : this.DEFAULT_TIME_PROGRESS
        }
        getAnswerVisibleValue() {
            return this.hasAnswerVisibleComponent ? "false" !== this.jqAnswerVisibleComponent.find('input[name="answerVisible"]:checked').val() : this.DEFAULT_ANSWER_VISIBLE
        }
        setQuestionText(t) {
            this.hasQuestionText1 && this.jqQuestionText1.text(t.question1 ? t.question1 : ""),
            this.hasQuestionText2 && this.jqQuestionText2.text(t.question2 ? t.question2 : ""),
            this.hasQuestionText3 && this.jqQuestionText3.text(t.question3 ? t.question3 : ""),
            this.hasAnswerText1 && this.jqAnswerText1.text(t.typingchar ? t.typingchar : ""),
            this.hasAnswerText2 && this.jqAnswerText2.text(t.answer ? t.answer : "")
        }
        setRemainingTime(t, i, e) {
            this.hasRemainingTime && (this.jqRemainingMinutes.text(t.toString()),
            this.jqRemainingSeconds.text(i < 10 ? "0" + i.toString() : i.toString()),
            this.jqRemainingProgress.css("width", 100 * e + "%"),
            e > .2 ? this.jqRemainingProgress.removeClass("short shorter") : e > .1 ? this.jqRemainingProgress.removeClass("shorter").addClass("short") : this.jqRemainingProgress.removeClass("short").addClass("shorter"))
        }
        setInputValue(t, i, e, s, n, h) {
            this.jqTypingCharRemaining.text(i),
            this.jqTypingCharInputted.text(t),
            this.jqTypingCharRemaining2.text(s),
            this.jqTypingCharInputted2.text(e),
            this.jqTypingCharRemaining3.text(h),
            this.jqTypingCharInputted3.text(n)
        }
        setInputCount(t) {
            if (this.hasInputCount && this.jqInputCount.text(t.toString()),
            this.chkPkenCategory && this.hasInputBalloon) {
                var i = this.inputCountBasis;
                .5 * i <= t ? this.setInputBalloon(2) : .4 * i <= t ? this.setInputBalloon(3) : .3 * i <= t ? this.setInputBalloon(4) : this.setInputBalloon(5)
            }
        }
        setInputBalloon(t) {
            this.inputCountGrade !== t && (4 === t || 3 === t || 2 === t ? (this.jqInputBalloon.removeClass("grade3 grade4 grade2").addClass("grade" + t).css({
                width: "0px",
                opacity: 0
            }).animate({
                width: "200px",
                opacity: 1
            }, {
                duration: 300,
                easing: "swing"
            }),
            this.inputCountGrade = t) : (this.jqInputBalloon.removeClass("grade3 grade4 grade2"),
            this.inputCountGrade = 5))
        }
        setAnimeBlinkKey(t) {
            this.jqAnimeBlinkSpaceKey && (this.jqAnimeBlinkSpaceKey.removeClass("blink"),
            t ? this.jqAnimeBlinkSpaceKey.addClass("blink") : this.jqAnimeBlinkSpaceKey = null)
        }
        setFinger(t, i=!1) {
            this.hasFingers && this.setClass(this.jqFingers, t + (this.typingParam.smallBigLetter && i ? " shift" : ""))
        }
        setCharacter(t) {
            if (this.hasCharacter) {
                var i = 1;
                "good" == t ? i = 2 : "perfect" == t ? i = 3 : "failure" == t && (i = 4),
                this.characterState !== i && (this.jqCharacter.attr("data-pattern", i.toString()),
                this.characterState = i)
            }
        }
        setResult() {
            var t, i = this.jqResultScore.find(".score"), e = this.typingController.getResult(), s = t=>(1e3 * t + .5 | 0) / 1e3;
            if (this.hasApplicationData("pken-score"))
                (t = e.inputCharCount / this.inputCountBasis * 100 | 0) > 100 && (t = 100),
                this.setPkenCategory(t);
            else {
                t = (this.typingOption.showAnswer ? 10 : 15) * e.correctCount,
                t += -5 * e.mistakeCount,
                this.typingOption.showAnswer || (t += -50 * this.countShowAnswer)
            }
            var n = "英字";
            "roman" === this.typingOption.methodType && (n = "ローマ字");
            var h = this.typingOption.time + "分"
              , r = s(e.noMissAnswerCount / e.questionCount * 100).toString()
              , o = "(" + e.questionCount + " 問中 " + e.noMissAnswerCount + " 問正解)"
              , a = s(100 * e.correctCount / (e.mistakeCount + e.correctCount))
              , u = s(100 - a);
            this.totalScore = t,
            this.correctCountRatio = a,
            i.eq(0).text(t.toString()),
            i.eq(1).text(n + " / " + h),
            i.eq(2).text(e.inputCharCount.toString()),
            i.eq(3).text(r),
            i.eq(4).text(o),
            i.eq(5).text(e.correctCount.toString()),
            i.eq(6).text(e.mistakeCount.toString()),
            i.eq(7).text(a.toString()),
            i.eq(8).text(u.toString()),
            this.jqPrintScore.children().remove(),
            this.jqPrintScore.append(this.jqResultScore.children().clone(!0))
        }
        setPkenCategory(t) {
            if (this.chkPkenCategory) {
                var i = null;
                t >= 50 ? i = "準２級" : t >= 40 ? i = "３級" : t >= 30 && (i = "４級"),
                i ? (this.jqResultJudge.find("span").text(i),
                this.jqResultJudge.css("visibility", "visible"),
                this.jqPrintPkenCategory.find("span").text(i),
                this.jqPrintPkenCategory.css("display", "block"),
                this.jqPrintMark.removeClass().addClass("overLevel4")) : (this.jqResultJudge.css("visibility", "hidden"),
                this.jqPrintPkenCategory.css("display", "none"),
                this.jqPrintMark.removeClass().addClass("underLevel4"))
            }
        }
        setPlayTime() {
            var t = new Date
              , i = t.getFullYear()
              , e = t.getMonth() + 1
              , s = t.getDate()
              , n = t.getHours()
              , h = t.getMinutes();
            this.jqPrintDate.text(i + " 年 " + e + " 月 " + s + " 日 " + n + " 時 " + h + " 分")
        }
        initUserName() {
            this.jqUserNameInput.val(""),
            this.jqPrintUserName.text("")
        }
        setUserName() {
            var t = this.jqUserNameInput.val();
            t || (t = "ゲストユーザ－"),
            this.jqPrintUserName.text(t + " 様")
        }
        initProofRead() {
            jQuery("#remainingTimeLabel").remove(),
            jQuery("#remainingTimeProgress").remove(),
            jQuery("#remainingTimeMinutes").remove(),
            jQuery("#remainingTimeMinutesLabel").remove(),
            jQuery("#remainingTimeSecondsLabel").remove()
        }
        setQuestionNumber() {
            this.isProofRead && this.jqRemainingSeconds.text(this.questionNumber + " / " + this.questionTotal)
        }
        initTypingController() {
            this.typingController && (this.typingController = null),
            this.typingOption = {
                methodType: this.getInputModeValue(),
                time: this.getTimeProgressValue(),
                showAnswer: this.getAnswerVisibleValue()
            },
            "eiji" !== this.typingOption.methodType && (this.inputCountBasis = this.INPUT_COUNT_BASIS_JA),
            this.typingParam = this.getTypingParams(),
            this.isProofRead && (this.typingOption.showAnswer = !0,
            this.typingParam.shuffle = !1,
            this.typingParam.loop = !1,
            this.typingParam.errCheck = !0,
            this.initProofRead()),
            this.typingController = new t.TypingController(this.typingQuestionData,this.typingOption,this.typingParam,this.isProofRead),
            this.hasApplicationData("pken-score") && 5 === this.typingOption.time ? this.chkPkenCategory = !0 : (this.chkPkenCategory = !1,
            this.jqApplication.attr("data-pken-judge", "0")),
            this.jqWindow.on(t.TypingController.INIT_COMPLETE, this.bind(this.typingInitComplete, this)),
            this.jqWindow.on(t.TypingController.COUNTDOWN, this.bind(this.typingCountDown, this)),
            this.jqWindow.on(t.TypingController.START, this.bind(this.typingStart, this)),
            this.jqWindow.on(t.TypingController.UPDATE_LIMIT, this.bind(this.typingLimitUpdate, this)),
            this.jqWindow.on(t.TypingController.SHOW_ANSWER, this.bind(this.typingShowAnswer, this)),
            this.jqWindow.on(t.TypingController.SET, this.bind(this.typingQuestionSet, this)),
            this.jqWindow.on(t.TypingController.KEYDOWN, this.bind(this.typingQuestionKeyDown, this)),
            this.jqWindow.on(t.TypingController.SHOW_RESULT, this.bind(this.typingShowResult, this)),
            this.jqWindow.on(t.TypingController.FINISH, this.bind(this.typingFinish, this))
        }
        typingInitComplete(t, i) {
            this.jqExitButton.prop("disabled", !1),
            this.typingController.setNextKeyHighLight(!0),
            this.questionNumber = 0,
            this.setQuestionNumber(),
            this.setInputCount(10),
            this.setInputBalloon(0),
            this.setCharacter("");
            var e = i.next
              , s = "";
            e && e[0] && (s = e.parent().attr("class").slice(5)),
            this.setFinger(s, i.shifted),
            this.countShowAnswer = 0,
            this.setAnalyticFrame(this.SRC_ANALYTICS_START),
            this.setApplicationState("typing ready"),
            this.jqAnimeBlinkSpaceKey = e,
            this.setAnimeBlinkKey(!0)
        }
        typingCountDown(t, i) {
            var e = i.count;
            this.setFinger(""),
            this.jqExitButton.prop("disabled", !0),
            this.typingController.setNextKeyHighLight(!1),
            this.hasCountDownMessage && this.jqCountDownMessage.removeClass("count3 count2 count1").addClass("count" + e),
            this.setApplicationState("typing countdown"),
            this.setAnimeBlinkKey(!1)
        }
        typingStart(t) {
            this.setApplicationState("typing start")
        }
        typingLimitUpdate(t, i) {
            this.setRemainingTime(i.minute, i.second, i.progress)
        }
        typingQuestionSet(t, i) {
            this.jqExitButton.prop("disabled", !1),
            this.questionNumber++,
            this.setQuestionNumber();
            var e = i.next
              , s = "";
            e && e[0] && (s = e.parent().attr("class").slice(5)),
            this.setFinger(s, i.shifted),
            this.setInputValue(i.inputted, i.remaining, i.inputted2, i.remaining2, i.inputted3, i.remaining3),
            this.setInputCount(i.inputCountTotal),
            this.typingOption.showAnswer ? (this.typingController.setNextKeyHighLight(!0),
            this.jqQuestion.addClass("show")) : (this.typingController.setNextKeyHighLight(!1),
            this.jqQuestion.removeClass("show")),
            this.option && this.option.onShowQuestion && this.option.onShowQuestion(i.questionData),
            this.setQuestionText(i.questionData),
            this.setApplicationState("typing trying")
        }
        typingQuestionKeyDown(i, e) {
            var s = e.next
              , n = "";
            s && s[0] && (n = s.parent().attr("class").slice(5)),
            this.setInputValue(e.inputted, e.remaining, e.inputted2, e.remaining2, e.inputted3, e.remaining3),
            this.setInputCount(e.inputCountTotal),
            this.perfectTimer && (this.perfectTimer.stop(),
            this.perfectTimer = null),
            e.isCorrect ? e.hasNext ? (this.setFinger(n, e.shifted),
            this.setCharacter("good")) : e.isNoMiss ? (this.setCharacter("perfect"),
            this.perfectTimer = new t.Timer,
            this.perfectTimer.delay(()=>{
                this.setCharacter("")
            }
            , 1e3)) : (this.setCharacter("good"),
            this.perfectTimer = new t.Timer,
            this.perfectTimer.delay(()=>{
                this.setCharacter("")
            }
            , 200)) : this.setCharacter("failure")
        }
        typingShowAnswer(t, i) {
            this.typingOption.showAnswer || (this.countShowAnswer++,
            this.typingController.setNextKeyHighLight(!0),
            this.jqQuestion.addClass("show"))
        }
        typingFinish(t, i) {
            this.jqExitButton.prop("disabled", !0),
            this.setFinger(""),
            this.perfectTimer && (this.perfectTimer.stop(),
            this.perfectTimer = null),
            this.setCharacter(""),
            this.setApplicationState("typing end")
        }
        typingShowResult(t, i) {
            this.jqExitButton.prop("disabled", !1),
            this.initUserName(),
            this.setPlayTime(),
            this.setResult(),
            this.setAnalyticFrame(this.SRC_ANALYTICS_END),
            this.setApplicationState("result")
        }
    }
    t.TypingContents = e,
    t.initialize = function(t) {
        new e(t,null)
    }
}(Typing || (Typing = {}));
