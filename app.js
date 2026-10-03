// app.js
// Extracted from index.html's inline <script> blocks so both this file and
// pixel-arts.js can be loaded with <script defer>, letting the browser parse
// (and paint) the rest of the document -- including the #__loadcats boot
// screen -- without blocking on script fetch/exec. Execution order relative
// to pixel-arts.js is preserved because defer scripts run in document order.

// ---------- language detection ----------
// Bump this string every time index.html is updated — shown in Settings so it's
// easy to confirm which build is actually live (helps catch stale-deploy/cache issues).
const APP_VERSION = 'v37-2026-10-04';

// 広告審査が通っていないため、暫定的に「広告なし版」表記を「開発者を応援」表記に
// 差し替えている。購入導線(fbUpgradeToPaid/Stripe決済)自体は変更なし、表示文言のみ切替。
// 広告審査が通ったら false -> true に戻すだけで元の「広告なし版」表記に戻る。
const ADS_APPROVED = false;

const LANG = (function(){
  const langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
  return langs.some(l => String(l).toLowerCase().startsWith('ja')) ? 'ja' : 'en';
})();
document.documentElement.lang = LANG;

// ---------- i18n dictionary ----------
const I18N = {
  ja: {
    unfinishedBanner: '終了されていない記録があります',
    endNow: '今すぐ終了にする',
    noGoalSet: '目標未設定',
    hoursSuffix: '時間',
    minutesSuffix: '分',
    noActiveTasks: '有効なタスクがありません。<br>「Tasks」タブから追加、またはアーカイブを解除してください。',
    noActiveTasksShort: '有効なタスクがありません',
    statusWorking: '作業中', statusPaused: '中断中', statusNone: '未開始',
    start: 'はじめる', pauseBtn: '少し休む', resumeBtn: 'また進める', endBtn: 'おつかれ',
    inProgress: '（進行中）',
        editTime: '✎ 時間を編集', duplicate: '⧉ 複製',
    addMemo: '📝 メモを追加', editMemo: '📝 メモを編集', memoTitle: 'メモ', memoPlaceholder: '感想やメモを入力…',
    entriesCount: n => `${n}件`,
    deleteBtn: '削除',
    todaysBreakdown: '今日やったこと',
    tasksIntro: '曜日ごとのタスクと目標時間を登録します',
    addBtn: '＋ 追加',
    everyDay: '毎日',
    goalLabel: '目標時間',
    archiveTitle: 'アーカイブする', restoreTitle: '復元する',
    archivedCount: n => `アーカイブ済み（${n}）`,
    noArchivedTasks: 'アーカイブ済みのタスクはありません',
    enterNameAlert: '名称を入力してください',
    deleteTaskConfirm: 'このタスクを削除しますか？',
    editTaskTitle: 'タスクを編集', addTaskTitle: 'タスクを追加',
    nameLabel: '名称', namePlaceholder: '例：ランニング、英単語学習',
    daysLabel: '曜日（未設定なら毎日）',
    targetHoursLabel: '目標時間（1回あたり）',
    colorLabel: '色',
    cancel: 'キャンセル', save: '保存',
    editElapsedTitle: '経過時間を編集',
    noSegments: '区間がありません（保存するとこの記録は削除されます）',
    addSegment: '＋ 区間を追加',
    endBeforeStartAlert: (s,e) => `終了時刻は開始時刻より後にしてください（${s}〜${e}）`,
    addTaskFirstAlert: '先にTasksタブからタスクを登録してください',
    addRecordTitle: '日付を指定して記録を追加',
    dateLabel: '日付', taskLabel: 'タスク', archivedSuffix: '（アーカイブ）',
    segmentsLabel: '区間', addAction: '追加する',
    selectTaskAlert: 'タスクを選択してください',
    enterDateAlert: '日付を入力してください',
    atLeastOneSegmentAlert: '区間を1つ以上入力してください',
    duplicateRecordTitle: '記録を複製',
    duplicateTargetLabel: '複製先の日付',
    duplicateNote: '同じタスク・時間帯でその日にコピーします',
    duplicateAction: '複製する',
    carryoverBtn: '超過分を他の日へ振り分け',
    carryoverBtnShort: '振り分ける',
    carryoverOverLabel: '超過時間',
    carryoverAllMoved: '振り分け済み',
    carryoverTitle: '超過分を他の日へ振り分け',
    carryoverSurplus: (total, left) => `目標超過 ${total}（振り分け可能 ${left}）`,
    carryoverReceived: m => `振替で目標 -${m}`,
    carryoverAchieved: '✓ 達成',
    carryoverDateLabel: '振り分け先の日',
    carryoverMinLabel: '振り分ける時間',
    carryoverHourUnit: '時間',
    carryoverMinUnit: '分',
    carryoverDone: '完了',
    carryoverNoTarget: '振り分けできる日がありません（このタスクの曜日が対象です）',
    carryoverRemain: r => `残り目標 ${r}`,
    carryoverAdd: '振り分け',
    carryoverListTitle: '振り分け先',
    carryoverCancel: '取消',
    carryoverNote: '振り分けた分だけ、選んだ日の目標が減ります。残りはそのままでも大丈夫です。「完了」で保存されます',
    carryoverInvalid: max => `振り分ける時間は ${max} 以内で入力してください`,
    carryoverGoalMet: '目標達成済み',
    close: '閉じる',
    selectDateAlert: '日付を選択してください',
    addPomodoroTemplateTitle: '集中タイマーテンプレートを追加',
    pomodoroNamePlaceholder: '例：夜集中モード',
    focusMinutes: '集中（分）', breakMinutes: '休憩（分）',
    enterTemplateNameAlert: 'テンプレート名を入力してください',
    enterFocusBreakAlert: '集中時間と休憩時間を入力してください',
    deleteTemplateConfirm: 'このテンプレートを削除しますか？',
    focusTimer: '集中タイマー',
    phaseWork: '集中', phaseBreak: '休憩', phaseLongBreak: 'ロング休憩',
    templateLabel: 'テンプレート',
    templateOption: (w,b) => `（集中${w}分/休憩${b}分）`,
    focusTimerHint: '「はじめる」を押してタイマーをスイッチをONにするか<div>SettingsでONにしておくと自動的に開始されます</div>',
    purchaseThanks: '購入ありがとうございます！',
    settingsIntro: 'アプリの見た目や機能を項目別に調整します',
    appearancePixelArt: 'ピクセルアート',
        morePixelArtSoon: 'あなたのがんばりでピクセルアートが増えます<br>猫のピクセル素材参考：kohacu (https://kohacu.com/)',
    pixelArtRowCat: 'ねこ',
    pixelArtRowOutfit: 'おめかし',
    pixelArtRowFood: 'ごはん',
    pixelArtRowLegendary: '伝説のねこ',
    outfitNoneOption: 'なし',
    foodNoneOption: 'いつもの',
    countSuffix: n => `（${n}）`,
    giftProgressCountdown: d => `プレゼントまであと${d}日`,
    legendaryCountdown: d => `1カ月達成まであと${d}日`,
    rewardUnlockedToast: name => `🎁「${name}」を手に入れました！`,
    legendaryUnlockedBanner: '🌟 シークレットが解禁されたよ',
    legendaryRevealedToast: '🌟 伝説のねこが仲間になったよ！',
    secretCatLockedToast: '30日達成で登場するよ',
    giftReadyBanner: 'プレゼントがあるよ',
    giftReadyCta: 'Settingsへ',
    giftChoicePrompt: 'おめかし・ごはん、どれのピクセルを解禁する？',
    // n はrewards.pendingChoicesそのもの(今から選ぶ1回を含めた残り総数)。
    // 以前は「ほかにn回、選べます」(pendingChoices-1、今回を除いた残り)だったが、
    // 「今から選ぶのも含めて残り何回か」の方がわかりやすいというフィードバックを
    // 受けて、2026-08-18に総数表示に変更した。
    giftPendingCount: n => `プレゼントはあと${n}個あるよ`,
    appearanceBarStyle: '進捗バーのスタイル',
    barStyleNames: {normal:'あるくねこ', stretch:'のびるねこ'},
    appearanceTheme: 'カラーテーマ',
    autoEnableNote: 'スイッチON：タスク開始時に自動で集中タイマーを開始します',
    templateDetail: (w,b,every,lb) => `集中${w}分 ／ 休憩${b}分${every>0?` ／ ${every}回ごとにロング休憩${lb}分`:''}`,
    addTemplate: '＋ テンプレートを追加',
    dataSection: 'データ',
    exportBtn: '書き出す', importBtn: '読み込む',
    backupSection: 'バックアップ',
    backupSectionDesc: 'ログインまたはデータを書き出してバックアップします',
    backupMethod1Title: 'ログインしてデータを引き継ぐ',
    backupMethod2Title: '手動でバックアップ',
    backupManualNote: 'ログインなしでローカルにデータを手動で保存します',
    importConfirm: '現在のデータを上書きしてバックアップを読み込みますか？',
    importSuccess: 'バックアップを読み込みました!',
    importFail: 'ファイルの読み込みに失敗しました。正しいバックアップファイルか確認してください。',
    resetSection: 'データの初期化',
    resetSectionDesc: 'すべてのデータが削除されます この操作は取り消せません',
    resetAllBtn: '出荷時に戻す',
    resetAllConfirm: '本当にすべてのデータを削除しますか？この操作は取り消せません。',
    addToHomeScreen: 'ホーム画面に追加',
    installNote: '追加するとホーム画面から起動でき、オフラインでも利用できます',
    iphoneCase: 'iPhone（Safari）の場合',
    iphoneStep1: 'Safariでこのページを開く',
    iphoneStep2: '下部の共有ボタン（□に↑）をタップ',
    iphoneStep3: '「ホーム画面に追加」を選択',
    iphoneStep4: '右上の「追加」をタップ',
    iphoneHomeScreenLoginNote: 'ホーム画面から開くと、Googleログインがうまく完了しないことがあります。\nログイン・データ同期・有料版の購入は、Safari版にてご利用ください。\nホーム画面よりご使用の際には、機種変更やアプリ削除の前は「書き出す」で手動バックアップを取ることをおすすめします。',
    androidCase: 'Android／その他（Chromeなど）の場合',
    androidStep1: 'Chromeなどでこのページを開く',
    androidStep2: '右上のメニュー（⋮）をタップ',
    androidStep3: '「ホーム画面に追加」または「アプリをインストール」を選択',
    androidStep4: '画面の指示に従って追加',
    addRecordTodayShort: '＋ 今日にタスクを追加',
    addRecordDateShort: mmdd => `＋ ${mmdd}にタスクを追加`,
    totalTime: '今月の合計時間', unmetTime: '未達成時間',
    achievementByTask: 'タスクごとの達成率',
    actualGoal: (a,goalStr) => `実績 ${a}${goalStr}`,
    goalPart: g => ` / 目標 ${g}`,
    unmetPercent: n => `未達成 ${n}%`,
    thDate: '日付', thTask: 'タスク', thDuration: '所要時間', thRate: '達成率',
    noRecordsThisMonth: 'この月の記録はありません',
    calendarTitle: 'カレンダー（記録した時間）',
    monthAchievement: '今月の達成率',
    giftGaugeLabel: 'つぎのプレゼントまで',
    collectedSoFar: 'これまで集めた数',
    collectedSummary: (stars,gifts) => `⭐×${stars} 🎁×${gifts}`,
    dayAchievement: '選択日の達成率',
    todayAchievement: '今日の達成率',
    dateAchievement: mmdd => `${mmdd}の達成率`,
    noDateSelected: 'カレンダーで日付を選択してください',
    noRecordsThisDay: 'この日の記録はありません',
    deleteRecordConfirm: (date,name) => `${date} の記録（${name}）を削除しますか？`,
    themeNames: {original:'オリジナル', mono:'モノクロ', dark:'ダークモード'},
    pixelArtNames: {blueCat:'水色ねこ', brownCat:'茶トラねこ'},
    weekdaysShort: ["日","月","火","水","木","金","土"],
    hm: (h,m) => h>0 ? `${h}時間${m}分` : `${m}分`,
    tplStandard: 'スタンダード', tplDeep: 'じっくり集中', tplShort: 'ショート',
    parenWrap: name => name ? `（${name}）` : '',
    appTitleSection: 'アプリのタイトル',
    appTitlePlaceholder: '例：My、ワタシの、〇〇\'s',
    appTitleHint: '「入力した文字 ＋ TIMECAT」が画面左上に表示されます',
    aboutSection: 'アプリについて',
    appConcept: 'MyTIMECATは、日々の作業や習慣を記録するための、あなた専用の打刻システムです。', 
    howToTitle: 'アプリの使い方',
    howToPages: [
      {name:'Timecard', desc:'今日のタスクを選んで時間を計測するページです。「はじめる」で計測開始、「少し休む／また進める」で一時停止・再開、「おつかれ」で終了します。'},
      {name:'Tasks', desc:'記録したいタスク（学習・運動など）と、曜日・目標時間を登録するページです。'},
      {name:'Summary', desc:'月ごとの合計時間・達成率をグラフやカレンダーで確認できるページです。目標より多くできた日は、超過分を他の日へ振り替えられます。'},
      {name:'Settings', desc:'アプリの見た目や機能を調整するページです（このページです）。'}
    ],
    howToIconsTitle: 'アイコンの意味',
    howToIcons: [
      { art: 'edit', label: '編集' }, { art: 'duplicate', label: '複製' }, { art: 'trash', label: '削除' },
      { art: 'archive', label: 'アーカイブ（一時的に非表示にする）' }, { art: 'undo', label: '復元' },
      { art: 'focustimer', label: '集中タイマーの回数' }, { art: 'memo', label: '完了したタスクにメモを残せます' }
    ],
    syncSignedInAnon: '端末内に保存中（未ログイン）',
    syncSignedInGoogle: name => `Googleアカウントで同期中：${name}`,
    syncSignInGoogleBtn: 'Googleでログインして同期',
    syncSignInEmailBtn: 'メールアドレスでログイン',
    popupHint: 'ブラウザ設定で「ポップアップを許可」にしてください',
    emailSendBtn: 'ログインリンクを送信',
    emailSentMessage: (email)=>`${email} 宛にログインリンクを送信しました。メールを確認してリンクをタップしてください。`,
    emailInvalidAlert: '正しいメールアドレスを入力してください',
    emailLinkConfirmPrompt: '確認のため、リンクをリクエストしたメールアドレスを入力してください',
    emailLinkSignInSuccess: 'ログインしました！',
    syncSignOutBtn: 'ログアウト',
    syncConnecting: '接続中…',
    syncNote: 'ログインすると複数の端末でデータを共有できます',
    syncErrorAlert: 'ログインに失敗しました。もう一度お試しください。',
    planFreeLabel: '無料版（広告あり）',
    planPaidLabel: '✓ 広告なし版をご利用中です',
    planUpgradeNote: '¥500の買い切りで広告を非表示にできます',
    planUpgradeBtn: '広告なし版にアップグレード',
    // 広告審査が通るまでの暫定表記（ADS_APPROVED=falseの間だけ使用）
    planSupportFreeLabel: '無料版',
    planSupportPaidLabel: '✓ 応援ありがとうございます！',
    planSupportNote: '¥500で開発者を応援できます',
    planSupportBtn: '開発者を応援',
    planUpgradeLoading: '処理中…',
    planUpgradeError: '決済ページを開けませんでした。もう一度お試しください。',
    planUpgradeLoginRequired: '購入には Google ログインが必要です。今ログインしますか？（ホーム画面のアイコンから開いている場合は、Safariなどの通常のブラウザで開いてからログインしてください）',
    backupReminderNever: '未ログイン状態です。機種変更やアプリ削除の前に「書き出す」でバックアップを取ってください。',
    backupReminderStale: '最後のバックアップから{days}日経ちました。念のため「書き出す」でバックアップを取っておきましょう。',
    backupReminderDismiss: '後で',
  },
  en: {
    unfinishedBanner: 'You have unfinished records',
    endNow: 'End now',
    noGoalSet: 'No goal set',
    hoursSuffix: 'h',
    minutesSuffix: 'm',
    noActiveTasks: 'No active tasks.<br>Add one from the "Tasks" tab, or unarchive an existing task.',
    noActiveTasksShort: 'No active tasks',
    statusWorking: 'Working', statusPaused: 'Paused', statusNone: 'Not started',
    start: 'Start', pauseBtn: 'Take a break', resumeBtn: 'Resume', endBtn: 'Finish',
    inProgress: ' (in progress)',
    editTime: '✎ Edit time', duplicate: '⧉ Duplicate',
    addMemo: '📝 Add memo', editMemo: '📝 Edit memo', memoTitle: 'Memo', memoPlaceholder: 'Write a note…',
    entriesCount: n => `${n} ${n===1?'entry':'entries'}`,
    deleteBtn: 'Delete',
    todaysBreakdown: "Today's breakdown",
    tasksIntro: 'Set up tasks and target hours for each day of the week',
    addBtn: '＋ Add',
    everyDay: 'Every day',
    goalLabel: 'Goal',
    archiveTitle: 'Archive', restoreTitle: 'Restore',
    archivedCount: n => `Archived (${n})`,
    noArchivedTasks: 'No archived tasks',
    enterNameAlert: 'Please enter a name',
    deleteTaskConfirm: 'Delete this task?',
    editTaskTitle: 'Edit task', addTaskTitle: 'Add task',
    nameLabel: 'Name', namePlaceholder: 'e.g. Running, Vocabulary study',
    daysLabel: 'Days (leave unset for every day)',
    targetHoursLabel: 'Target time (per session)',
    colorLabel: 'Color',
    cancel: 'Cancel', save: 'Save',
    editElapsedTitle: 'Edit time',
    noSegments: 'No time ranges (saving will delete this record)',
    addSegment: '＋ Add range',
    endBeforeStartAlert: (s,e) => `End time must be after start time (${s}–${e})`,
    addTaskFirstAlert: 'Please add a task from the Tasks tab first',
    addRecordTitle: 'Add record for a date',
    dateLabel: 'Date', taskLabel: 'Task', archivedSuffix: ' (archived)',
    segmentsLabel: 'Time ranges', addAction: 'Add',
    selectTaskAlert: 'Please select a task',
    enterDateAlert: 'Please enter a date',
    atLeastOneSegmentAlert: 'Please enter at least one time range',
    duplicateRecordTitle: 'Duplicate record',
    duplicateTargetLabel: 'Target date',
    duplicateNote: 'Copies the same task and time range to that day',
    duplicateAction: 'Duplicate',
    carryoverBtn: 'Move extra time to other days',
    carryoverBtnShort: 'Move',
    carryoverOverLabel: 'Extra',
    carryoverAllMoved: 'All moved',
    carryoverTitle: 'Move extra time to other days',
    carryoverSurplus: (total, left) => `Over goal by ${total} (${left} available)`,
    carryoverReceived: m => `Goal reduced by ${m} (carried over)`,
    carryoverAchieved: '✓ Achieved',
    carryoverDateLabel: 'Move to',
    carryoverMinLabel: 'Time to move',
    carryoverHourUnit: 'h',
    carryoverMinUnit: 'min',
    carryoverDone: 'Done',
    carryoverNoTarget: 'No days to move to (only this task\'s scheduled days)',
    carryoverRemain: r => `${r} left`,
    carryoverAdd: 'Move',
    carryoverListTitle: 'Already moved from this day',
    carryoverCancel: 'Undo',
    carryoverNote: 'The goal on the chosen day is reduced by the amount you move. You don\'t have to move all of it. Tap Done to save',
    carryoverInvalid: max => `Please enter up to ${max}`,
    carryoverGoalMet: 'goal met',
    close: 'Close',
    selectDateAlert: 'Please select a date',
    addPomodoroTemplateTitle: 'Add focus timer template',
    pomodoroNamePlaceholder: 'e.g. Night focus mode',
    focusMinutes: 'Focus (min)', breakMinutes: 'Break (min)',
    enterTemplateNameAlert: 'Please enter a template name',
    enterFocusBreakAlert: 'Please enter focus and break times',
    deleteTemplateConfirm: 'Delete this template?',
    focusTimer: 'Focus timer',
    phaseWork: 'Focus', phaseBreak: 'Break', phaseLongBreak: 'Long break',
    templateLabel: 'Template',
    templateOption: (w,b) => ` (Focus ${w}m / Break ${b}m)`,
    focusTimerHint: 'The timer becomes active once you press Start',
    purchaseThanks: 'Thanks for your purchase!',
    settingsIntro: "Adjust the app's look and features",
    appearancePixelArt: 'Pixel Art',
    morePixelArtSoon: 'Your effort unlocks more pixel art<br>Cat pixel art reference: kohacu (https://kohacu.com/)',
    pixelArtRowCat: 'Cats',
    pixelArtRowOutfit: 'Outfits',
    pixelArtRowFood: 'Food',
    pixelArtRowLegendary: 'Legendary Cat',
    outfitNoneOption: 'None',
    foodNoneOption: 'Usual',
    countSuffix: n => ` (${n})`,
    giftProgressCountdown: d => `${d} more successful day${d===1?'':'s'} until your next present`,
    legendaryCountdown: d => `${d} days left until you reach a full month`,
    rewardUnlockedToast: name => `🎁 You got "${name}"!`,
    legendaryUnlockedBanner: '🌟 The secret has been unlocked!',
    legendaryRevealedToast: '🌟 The Legendary Cat has joined you!',
    secretCatLockedToast: 'Reach a 30-day streak to reveal this',
    giftReadyBanner: 'You have a present waiting',
    giftReadyCta: 'Go to Settings',
    giftChoicePrompt: 'Choose a category to unlock: Outfits or Food?',
    // n is rewards.pendingChoices itself (total remaining, including the one
    // being chosen right now) -- see the ja string's comment for why this
    // switched from an "other than this one" count.
    giftPendingCount: n => `${n} gift${n===1?'':'s'} left to unlock`,
    appearanceBarStyle: 'Progress Bar Style',
    barStyleNames: {normal:'Walking cat', stretch:'Growing cat'},
    appearanceTheme: 'Color Theme',
    autoEnableNote: 'When ON: automatically start the focus timer when a task begins',
    templateDetail: (w,b,every,lb) => `Focus ${w}m / Break ${b}m${every>0?` / long break ${lb}m every ${every}`:''}`,
    addTemplate: '＋ Add template',
    dataSection: 'Data',
    exportBtn: 'Export', importBtn: 'Import',
    backupSection: 'Backup',
    backupSectionDesc: 'Back up by signing in, or by exporting your data.',
    backupMethod1Title: 'Sign in to carry over your data',
    backupMethod2Title: 'Manual backup',
    backupManualNote: 'Export or import a file. Works reliably even where sign-in is unavailable.',
    importConfirm: 'This will overwrite your current data with the backup. Continue?',
    importSuccess: 'Backup loaded!',
    importFail: 'Failed to load the file. Please check that it is a valid backup file.',
    resetSection: 'Reset Data',
    resetSectionDesc: 'All data will be deleted. This action cannot be undone.',
    resetAllBtn: 'Restore to Factory Settings',
    resetAllConfirm: 'Are you sure you want to delete all data? This cannot be undone.',
    addToHomeScreen: 'Add to Home Screen',
    installNote: 'Once added, you can launch it directly from the icon and use it offline',
    iphoneCase: 'On iPhone (Safari)',
    iphoneStep1: 'Open this page in Safari',
    iphoneStep2: 'Tap the share button (square with ↑) at the bottom',
    iphoneStep3: 'Select "Add to Home Screen"',
    iphoneStep4: 'Tap "Add" in the top right',
    iphoneHomeScreenLoginNote: 'Opening from the home screen icon, Google sign-in may not complete properly.\nPlease use the Safari version for sign-in, data sync, and purchasing the ad-free version.\nWhen using the home screen icon, we recommend taking a manual backup with \'Export\' before switching phones or deleting the app.',
    androidCase: 'On Android / other browsers (Chrome, etc.)',
    androidStep1: 'Open this page in Chrome or similar',
    androidStep2: 'Tap the menu (⋮) in the top right',
    androidStep3: 'Select "Add to Home Screen" or "Install app"',
    androidStep4: 'Follow the on-screen instructions',
    addRecordTodayShort: '＋ Add task for today',
    addRecordDateShort: mmdd => `＋ Add task for ${mmdd}`,
    totalTime: 'This month\'s total time', unmetTime: 'Shortfall',
    achievementByTask: 'Achievement rate by task',
    actualGoal: (a,goalStr) => `Actual ${a}${goalStr}`,
    goalPart: g => ` / Goal ${g}`,
    unmetPercent: n => `Shortfall ${n}%`,
    thDate: 'Date', thTask: 'Task', thDuration: 'Duration', thRate: 'Rate',
    noRecordsThisMonth: 'No records this month',
    calendarTitle: 'Calendar (recorded time)',
    monthAchievement: 'This month',
    giftGaugeLabel: 'Until next present',
    collectedSoFar: 'Collected so far',
    collectedSummary: (stars,gifts) => `⭐×${stars} 🎁×${gifts}`,
    dayAchievement: 'Selected day',
    todayAchievement: 'Today',
    dateAchievement: mmdd => `${mmdd}`,
    noDateSelected: 'Select a date on the calendar',
    noRecordsThisDay: 'No records for this day',
    deleteRecordConfirm: (date,name) => `Delete the record for ${date} (${name})?`,
    themeNames: {original:'Original', mono:'Mono', dark:'Dark mode'},
    pixelArtNames: {blueCat:'Blue cat', brownCat:'Tabby cat'},
    weekdaysShort: ["Su","Mo","Tu","We","Th","Fr","Sa"],
    hm: (h,m) => h>0 ? `${h}h ${m}m` : `${m}m`,
    tplStandard: 'Standard', tplDeep: 'Deep focus', tplShort: 'Short',
    parenWrap: name => name ? ` (${name})` : '',
    appTitleSection: 'App Title',
    appTitlePlaceholder: 'e.g. My, Your Name\'s',
    appTitleHint: 'What you type + "TIMECAT" appears in the top left of the screen',
    aboutSection: 'About This App',
    appConcept: 'MyTIMECAT is your personal time-tracking system for recording daily tasks and habits.',
    howToTitle: 'How to Use',
    howToPages: [
      {name:'Timecard', desc:'Pick a task and time it here. "Start" begins tracking, "Take a break / Resume" pauses and resumes, and "Finish" ends the session.'},
      {name:'Tasks', desc:'Register the tasks you want to track (study, exercise, etc.) along with their days of the week and target time.'},
      {name:'Summary', desc:'See your total time and achievement rate by month, with charts and a calendar view. Extra time beyond your goal can be moved to other days.'},
      {name:'Settings', desc:"Adjust the app's appearance and features (this page)."}
    ],
    howToIconsTitle: 'Icon meanings',
    howToIcons: [
      {art:'edit', label:'Edit'}, {art:'duplicate', label:'Duplicate'}, {art:'trash', label:'Delete'},
      {art:'archive', label:'Archive (hide temporarily)'}, {art:'undo', label:'Restore'},
      {art:'focustimer', label:'Focus timer count'}, {art:'memo', label:'Leave a memo on a finished task'}
    ],
    syncSignedInAnon: 'Saved on this device (not signed in)',
    syncSignedInGoogle: name => `Synced with Google account: ${name}`,
    syncSignInGoogleBtn: 'Sign in with Google to sync',
    syncSignInEmailBtn: 'Sign in with email',
    popupHint: 'If Safari blocks the popup, tap "Allow" when prompted',
    emailSendBtn: 'Send sign-in link',
    emailSentMessage: (email)=>`Sent a sign-in link to ${email}. Check your inbox and tap the link.`,
    emailInvalidAlert: 'Please enter a valid email address',
    emailLinkConfirmPrompt: 'Please confirm the email address you used to request this link',
    emailLinkSignInSuccess: 'Signed in!',
    syncSignOutBtn: 'Sign out',
    syncConnecting: 'Connecting…',
    syncNote: 'Sign in to share your data across devices',
    syncErrorAlert: 'Sign-in failed. Please try again.',
    planFreeLabel: 'Free plan (with ads)',
    planPaidLabel: "✓ You're on the ad-free plan",
    planUpgradeNote: 'One-time ¥500 payment removes ads',
    planUpgradeBtn: 'Upgrade to ad-free',
    // Temporary wording while ad review is pending (used only when ADS_APPROVED=false)
    planSupportFreeLabel: 'Free plan',
    planSupportPaidLabel: '✓ Thanks for your support!',
    planSupportNote: 'Support the developer for ¥500',
    planSupportBtn: 'Support the developer',
    planUpgradeLoading: 'Loading…',
    planUpgradeError: "Couldn't open checkout. Please try again.",
    planUpgradeLoginRequired: 'You need to sign in with Google to purchase. Sign in now? (If you opened this from the home screen icon, please open it in a regular browser like Safari first, then sign in.)',
    backupReminderNever: 'You\'re not signed in. Please back up with \'Export\' before switching phones or deleting the app.',
    backupReminderStale: 'It\'s been {days} days since your last backup. Consider exporting a backup just in case.',
    backupReminderDismiss: 'Later',
  }
};
function t(key){
  const s = I18N[LANG] || I18N.en;
  return s[key] !== undefined ? s[key] : I18N.en[key];
}

// ---------- constants ----------
const WEEKDAYS = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
const WEEKDAYS_JP = t('weekdaysShort');
const TASK_COLORS = ["#93B6D6","#A0CFC9","#FFBE56","#FF6744","#FC8B73","#AD95DA","#60C5B7","#DE83A3","#D4D15D","#CFA370"];
function taskColor(taskId){
  const idx = tasks.findIndex(t=>t.id===taskId);
  const task = tasks[idx];
  if(task && task.color) return task.color;
  return TASK_COLORS[Math.max(0,idx)%TASK_COLORS.length];
}

// ---------- pixel art registry ----------
// The actual sprite data (PIXEL_ART_GRIDS) lives in ./pixel-arts.js, loaded via
// <script src="pixel-arts.js"> before this script tag, so new cats can be added
// there without touching this file.
// Looks up a cat by key across every cat registry -- the 5 default cats in
// PIXEL_ART_GRIDS (pixel-arts.js) plus any unlocked ones in
// LEGENDARY_ART_GRIDS (pixel-arts-legendary.js) -- so the Legendary Cat can
// be selected/rendered through the exact same code paths as a normal cat.
function getCatArt(key){
  if(PIXEL_ART_GRIDS[key]) return PIXEL_ART_GRIDS[key];
  if(typeof LEGENDARY_ART_GRIDS !== 'undefined' && LEGENDARY_ART_GRIDS[key]) return LEGENDARY_ART_GRIDS[key];
  return null;
}
function renderPixelArt(key, cell, pose){
  cell = (cell || 1.8) * 1.5;
  const art = getCatArt(key) || PIXEL_ART_GRIDS[Object.keys(PIXEL_ART_GRIDS)[0]];
  pose = (pose && art.poses[pose]) ? pose : 'sitting';
  const grid = art.poses[pose];
  const cellsHtml = grid.map(row => row.map(v=>{
    const bg = art.colors[v] || 'transparent';
    return `<div style="width:${cell}px;height:${cell}px;background:${bg};"></div>`;
  }).join('')).join('');
  // 伝説のねこ (art.legendary === true) always shines: the "legendary-glow"
  // class (see index.html's @keyframes legendaryGoldGlow) animates the same
  // filter property that the static drop-shadow below sets, so it simply
  // takes over once the animation is running -- no extra markup needed.
  const glowCls = art.legendary ? ' legendary-glow' : '';
  return `<div class="pixelart${glowCls}" style="display:grid;grid-template-columns:repeat(${grid[0].length},${cell}px);grid-template-rows:repeat(${grid.length},${cell}px);filter:drop-shadow(1px 1px 0 var(--lineS));">${cellsHtml}</div>`;
}
// Renders a cat as a flat silhouette (shape only, fixed dim color) instead of
// its real colors -- used for the "not unlocked yet" Legendary Cat teaser in
// the startup banner (see legendaryCountdownInfo()/render()).
function renderPixelArtSilhouette(key, cell, pose, alpha){
  cell = (cell || 1.8) * 1.5;
  const art = getCatArt(key);
  if(!art) return '';
  pose = (pose && art.poses[pose]) ? pose : 'sitting';
  const grid = art.poses[pose];
  const color = `rgba(43,42,58,${alpha != null ? alpha : 0.35})`;
  const cellsHtml = grid.map(row => row.map(v=>{
    const bg = v ? color : 'transparent';
    return `<div style="width:${cell}px;height:${cell}px;background:${bg};"></div>`;
  }).join('')).join('');
  return `<div style="display:grid;grid-template-columns:repeat(${grid[0].length},${cell}px);grid-template-rows:repeat(${grid.length},${cell}px);">${cellsHtml}</div>`;
}
// Renders a single static 16x16 icon (おめかし/えさ item) at an exact pixel
// cell size (no *1.5 scaling applied) -- shared by renderIconArt() below and
// by renderCatWithOutfit()'s overlay compositing, which needs to line the
// overlay's cell size up precisely with the cat's own cell size (or some
// scaled fraction of it) rather than going through renderIconArt()'s implicit
// *1.5 multiplier.
function renderIconArtAtCellPx(art, cellPx){
  if(!art || !art.grid) return '';
  const grid = art.grid;
  const cellsHtml = grid.map(row => row.map(v=>{
    const bg = art.colors[v] || 'transparent';
    return `<div style="width:${cellPx}px;height:${cellPx}px;background:${bg};"></div>`;
  }).join('')).join('');
  return `<div style="display:grid;grid-template-columns:repeat(${grid[0].length},${cellPx}px);grid-template-rows:repeat(${grid.length},${cellPx}px);filter:drop-shadow(1px 1px 0 var(--lineS));">${cellsHtml}</div>`;
}
// Renders a single static 16x16 icon (おめかし/えさ item), as opposed to
// renderPixelArt() which renders an animated cat with walking/sitting poses.
function renderIconArt(art, cell){
  return renderIconArtAtCellPx(art, (cell || 1.3) * 1.5);
}
// Composites the currently-equipped おめかし item directly on top of an
// already-rendered base sprite -- shared by renderCatWithOutfit() (the normal
// walking/sitting cat) and renderStretchProgressBar() (the のびるねこ head
// piece), so both go through the exact same anchor/scale/offset math instead
// of two separate implementations drifting apart. `cols`/`rows` describe the
// base sprite's own grid size (almost always 16x16) and `cellPx` its actual
// on-screen cell size, so the overlay's bounding box lines up with it exactly.
// Each item's `overlay` hint (see pixel-arts-outfits.js) controls placement:
//   - anchor 'full' -- drawn at the base sprite's own cell size, in the exact
//     same top-left position as its grid (item art was drawn to already line
//     up 1:1, e.g. 首輪 sitting right at the neck).
//   - anchor 'top-right' -- drawn at `scale` × the base sprite's cell size,
//     anchored to the top-right corner of its bounding box, which lands it on
//     top of the head (リボン／王冠).
//   - optional `offsetX`/`offsetY` -- a fixed pixel nudge on top of the
//     anchor position (positive X = further right on screen, positive Y =
//     further down), for fine-tuning once the anchor/scale alone isn't quite
//     right (e.g. 王冠 sitting a little low/left of dead-center on the head).
//     Used as the fallback for any pose `byPose` doesn't cover.
//   - optional `byPose: {sitting:{offsetX,offsetY}, walking:{...}}` --
//     pose-specific overrides for items whose fit differs between sitting
//     and walking (首輪／王冠). `pose` is passed in by the caller
//     (renderCatWithOutfit() / renderStretchProgressBar()); when it's
//     omitted or has no entry here, the top-level offsetX/offsetY (or 0,0)
//     is used instead.
// Falls back to the plain base sprite (no overlay) whenever nothing is
// equipped, or the equipped item has no grid to draw.
function compositeOutfitOverlay(baseHtml, cols, rows, cellPx, pose){
  const outfitKey = rewards.equippedOutfit;
  if(!outfitKey || typeof OUTFIT_ART === 'undefined' || !OUTFIT_ART[outfitKey]) return baseHtml;
  const art = OUTFIT_ART[outfitKey];
  if(!art || !art.grid) return baseHtml;
  const boxW = cols * cellPx, boxH = rows * cellPx;
  const overlay = art.overlay || { scale: 1, anchor: 'full' };
  const overlayCellPx = cellPx * (overlay.scale != null ? overlay.scale : 1);
  const overlayWidthPx = art.grid[0].length * overlayCellPx;
  const poseOverride = (pose && overlay.byPose) ? overlay.byPose[pose] : null;
  const offsetX = (poseOverride && poseOverride.offsetX != null) ? poseOverride.offsetX : (overlay.offsetX || 0);
  const offsetY = (poseOverride && poseOverride.offsetY != null) ? poseOverride.offsetY : (overlay.offsetY || 0);
  const left = (overlay.anchor === 'top-right' ? (boxW - overlayWidthPx) : 0) + offsetX;
  const top = offsetY;
  const overlayHtml = renderIconArtAtCellPx(art, overlayCellPx);
  return `<div style="position:relative;width:${boxW}px;height:${boxH}px;">${baseHtml}<div style="position:absolute;left:${left}px;top:${top}px;pointer-events:none;z-index:2;">${overlayHtml}</div></div>`;
}
// Renders the given cat (same pose-grid animated rendering as renderPixelArt)
// with the currently-equipped おめかし item composited on top -- see
// compositeOutfitOverlay() for how it's placed.
function renderCatWithOutfit(key, cell, pose){
  const catHtml = renderPixelArt(key, cell, pose);
  const actualCell = (cell || 1.8) * 1.5; // same scaling renderPixelArt() applies internally
  const catArt = getCatArt(key) || PIXEL_ART_GRIDS[Object.keys(PIXEL_ART_GRIDS)[0]];
  const poseGrid = (catArt.poses && catArt.poses[pose]) ? catArt.poses[pose] : (catArt.poses && catArt.poses.sitting);
  const cols = poseGrid ? poseGrid[0].length : 16;
  const rows = poseGrid ? poseGrid.length : 16;
  return compositeOutfitOverlay(catHtml, cols, rows, actualCell, pose);
}
function pixelArtName(key){
  const art = getCatArt(key);
  if(!art) return key;
  return (art.name && (art.name[LANG] || art.name.en)) || key;
}
// Renders a row of pixcard buttons (same look as the default-cat picker row
// in Settings) for an おめかし/ごはん/伝説のねこ list, instead of
// a native <select> -- keeps the visual language identical to the cat picker.
// entries: [{key, iconHtml, name}]. selectFnName is called with the clicked
// key (quoted) as its only argument, e.g. "selectOutfit". When includeNone
// is true, a leading card is shown that calls selectFnName('') -- by default
// labeled "なし" with a plain "—" glyph, but `noneOverride` (optional
// {label, iconHtml}) lets a caller substitute both (used by ごはん's "なし"
// → "いつもの" + fish-icon card).
function rewardPixcardRow(entries, selectedKey, selectFnName, includeNone, noneOverride){
  const noneLabel = (noneOverride && noneOverride.label) || t('outfitNoneOption');
  const noneIconHtml = (noneOverride && noneOverride.iconHtml) || `<div style="width:24px;height:24px;display:flex;align-items:center;justify-content:center;color:var(--faint);font-size:16px;">—</div>`;
  const noneCard = includeNone ? `
    <div class="pixcard ${!selectedKey?'on':''}" onclick="${selectFnName}('')">
      ${noneIconHtml}
      <div class="name">${noneLabel}</div>
    </div>` : '';
  return `<div class="pixrow">${noneCard}${entries.map(e=>`
    <div class="pixcard ${selectedKey===e.key?'on':''}" onclick="${selectFnName}('${e.key}')">
      ${e.iconHtml}
      <div class="name">${escapeHtml(e.name)}</div>
    </div>`).join('')}</div>`;
}
// ---- helpers for the "stretch" progress bar style ----
// Auto-detect each cat's main fur color (most-used non-outline color in its
// sitting pose), used as a fallback recolor for any cat that doesn't define
// its own `stretchColors` in pixel-arts.js.
const _catMainColorCache = {};
function catMainColor(key){
  if(_catMainColorCache[key]) return _catMainColorCache[key];
  const art = getCatArt(key);
  let color = '#FF9EC7';
  if(art){
    const grid = (art.poses && (art.poses.sitting || art.poses.walking)) || [];
    const freq = {};
    grid.forEach(row=>row.forEach(v=>{ if(v && v!==1) freq[v]=(freq[v]||0)+1; }));
    let best=null, bestCount=-1;
    Object.keys(freq).forEach(k=>{ if(freq[k]>bestCount){ bestCount=freq[k]; best=k; } });
    if(best!==null && art.colors[best]) color = art.colors[best];
    else { const vals=Object.values(art.colors||{}); if(vals.length) color=vals[0]; }
  }
  _catMainColorCache[key] = color;
  return color;
}
function catOutlineColor(key){
  const art = getCatArt(key);
  return (art && art.colors && art.colors[1]) || '#2B2A3A';
}
// Palette (1=outline, 2=main fur, 3=belly/highlight) to recolor the shared
// CAT_STRETCH_SHAPE with for a given cat. Cats can supply their own exact
// `stretchColors` in pixel-arts.js (e.g. tuxedo); anything else falls back
// to an auto-derived rough recolor so it "just works" for now.
function stretchColorsFor(key){
  const art = getCatArt(key);
  if(art && art.stretchColors) return art.stretchColors;
  return {1: catOutlineColor(key), 2: catMainColor(key), 3: '#FFFFFF'};
}
// ---- bounding-box helpers so the stretch pieces line up automatically,
// however each cat's shape/art happens to be drawn ----
function gridColBounds(grid){
  let min=null, max=null;
  grid.forEach(row=>row.forEach((v,x)=>{ if(v){ if(min===null||x<min)min=x; if(max===null||x>max)max=x; } }));
  return (min===null) ? {min:0,max:grid[0].length-1} : {min,max};
}
// Like gridColBounds, but only looks within a row band -- used so the
// front/back attachment point lines up with the exact rows the "middle"
// segment occupies, instead of picking up a column from some other part of
// the silhouette (e.g. an ear or a raised paw) that happens to stick out
// further but sits at a different height.
function gridColBoundsInRows(grid, rowMin, rowMax){
  let min=null, max=null;
  for(let y=rowMin;y<=rowMax;y++){
    const row = grid[y] || [];
    row.forEach((v,x)=>{ if(v){ if(min===null||x<min)min=x; if(max===null||x>max)max=x; } });
  }
  return (min===null) ? gridColBounds(grid) : {min,max};
}
function gridRowBounds(grid){
  let min=null, max=null;
  grid.forEach((row,y)=>{ if(row.some(v=>v)){ if(min===null||y<min)min=y; if(max===null||y>max)max=y; } });
  return (min===null) ? {min:0,max:grid.length-1} : {min,max};
}
// Renders a sprite as a single scaled SVG background (rather than one DOM
// div per pixel) -- this avoids a hairline anti-aliasing seam that some
// browsers introduce between adjacent CSS grid cells when the cell size is
// fractional (e.g. 2.5px), which showed up as a faint gap where this piece
// met the tiled "middle" body segment (also SVG-based).
function renderStretchPart(grid, colorMap, cell){
  const w = grid[0].length, h = grid.length;
  const dataURI = svgTileDataURI(grid, colorMap);
  return `<div style="width:${w*cell}px;height:${h*cell}px;background-image:url('${dataURI}');background-size:${w*cell}px ${h*cell}px;background-repeat:no-repeat;image-rendering:pixelated;"></div>`;
}
// Tiny inline SVG so the "middle" body segment can be tiled seamlessly across
// any width via a CSS background, instead of generating many DOM nodes.
function svgTileDataURI(grid, colorMap){
  const w = grid[0].length, h = grid.length;
  let rects = '';
  grid.forEach((row,y)=>row.forEach((v,x)=>{ const c=colorMap[v]; if(c) rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${c}"/>`; }));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges">${rects}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
// Builds the full "stretch" progress bar: a front piece fixed at the start,
// a back piece riding the current progress position, and a tiled middle
// segment that stretches to fill the gap between them -- so the cat's body
// itself reads as the progress bar, instead of a separate track underneath.
function renderStretchProgressBar(key, percent, isWorking, cell, showGoal, paused, skipOutfit){
  cell = cell || 2.5;
  if(showGoal===undefined) showGoal = true;
  // Prefer this cat's own custom stretch art (art.stretchShape /
  // art.stretchShapeSit in pixel-arts.js) if it has one. While paused, use
  // the resting/sitting variant so the cat visibly settles down instead of
  // staying in its active reaching pose; if only the active variant was
  // drawn, fall back to that rather than jumping to the generic shape.
  const art = getCatArt(key);
  const customShape = paused ? (art && (art.stretchShapeSit || art.stretchShape)) : (art && art.stretchShape);
  const shape = customShape || ((paused && typeof CAT_STRETCH_SHAPE_SIT!=='undefined') ? CAT_STRETCH_SHAPE_SIT : CAT_STRETCH_SHAPE);
  if(!shape) return '';
  const colors = customShape ? customShape.colors : stretchColorsFor(key);
  // The tail stays anchored at the start (.stretchbar-front, fixed at left:0);
  // the head leads and advances with progress (.stretchbar-back, moves via
  // left:calc(...)) -- matching how a cat's head/front leads a stretch while
  // its rear stays put. (Class names describe *position role*, i.e. fixed vs
  // moving, not head vs tail anatomy.)
  const fixedGrid = shape.back;
  const movingGrid = shape.front;
  const midGrid = shape.middle;
  const mR = gridRowBounds(midGrid);
  const fB = gridColBoundsInRows(fixedGrid, mR.min, mR.max);
  const bB = gridColBoundsInRows(movingGrid, mR.min, mR.max);
  const wrapH = fixedGrid.length * cell;
  const frontRightPx = (fB.max + 1) * cell;
  const backAnchorPx = bB.min * cell;
  const midTop = mR.min * cell;
  const midH = (mR.max - mR.min + 1) * cell;
  const midCropped = midGrid.slice(mR.min, mR.max + 1);
  const midTileWidth = midGrid[0].length * cell;
  const frontHTML = renderStretchPart(fixedGrid, colors, cell);
  // The moving (head) piece carries the equipped おめかし item directly onto
  // it (same anchor/scale/offset math as the walking/sitting cat, see
  // compositeOutfitOverlay()) -- since the whole composited unit sits inside
  // .stretchbar-back below, it rides along automatically as that div's `left`
  // advances with progress, instead of needing separate position tracking.
  // The moving/head piece is the cat's active reaching pose (front=fixed
  // tail, moving/head=front-most in the walk cycle) -- pass 'sitting' when
  // paused (matches the sitting-variant art already selected via
  // customShape above) so 首輪/王冠's pose-aware overlay offset lines up,
  // 'walking' otherwise.
  // `skipOutfit` opts a caller out of this compositing entirely -- used by
  // the Settings > Bar Style「のびるねこ」preview thumbnail, which should
  // just show the plain cat (matching the「あるくねこ」preview beside it,
  // which also renders the bare cat via renderPixelArt() with no outfit)
  // rather than whatever おめかし happens to be equipped right now.
  const overlayPose = paused ? 'sitting' : 'walking';
  const backHTML = skipOutfit
    ? renderStretchPart(movingGrid, colors, cell)
    : compositeOutfitOverlay(renderStretchPart(movingGrid, colors, cell), movingGrid[0].length, movingGrid.length, cell, overlayPose);
  const midTileURI = svgTileDataURI(midCropped, colors);
  const workingCls = isWorking ? ' working' : '';
  // The moving (head) box is `boxWidthPx` wide and its art sits to the right
  // of its own anchor point (backAnchorPx) by `rightMarginPx`. Left uncapped,
  // at percent=100 the head's art would poke out past the bar's right edge.
  // Cap its position (and the body's width to match) so the art's own right
  // edge never passes 100%.
  const boxWidthPx = movingGrid[0].length * cell;
  // Extra 15px so the head stops well clear of the goal marker at 100%,
  // instead of overlapping it, so the bone/fish sits clearly beside the cat.
  // Only reserved when a goal marker is actually being drawn -- otherwise
  // (e.g. the small Settings > Bar Style preview, which passes
  // showGoal=false) this clearance has nothing to avoid overlapping and was
  // just eating into the available width, capping the visible stretch early.
  // That capping was most noticeable on cats whose own head/tail art has a
  // small backAnchorPx (e.g. tuxedo), making their "のびるねこ" preview look
  // shorter than the others at the same percent.
  const goalClearancePx = showGoal ? 20 : 0;
  const rightMarginPx = boxWidthPx - backAnchorPx + goalClearancePx;
  // Scale the whole 0-100% range linearly onto [restPos, maxStretchPos]
  // instead of capping: restPos (-backAnchorPx) is where the back element
  // sits at percent=0, and maxStretchPos (100% - rightMarginPx) is the
  // furthest it should ever stretch (clear of the goal marker). This way the
  // cat keeps stretching the whole time and reaches its maximum exactly at
  // percent=100, instead of hitting that max early and sitting still for
  // however long is left.
  const backLeft = `calc(-${backAnchorPx}px + (100% - ${rightMarginPx}px + ${backAnchorPx}px) * ${percent} / 100)`;
  // The body always spans from the front's right edge to the back's anchor
  // point, so derive its width directly from backLeft (same relation as
  // before: width = backLeft - frontRightPx + backAnchorPx + a small buffer
  // for the idle sway's peak) rather than a separate natural/capped pair.
  const midWidth = `calc(${backLeft} - ${frontRightPx}px + ${backAnchorPx + 3}px)`;
  const reachedGoal = percent>=100;
  const goal = showGoal ? (reachedGoal ? currentGoalDoneArt() : currentGoalFishArt()) : null;
  const goalHTML = goal ? renderStretchPart(goal.grid, goal.colors, cell) : '';
  // Same always-on shine as renderPixelArt() for 伝説のねこ, applied to an
  // inner wrapper around front/mid/back (the cat's body) rather than to
  // .stretchbar itself, so the body reads as one continuously glowing cat --
  // but WITHOUT also lighting up the goal marker (.stretchbar-goal, the
  // fish/bone at the end of the bar), which sits outside this wrapper as a
  // direct child of .stretchbar. A CSS filter on an ancestor visually affects
  // its entire subtree, so if legendary-glow stayed on .stretchbar, the goal
  // marker would glow too even though it has no filter of its own -- this
  // wrapper scopes the glow to just the pieces that should shine.
  const glowCls = (art && art.legendary) ? ' legendary-glow' : '';
  return `<div class="stretchbar" style="height:${wrapH}px;" data-front-right="${frontRightPx}" data-back-anchor="${backAnchorPx}" data-right-margin="${rightMarginPx}">
    ${goal ? `<div class="stretchbar-goal" data-goal-state="${reachedGoal?'done':'fish'}" style="left:calc(100% - 10px); top:8px;">${goalHTML}</div>` : ''}
    <div class="stretchbar-catbody${glowCls}">
      <div class="stretchbar-mid" style="left:${frontRightPx}px; top:${midTop}px; height:${midH}px; width:${midWidth}; background-image:url('${midTileURI}'); background-repeat:repeat-x; background-size:${midTileWidth}px ${midH}px;"></div>
      <div class="stretchbar-front" style="left:0;">${frontHTML}</div>
      <div class="stretchbar-back${workingCls}" style="left:${backLeft};">${backHTML}</div>
    </div>
  </div>`;
}


const POMODORO_DEFAULT_TEMPLATES = [
  {id:'std', name:t('tplStandard'), work:25, break:5, longBreakEvery:4, longBreak:15, builtin:true},
  {id:'deep', name:t('tplDeep'), work:50, break:10, longBreakEvery:0, longBreak:0, builtin:true},
  {id:'short', name:t('tplShort'), work:15, break:3, longBreakEvery:0, longBreak:0, builtin:true},
];

// ---------- storage (localStorage, self-hosted so it actually persists) ----------
function load(key, fallback){ try{ const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }catch(e){ return fallback; } }
function save(key, val){ try{ localStorage.setItem(key, JSON.stringify(val)); }catch(e){ console.error('save failed', e); } }

function defaultSettings(){
  return {
    pixelArt: Object.keys(PIXEL_ART_GRIDS)[0],
    theme:'original',
    barStyle:'normal',
    pomodoro:{ templates: POMODORO_DEFAULT_TEMPLATES.map(t=>({...t})), activeTemplateId:'std', autoEnable:false }
  };
}
// ---------- rewards / gamification (daily おめかし・えさ tally, monthly 伝説のねこ) ----------
// See evaluateRewards() further down for the actual streak/unlock logic.
// This is just the persisted shape + its defaults.
const LEGENDARY_STREAK_DAYS = 30; // consecutive successful days needed to unlock the Legendary Cat
const GIFT_EVERY_DAYS = 7; // successful days (not necessarily consecutive) needed to bank a おめかし/えさ present
function defaultRewards(){
  return {
    trackingStartDate: null,    // first date rewards started tracking (inclusive); set once, on first ever evaluateRewards() call
    giftProgressDays: 0,        // achievedDates.length % GIFT_EVERY_DAYS -- recomputed every evaluateRewards() call
    unlocked: [],                // flat "type:key" strings, e.g. "outfit:ribbon", in unlock order
    outfitUnlockedCount: 0,      // how many おめかし items unlocked so far (indexes Object.keys(OUTFIT_ART))
    foodUnlockedCount: 0,        // how many ごはん items unlocked so far (indexes Object.keys(FOOD_ART))
    pendingChoices: 0,           // presents whose "おめかし・ごはん?" choice hasn't been made yet
    equippedOutfit: null,       // currently worn おめかし key, or null
    equippedFood: null,         // currently equipped ごはん key, or null
    dailyStreak: 0,             // consecutive successful days right now, recomputed backward from the latest scored day every call
    giftsGrantedCount: 0,       // total presents ever banked/unlocked (monotonic -- never decreases, even if a later edit shrinks achievedDates)
    legendaryUnlocked: false,
    legendaryRevealed: false,   // true once the user has actually tapped the ？？？ card to open it (see revealLegendaryCat()) -- stays false while legendaryUnlocked is already true but the "ta-da" tap hasn't happened yet, which is what keeps the top banner + the pink "ready" card showing
    achievedDates: [],          // fmtDate() strings of every day that hit its goal, fully recomputed every evaluateRewards() call (calendar ⭐)
    giftEarnedDates: [],        // fmtDate() strings of the day each present was banked/unlocked, also recomputed (calendar 🎁)
  };
}
// the single "Sample" task a brand-new install starts with -- also what
// resetAllData() restores, so a factory reset lands on the same starting point
// as a first-time install rather than an empty task list.
function factorySampleTasks(){
  return [{ id: uid(), name: 'Sample', days: [1], targetHours: 1, color: TASK_COLORS[0], archived: false }];
}
const THEME_NAMES = t('themeNames');
const BAR_STYLE_NAMES = t('barStyleNames');
const THEME_PREVIEW_KEYS = {
  original: ['#F3F7FC','#FF9EC7','#7FB3DC'],
  mono: ['#F1F1F1','#4B4B4B','#8C8C8C'],
  dark: ['#17171D','#ECECF0','#4B4B57'],
};
function applyTheme(){
  document.documentElement.setAttribute('data-theme', settings.theme || 'original');
}
// テーマごとに雰囲気の合う猫を「おすすめデフォルト」として用意しておき、
// テーマ切り替えと同時に猫も自動で切り替える（モノクロ→白猫、ダーク→黒猫）。
// あくまで初期値の提案なので、切り替え後もSettingsから普段通り別の猫を
// 選び直せる（次にまたテーマを切り替えると、そのテーマのおすすめに戻る）。
const THEME_DEFAULT_CAT = { mono: 'white', dark: 'black' };
function selectTheme(key){
  settings.theme=key;
  const recommendedCat = THEME_DEFAULT_CAT[key];
  if(recommendedCat && getCatArt(recommendedCat)) settings.pixelArt = recommendedCat;
  persistSettings(); applyTheme(); render();
}
function selectBarStyle(key){ settings.barStyle=key; persistSettings(); render(); }

let tasks = load('tt_tasks', null);
let records = load('tt_records', {});
let settings = load('tt_settings', null);

// migrate from the older 工数管理 (timecard/project) data model if present
if(tasks === null){
  const oldLocations = load('tt_locations', []);
  tasks = oldLocations.map(l=>{
    let targetHours = 8;
    if(l.startTime && l.endTime){
      const [sh,sm] = l.startTime.split(':').map(Number);
      const [eh,em] = l.endTime.split(':').map(Number);
      let mins = (eh*60+em) - (sh*60+sm);
      if(mins <= 0) mins += 24*60;
      targetHours = mins/60;
    }
    return {id:l.id, name:l.name, days:l.days||[], targetHours, color:l.color, archived:!!l.archived};
  });
}
// first-time users (no data at all, even after migration): seed one sample task so the app isn't empty
if(tasks.length === 0 && Object.keys(load('tt_records', {})).length === 0){
  tasks = factorySampleTasks();
  save('tt_tasks', tasks);
}
if(settings === null){ settings = defaultSettings(); }
if(!settings.theme || !THEME_NAMES[settings.theme]) settings.theme = 'original';
if(!settings.barStyle || !BAR_STYLE_NAMES[settings.barStyle]) settings.barStyle = 'normal';
if(!settings.pomodoro) settings.pomodoro = defaultSettings().pomodoro;
if(!settings.pomodoro.templates || !settings.pomodoro.templates.length) settings.pomodoro.templates = POMODORO_DEFAULT_TEMPLATES.map(t=>({...t}));
if(!getCatArt(settings.pixelArt)) settings.pixelArt = Object.keys(PIXEL_ART_GRIDS)[0];

// migrate old single-record-per-day format to session-array format, drop money fields, rename location->task
Object.keys(records).forEach(date=>{
  if(!Array.isArray(records[date])){
    const old = records[date];
    if(!old.id) old.id = uid();
    records[date] = [old];
  }
  records[date] = records[date].map(s=>({
    id:s.id, date:s.date||date, taskId:s.taskId||s.locationId, taskName:s.taskName||s.locationName,
    segments:s.segments||[], currentStart:s.currentStart||null, status:s.status||'done', memo:s.memo||'',
  }));
  // fix: drop sessions whose elapsed time was fully deleted, instead of leaving an empty stray item
  records[date] = records[date].filter(s=> s.status!=='done' || (s.segments && s.segments.length>0));
  if(records[date].length===0) delete records[date];
});

let rewards = load('tt_rewards', null);
rewards = Object.assign(defaultRewards(), rewards || {});

let tab = load('tt_last_tab', 'punch');
const TAB_ORDER = ['punch','tasks','report','settings']; // nav / スワイプ共通のタブ順序
let tabSlideDir = null; // 直前の setTab() が生んだ向き: 'fwd' | 'back' | null（render() で一度だけ消費する）
let selectedTaskId = null;
let reportMonth = (()=>{ const d=new Date(); return `${d.getFullYear()}-${pad(d.getMonth()+1)}`; })();
let editingTask = null; // for modal
let showTaskForm = false;
let editingRecordDate = null; // for segment-edit modal
let editingSessionId = null;
let editingSegmentsDraft = null;
// バグ修正: <input type="time"> のネイティブピッカーをタップして時刻を選ぶと、
// ピッカーの出現でモーダル内のレイアウトがわずかに動き、指を離した瞬間の
// click イベントの target が「押し始めた要素」ではなく「今その座標にある要素」
// (=modal-bg 自身) になってしまうことがあった。これまでは click 時の
// target だけを見て「背景がクリックされた」と判定していたため、時刻選択の
// 操作がそのまま「モーダルの外側をタップした」と誤認され、即座に閉じてしまう
// バグの原因になっていた。押し始め(mousedown/touchstart)と押し終わり(click)の
// 両方が実際に背景要素上だった場合にのみ閉じるようにして、これを防ぐ。
let modalBgPressedOnBg = false;
function modalBgPress(e){ modalBgPressedOnBg = (e.target === e.currentTarget); }
function modalBgClick(e, closeFn){
  const wasBg = modalBgPressedOnBg;
  modalBgPressedOnBg = false;
  if(e.target === e.currentTarget && wasBg) closeFn();
}
let showAddRecord = false;
let showArchived = false;
let showHowTo = false;
let showInstall = false;
let showCatPanel = false;
let showOutfitPanel = false;
let showFoodPanel = false;
let showLoginPanel = false;
let showManualBackupPanel = false;
let editingMemoDate = null;
let editingMemoSessionId = null;
let editingMemoDraft = '';
let expandedReportDates = new Set();
let selectedReportDate = fmtDate(new Date());
let toastMessage = null;
let toastTimer = null;
// flatKeys ("outfit:ribbon" etc.) already shown via rewardUnlockedToast this
// page load -- see the guard inside evaluateRewards()'s auto-unlock branch
// and chooseReward() below.
const toastedRewardKeys = new Set();
function showToast(msg, ms){
  toastMessage = msg;
  renderToastHost();
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>{ toastMessage=null; renderToastHost(); }, ms || 3500);
}
// Renders into its own standalone DOM node (#toastHost, a sibling of #app in
// index.html) instead of being part of the big innerHTML template render()
// rebuilds on every state change. render() gets called very often while a
// toast happens to be showing (any unrelated action -- switching tabs,
// ticking the pomodoro, an unrelated persistRecords()/evaluateRewards() call
// -- re-renders #app's whole innerHTML), and since the toast used to be
// inline in that same template, EVERY one of those unrelated re-renders tore
// the toast <div> down and recreated it -- restarting its CSS pop-in
// animation from scratch each time even though the message hadn't changed.
// That's what made a single "◯◯を手に入れました" look like it was popping up
// several times in a row. Keeping it in a separate node that's only touched
// when the message actually changes fixes that at the root, regardless of
// how many times something else calls render() in the meantime.
function renderToastHost(){
  const host = document.getElementById('toastHost');
  if(!host) return;
  if(toastMessage){
    if(host.dataset.msg !== toastMessage){
      host.dataset.msg = toastMessage;
      host.innerHTML = `<div class="toast">${escapeHtml(toastMessage)}</div>`;
    }
  } else if(host.innerHTML){
    host.innerHTML = '';
    delete host.dataset.msg;
  }
}
let addDraft = null; // {date, taskId, segments:[{start,end}]}
let showDuplicate = false;
let duplicateSource = null; // {taskId, taskName, segmentsTimes}
let duplicateTargetDate = null;
let showPomodoroForm = false;
let carryoverDraft = null; // {taskId, from, to, min} 超過分振り分けモーダル
let pomodoroDraft = null; // {name, work, break}
let pomodoroState = null; // transient, not persisted: {sessionId, templateId, phase, remainingMs, running, cycleCount}

// 「プルダウンを開いてすぐに閉じちゃう」バグの本当の原因:
// 記録編集モーダルを開いて時刻を編集している間、その編集内容(draft)は
// まだ persistRecords() されていない = fbScheduleSave() も呼ばれていない
// ため、fbHasUnsyncedChange() は false のまま。この状態で Firestore の
// onSnapshot がどれか1回でも配信されると(他デバイスでの変更、あるいは
// このプレゼント/リワード機能まわりの自動保存のエコーなど)、ガードに
// 引っかからず fbApplyRemote() がそのまま呼ばれ、その中の render() が
// #app の中身を丸ごと作り直してしまう。編集中の <select>/<input> はその
// 瞬間に一度DOMから消えて作り直されるため、開いていたプルダウンや
// ネイティブの時刻ピッカーがまだ選択している最中に閉じてしまう
// ("すぐ閉じる"の正体はこれで、type=timeでもプルダウンでも起きていたのは
// 入力コントロールの種類ではなく、この土台ごと作り直される方が原因だった)。
// 対策: 保存前の編集中(モーダルが開いていてdraftがある)は fbApplyRemote()
// を今すぐ適用せず、いったん保留しておく。モーダルを閉じる/保存すると
// render() が呼ばれるので、そのタイミングで保留していたリモート更新を
// 安全に適用する。
//
// 2026-08-24追記: 「集中タイマーのプルダウンがすぐ閉じる」バグも同じ原因
// だったが、こちらは上記のモーダル系フラグ(showAddRecordなど)がどれも
// trueにならないケースだった -- テンプレート選択の<select>(renderPomodoroPanel()
// 内)はPunchタブ画面に直接置かれていて、モーダルを開かずに操作するため。
// そのため個別のフラグを増やす代わりに、「今まさにフォームコントロールに
// フォーカスが当たっているか」を汎用的に見るチェックを追加した。モーダルの
// 有無に関わらず、ユーザーが<select>/<input>/<textarea>を操作中は同じ理由で
// 再構築を保留すべきなので、今後同様の箇所が増えてもここだけで塞げる。
let fbPendingRemoteData = null;
function isFormControlFocused(){
  const el = document.activeElement;
  if(!el) return false;
  const tag = el.tagName;
  return tag==='SELECT' || tag==='INPUT' || tag==='TEXTAREA';
}
function isEditingModalOpen(){
  if(editingRecordDate || showAddRecord || showTaskForm || editingMemoDate || showDuplicate || showPomodoroForm || carryoverDraft) return true;
  return isFormControlFocused();
}

// ---------- helpers ----------
function pad(n){ return String(n).padStart(2,'0'); }
function fmtDate(d){ return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`; }
function fmtTime(iso){ const d=new Date(iso); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; }
function msToHMS(ms){ const s=Math.max(0,Math.floor(ms/1000)); const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60; return `${pad(h)}:${pad(m)}:${pad(sec)}`; }
function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,7); }
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function hmLabel(ms){
  const totalMin = Math.round(ms/60000);
  const h = Math.floor(totalMin/60), m = totalMin%60;
  return t('hm')(h,m);
}

function computeWorkMs(rec){
  if(!rec) return 0;
  let ms = rec.segments.reduce((s,seg)=> s + (new Date(seg.end)-new Date(seg.start)), 0);
  if(rec.status==='working' && rec.currentStart) ms += Date.now() - new Date(rec.currentStart);
  return ms;
}
function taskGoalHours(task){ return task && task.targetHours ? Number(task.targetHours) : 0; }
function persistRecords(){
  save('tt_records', records);
  fbScheduleSave();
  // Re-check rewards every time records change (add/end/edit/delete a
  // session, import, duplicate, etc.) -- not just at app boot -- so hitting
  // today's goal counts (⭐ / gift countdown / an actual banked present)
  // right away instead of only being picked up the next time the app opens.
  evaluateRewards();
}
function persistTasks(){ save('tt_tasks', tasks); fbScheduleSave(); }
function persistSettings(){ save('tt_settings', settings); fbScheduleSave(); }
function persistRewards(){ save('tt_rewards', rewards); fbScheduleSave(); }

// ---------- rewards / gamification logic ----------
// Placeholder logic -- tune freely once the real content design is locked
// in; see pixel-arts-outfits.js / pixel-arts-legendary.js for the (currently
// dummy) art these unlock. See evaluateRewards() further down for the full
// design notes on how a day is scored, how presents bank, and how
// 伝説のねこ unlocks.
function activeGoalTasks(){
  return tasks.filter(tk => !tk.archived && Number(tk.targetHours) > 0);
}
// Combined goal/actual minutes across every active goal task scheduled on dateStr.
function dateDayTotals(dateStr){
  const wd = new Date(dateStr + 'T00:00:00').getDay();
  const sessions = records[dateStr] || [];
  let goalMin = 0, actualMin = 0;
  let hasGoal = false;
  activeGoalTasks().forEach(tk=>{
    if(!taskScheduledOn(tk, dateStr)) return;
    hasGoal = true; // 振替で目標が0分になった日も「目標のある日」として扱う（達成扱いになる）
    goalMin += taskDayGoalMin(tk, dateStr);
    actualMin += sessions.filter(s=>s.taskId===tk.id).reduce((sum,s)=>sum + computeWorkMs(s), 0) / 60000;
  });
  return { goalMin, actualMin, hasGoal };
}

// ---------- 超過分の振り分け（carryover） ----------
// 目標より多く達成した日の超過分を、同じタスクの他の日へ手動で振り分ける。
// tk.carryovers = [{id, from:'YYYY-MM-DD', to:'YYYY-MM-DD', min}]
// tasks の中に持たせているので、保存・クラウド同期・書き出しはタスクと一緒に行われる。
// 振り分け先の日は min の分だけ目標が減る（0分未満にはならない）。
function taskCarryovers(tk){ return (tk && Array.isArray(tk.carryovers)) ? tk.carryovers : []; }
function taskScheduledOn(tk, dateStr){
  if(!tk || !(Number(tk.targetHours) > 0)) return false;
  const days = tk.days && tk.days.length ? tk.days : null; // null = every day
  if(!days) return true;
  return days.includes(new Date(dateStr + 'T00:00:00').getDay());
}
function taskCarryInMin(tk, dateStr){
  return taskCarryovers(tk).filter(c=>c.to===dateStr).reduce((a,c)=>a + Number(c.min||0), 0);
}
function taskCarryOutMin(tk, dateStr){
  return taskCarryovers(tk).filter(c=>c.from===dateStr).reduce((a,c)=>a + Number(c.min||0), 0);
}
// その日の（振替反映後の）目標分数。予定外の曜日は0。
function taskDayGoalMin(tk, dateStr){
  if(!taskScheduledOn(tk, dateStr)) return 0;
  return Math.max(0, Number(tk.targetHours) * 60 - taskCarryInMin(tk, dateStr));
}
function taskDayActualMin(tk, dateStr){
  const sessions = records[dateStr] || [];
  return sessions.filter(s=>s.taskId===tk.id).reduce((sum,s)=>sum + computeWorkMs(s), 0) / 60000;
}
// 目標を超えた分（分）と、まだ振り分けていない分（分）
function taskSurplusInfo(tk, dateStr){
  if(!tk || !(Number(tk.targetHours) > 0)) return { surplus:0, available:0, out:0 };
  const surplus = Math.max(0, Math.floor(taskDayActualMin(tk, dateStr) - taskDayGoalMin(tk, dateStr)));
  const out = taskCarryOutMin(tk, dateStr);
  return { surplus, out, available: Math.max(0, surplus - out) };
}
// 振り分け先の候補：同じタスクの予定曜日（目標が残っていない日も含む。
// 振り分けた時間はその日の時間として表示されるので、目標以上に振り分けてもよい）。
// 振り分け元の2週間前〜今日から4週間先まで（振り分け元の日自体は除く）。
function carryoverCandidateDates(tk, fromDate){
  const todayStr = fmtDate(new Date());
  const startStr = addDaysStr(fromDate, -14);
  const endStr = addDaysStr(todayStr > fromDate ? todayStr : fromDate, 28);
  const out = [];
  for(let d = startStr; d <= endStr; d = addDaysStr(d, 1)){
    if(d === fromDate || !taskScheduledOn(tk, d)) continue;
    const remain = Math.max(0, Math.ceil(taskDayGoalMin(tk, d) - taskDayActualMin(tk, d)));
    out.push({ date:d, remain });
  }
  return out;
}
// True the instant today's combined goal is actually met, whether or not
// evaluateRewards() has officially committed it to rewards.achievedDates yet
// (that only happens once something calls persistRecords() -- e.g. stopping
// a running session -- so while a session is still actively ticking upward
// this is a live preview rather than committed state). Used to keep the
// calendar's ⭐/🎁 and the "プレゼントまであと〇日" countdown in sync with
// each other instead of one updating live and the other only catching up
// once the session is actually stopped.
function isTodayAchievedLive(){
  const todayStr = fmtDate(new Date());
  if(rewards.achievedDates.includes(todayStr)) return true; // already committed
  const totals = dateDayTotals(todayStr);
  return totals.hasGoal && totals.actualMin >= totals.goalMin;
}
function addDaysStr(dateStr, n){
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return fmtDate(d);
}
// The 2 independent reward categories a banked present can be spent on --
// おめかし(outfit) / ごはん(food). Order here only drives iteration (e.g.
// "does ANY category still have room" checks below); each category's own
// unlock ORDER is still just its own key order in pixel-arts-outfits.js
// (see categoryOrder()).
const REWARD_CATEGORIES = ['outfit', 'food'];
// The unlock order within a category is just that category's own key order
// in pixel-arts-outfits.js (collar→ribbon→crown, karikari→churu→sasami→nekokusa).
function categoryOrder(type){
  if(type === 'outfit') return (typeof OUTFIT_ART !== 'undefined') ? Object.keys(OUTFIT_ART) : [];
  if(type === 'food') return (typeof FOOD_ART !== 'undefined') ? Object.keys(FOOD_ART) : [];
  return [];
}
function categoryUnlockedCount(type){
  if(type === 'outfit') return rewards.outfitUnlockedCount;
  if(type === 'food') return rewards.foodUnlockedCount;
  return 0;
}
function categoryHasRoom(type){
  return categoryUnlockedCount(type) < categoryOrder(type).length;
}
// Unlocks the next item in `type`'s own order (if any is left) and returns
// {type,key}, or null if that category is already fully unlocked.
function unlockFromCategory(type){
  const order = categoryOrder(type);
  const count = categoryUnlockedCount(type);
  if(count >= order.length) return null;
  const key = order[count];
  const flatKey = `${type}:${key}`;
  if(!rewards.unlocked.includes(flatKey)) rewards.unlocked.push(flatKey);
  if(type === 'outfit') rewards.outfitUnlockedCount += 1;
  else if(type === 'food') rewards.foodUnlockedCount += 1;
  return { type, key };
}
// Once no category has anything left, any leftover banked choices (e.g. from
// successful weeks that piled up before the user visited Settings) have
// nothing left to spend on -- drop them rather than leaving a
// "プレゼントがあるよ" banner stuck on permanently with no buttons to press.
function clampPendingChoices(){
  if(!REWARD_CATEGORIES.some(categoryHasRoom)) rewards.pendingChoices = 0;
}
// Called when the user picks おめかし or えさ from the Settings choice
// prompt (see renderSettings()) in response to a banked pending choice.
function chooseReward(type){
  if(rewards.pendingChoices <= 0 || !categoryHasRoom(type)) return;
  const item = unlockFromCategory(type);
  rewards.pendingChoices = Math.max(0, rewards.pendingChoices - 1);
  clampPendingChoices();
  persistRewards();
  // showToast() only touches #toastHost now (renderToastHost()) -- it no
  // longer rebuilds #app itself (that's the whole point of splitting the
  // toast into its own DOM node, see renderToastHost()'s comment). So a
  // render() call here is NOT redundant: it's the only thing that updates
  // the Settings panel's own content -- the pendingChoices count, the "ほかに
  // n回選べます" text, and the newly-unlocked item now showing in the list.
  // Skipping it (as an earlier version of this function did, back when
  // showToast() itself called render()) is exactly what made a chosen item
  // stay invisible in the reward picker until some unrelated action finally
  // triggered a render() -- which is what "3回連続で選んでも無反応で、3回
  // 選び終わるとまとめて出てくる" was.
  //
  // toastedRewardKeys guard: each item key can only ever be unlocked once
  // (unlockFromCategory() won't re-return an already-unlocked item), so this
  // can never wrongly suppress a legitimate toast -- it only protects
  // against a redundant re-entry (e.g. a stale/duplicate Firebase apply)
  // trying to pop the same "手に入れました" a second time.
  if(item){
    const flatKey = `${item.type}:${item.key}`;
    if(!toastedRewardKeys.has(flatKey)){
      toastedRewardKeys.add(flatKey);
      showToast(t('rewardUnlockedToast')(rewardItemName(item)));
    }
  }
  render();
}
function rewardItemName(item){
  if(!item) return '';
  let art = null;
  if(item.type === 'outfit') art = typeof OUTFIT_ART!=='undefined' && OUTFIT_ART[item.key];
  else if(item.type === 'food') art = typeof FOOD_ART!=='undefined' && FOOD_ART[item.key];
  return art ? (art.name[LANG] || art.name.en) : item.key;
}
// The item currently shown as the "goal fish" at the end of the progress bar
// while it hasn't been reached yet: whatever ごはん is equipped, or the
// original fish if none is (see FOOD_ART's comment in pixel-arts-outfits.js).
function currentGoalFishArt(){
  if(rewards.equippedFood && typeof FOOD_ART!=='undefined' && FOOD_ART[rewards.equippedFood]) return FOOD_ART[rewards.equippedFood];
  return (typeof STRETCH_GOAL_MARKER!=='undefined') ? STRETCH_GOAL_MARKER : null;
}
// The item shown once the goal IS reached (100%): whatever ごはん is
// equipped swaps to ITS OWN `_fin`/`fin` art (see FOOD_ART's comment in
// pixel-arts-outfits.js -- same "eaten" mechanic as the original fish→bone
// swap), or the original bone (STRETCH_GOAL_MARKER_DONE) if none is equipped
// or the equipped food has no fin art of its own.
function currentGoalDoneArt(){
  if(rewards.equippedFood && typeof FOOD_ART!=='undefined' && FOOD_ART[rewards.equippedFood] && FOOD_ART[rewards.equippedFood].fin){
    return FOOD_ART[rewards.equippedFood].fin;
  }
  return (typeof STRETCH_GOAL_MARKER_DONE!=='undefined') ? STRETCH_GOAL_MARKER_DONE : null;
}
// Fully recomputes achievedDates/dailyStreak/giftProgressDays/legendaryUnlocked
// -- and banks/unlocks any newly-completed presents -- from scratch, from
// rewards.trackingStartDate through the latest "final" day, every single
// time this is called (see persistRecords(), which calls this after every
// records change, and the app-boot call further down). This is deliberately
// NOT an incremental walk that locks each day in forever: retroactively
// adding (or editing/deleting) a record for a PAST date -- e.g. via
// Report's "＋ ○○にタスクを追加" for a date other than today -- needs that
// day's ⭐/streak/gift contribution to update too, not just today's. Doing a
// full recompute is simpler and more correct than trying to patch an
// incremental cursor for arbitrary retroactive edits.
//
// - A "day" counts once it has a goal (dateDayTotals().hasGoal) and its
//   actual tracked time meets that combined goal. Today is included only
//   once it's actually achieved right now -- otherwise it's left out of the
//   walk entirely (not scored as a miss), so it naturally gets included the
//   moment it qualifies on some later call, without ever "locking in" a
//   too-early miss for a day that isn't over yet.
// - rewards.achievedDates ends up holding every achieved day in the tracked
//   range, in order -- purely the source of truth for the calendar's ⭐ and
//   for everything below, not itself read anywhere else.
// - rewards.dailyStreak = how many of the most recent scored days, walking
//   backward from the latest one, are achieved with no gap (a day with a
//   goal that wasn't achieved stops the count; a day with no goal at all is
//   neutral and doesn't affect it either way). LEGENDARY_STREAK_DAYS
//   consecutive days unlocks 伝説のねこ (sticky -- never re-locks).
// - Presents: rewards.achievedDates.length divided by GIFT_EVERY_DAYS (7) is
//   "how many presents should exist by now" in total. That's compared
//   against rewards.giftsGrantedCount, a monotonic counter of how many have
//   actually been banked/unlocked so far -- if the former is higher, the
//   difference gets banked (a pendingChoice if both categories still have
//   room, otherwise an automatic unlock) right now. giftsGrantedCount only
//   ever increases, even if a later edit shrinks achievedDates back down, so
//   already-granted presents never get silently clawed back or re-granted.
//   rewards.giftProgressDays (for the "プレゼントまであと〇日" countdown) is
//   just the remainder -- achievedDates.length % GIFT_EVERY_DAYS.
function evaluateRewards(){
  const todayStr = fmtDate(new Date());

  // trackingStartDate always covers at least every date that has any record
  // at all -- it auto-expands backward (never forward) to the earliest
  // records key whenever an earlier one shows up. Without this, a date
  // added via "＋ ○○にタスクを追加" for a day *before* trackingStartDate
  // (e.g. it was first set to "today" back when rewards.tt_rewards was
  // created, before that earlier date's record existed) would sit entirely
  // outside the walk below and could never earn its ⭐, no matter how much
  // time gets logged for it -- which is exactly the bug: adding a record
  // for a past date not yet covered silently did nothing.
  // 振替先の日（今日まで）も対象に含める。記録が1件もない過去日でも、
  // 振替で目標0分になっていれば達成として⭐が付くように。
  const carryTargetDates = [];
  tasks.forEach(tk=> taskCarryovers(tk).forEach(c=>{ if(c.to <= todayStr) carryTargetDates.push(c.to); }));
  const recordDates = [...Object.keys(records), ...carryTargetDates];
  const earliestRecordDate = recordDates.length ? recordDates.reduce((min, d) => d < min ? d : min) : todayStr;
  if(rewards.trackingStartDate === null || earliestRecordDate < rewards.trackingStartDate){
    rewards.trackingStartDate = earliestRecordDate;
  }

  const todayTotals = dateDayTotals(todayStr);
  const todayAchievedNow = todayTotals.hasGoal && todayTotals.actualMin >= todayTotals.goalMin;
  const latestDate = todayAchievedNow ? todayStr : addDaysStr(todayStr, -1);

  // --- rebuild achievedDates from scratch over [trackingStartDate, latestDate] ---
  const achievedDates = [];
  if(rewards.trackingStartDate <= latestDate){
    let cursor = rewards.trackingStartDate;
    let guard = 0;
    while(cursor <= latestDate && guard < 3660){ // ~10 years, just a sanity cap
      const totals = (cursor === todayStr) ? todayTotals : dateDayTotals(cursor);
      if(totals.hasGoal && totals.actualMin >= totals.goalMin) achievedDates.push(cursor);
      cursor = addDaysStr(cursor, 1);
      guard++;
    }
  }
  rewards.achievedDates = achievedDates;

  // --- dailyStreak: consecutive achieved days walking backward from latestDate ---
  let streak = 0;
  {
    let cursor = latestDate;
    let guard = 0;
    while(cursor >= rewards.trackingStartDate && guard < 3660){
      const totals = (cursor === todayStr) ? todayTotals : dateDayTotals(cursor);
      if(totals.hasGoal){
        if(totals.actualMin >= totals.goalMin) streak++;
        else break; // a real miss ends the streak
      } // no goal that day -- neutral, keep walking backward without counting it
      cursor = addDaysStr(cursor, -1);
      guard++;
    }
  }
  rewards.dailyStreak = streak;
  // No toast here anymore -- the unlock can land while the user isn't even
  // looking at the screen (this runs on every render/data change), so a
  // toast that vanishes in a few seconds could easily be missed entirely.
  // Instead this just flips the flag; the persistent top banner (see
  // render()'s hasLegendaryReady) and the pink "ready to open" ？？？ card in
  // Settings (see renderSettings()) both react to legendaryUnlocked directly
  // and stay up until the user actually taps the card open (revealLegendaryCat()).
  if(!rewards.legendaryUnlocked && streak >= LEGENDARY_STREAK_DAYS){
    rewards.legendaryUnlocked = true;
  }

  // --- presents: bank/unlock however many newly-completed groups of GIFT_EVERY_DAYS exist ---
  const totalGiftsNow = Math.floor(achievedDates.length / GIFT_EVERY_DAYS);
  rewards.giftProgressDays = achievedDates.length % GIFT_EVERY_DAYS;
  const newGifts = Math.max(0, totalGiftsNow - rewards.giftsGrantedCount);
  for(let i=0; i<newGifts; i++){
    const roomCategories = REWARD_CATEGORIES.filter(categoryHasRoom);
    if(roomCategories.length >= 2){
      // 2つ以上のカテゴリにまだ余地がある -- 自動で選ばず、Settingsで
      // ユーザー自身に選んでもらうための「保留中の選択」として積む。
      rewards.pendingChoices += 1;
    } else if(roomCategories.length === 1){
      // 残り1カテゴリしか余地がない場合、選ぶ必要はないのでそのまま解禁する。
      const unlocked = unlockFromCategory(roomCategories[0]);
      // Belt-and-suspenders against evaluateRewards() being re-entered for
      // an item it already toasted this session (e.g. from a redundant
      // Firebase apply that slips past the fbApplyRemote()/onSnapshot
      // guards above) -- never show the exact same "◯◯を手に入れました"
      // toast twice per load.
      if(unlocked){
        const flatKey = `${unlocked.type}:${unlocked.key}`;
        if(!toastedRewardKeys.has(flatKey)){
          toastedRewardKeys.add(flatKey);
          showToast(t('rewardUnlockedToast')(rewardItemName(unlocked)));
        }
      }
    } // else: everything already unlocked, nothing more to bank
    rewards.giftsGrantedCount += 1;
  }
  // giftEarnedDates (for the calendar's 🎁) mirrors however many presents are
  // both currently reflected in achievedDates AND actually granted --
  // capped at giftsGrantedCount so a later edit that shrinks achievedDates
  // can't make an already-granted present's marker point at the wrong day.
  const giftsToShow = Math.min(totalGiftsNow, rewards.giftsGrantedCount);
  const giftEarnedDates = [];
  for(let i=0; i<giftsToShow; i++) giftEarnedDates.push(achievedDates[(i+1)*GIFT_EVERY_DAYS - 1]);
  rewards.giftEarnedDates = giftEarnedDates;

  clampPendingChoices();
  persistRewards();
}
// How many more successful days are needed until the next present banks --
// shown in the startup banner as a little nudge, since a present no longer
// arrives from a single day's success.
function giftProgressCountdownInfo(){
  if(!REWARD_CATEGORIES.some(categoryHasRoom)) return null; // everything already unlocked
  const todayStr = fmtDate(new Date());
  // Preview one day ahead while today is achieved but not yet officially
  // committed (a session is still actively running, so persistRecords()
  // hasn't re-run evaluateRewards() yet) -- keeps this countdown moving in
  // step with the calendar's live ⭐ instead of only updating once the
  // session is actually stopped.
  const liveBonus = (!rewards.achievedDates.includes(todayStr) && isTodayAchievedLive()) ? 1 : 0;
  const daysRemaining = Math.max(0, GIFT_EVERY_DAYS - (rewards.giftProgressDays + liveBonus));
  return { daysRemaining };
}
// How many stars of the current GIFT_EVERY_DAYS-day cycle have been
// collected so far, for the ★★★☆☆☆☆-style gauge on the Summary tab. Mirrors
// giftProgressCountdownInfo()'s "preview today's live achievement" logic so
// the gauge fills in the instant today's goal is hit, not only once the
// session is stopped and persistRecords() re-runs evaluateRewards().
function giftGaugeInfo(){
  const todayStr = fmtDate(new Date());
  const liveBonus = (!rewards.achievedDates.includes(todayStr) && isTodayAchievedLive()) ? 1 : 0;
  const filled = Math.min(GIFT_EVERY_DAYS, rewards.giftProgressDays + liveBonus);
  return { filled, total: GIFT_EVERY_DAYS };
}
const LEGENDARY_COUNTDOWN_SHOW_WITHIN_DAYS = 5; // only start nudging once this close, not for the whole month
function legendaryCountdownInfo(){
  if(rewards.legendaryUnlocked) return null;
  const daysRemaining = Math.max(0, LEGENDARY_STREAK_DAYS - rewards.dailyStreak);
  if(daysRemaining > LEGENDARY_COUNTDOWN_SHOW_WITHIN_DAYS) return null;
  return { daysRemaining };
}
function selectOutfit(key){ rewards.equippedOutfit = key || null; persistRewards(); render(); }
function selectFood(key){ rewards.equippedFood = key || null; persistRewards(); render(); }
// Jumps to Settings from the "プレゼントがあるよ" banner and opens whichever
// category panels still have something left, so the おめかし・ごはん choice
// buttons are immediately visible without the user having to hunt for them.
function jumpToSettingsForGift(){
  if(categoryHasRoom('outfit')) showOutfitPanel = true;
  if(categoryHasRoom('food')) showFoodPanel = true;
  setTab('settings');
}
// Jumps to Settings from the "✨ シークレットが解禁されたよ" top banner (see
// render()'s hasLegendaryReady) and opens the ねこ panel so the pink "ready to
// open" ？？？ card is immediately visible, mirroring jumpToSettingsForGift()
// above.
function jumpToSettingsForLegendary(){
  showCatPanel = true;
  setTab('settings');
}
// Tapped while the シークレット (SECRET_CAT_ART) card is still locked, i.e.
// before rewards.legendaryUnlocked -- the card itself has no click handler
// beyond this, since it can't be selected yet.
function tapSecretCat(){ showToast(t('secretCatLockedToast')); }
// Tapped on the ？？？ card once rewards.legendaryUnlocked is already true but
// rewards.legendaryRevealed is still false, i.e. the "ready to open" pink
// state (see renderSettings()'s secretReady branch). This is the actual
// reveal moment: flips legendaryRevealed to true for good (persisted, and
// carried through Firebase sync -- see fbApplyRemote()'s monotonic merge),
// equips the Legendary Cat immediately so it's visible right away on the
// Timecard tab too instead of staying just a selectable card, and fires a
// one-time celebratory toast for the tap itself (unlike the silent
// background unlock in evaluateRewards(), this always happens while the user
// is looking right at it, so a toast is a good fit here).
function revealLegendaryCat(){
  if(!rewards.legendaryUnlocked || rewards.legendaryRevealed) return;
  rewards.legendaryRevealed = true;
  settings.pixelArt = 'gold';
  persistRewards();
  persistSettings();
  showToast(t('legendaryRevealedToast'));
  render();
}
// ---------- Firebase sync (Firestore doc per user; anonymous by default, Google to sync across devices) ----------
let fbUser = null;
let fbSaveTimer = null;
let fbApplyingRemote = false;
// ---- local-vs-remote sync guard (version-counter based) ----
// Earlier this used two booleans (fbPendingPush / localChangedBeforeFbReady)
// that each got set true when a push was needed and false once *a* push
// finished. That worked for a single isolated edit, but broke down for a
// SEQUENCE of edits made close together (exactly what choosing おめかし/えさ
// several times in a row does): if edit #1's debounced push was still
// in-flight when edit #2 happened, edit #2 correctly kept the guard up --
// but the MOMENT edit #1's push resolved, its `.finally(()=>{ fbPendingPush
// = false })` cleared the guard for the whole app, even though edit #2
// hadn't been pushed yet. Any onSnapshot delivery landing in that window
// (edit #1 confirmed, edit #2 still only local) would revert edit #2 right
// back out -- matching exactly what was reported: the *first* choice in a
// row always stuck, but the *second* (and later) ones flashed and reverted
// once, then stuck on a retry (because by the retry, that edit was now the
// newest one and nothing subsequent had reset the guard out from under it).
//
// Fixed by tracking versions instead of a shared on/off flag:
// - fbLocalVersion bumps by 1 on every local change that should reach
//   Firestore (every fbScheduleSave() call, whether or not Firebase is
//   ready yet to actually send it).
// - fbConfirmedVersion is set to the version a push captured, but only once
//   that specific push's setDoc() has actually resolved -- and only ever
//   moves forward (an older push resolving after a newer one can't step it
//   backward).
// - There's an unpushed/in-flight local change exactly when these two
//   differ (fbHasUnsyncedChange()). That's true from the instant *any*
//   edit happens until the push that actually covered the LATEST edit has
//   confirmed -- surviving any number of edits made back-to-back, and
//   naturally covering both original cases (Firebase not ready yet, and a
//   push/getDoc still in flight) with one mechanism instead of two.
let fbLocalVersion = 0;
let fbConfirmedVersion = 0;
function fbHasUnsyncedChange(){ return fbLocalVersion !== fbConfirmedVersion; }
let userPlan = 'free'; // 'free' | 'paid' — set only by the server (Cloud Function), never written by the client
let fbUnsubscribe = null; // unsubscribe fn for the currently-active onSnapshot listener, if any

function fbDocRef(){
  const f = window.__fb;
  return f.doc(f.db, 'users', fbUser.uid);
}
function fbScheduleSave(){
  if(fbApplyingRemote) return; // this write came from applying a remote snapshot, not a real local edit
  fbLocalVersion++;
  if(!fbUser || !window.__fb){
    // Firebase isn't ready to accept a push yet. Nothing more to do here --
    // fbHasUnsyncedChange() is already true (fbLocalVersion just moved past
    // fbConfirmedVersion), so the first sync (see fbLoadAndSubscribe()) will
    // push this edit up instead of overwriting it with whatever was on the
    // server before it happened.
    return;
  }
  clearTimeout(fbSaveTimer);
  fbSaveTimer = setTimeout(fbPushNow, 1200);
}
function fbPushNow(){
  if(!fbUser || !window.__fb) return;
  const f = window.__fb;
  // Capture which version this specific push is sending. If a newer edit
  // happens while this write is still in flight, fbLocalVersion moves past
  // this number *before* the write resolves -- so when it does resolve,
  // fbConfirmedVersion only advances to what THIS push actually covered,
  // and fbHasUnsyncedChange() correctly stays true for the newer edit
  // (rather than a shared flag getting blindly cleared for everything).
  const versionBeingPushed = fbLocalVersion;
  // Use mergeFields (NOT merge:true) so each listed top-level field is
  // replaced wholesale, rather than deep-merged. `records` is a map keyed by
  // date (see deleteSession/removeTask etc.), and Firestore's merge:true
  // recursively merges nested maps: a key that's present in the write gets
  // overwritten, but a key that's *absent* (e.g. a day's last session was
  // deleted, so that date was removed from `records` locally) is left
  // untouched on the server instead of being cleared. The next onSnapshot
  // (often from this very write's own round-trip) then pastes that
  // still-there date back into local state, making the delete silently undo
  // itself. mergeFields avoids that (each field is fully replaced) while
  // still not clobbering server-only fields like `plan` (set by a Cloud
  // Function), since `plan` isn't in this list.
  f.setDoc(fbDocRef(), { tasks, records, settings, rewards, updatedAt: f.serverTimestamp() }, { mergeFields: ['tasks', 'records', 'settings', 'rewards', 'updatedAt'] })
    .then(()=>{ if(versionBeingPushed > fbConfirmedVersion) fbConfirmedVersion = versionBeingPushed; })
    .catch(e=>console.error('firebase save failed', e));
}
function fbApplyRemote(data){
  if(!data) return;
  fbApplyingRemote = true;
  if(data.tasks) tasks = data.tasks;
  if(data.records) records = data.records;
  if(data.settings){
    settings = data.settings;
    if(!getCatArt(settings.pixelArt)) settings.pixelArt = Object.keys(PIXEL_ART_GRIDS)[0];
    if(!settings.theme || !THEME_NAMES[settings.theme]) settings.theme = 'original';
    if(!settings.pomodoro || !settings.pomodoro.templates || !settings.pomodoro.templates.length) settings.pomodoro = defaultSettings().pomodoro;
  }
  if(data.rewards){
    const incoming = Object.assign(defaultRewards(), data.rewards);
    // giftsGrantedCount (and the counts it gates) is documented in
    // defaultRewards() as monotonic -- never decreases. But a remote apply
    // can in principle carry an older snapshot (e.g. a race between getDoc()
    // and onSnapshot's first delivery, or another device that hasn't caught
    // up yet). Blindly overwriting `rewards` with that would walk these
    // counts backward, and the very next evaluateRewards() call would then
    // "discover" an already-unlocked item as newly unlocked again and re-pop
    // its 🎁 toast. Never let these monotonic-by-design fields regress on a
    // remote apply; take the max/union with whatever's already in memory
    // instead of trusting the remote value outright.
    if(rewards){
      incoming.giftsGrantedCount = Math.max(incoming.giftsGrantedCount, rewards.giftsGrantedCount);
      incoming.outfitUnlockedCount = Math.max(incoming.outfitUnlockedCount, rewards.outfitUnlockedCount);
      incoming.foodUnlockedCount = Math.max(incoming.foodUnlockedCount, rewards.foodUnlockedCount);
      incoming.legendaryUnlocked = incoming.legendaryUnlocked || rewards.legendaryUnlocked;
      incoming.legendaryRevealed = incoming.legendaryRevealed || rewards.legendaryRevealed;
      incoming.unlocked = Array.from(new Set([...rewards.unlocked, ...incoming.unlocked]));
    }
    rewards = incoming;
  }
  userPlan = data.plan === 'paid' ? 'paid' : 'free';
  save('tt_tasks', tasks); save('tt_records', records); save('tt_settings', settings); save('tt_rewards', rewards);
  fbApplyingRemote = false;
  evaluateRewards();
  applyTheme(); render();
}
async function fbLoadAndSubscribe(){
  const f = window.__fb;
  const ref = fbDocRef();
  try{
    const snap = await f.getDoc(ref);
    // A local edit already happened that this device hasn't confirmed
    // reaching Firestore yet (see fbHasUnsyncedChange() above) -- either
    // because Firebase wasn't ready to push it when it happened, or because
    // it happened while this very getDoc() call was in flight. Applying the
    // snapshot we just fetched would silently overwrite it with older
    // server data, so push the local state up instead of pulling the
    // snapshot down.
    if(fbHasUnsyncedChange()){
      fbPushNow();
    } else if(snap.exists() && snap.data() && (snap.data().tasks || snap.data().records)){
      if(isEditingModalOpen()){
        fbPendingRemoteData = snap.data();
      } else {
        fbApplyRemote(snap.data());
      }
    } else {
      fbPushNow();
    }
  }catch(e){ console.error('firebase initial load failed', e); }

  // onAuthStateChanged (see __loadFirebaseModule below) can fire more than
  // once during a single page load -- e.g. once for the anonymous session,
  // again once a Google redirect sign-in resolves, or just a redundant
  // re-fire while auth state settles. Each fire re-runs this whole function
  // via the 'fb-auth' listener. Without unsubscribing the previous listener
  // first, every extra fire stacked ANOTHER onSnapshot() on top of the
  // previous one(s), so a single Firestore update (including the echo of our
  // own writes) ran fbApplyRemote() once per stacked listener -- popping the
  // same "手に入れました" toast multiple times in a row. Always drop the old
  // subscription before attaching a new one.
  if(fbUnsubscribe){ fbUnsubscribe(); fbUnsubscribe = null; }
  fbUnsubscribe = f.onSnapshot(ref, (snap)=>{
    if(fbApplyingRemote || fbHasUnsyncedChange() || snap.metadata.hasPendingWrites) return;
    if(snap.exists()){
      if(isEditingModalOpen()){
        // 編集モーダルが開いている間はDOMを作り直さない (上の
        // fbPendingRemoteData の説明を参照)。閉じた/保存したタイミングで
        // renderNow() 側が拾って適用する。
        fbPendingRemoteData = snap.data();
      } else {
        fbApplyRemote(snap.data());
      }
    }
  }, (e)=>console.error('firebase snapshot error', e));
}
function fbIsStandalone(){
  return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
    }

    function fbSignInGoogle() {
        const f = window.__fb;
        if (!f) { console.warn('fbSignInGoogle: Firebase not ready yet'); return; }
        const provider = new f.GoogleAuthProvider();
        const cur = f.auth.currentUser;

        console.log('fbSignInGoogle: starting redirect sign-in…');

        // ポップアップを廃止し、すべてリダイレクトに統一
        (cur && cur.isAnonymous ? f.linkWithRedirect(cur, provider) : f.signInWithRedirect(f.auth, provider))
            .catch((e) => {
                console.error('google redirect sign-in failed', e && e.code, e);
                alert(t('syncErrorAlert') + (e && e.code ? ` (${e.code})` : ''));
            });
    }
function fbSignOut(){
  const f = window.__fb;
  if(!f) return;
  f.signOut(f.auth).catch(()=>{});
}

function fbUpgradeToPaid(btn){
  const f = window.__fb;
  if(!f || !f.createCheckoutSession) return;
  if(btn){ btn.disabled = true; btn.textContent = t('planUpgradeLoading'); }
  f.createCheckoutSession()
    .then((result)=>{
      const url = result && result.data && result.data.url;
      if(url) window.location.href = url;
      else throw new Error('no checkout url returned');
    })
    .catch((e)=>{
      console.error('checkout session failed', e);
      // ADS_APPROVEDに合わせて「広告なし版」/「開発者を応援」どちらの表記に
      // 戻すかを揃える（renderUpgradeBar()のbtnKeyと同じ切替ロジック）。
      if(btn){ btn.disabled = false; btn.textContent = t(ADS_APPROVED ? 'planUpgradeBtn' : 'planSupportBtn'); }
      if(e && e.code === 'functions/failed-precondition'){
        if(confirm(t('planUpgradeLoginRequired'))){ fbSignInGoogle(); }
        return;
      }
      alert(t('planUpgradeError'));
    });
}
window.addEventListener('fb-ready', ()=>{
  if(window.__fb.user){ fbUser = window.__fb.user; fbLoadAndSubscribe(); }
  render();
});
window.addEventListener('fb-auth', (e)=>{
  fbUser = e.detail;
  fbLoadAndSubscribe();
  render();
});

// ---------- backup export / import ----------
// ---------- backup reminder (standalone/home-screen users have no cloud sync fallback) ----------
function markBackedUp(){
  try{ localStorage.setItem('tt_lastBackupAt', String(Date.now())); }catch(e){}
}
function daysSinceBackup(){
  let ts = null;
  try{ ts = localStorage.getItem('tt_lastBackupAt'); }catch(e){}
  if(!ts) return null; // never backed up
  return Math.floor((Date.now() - Number(ts)) / (1000*60*60*24));
}
function dismissBackupReminder(){
  try{ sessionStorage.setItem('tt_backupReminderDismissed', '1'); }catch(e){}
  const el = document.getElementById('backupReminderBanner');
  if(el) el.remove();
}
function renderBackupReminder(){
  // Only relevant for standalone (home-screen) users who aren't relying on cloud sync,
  // since their only safety net is the manual export/import backup.
  if(!fbIsStandalone()) return '';
  const f = window.__fb;
  const isCloudSynced = f && f.auth && f.auth.currentUser && !f.auth.currentUser.isAnonymous;
  if(isCloudSynced) return '';
  let dismissed = false;
  try{ dismissed = sessionStorage.getItem('tt_backupReminderDismissed') === '1'; }catch(e){}
  if(dismissed) return '';
  const days = daysSinceBackup();
  const msg = (days === null) ? t('backupReminderNever') : (days >= 30 ? t('backupReminderStale').replace('{days}', days) : '');
  if(!msg) return '';
  return `<div id="backupReminderBanner" style="display:flex;align-items:center;gap:8px;justify-content:space-between;background:var(--panel2);border:2px solid var(--lineS);border-radius:10px;padding:8px 12px;margin-bottom:10px;font-size:12px;color:var(--dim);">
    <span>${msg}</span>
    <button class="icobtn" style="width:auto;padding:0 8px;flex-shrink:0;" onclick="dismissBackupReminder()">${t('backupReminderDismiss')}</button>
  </div>`;
}

function exportData(){
  const payload = { tasks, records, settings, rewards, exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `timecard-backup-${fmtDate(new Date())}.json`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(url), 3000);
  markBackedUp();
}
function importDataFile(event){
  const file = event.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ()=>{
    try{
      const payload = JSON.parse(reader.result);
      if(!confirm(t('importConfirm'))) { event.target.value=''; return; }
      tasks = payload.tasks || [];
      records = payload.records || {};
      settings = payload.settings || defaultSettings();
      if(!getCatArt(settings.pixelArt)) settings.pixelArt=Object.keys(PIXEL_ART_GRIDS)[0];
      if(!settings.theme || !THEME_NAMES[settings.theme]) settings.theme='original';
      if(!settings.pomodoro || !settings.pomodoro.templates || !settings.pomodoro.templates.length) settings.pomodoro = defaultSettings().pomodoro;
      rewards = Object.assign(defaultRewards(), payload.rewards || {});
      Object.keys(records).forEach(date=>{
        if(!Array.isArray(records[date])){
          const old = records[date];
          if(!old.id) old.id = uid();
          records[date] = [old];
        }
      });
      persistTasks(); persistRecords(); persistSettings(); persistRewards();
      // persistRecords() above already re-runs evaluateRewards() against the
      // freshly-imported tasks/records/rewards (assigned earlier in this
      // function), so no separate call is needed here.
      markBackedUp();
      render();
      alert(t('importSuccess'));
    }catch(e){
      alert(t('importFail'));
    }
    event.target.value = '';
  };
  reader.readAsText(file);
}

// ---------- factory reset (delete all data) ----------
function resetAllData(){
  if(!confirm(t('resetAllConfirm'))) return;

  // Cancel any debounced Firebase push still pending from an edit made just
  // before the reset (fbScheduleSave() waits 1200ms before actually calling
  // fbPushNow()). Left uncancelled, that stale push can fire *after* this
  // function's own Firestore write below finishes -- using the pre-reset
  // tasks/records still sitting in memory -- and silently overwrite the
  // freshly-seeded cloud doc. That race is why "出荷時に戻す" could
  // sometimes come back with the old task list instead of just "Sample".
  clearTimeout(fbSaveTimer);
  // Also drop tracking of any not-yet-confirmed local edit from before the
  // reset (see fbHasUnsyncedChange() above) -- everything about to happen
  // below is the fresh reset state, not a change that needs guarding.
  fbLocalVersion = 0;
  fbConfirmedVersion = 0;

  // "出荷時に戻す" = land back on exactly what a brand-new install shows, which is
  // one "Sample" task (see factorySampleTasks()) -- not a totally empty list.
  // Generate it once and write the *same* object to both local storage and the
  // cloud copy below, so whichever one the reload ends up reading from, the
  // result is identical (no flicker/race between "empty" and "seeded").
  const seedTasks = factorySampleTasks();

  // Also update the in-memory copies (not just localStorage below) so that if
  // anything else reads or persists state during the async gap before
  // location.reload() actually happens, it sees the reset data rather than
  // whatever was in memory right before the reset was triggered.
  tasks = seedTasks;
  records = {};
  settings = defaultSettings();
  rewards = defaultRewards();

  const finish = ()=>{
    try{
      save('tt_tasks', seedTasks);
      localStorage.removeItem('tt_records');
      localStorage.removeItem('tt_settings');
      localStorage.removeItem('tt_last_tab');
      localStorage.removeItem('tt_lastBackupAt');
      localStorage.removeItem('tt_rewards');
      localStorage.removeItem('tt_locations'); // legacy pre-migration key
    }catch(e){}
    try{ sessionStorage.removeItem('tt_backupReminderDismissed'); }catch(e){}
    // Reload so every in-memory variable (tasks/records/settings/tab/pomodoro state/etc.)
    // starts fresh from storage, the same way it would for a new install.
    location.reload();
  };

  // If cloud sync is active (fbUser is set for anonymous users too -- see the
  // Firebase sync section above), the synced copy in Firestore has to be reset
  // as well. Otherwise the onSnapshot listener would just pull the old data back
  // down again right after reload. `merge:true` recursively merges nested maps
  // instead of replacing them (see fbPushNow's comment), so setting
  // records:{} with merge wouldn't actually clear existing dates -- a full,
  // non-merge overwrite is required. That would also drop server-only fields
  // like `plan` (set by a Cloud Function, never by the client), so read the
  // current value first and carry it forward untouched.
  if(fbUser && window.__fb){
    const f = window.__fb;
    f.getDoc(fbDocRef()).then(snap=>{
      const payload = { tasks: seedTasks, records: {}, settings: defaultSettings(), rewards: defaultRewards(), updatedAt: f.serverTimestamp() };
      if(snap.exists() && snap.data().plan !== undefined) payload.plan = snap.data().plan;
      return f.setDoc(fbDocRef(), payload);
    }).catch(e=>console.error('firebase reset failed', e))
      .finally(finish);
  } else {
    finish();
  }
}

// ---------- actions ----------
function activeSessionToday(){
  const arr = records[fmtDate(new Date())] || [];
  return arr.find(s=> s.status==='working' || s.status==='paused');
}
function doStart(){
  const task = tasks.find(t=>t.id===selectedTaskId);
  if(!task) return;
  const todayStr = fmtDate(new Date());
  const arr = records[todayStr] || [];
  if(arr.some(s=> s.status==='working' || s.status==='paused')) return; // guard: one active session at a time
  const now = new Date().toISOString();
  const session = {
    id: uid(), date: todayStr, taskId: task.id, taskName: task.name,
    segments: [], currentStart: now, status:'working', memo:'',
  };
  records[todayStr] = [...arr, session];
  persistRecords();
  if(settings.pomodoro.autoEnable){
    const t = settings.pomodoro.templates.find(x=>x.id===settings.pomodoro.activeTemplateId) || settings.pomodoro.templates[0];
    pomodoroState = {sessionId:session.id, templateId:t.id, phase:'work', remainingMs:t.work*60000, running:true, cycleCount:0};
  }
  render();
}
function doPause(){
  const s = activeSessionToday(); if(!s || s.status!=='working') return;
  const now = new Date().toISOString();
  s.segments.push({start:s.currentStart, end:now});
  s.currentStart = null; s.status='paused';
  if(pomodoroState && pomodoroState.sessionId===s.id) pomodoroState.running=false;
  persistRecords(); render();
}
function doResume(){
  const s = activeSessionToday(); if(!s || s.status!=='paused') return;
  s.currentStart = new Date().toISOString(); s.status='working';
  if(pomodoroState && pomodoroState.sessionId===s.id) pomodoroState.running=true;
  persistRecords(); render();
}
function doEnd(dateKey, sessionId){
  let s;
  if(dateKey && sessionId){
    s = (records[dateKey]||[]).find(x=>x.id===sessionId);
  } else {
    dateKey = fmtDate(new Date());
    s = activeSessionToday();
  }
  if(!s || s.status==='done') return;
  if(s.status==='working' && s.currentStart){
    s.segments.push({start:s.currentStart, end:new Date().toISOString()});
  }
  s.currentStart = null; s.status='done';
  if(pomodoroState && pomodoroState.sessionId===s.id) pomodoroState=null;
  persistRecords(); render();
}
function deleteSession(date, sessionId){
  if(!confirm(t('deleteRecordConfirm')(date, (records[date]||[]).find(x=>x.id===sessionId)?.taskName||''))) return;
  records[date] = (records[date]||[]).filter(x=>x.id!==sessionId);
  if(records[date].length===0) delete records[date];
  if(pomodoroState && pomodoroState.sessionId===sessionId) pomodoroState=null;
  persistRecords(); render();
}

// ---------- pomodoro ----------
function playBeep(){
  try{
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type='sine'; o.frequency.value = 880; g.gain.value=0.16;
    o.start();
    setTimeout(()=>{ o.frequency.value=1160; }, 120);
    o.stop(ctx.currentTime+0.28);
    setTimeout(()=>ctx.close(), 500);
  }catch(e){}
}
function togglePomodoro(sessionId){
  if(pomodoroState && pomodoroState.sessionId===sessionId){ pomodoroState=null; render(); return; }
  const s = activeSessionToday();
  if(!s || s.id!==sessionId) return;
  const t = settings.pomodoro.templates.find(x=>x.id===settings.pomodoro.activeTemplateId) || settings.pomodoro.templates[0];
  pomodoroState = {sessionId, templateId:t.id, phase:'work', remainingMs:t.work*60000, running: s.status==='working', cycleCount:0};
  render();
}
function advancePomodoroPhase(){
  const t = settings.pomodoro.templates.find(x=>x.id===pomodoroState.templateId) || settings.pomodoro.templates[0];
  playBeep();
  if(navigator.vibrate) navigator.vibrate([200,100,200]);
  if(pomodoroState.phase==='work'){
    pomodoroState.cycleCount++;
    const useLong = t.longBreakEvery>0 && t.longBreak>0 && pomodoroState.cycleCount % t.longBreakEvery === 0;
    pomodoroState.phase = useLong ? 'longBreak' : 'break';
    pomodoroState.remainingMs = (useLong ? t.longBreak : t.break) * 60000;
  } else {
    pomodoroState.phase = 'work';
    pomodoroState.remainingMs = t.work * 60000;
  }
}
function setActiveTemplate(id){ settings.pomodoro.activeTemplateId=id; persistSettings(); render(); }
function togglePomodoroAutoEnable(){ settings.pomodoro.autoEnable=!settings.pomodoro.autoEnable; persistSettings(); render(); }
function openPomodoroForm(){ pomodoroDraft = {name:'', work:25, break:5}; showPomodoroForm=true; render(); }
function closePomodoroForm(){ showPomodoroForm=false; pomodoroDraft=null; render(); }
function updatePomodoroDraft(key, value, isNum){ pomodoroDraft[key] = isNum ? Number(value) : value; }
function savePomodoroTemplate(){
  if(!pomodoroDraft.name.trim()){ alert(t('enterTemplateNameAlert')); return; }
  if(!pomodoroDraft.work || !pomodoroDraft.break){ alert(t('enterFocusBreakAlert')); return; }
  settings.pomodoro.templates.push({id:uid(), name:pomodoroDraft.name.trim(), work:Number(pomodoroDraft.work), break:Number(pomodoroDraft.break), longBreakEvery:0, longBreak:0, builtin:false});
  persistSettings();
  showPomodoroForm=false; pomodoroDraft=null;
  render();
}
function deletePomodoroTemplate(id){
  if(!confirm(t('deleteTemplateConfirm'))) return;
  settings.pomodoro.templates = settings.pomodoro.templates.filter(t=>t.id!==id);
  if(settings.pomodoro.activeTemplateId===id) settings.pomodoro.activeTemplateId = settings.pomodoro.templates[0]?.id;
  persistSettings(); render();
}
function selectPixelArt(key){ settings.pixelArt=key; persistSettings(); render(); }

function renderPomodoroPanel(session){
  const templates = settings.pomodoro.templates;
  const active = templates.find(t=>t.id===settings.pomodoro.activeTemplateId) || templates[0];
  const ps = (session && pomodoroState && pomodoroState.sessionId===session.id) ? pomodoroState : null;
  const phaseLabel = {work:t('phaseWork'), break:t('phaseBreak'), longBreak:t('phaseLongBreak')};
  const phaseColor = ps ? (ps.phase==='work' ? 'var(--brass)' : 'var(--blue)') : 'var(--dim)';
  return `<div class="panel" style="padding:16px;margin-bottom:16px;">
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <div style="font-size:12px;color:var(--dim);display:flex;align-items:center;gap:4px;">${renderIconArt(TASK_ICON_ART.focustimer, 0.6)}${t('focusTimer')}</div>
      ${session? `<div class="switch ${ps?'on':''}" onclick="togglePomodoro('${session.id}')"><div class="knob"></div></div>` : ''}
    </div>
    ${ps? `
      <div style="text-align:center;margin-top:10px;">
        <div class="mono" style="font-size:11px;color:var(--dim);margin-bottom:4px;display:flex;align-items:center;justify-content:center;gap:3px;">${phaseLabel[ps.phase]} ・ ${renderIconArt(TASK_ICON_ART.focustimer, 0.5)}×${ps.cycleCount}</div>
        <div id="pomoTimer" class="pixnum" style="font-size:20px;color:${phaseColor};">${msToHMS(Math.max(0,ps.remainingMs)).slice(3)}</div>
      </div>` : `
      <div class="field" style="margin:10px 0 0;"><label>${t('templateLabel')}</label>
        <select onchange="setActiveTemplate(this.value)">
          ${templates.map(tp=>`<option value="${tp.id}" ${active&&tp.id===active.id?'selected':''}>${escapeHtml(tp.name)}${t('templateOption')(tp.work,tp.break)}</option>`).join('')}
        </select>
      </div>
      ${!session? `<div style="font-size:11px;color:var(--faint);margin-top:8px;">${t('focusTimerHint')}</div>` : ''}`}
  </div>`;
}

// ---------- render ----------
// render() is called from dozens of onclick="..." handlers, often more than
// once for a single user action (e.g. chooseReward() below used to call it
// twice). Each call tears down and rebuilds #app's innerHTML synchronously,
// inside the same click/touch event that's still being dispatched --
// including whatever element the user's finger/cursor is still on top of.
// On touch devices that's a known source of misdirected/duplicate follow-up
// events (the browser can resolve the rest of that tap's event sequence
// against whatever new element now sits at those same coordinates).
// NOTE: this turned out NOT to be the cause of the "選んだものが一瞬で消える" /
// "トーストが2〜3回連続で出る" report -- that was a separate Firebase-sync
// race (see fbHasUnsyncedChange() / fbLoadAndSubscribe() below), now fixed
// there. This render() change is still a real, independent
// improvement (avoids redundant double DOM rebuilds and removes the touch
// hazard described above) so it's kept, just no longer credited with fixing
// the reported bug by itself.
//
// Fix: renderNow() (the actual DOM rebuild) is deferred to the next
// requestAnimationFrame, and repeated render() calls made before that frame
// fires are coalesced into a single rebuild using the latest state. This
// lets the browser finish dispatching the current tap against the original,
// still-present element before the DOM underneath it changes, and also
// makes back-to-back render() calls (like the old chooseReward() double
// call) free instead of doing the work twice.
let renderPending = false;
function render(){
  if(renderPending) return;
  renderPending = true;
  requestAnimationFrame(renderNow);
}
function renderNow(){
  renderPending = false;
  // 編集モーダルが閉じた/保存されて renderNow() が呼ばれたタイミングで、
  // 保留していたリモート更新があれば安全に適用する(上の
  // fbPendingRemoteData の説明を参照)。fbApplyRemote() 自身も末尾で
  // render() を呼ぶので、ここでは反映だけして今回のフレームの描画は
  // そのまま続ける(次のrAFで最新状態を使って再描画される)。
  if(fbPendingRemoteData && !isEditingModalOpen()){
    const pending = fbPendingRemoteData;
    fbPendingRemoteData = null;
    // バグ修正(2026-08-24): ここが呼ばれるのはモーダルが閉じた/保存された直後
    // だが、保留していたスナップショット(pending)は「モーダルが開いている間に
    // 届いた=保存前」のものなので、まさにこのタイミングで保存した編集より
    // 古い可能性がある。fbHasUnsyncedChange()を確認せずに無条件でfbApplyRemote()
    // していたため、「Save→モーダルは閉じるが一覧に反映されない/元に戻る」という
    // 不具合が起きていた(タスクの追加・編集がこの経路を必ず通るため、症状として
    // 追加・編集全般が効かないように見えていた)。ライブの onSnapshot 側は同じ
    // 状況を fbHasUnsyncedChange() で正しくガードしているので、ここも同じガードを
    // 適用する: 保存直後で未同期の変更がまだ残っている場合は、この古いスナップ
    // ショットを破棄し、上書きしない。この編集自体のプッシュが確定すれば、次に
    // 届く onSnapshot が最新状態を運んでくるので、データが失われることはない。
    if(!fbHasUnsyncedChange()){
      fbApplyRemote(pending);
    }
  }
  const app = document.getElementById('app');
  const today = new Date();
  const todayStr = fmtDate(today);
  const weekday = today.getDay();
  const suggested = tasks.filter(t => !t.archived && (t.days||[]).includes(weekday));
  if(!activeSessionToday() && !selectedTaskId && tasks.length){
    selectedTaskId = (suggested[0]||tasks[0]).id;
  }
  const unfinished = [];
  Object.entries(records).forEach(([date, arr])=>{
    if(date===todayStr) return;
    arr.forEach(s=>{ if(s.status!=='done') unfinished.push(s); });
  });

    const titlePrefix = settings.userName ? escapeHtml(settings.userName) : 'My';
    // 描画する時にも「日本語（半角英数字以外）」が含まれているか判定する
    const isJa = /[^ -~]/.test(titlePrefix);

    let html = `
    <header>
      <div class="eyebrow">
        <span id="header-username" class="user-name-part ${isJa ? 'is-ja' : ''}">${titlePrefix}</span>
        <span class="fixed-part">TIMECAT</span>
      </div>
    </header>`;

  if(unfinished.length){
    html += `<div class="banner">
      <div style="display:flex;align-items:flex-start;gap:8px;">
        <div style="font-size:13px;">
          <div style="color:var(--rust);margin-bottom:6px;">${t('unfinishedBanner')}</div>
          ${unfinished.map(r=>`
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;color:var(--dim);">
              <span class="mono">${r.date}</span><span>${escapeHtml(r.taskName)}</span>
              <button onclick="doEnd('${r.date}','${r.id}')" style="margin-left:auto;font-size:12px;color:var(--brass);background:none;border:1px solid var(--brassDim);border-radius:6px;padding:2px 8px;cursor:pointer;">${t('endNow')}</button>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
  }

  // gamification nudges: a "プレゼントがあるよ" notice once a present is
  // waiting to be spent on おめかし/えさ (tap it to jump to Settings), and --
  // only once within LEGENDARY_COUNTDOWN_SHOW_WITHIN_DAYS days -- a
  // silhouette-teased countdown to the Legendary Cat. Shown on every tab,
  // same as the unfinished-records banner above. The day-by-day「プレゼント
  // まであと〇日」nudge used to live here too, but it's been consolidated
  // into the ⭐ gauge on the Summary tab instead (see giftGaugeInfo()), so the
  // user can check streak/present progress in one stable place rather than a
  // constantly-shifting top banner.
  const hasPendingGift = rewards.pendingChoices > 0;
  const legendaryInfo = legendaryCountdownInfo();
  // Same slot/style as the "🎁 プレゼントがあるよ" row above -- shown once
  // legendaryUnlocked flips true and stays up (on every tab, like the gift
  // row) until the user actually taps the ？？？ card open in Settings (see
  // revealLegendaryCat()), instead of the old one-shot toast that could be
  // missed entirely if the unlock happened while the user wasn't looking.
  const hasLegendaryReady = rewards.legendaryUnlocked && !rewards.legendaryRevealed;
  if(hasPendingGift || hasLegendaryReady || legendaryInfo){
    html += `<div class="panel" style="padding:12px 14px;margin-bottom:16px;font-size:12px;color:var(--dim);display:flex;flex-direction:column;gap:8px;">
      ${hasPendingGift ? `<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;cursor:pointer;" onclick="jumpToSettingsForGift()">
          <span>🎁 ${t('giftReadyBanner')}</span>
          <span style="color:var(--brassDim);font-weight:700;flex-shrink:0;">${t('giftReadyCta')} ›</span>
        </div>` : ''}
      ${hasLegendaryReady ? `<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;cursor:pointer;" onclick="jumpToSettingsForLegendary()">
          <span>${t('legendaryUnlockedBanner')}</span>
          <span style="color:var(--brassDim);font-weight:700;flex-shrink:0;">${t('giftReadyCta')} ›</span>
        </div>` : ''}
      ${legendaryInfo ? `<div style="display:flex;align-items:center;gap:8px;">
          <span style="flex-shrink:0;line-height:0;">${renderPixelArtSilhouette('gold', 0.55, 'sitting', 0.3)}</span>
          <span>🌟 ${t('legendaryCountdown')(legendaryInfo.daysRemaining)}</span>
        </div>` : ''}
    </div>`;
  }

  html += `<nav>
    <button class="${tab==='punch'?'active':''}" onclick="setTab('punch')">Timecard</button>
    <button class="${tab==='tasks'?'active':''}" onclick="setTab('tasks')">Tasks</button>
    <button class="${tab==='report'?'active':''}" onclick="setTab('report')">Summary</button>
    <button class="${tab==='settings'?'active':''}" onclick="setTab('settings')">Settings</button>
  </nav>`;

  // タブ切り替え直後だけ軽いスライド演出をつける（CSSアニメーションのみ・毎フレームのJS計算なし）
  const slideClass = tabSlideDir==='fwd' ? 'tab-slide-fwd' : (tabSlideDir==='back' ? 'tab-slide-back' : '');
  tabSlideDir = null; // 一度使ったら消費する（タブ切り替え以外のrender()で毎回再生されないように）
  html += `<div id="tabcontent" class="${slideClass}"></div>`;
  app.innerHTML = html;

  const content = document.getElementById('tabcontent');
  if(tab==='punch') content.innerHTML = renderPunch(today, todayStr, weekday, suggested);
  else if(tab==='tasks') content.innerHTML = renderTasks();
  else if(tab==='settings') content.innerHTML = renderSettings();
  else content.innerHTML = renderReport();

  if(showTaskForm) renderTaskModal();
  if(editingRecordDate) renderRecordEditModal();
  if(showAddRecord) renderAddRecordModal();
  if(showDuplicate) renderDuplicateModal();
  if(showPomodoroForm) renderPomodoroFormModal();
  if(editingMemoDate) renderMemoModal();
  if(carryoverDraft) renderCarryoverModal();
}

// 打刻画面用：その日の目標（振替で減っていればその分を反映）。
// covered=true は「振替で目標が0分になった」状態で、達成済み(100%)として扱う。
function taskGoalInfoForDate(task, dateStr){
  const base = taskGoalHours(task);
  const carryIn = base ? taskCarryInMin(task, dateStr) : 0;
  if(!carryIn) return { hours: base, covered: false };
  const hours = Math.max(0, base - carryIn/60);
  return { hours, covered: hours <= 0 };
}
function goalPercent(ms, g){
  if(g.covered) return 100;
  return g.hours>0 ? Math.min(100, (ms/3600000/g.hours)*100) : 0;
}
function goalInfoLabel(g){ return g.covered ? t('hm')(0,0) : taskGoalHoursLabel(g.hours); }
function taskGoalHoursLabel(hours){
  if(!hours) return t('noGoalSet');
  const totalMin = Math.round(hours*60);
  const h = Math.floor(totalMin/60);
  const m = totalMin%60;
  return t('hm')(h,m);
}

function renderPunch(today, todayStr, weekday, suggested){
  const todaySessions = records[todayStr] || [];
  const activeSession = todaySessions.find(s=> s.status==='working' || s.status==='paused');
  const otherSessions = todaySessions.filter(s=> s !== activeSession);
  const status = activeSession ? activeSession.status : 'none';
  const locked = !!activeSession;
  const ms = activeSession ? computeWorkMs(activeSession) : 0;
  const selectableTasks = tasks.filter(t=>!t.archived);

  if(selectableTasks.length===0){
    return `<div class="panel empty">${t('noActiveTasks')}</div>`;
  }

  if(!locked && (!selectedTaskId || !selectableTasks.some(t=>t.id===selectedTaskId))){
    selectedTaskId = (suggested[0]||selectableTasks[0]).id;
  }
  const currentTaskId = locked ? activeSession.taskId : selectedTaskId;
  const currentTask = tasks.find(t=>t.id===currentTaskId);
  const goalInfo = taskGoalInfoForDate(currentTask, todayStr);
  const percent = goalPercent(ms, goalInfo);

  const statusMap = {working:['var(--brass)',t('statusWorking')], paused:['var(--blue)',t('statusPaused')], none:['var(--faint)',t('statusNone')]};
  const [sColor,sLabel] = statusMap[status];

  const chipTasks = locked && currentTask && currentTask.archived ? [currentTask, ...selectableTasks] : selectableTasks;
  const chipsHtml = chipTasks.map(t=>{
    const isCurrent = t.id===currentTaskId;
    let cls = 'projchip';
    let style = '';
    if(locked){
      cls += isCurrent ? ' running' : ' grayout';
      if(isCurrent) style = `background:${taskColor(t.id)};border-color:${taskColor(t.id)};`;
    } else if(isCurrent){
      cls += ' selected';
    }
    const onclick = locked ? '' : `onclick="selectedTaskId='${t.id}'; render();"`;
    return `<div class="${cls}" style="${style}" ${onclick}>
      <span class="sq" style="background:${isCurrent&&locked?'rgba(255,255,255,0.85)':taskColor(t.id)};"></span>${escapeHtml(t.name)}
    </div>`;
  }).join('');

  let buttonsHtml;
  if(status==='none'){
    buttonsHtml = `<div class="btnrow"><button class="bigbtn primary" onclick="doStart()">${t('start')}</button></div>`;
  } else {
    const toggleLabel = status==='working' ? t('pauseBtn') : t('resumeBtn');
    const toggleClass = status==='working' ? 'pale' : 'primary';
    const toggleOnclick = status==='working' ? 'doPause()' : 'doResume()';
    buttonsHtml = `<div class="btnrow">
      <button class="bigbtn ${toggleClass}" style="flex:2;" onclick="${toggleOnclick}">${toggleLabel}</button>
      <button class="bigbtn secondary" style="flex:1;" onclick="doEnd()">${t('endBtn')}</button>
    </div>`;
  }

  const barStyleIsStretch = settings.barStyle==='stretch';
  const stretchMode = barStyleIsStretch && status!=='none';
  // At literal 0% the moving head sits almost exactly on top of the fixed
  // tail, which reads as a messy overlap. Give the head a small head start
  // visually (the actual elapsed-time text below is unaffected).
  const stretchDisplayPercent = Math.max(percent, 2);
  // Normal mode: the walking cat sprite is anchored via translateX(-30%), so
  // its own right edge extends ~70% of its width past the "left:percent%"
  // point -- left uncapped, it overflows past the track at 100%. Cap it the
  // same way as stretch mode, and show the same fish/bone goal marker.
  const walkCellActual = 1.8 * 1.5;
  const walkSpriteWidthPx = 16 * walkCellActual;
  const walkRightExtendPx = walkSpriteWidthPx * 0.7;
  const walkGoalClearancePx = 10;
  // The bar itself (progressfill) and the cat sprite are intentionally on
  // separate scales: the bar always fills to literally 100% width at the
  // goal, while the cat has its own "100%" -- the position just clear of the
  // goal marker, which reads as it having walked up to and eaten the fish.
  // Scaling the whole 0-100% range onto [0, that position] means the cat
  // keeps walking the entire time and arrives exactly at the goal instant,
  // instead of arriving early and then just standing there.
  const walkCappedLeft = `calc((100% - ${walkRightExtendPx}px - ${walkGoalClearancePx}px) * ${percent} / 100)`;
  const walkReachedGoal = percent>=100;
  // Match stretch mode: the fish/bone only appears once a session has
  // actually started (はじめる pressed), not before.
  const walkShowGoal = status!=='none';
  const walkGoal = !walkShowGoal ? null : (walkReachedGoal ? currentGoalDoneArt() : currentGoalFishArt());
  const walkGoalHTML = walkGoal ? renderStretchPart(walkGoal.grid, walkGoal.colors, 2.5) : '';
  const barHTML = stretchMode
    ? renderStretchProgressBar(settings.pixelArt, stretchDisplayPercent, status==='working', undefined, undefined, status==='paused')
    : (barStyleIsStretch
        ? `<div class="catwalk stretch-idle" style="left:0%;">${renderCatWithOutfit(settings.pixelArt, 1.8, 'sitting')}</div>`
        : `<div class="catwalk ${status==='working'?'walking':''}" style="left:${walkCappedLeft};">${renderCatWithOutfit(settings.pixelArt, 1.8, status==='working'?'walking':'sitting')}</div>
       <div class="progresstrack"><div class="progressfill" style="width:${percent}%;"></div></div>
       ${walkGoal ? `<div class="stretchbar-goal" data-goal-state="${walkReachedGoal?'done':'fish'}" style="left:calc(100% - 10px); top:-37px;">${walkGoalHTML}</div>` : ''}`);

  let html = `<div class="panel card-punch">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
      <div class="mono" style="font-size:12px;color:var(--faint);">${today.getFullYear()}.${pad(today.getMonth()+1)}.${pad(today.getDate())} (${WEEKDAYS[weekday]})</div>
      <div class="status-dot"><span class="dot" style="background:${sColor};"></span><span class="mono" style="color:${sColor};font-size:13px;">${sLabel}</span></div>
    </div>
    <div id="clockDisplay" class="clock" style="color:${status==='none'?'var(--faint)':sColor};">${msToHMS(ms)}</div>
    <div class="projlist">${chipsHtml}</div>
    <div class="progresswrap${barStyleIsStretch?' stretch':''}" style="position:relative;">${barHTML}</div>
    <div class="goalline">${hmLabel(ms)} / ${goalInfoLabel(goalInfo)}${t('parenWrap')(escapeHtml(currentTask?currentTask.name:''))}</div>
    ${buttonsHtml}
  </div>`;

  html += renderPomodoroPanel(activeSession || null);

  if(activeSession){
    html += renderSessionCard(activeSession, todayStr);
  }
  otherSessions.slice().reverse().forEach(s=>{ html += renderSessionCard(s, todayStr); });

  html += renderTodayStackedBar(todaySessions);

  return html;
}

function renderSessionCard(s, todayStr){
  return `<div class="panel" style="padding:18px;margin-bottom:16px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:${s.segments.length||s.memo?'10px':'0'};">
        <div style="font-size:12px;color:var(--dim);display:flex;align-items:center;gap:6px;">
          <span class="dot-sm" style="background:${taskColor(s.taskId)};"></span>${escapeHtml(s.taskName)}${s.status!=='done'?t('inProgress'):''}
        </div>
        <div style="display:flex;align-items:center;gap:2px;">
          ${s.segments.length? `
          <button title="${t('editTime')}" style="background:none;border:none;cursor:pointer;padding:2px;line-height:0;" onclick="openRecordEdit('${todayStr}','${s.id}')">${renderIconArt(TASK_ICON_ART.edit, 0.7)}</button>
          <button title="${t('duplicate')}" style="background:none;border:none;cursor:pointer;padding:2px;line-height:0;" onclick="openDuplicate('${todayStr}','${s.id}')">${renderIconArt(TASK_ICON_ART.duplicate, 0.7)}</button>` : ''}
          <button title="${s.memo? t('editMemo') : t('addMemo')}" style="background:none;border:none;cursor:pointer;padding:2px;line-height:0;" onclick="openMemoEdit('${todayStr}','${s.id}')">${renderIconArt(TASK_ICON_ART.memo, 0.7)}</button>
          ${s.status==='done'? `<button title="${t('deleteBtn')}" style="background:none;border:none;cursor:pointer;padding:2px;line-height:0;" onclick="deleteSession('${todayStr}','${s.id}')">${renderIconArt(TASK_ICON_ART.trash, 0.7)}</button>` : ''}
        </div>
      </div>
      ${s.segments.length? `<div>
        ${s.segments.map(seg=>`<div class="seg mono"><span>${fmtTime(seg.start)} – ${fmtTime(seg.end)}</span><span style="color:var(--faint);">(${msToHMS(new Date(seg.end)-new Date(seg.start))})</span></div>`).join('')}
      </div>` : ''}
      ${s.memo? `<div style="margin-top:${s.segments.length?'8px':'0'};padding:8px 10px;background:var(--panel2);border-radius:8px;font-size:12px;color:var(--dim);white-space:pre-wrap;word-break:break-word;">📝 ${escapeHtml(s.memo)}</div>` : ''}
    </div>`;
}

function renderTodayStackedBar(todaySessions){
  const totals = {};
  todaySessions.forEach(s=>{
    const ms = computeWorkMs(s);
    if(!totals[s.taskId]) totals[s.taskId] = {name:s.taskName, id:s.taskId, ms:0};
    totals[s.taskId].ms += ms;
  });
  const arr = Object.values(totals);
  const totalMs = arr.reduce((a,b)=>a+b.ms,0);
  if(totalMs<=0) return '';
  const segmentsHtml = arr.map(v=>`<div style="width:${(v.ms/totalMs*100)}%;background:${taskColor(v.id)};" title="${escapeHtml(v.name)}"></div>`).join('');
  const legend = arr.map(v=>`<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--dim);"><span class="dot-sm" style="background:${taskColor(v.id)};"></span>${escapeHtml(v.name)}<span class="mono">${Math.round(v.ms/totalMs*100)}%</span></div>`).join('');
  return `<div class="panel" style="padding:16px;margin-bottom:16px;">
    <div style="font-size:12px;color:var(--dim);margin-bottom:10px;">${t('todaysBreakdown')}</div>
    <div class="stackbar">${segmentsHtml}</div>
    <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:10px;">${legend}</div>
  </div>`;
}

// ---------- Tasks tab ----------
function renderTasks(){
  const active = tasks.filter(t=>!t.archived);
  const archived = tasks.filter(t=>t.archived);

  let html = `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
    <div style="font-size:13px;color:var(--dim);">${t('tasksIntro')}</div>
    <button onclick="openTaskForm(null)" style="background:var(--accent);color:#fff;border:2px solid var(--accentDim);border-radius:9px;padding:8px 12px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;box-shadow:2px 2px 0 color-mix(in srgb, var(--accent) 30%, transparent);">${t('addBtn')}</button>
  </div>`;

  if(active.length===0){
    html += `<div class="panel empty">${t('noActiveTasksShort')}</div>`;
  }
  html += active.map((tk)=>`
    <div class="panel locrow">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div>
          <div class="loc-name"><span class="dot-sm" style="background:${taskColor(tk.id)};"></span>${escapeHtml(tk.name)}</div>
          <div class="mono" style="font-size:12px;color:var(--faint);">${(tk.days||[]).map(d=>WEEKDAYS_JP[d]).join('・')||t('everyDay')}</div>
          <div class="mono" style="font-size:12px;color:var(--dim);margin-top:4px;">${t('goalLabel')} ${taskGoalHoursLabel(tk.targetHours)}</div>
        </div>
        <div style="display:flex;align-items:center;gap:2px;">
          <button style="background:none;border:none;cursor:pointer;padding:2px;line-height:0;" onclick="openTaskForm('${tk.id}')">${renderIconArt(TASK_ICON_ART.edit, 0.7)}</button>
          <button title="${t('archiveTitle')}" style="background:none;border:none;cursor:pointer;padding:2px;line-height:0;" onclick="archiveTask('${tk.id}', true)">${renderIconArt(TASK_ICON_ART.archive, 0.7)}</button>
          <button style="background:none;border:none;cursor:pointer;padding:2px;line-height:0;" onclick="removeTask('${tk.id}')">${renderIconArt(TASK_ICON_ART.trash, 0.7)}</button>
        </div>
      </div>
    </div>`).join('');

  html += `<button onclick="showArchived=!showArchived; render();" style="width:100%;background:none;border:2px dashed var(--lineS);color:var(--dim);border-radius:10px;padding:10px;cursor:pointer;font-family:inherit;font-size:12px;margin-top:8px;">${showArchived?'▲':'▼'} ${t('archivedCount')(archived.length)}</button>`;

  if(showArchived){
    if(archived.length===0){
      html += `<div class="panel empty" style="margin-top:10px;">${t('noArchivedTasks')}</div>`;
    }
    html += archived.map((tk)=>`
      <div class="panel locrow" style="opacity:0.6;margin-top:10px;">
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div>
            <div class="loc-name"><span class="dot-sm" style="background:${taskColor(tk.id)};"></span>${escapeHtml(tk.name)}</div>
            <div class="mono" style="font-size:12px;color:var(--faint);">${(tk.days||[]).map(d=>WEEKDAYS_JP[d]).join('・')||t('everyDay')}</div>
          </div>
          <div style="display:flex;align-items:center;gap:2px;">
            <button title="${t('restoreTitle')}" style="background:none;border:none;cursor:pointer;padding:2px;line-height:0;" onclick="archiveTask('${tk.id}', false)">${renderIconArt(TASK_ICON_ART.undo, 0.7)}</button>
            <button style="background:none;border:none;cursor:pointer;padding:2px;line-height:0;" onclick="removeTask('${tk.id}')">${renderIconArt(TASK_ICON_ART.trash, 0.7)}</button>
          </div>
        </div>
      </div>`).join('');
  }
  return html;
}
function archiveTask(id, value){
  tasks = tasks.map(t=> t.id===id ? {...t, archived:value} : t);
  persistTasks();
  render();
}
function openTaskForm(id){
  editingTask = id ? {...tasks.find(t=>t.id===id)} : {id:uid(), name:'', days:[], targetHours:1, color: TASK_COLORS[tasks.length % TASK_COLORS.length], archived:false};
  showTaskForm = true;
  render();
}
function closeTaskForm(){ showTaskForm=false; editingTask=null; render(); }
function toggleDay(idx){
  const set = new Set(editingTask.days||[]);
  set.has(idx) ? set.delete(idx) : set.add(idx);
  editingTask.days = [...set].sort();
  render();
}
function updateEditingField(key, value, isNum){
  editingTask[key] = isNum ? Number(value) : value;
}
function updateEditingTargetH(value){
  const mins = Math.round(((editingTask.targetHours||0)%1)*60);
  const h = Math.max(0, Number(value)||0);
  editingTask.targetHours = h + mins/60;
}
function updateEditingTargetM(value){
  const h = Math.floor(editingTask.targetHours||0);
  let m = Math.max(0, Math.min(59, Number(value)||0));
  editingTask.targetHours = h + m/60;
}
function saveTask(){
  if(!editingTask.name.trim()){ alert(t('enterNameAlert')); return; }
  const exists = tasks.some(t=>t.id===editingTask.id);
  tasks = exists ? tasks.map(t=> t.id===editingTask.id ? editingTask : t) : [...tasks, editingTask];
  persistTasks();
  showTaskForm=false; editingTask=null;
  render();
}
function removeTask(id){
  if(!confirm(t('deleteTaskConfirm'))) return;
  tasks = tasks.filter(t=>t.id!==id);
  persistTasks(); render();
}
function renderTaskModal(){
  const e = editingTask;
  const modalHtml = `
    <div class="modal-bg" onmousedown="modalBgPress(event)" ontouchstart="modalBgPress(event)" onclick="modalBgClick(event, closeTaskForm)">
      <div class="modal" onclick="event.stopPropagation()">
        <div style="font-weight:700;font-size:15px;margin-bottom:14px;">${tasks.some(t=>t.id===e.id)?t('editTaskTitle'):t('addTaskTitle')}</div>
        <div class="field"><label>${t('nameLabel')}</label><input id="f_name" value="${escapeHtml(e.name)}" placeholder="${t('namePlaceholder')}" oninput="updateEditingField('name', this.value)"></div>
        <div class="field"><label>${t('daysLabel')}</label><div class="days-picker">
          ${WEEKDAYS_JP.map((w,idx)=>`<button type="button" class="day-chip ${(e.days||[]).includes(idx)?'on':''}" onclick="toggleDay(${idx})">${w}</button>`).join('')}
        </div></div>
        <div class="field"><label>${t('targetHoursLabel')}</label>
          <div style="display:flex;gap:8px;align-items:center;">
            <input type="number" step="1" min="0" style="flex:1;" value="${Math.floor(e.targetHours||0)}" oninput="updateEditingTargetH(this.value)">
            <span class="mono" style="font-size:12px;color:var(--dim);white-space:nowrap;">${t('hoursSuffix')}</span>
            <input type="number" step="5" min="0" max="59" style="flex:1;" value="${Math.round(((e.targetHours||0)%1)*60)}" oninput="updateEditingTargetM(this.value)">
            <span class="mono" style="font-size:12px;color:var(--dim);white-space:nowrap;">${t('minutesSuffix')}</span>
          </div>
        </div>
        <div class="field"><label>${t('colorLabel')}</label><div class="swatch-picker">
          ${TASK_COLORS.map(c=>`<div class="swatch ${e.color===c?'on':''}" style="background:${c};" onclick="updateEditingField('color','${c}'); render();">${e.color===c?'✓':''}</div>`).join('')}
        </div></div>
        <div style="display:flex;gap:10px;margin-top:16px;">
          <button class="btn-ghost" onclick="closeTaskForm()">${t('cancel')}</button>
          <button class="btn-primary" onclick="saveTask()">${t('save')}</button>
        </div>
      </div>
    </div>`;
  document.getElementById('app').insertAdjacentHTML('beforeend', modalHtml);
}

// ---------- segment (経過時間) editing ----------
function localToISO(dateStr, hhmm){
  const [y,m,d] = dateStr.split('-').map(Number);
  const [hh,mm] = (hhmm||'00:00').split(':').map(Number);
  return new Date(y, m-1, d, hh, mm, 0).toISOString();
}
function openRecordEdit(date, sessionId){
  const s = (records[date]||[]).find(x=>x.id===sessionId);
  if(!s) return;
  editingRecordDate = date;
  editingSessionId = sessionId;
  editingSegmentsDraft = s.segments.map(seg=>({start:fmtTime(seg.start), end:fmtTime(seg.end)}));
  render();
}
function closeRecordEdit(){ editingRecordDate=null; editingSessionId=null; editingSegmentsDraft=null; render(); }
function updateSegDraft(idx, field, value){ editingSegmentsDraft[idx][field]=value; }
function addSegDraft(){ editingSegmentsDraft.push({start:'09:00', end:'10:00'}); render(); }
function removeSegDraft(idx){ editingSegmentsDraft.splice(idx,1); render(); }
function saveRecordEdit(){
  const date = editingRecordDate;
  const arr = records[date]||[];
  const segments = [];
  for(const draft of editingSegmentsDraft){
    const start = localToISO(date, draft.start);
    const end = localToISO(date, draft.end);
    if(new Date(end) <= new Date(start)){
      alert(t('endBeforeStartAlert')(draft.start, draft.end));
      return;
    }
    segments.push({start, end});
  }
  if(segments.length===0){
    // fix: if all elapsed time is removed, delete the whole record instead of leaving an empty item behind
    records[date] = arr.filter(x=>x.id!==editingSessionId);
    if(records[date].length===0) delete records[date];
  } else {
    const s = arr.find(x=>x.id===editingSessionId);
    s.segments = segments;
  }
  persistRecords();
  editingRecordDate = null; editingSessionId = null; editingSegmentsDraft = null;
  render();
}
function renderRecordEditModal(){
  const date = editingRecordDate;
  const s = (records[date]||[]).find(x=>x.id===editingSessionId);
  if(!s){ closeRecordEdit(); return; }
  const modalHtml = `
    <div class="modal-bg" onmousedown="modalBgPress(event)" ontouchstart="modalBgPress(event)" onclick="modalBgClick(event, closeRecordEdit)">
      <div class="modal" onclick="event.stopPropagation()">
        <div style="font-weight:700;font-size:15px;margin-bottom:4px;">${t('editElapsedTitle')}</div>
        <div class="mono" style="font-size:12px;color:var(--faint);margin-bottom:14px;">${date}　${escapeHtml(s.taskName)}</div>
        ${editingSegmentsDraft.map((seg,idx)=>`
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <input type="time" value="${seg.start}" style="flex:1;" oninput="updateSegDraft(${idx},'start',this.value)">
            <span style="color:var(--faint);">–</span>
            <input type="time" value="${seg.end}" style="flex:1;" oninput="updateSegDraft(${idx},'end',this.value)">
            <button style="background:none;border:none;cursor:pointer;padding:2px;line-height:0;" onclick="removeSegDraft(${idx})">${renderIconArt(TASK_ICON_ART.trash, 0.7)}</button>
          </div>`).join('')}
        ${editingSegmentsDraft.length===0? `<div style="font-size:12px;color:var(--faint);margin-bottom:10px;">${t('noSegments')}</div>` : ''}
        <button onclick="addSegDraft()" style="background:none;border:1px dashed var(--lineS);color:var(--dim);border-radius:8px;padding:8px;width:100%;cursor:pointer;font-family:inherit;font-size:13px;margin-bottom:16px;">${t('addSegment')}</button>
        <div style="display:flex;gap:10px;">
          <button class="btn-ghost" onclick="closeRecordEdit()">${t('cancel')}</button>
          <button class="btn-primary" onclick="saveRecordEdit()">${t('save')}</button>
        </div>
      </div>
    </div>`;
  document.getElementById('app').insertAdjacentHTML('beforeend', modalHtml);
}

// ---------- memo on a task log ----------
function openMemoEdit(date, sessionId){
  const s = (records[date]||[]).find(x=>x.id===sessionId);
  if(!s) return;
  editingMemoDate = date;
  editingMemoSessionId = sessionId;
  editingMemoDraft = s.memo || '';
  render();
}
function closeMemoEdit(){ editingMemoDate=null; editingMemoSessionId=null; editingMemoDraft=''; render(); }
function updateMemoDraft(value){ editingMemoDraft = value; }
function saveMemoEdit(){
  const s = (records[editingMemoDate]||[]).find(x=>x.id===editingMemoSessionId);
  if(s) s.memo = editingMemoDraft.trim();
  persistRecords();
  editingMemoDate=null; editingMemoSessionId=null; editingMemoDraft='';
  render();
}
function renderMemoModal(){
  const s = (records[editingMemoDate]||[]).find(x=>x.id===editingMemoSessionId);
  if(!s){ closeMemoEdit(); return; }
  const modalHtml = `
    <div class="modal-bg" onmousedown="modalBgPress(event)" ontouchstart="modalBgPress(event)" onclick="modalBgClick(event, closeMemoEdit)">
      <div class="modal" onclick="event.stopPropagation()">
        <div style="font-weight:700;font-size:15px;margin-bottom:4px;">${t('memoTitle')}</div>
        <div class="mono" style="font-size:12px;color:var(--faint);margin-bottom:14px;">${editingMemoDate}　${escapeHtml(s.taskName)}</div>
        <textarea oninput="updateMemoDraft(this.value)" placeholder="${t('memoPlaceholder')}" style="width:100%;min-height:110px;background:var(--panel2);border:2px solid var(--lineS);border-radius:9px;color:var(--text);padding:10px;font-size:14px;font-family:inherit;resize:vertical;">${escapeHtml(editingMemoDraft)}</textarea>
        <div style="display:flex;gap:10px;margin-top:16px;">
          <button class="btn-ghost" onclick="closeMemoEdit()">${t('cancel')}</button>
          <button class="btn-primary" onclick="saveMemoEdit()">${t('save')}</button>
        </div>
      </div>
    </div>`;
  document.getElementById('app').insertAdjacentHTML('beforeend', modalHtml);
}

// ---------- add record for arbitrary date (後日記録) ----------
// dateStr defaults to today when omitted, but the Report tab's button
// passes its own currently-selected calendar date (see renderReport()'s
// targetDate) so the modal opens straight onto whichever day the user is
// looking at, instead of always defaulting to today. The date field inside
// the modal is still a plain <input type="date">, so it can be changed
// afterward regardless of which date it opened on.
function openAddRecord(dateStr){
  if(tasks.length===0){ alert(t('addTaskFirstAlert')); return; }
  const task = tasks.find(t=>!t.archived) || tasks[0];
  addDraft = {
    date: dateStr || fmtDate(new Date()), taskId: task.id,
    segments: [{start:'09:00', end:'10:00'}],
  };
  showAddRecord = true;
  render();
}
function closeAddRecord(){ showAddRecord=false; addDraft=null; render(); }
function updateAddDraft(key, value){ addDraft[key] = value; }
function onAddDraftTaskChange(taskId){ addDraft.taskId = taskId; render(); }
function addDraftSegAdd(){ addDraft.segments.push({start:'09:00', end:'10:00'}); render(); }
function addDraftSegRemove(idx){ addDraft.segments.splice(idx,1); render(); }
function addDraftSegUpdate(idx, field, value){ addDraft.segments[idx][field] = value; }
function saveAddRecord(){
  const task = tasks.find(t=>t.id===addDraft.taskId);
  if(!task){ alert(t('selectTaskAlert')); return; }
  if(!addDraft.date){ alert(t('enterDateAlert')); return; }
  const segments = [];
  for(const seg of addDraft.segments){
    const start = localToISO(addDraft.date, seg.start);
    const end = localToISO(addDraft.date, seg.end);
    if(new Date(end) <= new Date(start)){
      alert(t('endBeforeStartAlert')(seg.start, seg.end));
      return;
    }
    segments.push({start, end});
  }
  if(segments.length===0){ alert(t('atLeastOneSegmentAlert')); return; }
  const session = {
    id: uid(), date: addDraft.date, taskId: task.id, taskName: task.name,
    segments, currentStart:null, status:'done', memo:'',
  };
  records[addDraft.date] = [...(records[addDraft.date]||[]), session];
  persistRecords();
  reportMonth = addDraft.date.slice(0,7);
  selectedReportDate = addDraft.date;
  showAddRecord = false; addDraft = null;
  render();
}
function renderAddRecordModal(){
  const d = addDraft;
  const modalHtml = `
    <div class="modal-bg" onmousedown="modalBgPress(event)" ontouchstart="modalBgPress(event)" onclick="modalBgClick(event, closeAddRecord)">
      <div class="modal" onclick="event.stopPropagation()">
        <div style="font-weight:700;font-size:15px;margin-bottom:14px;">${t('addRecordTitle')}</div>
        <div class="field"><label>${t('dateLabel')}</label><input type="date" value="${d.date}" oninput="updateAddDraft('date', this.value)"></div>
        <div class="field"><label>${t('taskLabel')}</label>
          <select onchange="onAddDraftTaskChange(this.value)">
            ${tasks.map(tk=>`<option value="${tk.id}" ${tk.id===d.taskId?'selected':''}>${escapeHtml(tk.name)}${tk.archived?t('archivedSuffix'):''}</option>`).join('')}
          </select>
        </div>
        <div class="field"><label>${t('segmentsLabel')}</label>
          ${d.segments.map((seg,idx)=>`
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
              <input type="time" value="${seg.start}" style="flex:1;" oninput="addDraftSegUpdate(${idx},'start',this.value)">
              <span style="color:var(--faint);">–</span>
              <input type="time" value="${seg.end}" style="flex:1;" oninput="addDraftSegUpdate(${idx},'end',this.value)">
              <button style="background:none;border:none;cursor:pointer;padding:2px;line-height:0;" onclick="addDraftSegRemove(${idx})">${renderIconArt(TASK_ICON_ART.trash, 0.7)}</button>
            </div>`).join('')}
          <button onclick="addDraftSegAdd()" style="background:none;border:1px dashed var(--lineS);color:var(--dim);border-radius:8px;padding:8px;width:100%;cursor:pointer;font-family:inherit;font-size:13px;">${t('addSegment')}</button>
        </div>
        <div style="display:flex;gap:10px;margin-top:8px;">
          <button class="btn-ghost" onclick="closeAddRecord()">${t('cancel')}</button>
          <button class="btn-primary" onclick="saveAddRecord()">${t('addAction')}</button>
        </div>
      </div>
    </div>`;
  document.getElementById('app').insertAdjacentHTML('beforeend', modalHtml);
}

// ---------- duplicate a record onto another date ----------
function openDuplicate(date, sessionId){
  const s = (records[date]||[]).find(x=>x.id===sessionId);
  if(!s) return;
  duplicateSource = {
    taskId: s.taskId, taskName: s.taskName,
    segmentsTimes: s.segments.map(seg=>({start:fmtTime(seg.start), end:fmtTime(seg.end)})),
  };
  const orig = new Date(date); orig.setDate(orig.getDate()+1);
  duplicateTargetDate = fmtDate(orig);
  showDuplicate = true;
  render();
}
function closeDuplicate(){ showDuplicate=false; duplicateSource=null; duplicateTargetDate=null; render(); }
function updateDuplicateDate(value){ duplicateTargetDate = value; }
function confirmDuplicate(){
  const src = duplicateSource;
  const targetDate = duplicateTargetDate;
  if(!targetDate){ alert(t('selectDateAlert')); return; }
  const segments = src.segmentsTimes.map(t=>({start: localToISO(targetDate, t.start), end: localToISO(targetDate, t.end)}));
  const session = {
    id: uid(), date: targetDate, taskId: src.taskId, taskName: src.taskName,
    segments, currentStart:null, status:'done', memo:'',
  };
  records[targetDate] = [...(records[targetDate]||[]), session];
  persistRecords();
  reportMonth = targetDate.slice(0,7);
  selectedReportDate = targetDate;
  showDuplicate = false; duplicateSource = null; duplicateTargetDate = null;
  render();
}
// ---------- 超過分の振り分け（Summaryの日別パネル内） ----------
function renderCarryoverSection(dateStr){
  const lines = [];
  tasks.filter(tk=>!tk.archived && Number(tk.targetHours) > 0).forEach(tk=>{
    const info = taskSurplusInfo(tk, dateStr);
    if(!info.surplus && !info.out) return;
    const dot = `<span class="dot-sm" style="background:${taskColor(tk.id)};flex-shrink:0;"></span>`;
    if(info.surplus || info.out){
      const status = info.available > 0
        ? `${t('carryoverOverLabel')} ${hmLabel(info.available*60000)}`
        : t('carryoverAllMoved');
      lines.push(`<div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--dim);margin-top:8px;">
        <div style="flex:1;min-width:0;">
          <div style="display:flex;align-items:center;gap:6px;min-width:0;">${dot}<span style="font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(tk.name)}</span></div>
          <div style="margin:2px 0 0 14px;">${status}</div>
        </div>
        <button onclick="openCarryover('${tk.id}','${dateStr}')" style="flex-shrink:0;font-size:12px;color:var(--brass);background:none;border:1px solid var(--brassDim);border-radius:6px;padding:4px 10px;cursor:pointer;font-family:inherit;">${t('carryoverBtnShort')}</button>
      </div>`);
    }
  });
  if(!lines.length) return '';
  return `<div style="border-top:1px solid var(--line);margin-top:8px;padding-top:4px;">${lines.join('')}</div>`;
}
// 振替（振り分けを受け取った）で、その日の目標を満たしているか。
// 未来の日でも表示上は達成（⭐）にする。⭐の数・プレゼントへの加算は、
// その日が来て evaluateRewards() が通常どおり数えた時点で行われる。
function isCarryoverAchieved(dateStr){
  const received = tasks.some(tk=> !tk.archived && taskCarryInMin(tk, dateStr) > 0);
  if(!received) return false;
  const totals = dateDayTotals(dateStr);
  return totals.hasGoal && totals.actualMin >= totals.goalMin;
}
// 初期選択は振り分け元より後の最初の候補日（なければ一番近い過去の日）
function defaultCarryoverTarget(cands, fromDate){
  return cands.find(c=>c.date > fromDate && c.remain > 0) || cands.find(c=>c.date > fromDate) || cands[cands.length-1] || null;
}
function fmtCarryDate(dateStr){
  const wd = new Date(dateStr + 'T00:00:00').getDay();
  return `${dateStr.slice(5).replace('-', '/')} (${WEEKDAYS[wd]})`;
}
// 振り分けモーダルは「作業用コピー(working)」を編集し、「完了」で初めて保存する。
// ×（キャンセル）なら何も保存せずに閉じる。超過分を全部振り分けなくても完了できる。
function carryoverWorkTask(){
  const d = carryoverDraft;
  const tk = tasks.find(x=>x.id===d.taskId);
  return tk ? {...tk, carryovers: d.working} : null;
}
function resetCarryoverInputs(){
  const d = carryoverDraft;
  const wt = carryoverWorkTask();
  const cands = carryoverCandidateDates(wt, d.from);
  const avail = taskSurplusInfo(wt, d.from).available;
  const first = defaultCarryoverTarget(cands, d.from);
  d.to = first ? first.date : '';
  d.min = first ? defaultCarryoverMin(avail, first) : 0;
}
function defaultCarryoverMin(avail, cand){ return cand.remain > 0 ? Math.min(avail, cand.remain) : avail; }
function openCarryover(taskId, fromDate){
  const tk = tasks.find(x=>x.id===taskId);
  if(!tk) return;
  carryoverDraft = { taskId, from: fromDate, to: '', min: 0, working: taskCarryovers(tk).map(c=>({...c})) };
  resetCarryoverInputs();
  render();
}
function closeCarryover(){ carryoverDraft = null; render(); }
function setCarryoverMinInputs(){
  // render()しない（selectを閉じないため）
  const h = document.getElementById('carryoverHInput');
  const m = document.getElementById('carryoverMInput');
  if(h) h.value = Math.floor(carryoverDraft.min/60);
  if(m) m.value = carryoverDraft.min%60;
}
function updateCarryoverTo(value){
  const d = carryoverDraft;
  d.to = value;
  const wt = carryoverWorkTask();
  const cand = carryoverCandidateDates(wt, d.from).find(c=>c.date===value);
  const avail = taskSurplusInfo(wt, d.from).available;
  d.min = cand ? defaultCarryoverMin(avail, cand) : 0;
  setCarryoverMinInputs();
}
function updateCarryoverHM(){
  const h = Math.max(0, Math.floor(Number((document.getElementById('carryoverHInput')||{}).value)||0));
  const m = Math.max(0, Math.floor(Number((document.getElementById('carryoverMInput')||{}).value)||0));
  carryoverDraft.min = h*60 + m;
}
function persistCarryovers(){
  persistTasks();
  evaluateRewards(); // 目標が変わるので⭐/プレゼントを再計算
}
// 「振り分け」：作業用コピーに1件追加（まだ保存しない）
function addCarryover(){
  const d = carryoverDraft;
  const wt = carryoverWorkTask();
  if(!wt || !d.to) return;
  const avail = taskSurplusInfo(wt, d.from).available;
  if(!(d.min > 0) || d.min > avail){ alert(t('carryoverInvalid')(hmLabel(avail*60000))); return; }
  d.working = [...d.working, { id: uid(), from: d.from, to: d.to, min: d.min }];
  resetCarryoverInputs();
  render();
}
// 一覧の「取消」：作業用コピーから外す（まだ保存しない）
function removeCarryover(entryId){
  const d = carryoverDraft;
  d.working = d.working.filter(c=>c.id!==entryId);
  resetCarryoverInputs();
  render();
}
// 「完了」：作業用コピーを保存して閉じる
function completeCarryover(){
  const d = carryoverDraft;
  tasks = tasks.map(x=> x.id===d.taskId ? {...x, carryovers: d.working} : x);
  persistCarryovers();
  carryoverDraft = null;
  render();
}
function renderCarryoverModal(){
  const d = carryoverDraft;
  const wt = carryoverWorkTask();
  if(!wt){ carryoverDraft = null; return; }
  const info = taskSurplusInfo(wt, d.from);
  const cands = info.available > 0 ? carryoverCandidateDates(wt, d.from) : [];
  const given = d.working.filter(c=>c.from===d.from).sort((a,b)=>a.to.localeCompare(b.to));
  const numStyle = 'width:64px;text-align:right;';
  const formHtml = info.available <= 0 ? '' : (cands.length ? `
        <div class="field"><label>${t('carryoverDateLabel')}</label>
          <select onchange="updateCarryoverTo(this.value)">
            ${cands.map(c=>`<option value="${c.date}" ${c.date===d.to?'selected':''}>${fmtCarryDate(c.date)}　${c.remain > 0 ? t('carryoverRemain')(hmLabel(c.remain*60000)) : t('carryoverGoalMet')}</option>`).join('')}
          </select>
        </div>
        <div class="field"><label>${t('carryoverMinLabel')}</label>
          <div style="display:flex;align-items:center;gap:6px;">
            <input id="carryoverHInput" type="number" inputmode="numeric" min="0" value="${Math.floor(d.min/60)}" oninput="updateCarryoverHM()" style="${numStyle}"><span>${t('carryoverHourUnit')}</span>
            <input id="carryoverMInput" type="number" inputmode="numeric" min="0" max="59" step="5" value="${d.min%60}" oninput="updateCarryoverHM()" style="${numStyle}"><span>${t('carryoverMinUnit')}</span>
          </div>
        </div>
        <button class="btn-ghost" style="width:100%;" onclick="addCarryover()">＋ ${t('carryoverAdd')}</button>` :
        `<div style="font-size:12px;color:var(--faint);margin-bottom:8px;">${t('carryoverNoTarget')}</div>`);
  const givenHtml = given.length ? `
        <div style="font-size:12px;color:var(--dim);margin:14px 0 4px;">${t('carryoverListTitle')}</div>
        ${given.map(c=>`<div class="mono" style="display:flex;align-items:center;gap:8px;font-size:12px;padding:6px 0;border-bottom:1px solid var(--line);">
          <span style="flex:1;">→ ${fmtCarryDate(c.to)}</span><span>${hmLabel(c.min*60000)}</span>
          <button onclick="removeCarryover('${c.id}')" style="font-size:11px;color:var(--rust);background:none;border:1px solid var(--line);border-radius:6px;padding:2px 8px;cursor:pointer;font-family:inherit;">${t('carryoverCancel')}</button>
        </div>`).join('')}` : '';
  const modalHtml = `
    <div class="modal-bg" onmousedown="modalBgPress(event)" ontouchstart="modalBgPress(event)" onclick="modalBgClick(event, closeCarryover)">
      <div class="modal" onclick="event.stopPropagation()">
        <div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:4px;">
          <div style="flex:1;font-weight:700;font-size:15px;">${t('carryoverTitle')}</div>
          <button title="${t('cancel')}" aria-label="${t('cancel')}" onclick="closeCarryover()" style="background:none;border:none;cursor:pointer;font-size:20px;line-height:1;color:var(--dim);padding:0 2px;">×</button>
        </div>
        <div class="mono" style="font-size:12px;color:var(--faint);margin-bottom:14px;">${escapeHtml(wt.name)}　${fmtCarryDate(d.from)}<br>${t('carryoverSurplus')(hmLabel(info.surplus*60000), hmLabel(info.available*60000))}</div>
        ${formHtml}
        ${givenHtml}
        <div style="font-size:12px;color:var(--faint);margin-top:12px;">${t('carryoverNote')}</div>
        <div style="display:flex;gap:10px;margin-top:10px;">
          <button class="btn-primary" style="flex:1;" onclick="completeCarryover()">${t('carryoverDone')}</button>
        </div>
      </div>
    </div>`;
  document.getElementById('app').insertAdjacentHTML('beforeend', modalHtml);
}

function renderDuplicateModal(){
  const src = duplicateSource;
  const modalHtml = `
    <div class="modal-bg" onmousedown="modalBgPress(event)" ontouchstart="modalBgPress(event)" onclick="modalBgClick(event, closeDuplicate)">
      <div class="modal" onclick="event.stopPropagation()">
        <div style="font-weight:700;font-size:15px;margin-bottom:4px;">${t('duplicateRecordTitle')}</div>
        <div class="mono" style="font-size:12px;color:var(--faint);margin-bottom:14px;">${escapeHtml(src.taskName)}　${src.segmentsTimes.map(tm=>`${tm.start}–${tm.end}`).join('、')}</div>
        <div class="field"><label>${t('duplicateTargetLabel')}</label><input type="date" value="${duplicateTargetDate}" oninput="updateDuplicateDate(this.value)"></div>
        <div style="font-size:12px;color:var(--faint);margin-bottom:8px;">${t('duplicateNote')}</div>
        <div style="display:flex;gap:10px;margin-top:8px;">
          <button class="btn-ghost" onclick="closeDuplicate()">${t('cancel')}</button>
          <button class="btn-primary" onclick="confirmDuplicate()">${t('duplicateAction')}</button>
        </div>
      </div>
    </div>`;
  document.getElementById('app').insertAdjacentHTML('beforeend', modalHtml);
}

// ---------- pomodoro template form modal ----------
function renderPomodoroFormModal(){
  const d = pomodoroDraft;
  const modalHtml = `
    <div class="modal-bg" onmousedown="modalBgPress(event)" ontouchstart="modalBgPress(event)" onclick="modalBgClick(event, closePomodoroForm)">
      <div class="modal" onclick="event.stopPropagation()">
        <div style="font-weight:700;font-size:15px;margin-bottom:14px;">${t('addPomodoroTemplateTitle')}</div>
        <div class="field"><label>${t('nameLabel')}</label><input value="${escapeHtml(d.name)}" placeholder="${t('pomodoroNamePlaceholder')}" oninput="updatePomodoroDraft('name', this.value)"></div>
        <div style="display:flex;gap:10px;">
          <div class="field" style="flex:1;"><label>${t('focusMinutes')}</label><input type="number" min="1" value="${d.work}" oninput="updatePomodoroDraft('work', this.value, true)"></div>
          <div class="field" style="flex:1;"><label>${t('breakMinutes')}</label><input type="number" min="1" value="${d.break}" oninput="updatePomodoroDraft('break', this.value, true)"></div>
        </div>
        <div style="display:flex;gap:10px;margin-top:8px;">
          <button class="btn-ghost" onclick="closePomodoroForm()">${t('cancel')}</button>
          <button class="btn-primary" onclick="savePomodoroTemplate()">${t('addAction')}</button>
        </div>
      </div>
    </div>`;
  document.getElementById('app').insertAdjacentHTML('beforeend', modalHtml);
}

// ---------- Settings tab ----------
function toggleHowTo(){ showHowTo=!showHowTo; render(); }
function toggleInstall(){ showInstall=!showInstall; render(); }
function toggleCatPanel(){ showCatPanel=!showCatPanel; render(); }
function toggleOutfitPanel(){ showOutfitPanel=!showOutfitPanel; render(); }
function toggleFoodPanel(){ showFoodPanel=!showFoodPanel; render(); }
function toggleLoginPanel(){ showLoginPanel=!showLoginPanel; render(); }
function toggleManualBackupPanel(){ showManualBackupPanel=!showManualBackupPanel; render(); }

function renderSyncBar(){
  if(!window.__fb || !window.__fb.ready){
    return `<div style="font-size:12px;color:var(--faint);">${t('syncConnecting')}</div>`;
  }
  const user = window.__fb.user;
  const isSignedIn = user && !user.isAnonymous;
  const label = isSignedIn ? t('syncSignedInGoogle')(user.displayName || user.email || '') : t('syncSignedInAnon');

  if(isSignedIn){
    return `<div style="display:flex;align-items:center;gap:10px;">
      <div style="font-size:12px;color:var(--dim);flex:1;">
        <div>${escapeHtml(label)}</div>
      </div>
      <button class="icobtn" style="width:auto;padding:0 10px;" onclick="fbSignOut()">${t('syncSignOutBtn')}</button>
    </div>`;
  }

  return `<div>
    <div style="font-size:12px;color:var(--dim);">${escapeHtml(label)}</div>
    <div style="font-size:11px;color:var(--faint);margin-top:2px;margin-bottom:10px;">${t('syncNote')}</div>
    <button class="icobtn" style="width:auto;padding:0 10px;color:var(--brassDim);" onclick="fbSignInGoogle()">${t('syncSignInGoogleBtn')}</button>
  </div>`;
}

function renderUpgradeBar(){
  if(!window.__fb || !window.__fb.ready || !fbUser) return '';
  // 広告審査が通るまでの暫定措置：ADS_APPROVEDがfalseの間は「広告なし版」表記の
  // 代わりに「開発者を応援」表記を出す。購入導線(fbUpgradeToPaid)自体は共通のまま。
  // 広告審査通過後はADS_APPROVED=trueに戻せば元の広告訴求文言に自動で戻る。
  const freeLabelKey = ADS_APPROVED ? 'planFreeLabel' : 'planSupportFreeLabel';
  const paidLabelKey = ADS_APPROVED ? 'planPaidLabel' : 'planSupportPaidLabel';
  const noteKey = ADS_APPROVED ? 'planUpgradeNote' : 'planSupportNote';
  const btnKey = ADS_APPROVED ? 'planUpgradeBtn' : 'planSupportBtn';
  if(userPlan === 'paid'){
    return `<div style="font-size:12px;color:var(--teal);">${t(paidLabelKey)}</div>`;
  }
  // 応援表記の間（ADS_APPROVED=false）は、すべての機能が無料で「無料版」と書くと
  // 有料版に別の機能があるように読めてしまうため、プラン名の行は出さずに
  // 「¥500で開発者を応援できます」とボタンだけを並べる。
  // 広告審査通過後（ADS_APPROVED=true）は従来どおり「無料版（広告あり）」＋補足の2行に戻る。
  const planInfoHtml = ADS_APPROVED
    ? `<div>${t(freeLabelKey)}</div>
      <div style="font-size:11px;color:var(--faint);margin-top:2px;">${t(noteKey)}</div>`
    : `<div>${t(noteKey)}</div>`;
  return `<div style="display:flex;align-items:center;gap:10px;">
    <div style="font-size:12px;color:var(--dim);flex:1;">
      ${planInfoHtml}
    </div>
    <button class="icobtn" style="width:auto;padding:0 10px;color:var(--brassDim);" onclick="fbUpgradeToPaid(this)">${t(btnKey)}</button>
  </div>`;
}

function renderSettings(){
  let html = `<div style="font-size:13px;color:var(--dim);margin-bottom:16px;">${t('settingsIntro')}</div>`;
    const upgradeBarHtml = renderUpgradeBar();

    // 0. App title setting
    html += `<div class="panel" style="padding:16px;margin-bottom:16px;">
    <div class="settitle">${t('appTitleSection')}</div>
    <div class="field" style="margin-bottom:0;">
      <input type="text" value="${escapeHtml(settings.userName || '')}" placeholder="${t('appTitlePlaceholder')}" oninput="
        settings.userName = this.value;
        persistSettings();
        const el = document.getElementById('header-username');
        const txt = this.value || 'My';
        el.textContent = txt;
        /* check on every keystroke whether the text contains non-ASCII (e.g. Japanese) and auto-adjust position/size */
        el.className = 'user-name-part ' + (/[^ -~]/.test(txt) ? 'is-ja' : '');
      ">
    </div>
    <div style="font-size:11px;color:var(--faint);margin-top:8px;">${t('appTitleHint')}</div>
  </div>`;
  // 1. Focus timer
  const templates = settings.pomodoro.templates;
  html += `<div class="panel" style="padding:16px;margin-bottom:16px;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
      <div class="settitle" style="margin-bottom:0;">${renderIconArt(TASK_ICON_ART.focustimer, 0.7)}${t('focusTimer')}</div>
      <div class="switch ${settings.pomodoro.autoEnable?'on':''}" onclick="togglePomodoroAutoEnable()"><div class="knob"></div></div>
    </div>
    <div style="font-size:11px;color:var(--faint);margin-bottom:12px;">${t('autoEnableNote')}</div>
    ${templates.map(tp=>`
      <div class="tplrow ${settings.pomodoro.activeTemplateId===tp.id?'on':''}" onclick="setActiveTemplate('${tp.id}')">
        <div style="flex:1;">
          <div style="font-weight:600;font-size:13px;">${escapeHtml(tp.name)}</div>
          <div class="mono" style="font-size:11px;color:var(--dim);">${t('templateDetail')(tp.work, tp.break, tp.longBreakEvery, tp.longBreak)}</div>
        </div>
        ${settings.pomodoro.activeTemplateId===tp.id? `<span style="color:var(--brassDim);font-size:16px;">✓</span>`:''}
        ${!tp.builtin? `<button style="background:none;border:none;cursor:pointer;padding:2px;line-height:0;" onclick="event.stopPropagation();deletePomodoroTemplate('${tp.id}')">${renderIconArt(TASK_ICON_ART.trash, 0.7)}</button>` : ''}
      </div>`).join('')}
    <button onclick="openPomodoroForm()" style="width:100%;background:none;border:1px dashed var(--lineS);color:var(--dim);border-radius:8px;padding:8px;cursor:pointer;font-family:inherit;font-size:12px;margin-top:4px;">${t('addTemplate')}</button>
  </div>`;

  // 2. Pixel art. ねこ／おめかし／ごはんは、いずれも同じ
  // ▶/▼隠し扉パターン("アプリの使い方"/"ホーム画面に追加"で使っている
  // ものと同じ)の折りたたみセクションで、中身はpixcardボタンの行 -- 見た目は
  // どれも共通。「ねこ」セクションはデフォルト5種＋6枠目(シークレット/伝説の
  // ねこ)の計6枚を.pixrowの5列グリッドに並べる(5+1で自然に5列2行になる)。
  // おめかし／ごはんは、何か1つでも解禁済みのときだけ表示。
  const unlockedOutfitKeys = rewards.unlocked.filter(k=>k.startsWith('outfit:')).map(k=>k.slice(7)).filter(k=>typeof OUTFIT_ART!=='undefined' && OUTFIT_ART[k]);
  const unlockedFoodKeys = rewards.unlocked.filter(k=>k.startsWith('food:')).map(k=>k.slice(5)).filter(k=>typeof FOOD_ART!=='undefined' && FOOD_ART[k]);
  const hasPendingChoiceUI = rewards.pendingChoices > 0 && REWARD_CATEGORIES.some(categoryHasRoom);
  const catKeys = Object.keys(PIXEL_ART_GRIDS);
  // 6枠目: 状態は3通り。①未解禁 = シークレット(ロック済み表示、opacity 0.55)、
  // ②解禁済みだがまだ本人が開けていない = 同じシークレット(？？？)の絵のまま、
  // 「えさ/ごはんを選ぶ時」(giftChoicePromptの選択前ボタン)と同じ水色でハイ
  // ライトして開封を促す状態(secret-ready、revealLegendaryCat()参照。CSSは
  // index.htmlの.pixcard.secret-ready)、③開封済み = 通常のgoldねこ。
  const secretLocked = !rewards.legendaryUnlocked;
  const secretReady = rewards.legendaryUnlocked && !rewards.legendaryRevealed;

  html += `<div class="panel" style="padding:16px;margin-bottom:16px;">
    <div class="settitle">${t('appearancePixelArt')}</div>

    ${hasPendingChoiceUI ? `
    <div style="margin-bottom:16px;">
      <div style="font-size:12px;font-weight:700;margin-bottom:8px;">🎁 ${t('giftChoicePrompt')}</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        ${categoryHasRoom('outfit') ? `<div class="themecard" style="flex:1;min-width:90px;padding:12px 6px;background:var(--paleblue);border-color:#8FCBEA;justify-content:center;" onclick="chooseReward('outfit')">
          <div class="name" style="margin:0;text-align:center;">${t('pixelArtRowOutfit')}</div>
        </div>` : ''}
        ${categoryHasRoom('food') ? `<div class="themecard" style="flex:1;min-width:90px;padding:12px 6px;background:var(--paleblue);border-color:#8FCBEA;justify-content:center;" onclick="chooseReward('food')">
          <div class="name" style="margin:0;text-align:center;">${t('pixelArtRowFood')}</div>
        </div>` : ''}
      </div>
      ${rewards.pendingChoices > 1 ? `<div style="font-size:11px;color:var(--faint);margin-top:8px;">${t('giftPendingCount')(rewards.pendingChoices)}</div>` : ''}
    </div>` : ''}

    <div class="collapsehead" onclick="toggleCatPanel()">
      <div style="font-size:13px;font-weight:600;">${t('pixelArtRowCat')}${t('countSuffix')(catKeys.length + 1)}</div>
      <div class="tri">${showCatPanel?'▼':'▶'}</div>
    </div>
    ${showCatPanel ? `<div class="collapsebody">
    <div class="pixrow">
      ${catKeys.map((key)=>`
        <div class="pixcard ${settings.pixelArt===key?'on':''}" onclick="selectPixelArt('${key}')">
          ${renderPixelArt(key,1.0,'walking')}
          <div class="name">${escapeHtml(pixelArtName(key))}</div>
        </div>`).join('')}
      ${secretLocked ? `
        <div class="pixcard secret-locked" onclick="tapSecretCat()">
          ${renderIconArt(SECRET_CAT_ART, 1.0)}
          <div class="name">${escapeHtml(SECRET_CAT_ART.name[LANG]||SECRET_CAT_ART.name.en)}</div>
        </div>` : secretReady ? `
        <div class="pixcard secret-ready" onclick="revealLegendaryCat()">
          ${renderIconArt(SECRET_CAT_ART, 1.0)}
          <div class="name">${escapeHtml(SECRET_CAT_ART.name[LANG]||SECRET_CAT_ART.name.en)}</div>
        </div>` : `
        <div class="pixcard ${settings.pixelArt==='gold'?'on':''}" onclick="selectPixelArt('gold')">
          ${renderPixelArt('gold',1.0,'walking')}
          <div class="name">${escapeHtml(LEGENDARY_ART_GRIDS.gold.name[LANG]||LEGENDARY_ART_GRIDS.gold.name.en)}</div>
        </div>`}
    </div>
    </div>` : ''}

    ${unlockedOutfitKeys.length ? `
    <div style="height:1px;background:var(--line);margin:14px 0;"></div>
    <div class="collapsehead" onclick="toggleOutfitPanel()">
      <div style="font-size:13px;font-weight:600;">${t('pixelArtRowOutfit')}${t('countSuffix')(unlockedOutfitKeys.length)}</div>
      <div class="tri">${showOutfitPanel?'▼':'▶'}</div>
    </div>
    ${showOutfitPanel ? `<div class="collapsebody">${rewardPixcardRow(
      unlockedOutfitKeys.map(k=>({ key:k, iconHtml: renderIconArt(OUTFIT_ART[k].preview || OUTFIT_ART[k],1.0), name: OUTFIT_ART[k].name[LANG]||OUTFIT_ART[k].name.en })),
      rewards.equippedOutfit, 'selectOutfit', true
    )}</div>` : ''}` : ''}

    ${unlockedFoodKeys.length ? `
    <div style="height:1px;background:var(--line);margin:14px 0;"></div>
    <div class="collapsehead" onclick="toggleFoodPanel()">
      <div style="font-size:13px;font-weight:600;">${t('pixelArtRowFood')}${t('countSuffix')(unlockedFoodKeys.length)}</div>
      <div class="tri">${showFoodPanel?'▼':'▶'}</div>
    </div>
    ${showFoodPanel ? `<div class="collapsebody">${rewardPixcardRow(
      unlockedFoodKeys.map(k=>({ key:k, iconHtml: renderIconArt(FOOD_ART[k],1.0), name: FOOD_ART[k].name[LANG]||FOOD_ART[k].name.en })),
      rewards.equippedFood, 'selectFood', true,
      { label: t('foodNoneOption'), iconHtml: (typeof STRETCH_GOAL_MARKER!=='undefined') ? renderIconArt(STRETCH_GOAL_MARKER,1.0) : undefined }
    )}</div>` : ''}` : ''}

    <div style="font-size:11px;color:var(--faint);margin-top:14px;">${t('morePixelArtSoon')}</div>
  </div>`;

  // 2b. Progress bar style
  html += `<div class="panel" style="padding:16px;margin-bottom:16px;">
    <div class="settitle">${t('appearanceBarStyle')}</div>
    <div style="display:flex;gap:18px;justify-content:center;flex-wrap:wrap;">
      ${Object.keys(BAR_STYLE_NAMES).map(key=>{
        const preview = key==='stretch'
          ? `<div style="width:52px;overflow:hidden;">${renderStretchProgressBar(settings.pixelArt, 55, false, 1.8, false, undefined, true)}</div>`
          : `<div style="display:flex;align-items:center;justify-content:center;"><div style="transform:translateX(-30%);">${renderPixelArt(settings.pixelArt,1.1,'walking')}</div></div>`;
        return `
        <div class="themecard ${settings.barStyle===key?'on':''}" onclick="selectBarStyle('${key}')" style="flex:0 0 47%;min-width:140px;padding:12px 6px;">
          <div style="display:flex;align-items:center;justify-content:center;gap:4px;">
            <div style="flex-shrink:0;height:28px;display:flex;align-items:center;">${preview}</div>
            <div class="name" style="margin:0;word-break:keep-all;">${BAR_STYLE_NAMES[key]}</div>
          </div>
        </div>`;
      }).join('')}
    </div>
  </div>`;

  // 3. Theme
  html += `<div class="panel" style="padding:16px;margin-bottom:16px;">
    <div class="settitle">${t('appearanceTheme')}</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      ${Object.keys(THEME_NAMES).map(key=>`
        <div class="themecard ${settings.theme===key?'on':''}" onclick="selectTheme('${key}')">
          <div class="swrow">${THEME_PREVIEW_KEYS[key].map(c=>`<span class="sw" style="background:${c};"></span>`).join('')}</div>
          <div class="name">${THEME_NAMES[key]}${settings.theme===key?' ✓':''}</div>
        </div>`).join('')}
    </div>
  </div>`;

  // 4. About (collapsible how-to + install instructions grouped together)
  html += `<div class="panel" style="padding:16px;margin-bottom:16px;">
    <div class="settitle">${t('aboutSection')}</div>

    <div style="font-size:12px; color:var(--dim); line-height:1.6; margin-bottom:16px;">
      ${t('appConcept')}
    </div>

    ${upgradeBarHtml ? `${upgradeBarHtml}<div style="height:1px;background:var(--line);margin:14px 0;"></div>` : ''}

    <div class="collapsehead" onclick="toggleHowTo()">
      <div style="font-size:13px;font-weight:600;">${t('howToTitle')}</div>
      <div class="tri">${showHowTo?'▼':'▶'}</div>
    </div>
    ${showHowTo? `<div class="collapsebody">
      ${t('howToPages').map(p=>`
        <div class="howto-page">
          <div class="pname">${escapeHtml(p.name)}</div>
          <div class="pdesc">${escapeHtml(p.desc)}</div>
        </div>`).join('')}
      <div style="font-size:12px;font-weight:700;margin:12px 0 8px;">${t('howToIconsTitle')}</div>
      ${t('howToIcons').map(ic=>`
        <div class="howto-icon-row"><span class="ic" style="display:inline-flex;align-items:center;justify-content:center;">${ic.art ? renderIconArt(TASK_ICON_ART[ic.art], 0.6) : ic.icon}</span><span>${escapeHtml(ic.label)}</span></div>`).join('')}
    </div>` : ''}

    <div style="height:1px;background:var(--line);margin:14px 0;"></div>

    <div class="collapsehead" onclick="toggleInstall()">
      <div style="font-size:13px;font-weight:600;">${t('addToHomeScreen')}</div>
      <div class="tri">${showInstall?'▼':'▶'}</div>
    </div>
    ${showInstall? `<div class="collapsebody">
      <div style="font-size:11px;color:var(--faint);margin-top:10px;margin-bottom:6px;">${t('installNote')}</div>
      <div style="font-size:12px;font-weight:700;margin-bottom:6px;">${t('iphoneCase')}</div>
      <ol class="installsteps">
        <li>${t('iphoneStep1')}</li>
        <li>${t('iphoneStep2')}</li>
        <li>${t('iphoneStep3')}</li>
        <li>${t('iphoneStep4')}</li>
      </ol>
      <div style="font-size:11px;color:var(--dim);background:var(--panel2);border:1px solid var(--lineS);border-radius:8px;padding:8px 10px;margin-top:8px;white-space:pre-line;">${t('iphoneHomeScreenLoginNote')}</div>
      <div style="font-size:12px;font-weight:700;margin:14px 0 6px;">${t('androidCase')}</div>
      <ol class="installsteps">
        <li>${t('androidStep1')}</li>
        <li>${t('androidStep2')}</li>
        <li>${t('androidStep3')}</li>
        <li>${t('androidStep4')}</li>
      </ol>
    </div>` : ''}

    <div style="height:1px;background:var(--line);margin:14px 0;"></div>
    <a href="./privacy.html" target="_blank" rel="noopener" style="font-size:12px;color:var(--dim);text-decoration:none;display:flex;align-items:center;gap:6px;">${LANG==='ja'?'プライバシーポリシー':'Privacy Policy'}</a>
    <div class="mono" style="font-size:10px;color:var(--faint);margin-top:10px;">Build: ${APP_VERSION}</div>
  </div>`;

  // 5. Backup (two independent methods: Google sign-in sync, and manual
  // export/import), each now its own 隠し扉 collapsible section (same
  // ▶/▼ pattern as elsewhere in Settings) so neither method's content is
  // shown until the user actually opens it.
  html += `<div class="panel" style="padding:16px;margin-bottom:16px;">
    <div class="settitle">${t('backupSection')}</div>
    <div style="font-size:11px;color:var(--faint);margin-bottom:14px;">${t('backupSectionDesc')}</div>

    <div class="collapsehead" onclick="toggleLoginPanel()">
      <div style="font-size:12px;font-weight:700;">${t('backupMethod1Title')}</div>
      <div class="tri">${showLoginPanel?'▼':'▶'}</div>
    </div>
    ${showLoginPanel ? `<div class="collapsebody">${renderSyncBar()}</div>` : ''}

    <div style="height:1px;background:var(--line);margin:14px 0;"></div>

    <div class="collapsehead" onclick="toggleManualBackupPanel()">
      <div style="font-size:12px;font-weight:700;">${t('backupMethod2Title')}</div>
      <div class="tri">${showManualBackupPanel?'▼':'▶'}</div>
    </div>
    ${showManualBackupPanel ? `<div class="collapsebody">
    <div style="font-size:11px;color:var(--faint);margin-bottom:10px;">${t('backupManualNote')}</div>
    <div style="display:flex;gap:10px;">
      <button class="btn-ghost" onclick="exportData()">${t('exportBtn')}</button>
      <label class="btn-ghost" style="text-align:center;cursor:pointer;">${t('importBtn')}<input type="file" accept="application/json" style="display:none;" onchange="importDataFile(event)"></label>
    </div>
    </div>` : ''}
  </div>`;

  // 6. Danger zone: factory reset. Kept as its own visually-separated panel at the
  // very bottom of Settings (away from everyday toggles) so it isn't tapped by
  // accident; resetAllData() itself also asks for a native OK/Cancel confirmation
  // before doing anything irreversible.
  html += `<div class="panel" style="padding:16px;margin-bottom:16px;">
    <div class="settitle" style="color:var(--rust);">${t('resetSection')}</div>
    <div style="font-size:12px;color:var(--dim);margin-bottom:14px;">${t('resetSectionDesc')}</div>
    <button class="btn-ghost" style="width:100%;background:color-mix(in srgb, var(--rust) 16%, var(--panel));border-color:color-mix(in srgb, var(--rust) 45%, var(--panel));box-shadow:3px 3px 0 color-mix(in srgb, var(--rust) 30%, var(--line));" onclick="resetAllData()">${t('resetAllBtn')}</button>
  </div>`;

  return html;
}

function setTab(t){
  if(t !== tab){
    const oldIdx = TAB_ORDER.indexOf(tab), newIdx = TAB_ORDER.indexOf(t);
    tabSlideDir = (oldIdx!==-1 && newIdx!==-1) ? (newIdx > oldIdx ? 'fwd' : 'back') : null;
  } else {
    tabSlideDir = null;
  }
  tab=t; save('tt_last_tab', t); render();
}

// ---------- swipe navigation between tabs (mobile) ----------
// PC操作では使われない見込みだが、スマホでの片手操作を想定して
// Timecard / Tasks / Summary / Settings を左右スワイプで切り替えられるようにする。
//
// タッチ開始直後は「横スワイプ」か「縦スクロール」かまだ分からないので、
// 一定距離動くまでは判定を保留し（direction lock）、横方向だと確定した時点で
// 初めて preventDefault してページの縦スクロールを止める。こうすることで、
// 縦スクロールのつもりの操作がタブ切り替えと同時に発生してしまう「共存」を防ぐ。
(function(){
  // TAB_ORDER はnav/setTab側で定義済みのものを共用する
  const SWIPE_MIN_DIST = 60;        // px: これ以上動いたらタブ切り替えとみなす
  const DIRECTION_LOCK_DIST = 10;   // px: 最初にこれだけ動いたら横/縦どちらのジェスチャーか確定する
  const SWIPE_MAX_TIME = 700;       // ms: これより遅い動きはスワイプとみなさない

  let touchStartX = 0, touchStartY = 0, touchStartTime = 0;
  let swipeIgnored = false;     // モーダル表示中・横スクロール領域内など、そもそも対象外
  let gestureDirection = null;  // 'horizontal' | 'vertical' | null(未確定)

  function isModalOpen(){
    // 各種モーダル（タスク編集・記録追加・メモなど）表示中はスワイプでタブを切り替えない
    return !!document.querySelector('.modal-bg');
  }
  function isInsideHScroll(el){
    // テーブルの横スクロールやピクセルアート選択の横スクロールと競合しないようにする
    const hs = el.closest && el.closest('.tbl-wrap, .pixrow');
    if(!hs) return false;
    return hs.scrollWidth > hs.clientWidth + 1;
  }
  function resetGesture(){
    swipeIgnored = false;
    gestureDirection = null;
  }

  document.addEventListener('touchstart', (e)=>{
    if(e.touches.length !== 1 || isModalOpen() || isInsideHScroll(e.target)){
      swipeIgnored = true;
      gestureDirection = null;
      return;
    }
    resetGesture();
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
  }, {passive:true});

  document.addEventListener('touchmove', (e)=>{
    if(swipeIgnored) return;
    const touch = e.touches[0];
    if(!touch) return;
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;

    if(gestureDirection === null){
      if(Math.abs(dx) < DIRECTION_LOCK_DIST && Math.abs(dy) < DIRECTION_LOCK_DIST) return; // まだ判定できるほど動いていない
      // 横方向の動きが縦方向よりはっきり大きい場合だけスワイプ操作として扱う
      gestureDirection = (Math.abs(dx) > Math.abs(dy) * 1.5) ? 'horizontal' : 'vertical';
      if(gestureDirection === 'vertical'){
        swipeIgnored = true; // 以降は通常の縦スクロールに任せる
        return;
      }
    }
    if(gestureDirection === 'horizontal' && e.cancelable){
      // 横スワイプ確定後は、ページの縦スクロールと同時に走らないよう止める
      e.preventDefault();
    }
  }, {passive:false});

  document.addEventListener('touchend', (e)=>{
    const wasHorizontal = !swipeIgnored && gestureDirection === 'horizontal';
    gestureDirection = null;
    if(!wasHorizontal) return;
    const touch = e.changedTouches[0];
    if(!touch) return;
    const dx = touch.clientX - touchStartX;
    const dt = Date.now() - touchStartTime;
    if(dt > SWIPE_MAX_TIME) return;
    if(Math.abs(dx) < SWIPE_MIN_DIST) return;

    const idx = TAB_ORDER.indexOf(tab);
    if(idx === -1) return;
    if(dx < 0 && idx < TAB_ORDER.length - 1){
      setTab(TAB_ORDER[idx + 1]);   // 左スワイプ → 次のタブ
    } else if(dx > 0 && idx > 0){
      setTab(TAB_ORDER[idx - 1]);   // 右スワイプ → 前のタブ
    }
  }, {passive:true});

  document.addEventListener('touchcancel', ()=>{
    swipeIgnored = true;
    gestureDirection = null;
  }, {passive:true});
})();

// iOS Safari バグ対策: <input type="time"/"date"> にフォーカスしてネイティブの
// 時刻ピッカー(ホイール)が開いている間、その入力欄を含む .modal が
// overflow-y:auto でスクロール可能なままだと、キーボード/ピッカー分だけ
// ビジュアルビューポートが縮む際にSafariが「入力欄が見えるように」と
// この要素を自動でわずかにスクロールしてしまい、そのスクロールがトリガーと
// なってピッカーが値を選んでいる途中で即座に閉じてしまう(既知のWebKit不具合)。
// フォーカス中だけ .modal のスクロールを止めることでこの自動スクロールが
// 起きないようにし、ピッカーが閉じてしまうのを防ぐ。
document.addEventListener('focusin', (e)=>{
  const el = e.target;
  if(!el || el.tagName!=='INPUT') return;
  if(el.type!=='time' && el.type!=='date') return;
  const modal = el.closest('.modal');
  if(modal) modal.style.overflowY = 'hidden';
}, true);
document.addEventListener('focusout', (e)=>{
  const el = e.target;
  if(!el || el.tagName!=='INPUT') return;
  if(el.type!=='time' && el.type!=='date') return;
  const modal = el.closest('.modal');
  if(modal) modal.style.overflowY = '';
}, true);

// ---------- report / summary ----------
function monthlyGoalMinutes(task, month, todayStr){
  const [y,m] = month.split('-').map(Number);
  const daysInMonth = new Date(y,m,0).getDate();
  const isCurrentMonth = month === todayStr.slice(0,7);
  const cutoffDay = isCurrentMonth ? new Date(todayStr).getDate() : daysInMonth;
  const days = task.days && task.days.length ? task.days : null; // null = every day
  let count = 0;
  for(let d=1; d<=cutoffDay; d++){
    const wd = new Date(y, m-1, d).getDay();
    if(!days || days.includes(wd)) count++;
  }
  return count * (task.targetHours||0) * 60;
}

function polarToCartesian(cx, cy, r, angleDeg){
  const rad = (angleDeg-90) * Math.PI/180;
  return { x: cx + r*Math.cos(rad), y: cy + r*Math.sin(rad) };
}
function renderCalendar(rows, month, selectedDate){
  const byDate = {};
  rows.forEach(r=>{
    if(!byDate[r.date]) byDate[r.date] = {ms:0, taskIds:new Set(), recordedIds:new Set()};
    const d = byDate[r.date];
    d.ms += r.ms; if(!r.noDot) d.taskIds.add(r.taskId);
    if(!r.carry) d.recordedIds.add(r.taskId);
  });
  const [y,m] = month.split('-').map(Number);
  const daysInMonth = new Date(y, m, 0).getDate();
  const startWeekday = new Date(y, m-1, 1).getDay();
  const todayStr = fmtDate(new Date());
  // achievedDates -> ⭐ (that day hit its combined daily goal) -- see
  // evaluateRewards()'s design notes for how this gets populated. Today gets
  // committed into it the moment persistRecords() re-runs evaluateRewards()
  // (e.g. once a running session is stopped), but while a session is still
  // actively ticking upward nothing has re-run evaluateRewards() yet -- show
  // the star live in that gap too via isTodayAchievedLive(), instead of only
  // reflecting it once the session actually stops.
  // (The calendar used to also show a 🎁 on the day each present was banked
  // via giftEarnedDates, but that marker jumps around whenever a past date
  // gets a record added retroactively -- since which day earns the 🎁
  // depends on the achievedDates order, not a fixed date -- so it's been
  // dropped as more confusing than useful. See collectedSoFar/giftGaugeInfo
  // on the Summary tab for the cumulative present count instead.)
  const achievedSet = new Set(rewards.achievedDates || []);
  const todayLiveAchieved = isTodayAchievedLive();

  const cells = [];
  for(let i=0;i<startWeekday;i++) cells.push(null);
  for(let d=1; d<=daysInMonth; d++) cells.push(d);
  while(cells.length % 7 !== 0) cells.push(null);

  const cellHtml = cells.map(d=>{
    if(d===null) return `<div class="cal-cell blank"></div>`;
    const dateStr = `${y}-${pad(m)}-${pad(d)}`;
    const info = byDate[dateStr];
    const isToday = dateStr === todayStr;
    const isSelected = dateStr === selectedDate;
    const cls = `cal-cell${isToday?' today':''}${isSelected?' selected':''}`;
    const isAchieved = achievedSet.has(dateStr) || (isToday && todayLiveAchieved) || isCarryoverAchieved(dateStr);
    const badges = `${isAchieved ? '<span class="cal-star">⭐</span>' : ''}`;
    if(!info){
      return `<div class="${cls}" onclick="selectReportDate('${dateStr}')"><div class="cal-day">${d}${badges}</div></div>`;
    }
    // 振り分けで来ただけのタスク（その日に実際の記録がない）は白抜きのポッチ
    const dots = [...info.taskIds].map(id=> info.recordedIds.has(id)
      ? `<span class="cal-dot" style="background:${taskColor(id)};"></span>`
      : `<span class="cal-dot" style="background:transparent;box-shadow:inset 0 0 0 1.5px ${taskColor(id)};"></span>`).join('');
    return `<div class="${cls}" onclick="selectReportDate('${dateStr}')">
      <div class="cal-day">${d}${badges}</div>
      <div class="cal-hrs">${(info.ms/3600000).toFixed(1)}h</div>
      <div class="cal-dots">${dots}</div>
    </div>`;
  }).join('');

  return `<div class="panel" style="padding:16px;margin-bottom:16px;">
    <div style="font-size:12px;color:var(--faint);margin-bottom:10px;">${t('calendarTitle')}</div>
    <div class="cal-grid" style="margin-bottom:6px;">
      ${WEEKDAYS.map(w=>`<div class="cal-head">${w}</div>`).join('')}
    </div>
    <div class="cal-grid">${cellHtml}</div>
  </div>`;
}
function selectReportDate(dateStr){
  selectedReportDate = (selectedReportDate===dateStr) ? null : dateStr;
  render();
    }

    function renderReport() {
        const todayStr = fmtDate(new Date());
        const allSessions = [];
        Object.entries(records).forEach(([date, arr]) => arr.forEach(s => allSessions.push(s)));
        const monthSessions = allSessions.filter(s => s.date.startsWith(reportMonth)).sort((a, b) => a.date.localeCompare(b.date) || (a.currentStart || a.segments[0]?.start || '').localeCompare(b.currentStart || b.segments[0]?.start || ''));
        const rows = monthSessions.map(r => ({ ...r, ms: computeWorkMs(r) }));
        // 振り分け（振替）した時間を、カレンダー上では「振り分け先の日の時間」として扱う。
        // 振り分け先：時間を加算＋タスク色のポッチ、振り分け元：その分の時間を差し引く。
        // （月の合計時間は同じ月の中での振り分けなら変わらない）
        tasks.forEach(tk => taskCarryovers(tk).forEach(c => {
            if (c.to.startsWith(reportMonth)) rows.push({ date: c.to, taskId: tk.id, ms: c.min * 60000, carry: true });
            if (c.from.startsWith(reportMonth)) rows.push({ date: c.from, taskId: tk.id, ms: -c.min * 60000, carry: true, noDot: true });
        }));
        const totalMs = rows.reduce((s, r) => s + r.ms, 0);

        // ターゲット日付を決定（選択日、なければ今日、過去月なら1日）
        let targetDate = selectedReportDate;
        if (!targetDate) {
            targetDate = (reportMonth === todayStr.slice(0, 7)) ? todayStr : `${reportMonth}-01`;
        }
        const targetDayOfWeek = new Date(targetDate + 'T00:00:00').getDay();

        // ターゲット日付のタスクごとの実績と目標を集計
        const targetDaySessions = allSessions.filter(s => s.date === targetDate);
        // 目標は振替（超過分の振り分け）を反映した値。振替で目標が0分になった日は100%扱い。
        const dayTotals = dateDayTotals(targetDate);
        const dayGoalMinutes = dayTotals.goalMin;

        const dayActualMs = targetDaySessions.reduce((s, r) => s + computeWorkMs(r), 0);
        const dayActualMinutes = dayActualMs / 60000;
        const dayAchievementRate = dayGoalMinutes > 0 ? Math.min(100, dayActualMinutes / dayGoalMinutes * 100) : ((dayActualMinutes > 0 || dayTotals.hasGoal) ? 100 : 0);
        const dayLabel = targetDate === todayStr ? t('todayAchievement') : t('dateAchievement')(targetDate.slice(5).replace('-', '/'));
        // 表示上「100%」に見えたら強調色にしたいので、生の割合ではなく実際に
        // 画面に出す丸め後の値で判定する（例：99.6%は生の値だと100%未満だが
        // Math.round()で「100%」と表示されるため、丸め後の値で判定しないと
        // 見た目は100%なのに色が変わらないというズレが起きる）。
        // テーマごとの --achieve100 を使用（ダークモードは黄色、それ以外は
        // ピンクになるようindex.htmlのCSS側で定義）
        const dayAchievementRatePct = Math.round(dayAchievementRate);
        const dayRateStyle = dayAchievementRatePct >= 100 ? ' style="color:var(--achieve100);"' : '';

        // 累計の⭐/🎁（月をまたいだ全期間の集計）と、今のプレゼントサイクル
        // （7つ星ためると1個）の進捗ゲージ
        const gauge = giftGaugeInfo();
        const gaugeStr = '⭐'.repeat(gauge.filled) + '・'.repeat(gauge.total - gauge.filled);
        const totalStarsAllTime = rewards.achievedDates.length;
        const totalGiftsAllTime = rewards.giftsGrantedCount;
        // Same "today vs. specific date" wording split as dayLabel above, so
        // the add-task button always names whichever date is currently
        // selected on the calendar (or today/the 1st of the month when
        // nothing's selected, same fallback as targetDate itself).
        const addRecordLabel = targetDate === todayStr ? t('addRecordTodayShort') : t('addRecordDateShort')(targetDate.slice(5).replace('-', '/'));

        let html = `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
    <button class="navbtn" onclick="changeMonth(-1)">‹</button>
    <div class="mono" style="font-size:16px;font-weight:700;">${reportMonth}</div>
    <button class="navbtn" onclick="changeMonth(1)">›</button>
  </div>
  <button onclick="openAddRecord('${targetDate}')" style="width:100%;background:none;border:1px dashed var(--lineS);color:var(--dim);border-radius:10px;padding:10px;cursor:pointer;font-family:inherit;font-size:13px;margin-bottom:16px;">${addRecordLabel}</button>`;

        html += `<div class="metrics" style="grid-template-columns:1fr 1fr;margin-bottom:10px;">
    <div class="metric"><div class="lbl">${t('totalTime')}</div><div class="val mono">${hmLabel(totalMs)}</div></div>
    <div class="metric"><div class="lbl">${dayLabel}</div><div class="val mono"${dayRateStyle}>${dayAchievementRatePct}%</div></div>
  </div>`;

        html += `<div class="metrics" style="grid-template-columns:1fr 1fr;margin-bottom:16px;">
    <div class="metric"><div class="lbl">${t('giftGaugeLabel')}</div><div class="val mono">${gaugeStr}</div></div>
    <div class="metric"><div class="lbl">${t('collectedSoFar')}</div><div class="val mono">${t('collectedSummary')(totalStarsAllTime, totalGiftsAllTime)}</div></div>
  </div>`;

        // カレンダー描画
        html += renderCalendar(rows, reportMonth, selectedReportDate);

        // 指定した日（選択日 or 今日）の記録リストをカレンダー下に表示
        // この日に振り分けられてきた時間（タスクごと）
        const carryInRows = [];
        let dayCarryOutMs = 0;
        tasks.forEach(tk => {
            const inMin = taskCarryInMin(tk, targetDate);
            if (inMin > 0) carryInRows.push({ task: tk, ms: inMin * 60000 });
            dayCarryOutMs += taskCarryOutMin(tk, targetDate) * 60000;
        });
        const dayCarryInMs = carryInRows.reduce((a, r) => a + r.ms, 0);
        const dayShownMs = Math.max(0, dayActualMs + dayCarryInMs - dayCarryOutMs);
        const dayRows = targetDaySessions.map(r => ({ ...r, ms: computeWorkMs(r) }))
            .sort((a, b) => (a.currentStart || a.segments[0]?.start || '').localeCompare(b.currentStart || b.segments[0]?.start || ''));
        // 他の日へ振り分けた分は、この日の記録の表示時間から差し引く
        // （同じタスクの記録が複数あるときは後ろの記録から順に差し引く）
        dayRows.forEach(r => { r.shownMs = r.ms; });
        tasks.forEach(tk => {
            let outMs = taskCarryOutMin(tk, targetDate) * 60000;
            if (outMs <= 0) return;
            for (let k = dayRows.length - 1; k >= 0 && outMs > 0; k--) {
                const r = dayRows[k];
                if (r.taskId !== tk.id) continue;
                const cut = Math.min(r.shownMs, outMs);
                r.shownMs -= cut; outMs -= cut;
            }
        });
        const carryInHtml = carryInRows.map((r, i) => {
            const baseGoalMin = Number(r.task.targetHours || 0) * 60;
            const rate = baseGoalMin > 0 ? Math.min(100, (r.ms / 60000) / baseGoalMin * 100) : null;
            const isLast = i === carryInRows.length - 1;
            return `
      <div style="padding:12px 0; border-top:${(i === 0 && dayRows.length) ? '1px solid var(--line)' : 'none'}; border-bottom:${isLast ? 'none' : '1px solid var(--line)'};">
        <div style="display:flex;align-items:center;gap:8px;font-size:13px;margin-bottom:${rate !== null ? '8px' : '0'};">
          <div style="flex:1;display:flex;align-items:center;gap:6px;min-width:0;">
            <span class="dot-sm" style="background:transparent;box-shadow:inset 0 0 0 2px ${taskColor(r.task.id)};flex-shrink:0;"></span>
            <span style="font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(r.task.name)}</span>
          </div>
          <div class="mono" style="color:var(--dim);">${hmLabel(r.ms)}</div>
          <div class="mono" style="width:40px;text-align:right;color:${rate === null ? 'var(--faint)' : (rate >= 100 ? 'var(--teal)' : 'var(--text)')};font-weight:700;">${rate === null ? '—' : Math.round(rate) + '%'}</div>
        </div>
        ${rate !== null ? `
        <div class="barwrap" style="height:6px; background:var(--line);">
          <div class="bar" style="width:${Math.round(rate)}%; background:${taskColor(r.task.id)}; height:100%; border-radius:3px; opacity:0.6;"></div>
        </div>` : ''}
      </div>`;
        }).join('');
        const wd = WEEKDAYS[targetDayOfWeek];
        const rowsHtml = dayRows.map((r, i) => {
            const task = tasks.find(tk => tk.id === r.taskId);
            const goalMin = task ? (taskScheduledOn(task, targetDate) ? taskDayGoalMin(task, targetDate) : (task.targetHours || 0) * 60) : 0;
            const covered = task && taskScheduledOn(task, targetDate) && goalMin <= 0;
            const rate = covered ? 100 : (goalMin > 0 ? Math.min(100, (r.shownMs / 60000) / goalMin * 100) : null);
            const isLast = i === dayRows.length - 1;

            return `
      <div style="padding:12px 0; border-bottom:${isLast ? 'none' : '1px solid var(--line)'};">
        <div style="display:flex;align-items:center;gap:8px;font-size:13px;margin-bottom:${rate !== null || r.memo ? '8px' : '0'};">
          <div style="flex:1;display:flex;align-items:center;gap:6px;min-width:0;">
            <span class="dot-sm" style="background:${taskColor(r.taskId)};flex-shrink:0;"></span>
            <span style="font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(r.taskName)}</span>
          </div>
          <div class="mono" style="color:var(--dim);">${hmLabel(r.shownMs)}</div>
          <div class="mono" style="width:40px;text-align:right;color:${rate === null ? 'var(--faint)' : (rate >= 100 ? 'var(--teal)' : 'var(--text)')};font-weight:700;">${rate === null ? '—' : Math.round(rate) + '%'}</div>
          <div style="display:flex;align-items:center;gap:2px;flex-shrink:0;margin-left:4px;">
            <button onclick="openRecordEdit('${r.date}','${r.id}')" style="background:none;border:none;cursor:pointer;padding:2px;line-height:0;">${renderIconArt(TASK_ICON_ART.edit, 0.7)}</button>
            <button onclick="openMemoEdit('${r.date}','${r.id}')" style="background:none;border:none;cursor:pointer;padding:2px;line-height:0;">${renderIconArt(TASK_ICON_ART.memo, 0.7)}</button>
            <button onclick="deleteSession('${r.date}','${r.id}')" style="background:none;border:none;cursor:pointer;padding:2px;line-height:0;">${renderIconArt(TASK_ICON_ART.trash, 0.7)}</button>
          </div>
        </div>
        ${rate !== null ? `
        <div class="barwrap" style="height:6px; margin-bottom:${r.memo ? '10px' : '0'}; background:var(--line);">
          <div class="bar" style="width:${Math.round(rate)}%; background:${taskColor(r.taskId)}; height:100%; border-radius:3px;"></div>
        </div>
        ` : ''}
        ${r.memo ? `<div style="font-size:12px;color:var(--dim);white-space:pre-wrap;word-break:break-word;background:var(--panel2);padding:10px;border-radius:8px;display:flex;align-items:flex-start;gap:6px;"><span style="flex-shrink:0;line-height:0;">${renderIconArt(TASK_ICON_ART.memo, 0.7)}</span><span>${escapeHtml(r.memo)}</span></div>` : ''}
      </div>
    `;
        }).join('');

        html += `<div class="panel" style="padding:14px;margin-bottom:10px;">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:${dayRows.length ? '8px' : '0'};">
      <span class="mono" style="font-weight:700;font-size:13px;">${targetDate.slice(5).replace('-', '/')} (${wd})</span>
      <span class="mono" style="font-size:11px;color:var(--dim);">${t('entriesCount')(dayRows.length + carryInRows.length)} ・ ${hmLabel(dayShownMs)}</span>
    </div>
    ${dayRows.length ? rowsHtml : (carryInRows.length ? '' : `<div style="font-size:12px;color:var(--faint);padding:6px 0;">${t('noRecordsThisDay')}</div>`)}
    ${carryInHtml}
    ${renderCarryoverSection(targetDate)}
  </div>`;

        return html;
    }

function toggleReportDate(date){
  if(expandedReportDates.has(date)) expandedReportDates.delete(date); else expandedReportDates.add(date);
  render();
}
function changeMonth(delta){
  const [y,m] = reportMonth.split('-').map(Number);
  const d = new Date(y, m-1+delta, 1);
  reportMonth = `${d.getFullYear()}-${pad(d.getMonth()+1)}`;
  // keep the selection if it still falls in the newly shown month, otherwise clear it
  if(!selectedReportDate || !selectedReportDate.startsWith(reportMonth)) selectedReportDate = null;
  render();
}

// Plays the goal-reached "pop": the fish grows, bounces, and *then* turns
// into the bone mid-bounce -- not an instant swap followed by a bounce.
// `swapToBone` actually changes the sprite (innerHTML + dataset); it's
// called partway through the animation, timed to land right around the
// scale peak/recoil in the goalPop keyframes above.
function playGoalPop(el, swapToBone){
  if(!el) return;
  el.classList.remove('goal-pop');
  // Force a reflow so re-adding the class restarts the animation even if it
  // was already mid-way (e.g. rapid state changes from editing elapsed time).
  void el.offsetWidth;
  el.classList.add('goal-pop');
  let swapped = false;
  const doSwap = () => { if(swapped) return; swapped = true; swapToBone(); };
  const swapTimer = setTimeout(doSwap, 210);
  const clear = () => { el.classList.remove('goal-pop'); };
  el.addEventListener('animationend', clear, { once: true });
  // Fallback in case animationend doesn't fire (e.g. reduced-motion, tab
  // backgrounded) -- make sure the sprite still ends up swapped either way.
  setTimeout(() => { clearTimeout(swapTimer); doSwap(); clear(); }, 650);
}
// Reaching 100% and the fish becoming a bone happen with a small deliberate
// gap (0.5s) rather than instantly together, so the two feel like distinct
// beats instead of one single event. Guarded with a 'pending-done' state so
// the once-a-second tick doesn't schedule the swap again while it's already
// waiting to fire.
function triggerGoalDone(goalEl, delayMs){
  if(!goalEl || goalEl.dataset.goalState === 'pending-done' || goalEl.dataset.goalState === 'done') return;
  goalEl.dataset.goalState = 'pending-done';
  setTimeout(() => {
    if(!goalEl.isConnected) return;
    playGoalPop(goalEl, () => {
      const doneArt = currentGoalDoneArt();
      if(doneArt){ goalEl.innerHTML = renderStretchPart(doneArt.grid, doneArt.colors, 2.5); goalEl.dataset.goalState = 'done'; }
    });
  }, delayMs);
}

// ---------- boot ----------
function tickClock(){
  const activeS = activeSessionToday();
  if(activeS && activeS.status==='working' && pomodoroState && pomodoroState.sessionId===activeS.id && pomodoroState.running){
    pomodoroState.remainingMs -= 1000;
    if(pomodoroState.remainingMs <= 0){
      advancePomodoroPhase();
      if(tab==='punch') render();
      return;
    }
  }
  if(tab!=='punch' || showTaskForm || editingRecordDate || showAddRecord || showDuplicate || showPomodoroForm || editingMemoDate || carryoverDraft) return;
  if(activeS && activeS.status==='working'){
    const ms = computeWorkMs(activeS);
    const el = document.getElementById('clockDisplay');
    if(el) el.textContent = msToHMS(ms);
    const task = tasks.find(t=>t.id===activeS.taskId);
    const goalInfo = taskGoalInfoForDate(task, fmtDate(new Date()));
    const percent = goalPercent(ms, goalInfo);
    if(settings.barStyle==='stretch'){
      const sb = document.querySelector('.stretchbar');
      if(sb){
        const displayPercent = Math.max(percent, 2);
        const frontRightPx = parseFloat(sb.dataset.frontRight)||0;
        const backAnchorPx = parseFloat(sb.dataset.backAnchor)||0;
        const rightMarginPx = parseFloat(sb.dataset.rightMargin)||0;
        const mid = sb.querySelector('.stretchbar-mid');
        const back = sb.querySelector('.stretchbar-back');
        // Same linear interpolation as the initial render: scale the whole
        // 0-100% range onto [restPos, maxStretchPos] so the cat keeps
        // stretching continuously and reaches its max exactly at 100%,
        // instead of capping early and sitting still for the remainder.
        const backLeft = `calc(-${backAnchorPx}px + (100% - ${rightMarginPx}px + ${backAnchorPx}px) * ${displayPercent} / 100)`;
        const midWidth = `calc(${backLeft} - ${frontRightPx}px + ${backAnchorPx + 3}px)`;
        if(mid) mid.style.width = midWidth;
        if(back) back.style.left = backLeft;
        const goalEl = sb.querySelector('.stretchbar-goal');
        if(goalEl){
          const reachedGoal = percent>=100;
          const wantState = reachedGoal ? 'done' : 'fish';
          if(goalEl.dataset.goalState !== wantState && goalEl.dataset.goalState !== 'pending-done'){
            if(wantState==='done'){
              triggerGoalDone(goalEl, 500);
            } else {
              const marker = currentGoalFishArt();
              if(marker){ goalEl.innerHTML = renderStretchPart(marker.grid, marker.colors, 2.5); goalEl.dataset.goalState = wantState; }
            }
          }
        }
      }
    } else {
      const fill = document.querySelector('.progressfill');
      // The bar fills to literally 100% at the goal; the cat sprite below
      // moves on its own separate scale (see comment there).
      if(fill) fill.style.width = percent+'%';
      const cat = document.querySelector('.catwalk');
      if(cat){
        const walkCellActual = 1.8 * 1.5;
        const walkRightExtendPx = (16 * walkCellActual) * 0.7;
        const walkGoalClearancePx = 10;
        // Scale 0-100% linearly onto [0, the fish-eating position] so the
        // cat keeps walking the whole time and arrives exactly at 100%,
        // instead of reaching that spot early and standing still.
        cat.style.left = `calc((100% - ${walkRightExtendPx}px - ${walkGoalClearancePx}px) * ${percent} / 100)`;
      }
      const goalEl = document.querySelector('.progresswrap .stretchbar-goal');
      if(goalEl){
        const reachedGoal = percent>=100;
        const wantState = reachedGoal ? 'done' : 'fish';
        if(goalEl.dataset.goalState !== wantState && goalEl.dataset.goalState !== 'pending-done'){
          if(wantState==='done'){
            triggerGoalDone(goalEl, 500);
          } else {
            const marker = currentGoalFishArt();
            if(marker){ goalEl.innerHTML = renderStretchPart(marker.grid, marker.colors, 2.5); goalEl.dataset.goalState = wantState; }
          }
        }
      }
    }
    const gl = document.querySelector('.goalline');
    if(gl) gl.textContent = `${hmLabel(ms)} / ${goalInfoLabel(goalInfo)}${t('parenWrap')(task?task.name:'')}`;
  }
  if(pomodoroState && activeS && pomodoroState.sessionId===activeS.id){
    const pt = document.getElementById('pomoTimer');
    if(pt) pt.textContent = msToHMS(Math.max(0,pomodoroState.remainingMs)).slice(3);
  }
}
setInterval(tickClock, 1000);
evaluateRewards(); // catch up any weeks/days that elapsed since the app was last opened
applyTheme();
render();

// post-purchase redirect: show a brief thank-you toast, then clean the URL so a reload doesn't repeat it
(function checkPurchaseRedirect(){
  const params = new URLSearchParams(window.location.search);
  if(params.get('purchase') === 'success'){
    showToast(t('purchaseThanks'), 4000);
  }
  if(params.has('purchase')){
    params.delete('purchase');
    const qs = params.toString();
    history.replaceState(null, '', window.location.pathname + (qs? `?${qs}` : ''));
  }
})();

if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
  });
}

// ---- (was a separate inline <script> block: Firebase lazy loader) ----
// Firebase (auth + sync) is loaded lazily, after the critical UI has painted
// and the main render() call has finished, so it doesn't compete for
// bandwidth/CPU with the initial screen the person actually sees first.
// Nothing about *what* it does changes -- same anonymous auto sign-in and
// background sync as before, just scheduled a beat later.
function __loadFirebaseModule(){
  const s = document.createElement('script');
  s.type = 'module';
  s.textContent = `
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js';
  import {
    getAuth, onAuthStateChanged, signInAnonymously,
    GoogleAuthProvider, signInWithPopup, linkWithPopup, signOut,
    signInWithRedirect, linkWithRedirect, getRedirectResult
  } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js';
  import {
    getFirestore, doc, getDoc, setDoc, onSnapshot, serverTimestamp
  } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js';
  import {
    getFunctions, httpsCallable
  } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-functions.js';

  const firebaseConfig = {
    apiKey: "AIzaSyCMiihBjCDtVBerTYk1EOQsZ9MpNpo0lEs",
    authDomain: "auth.timecard.mim-crt.com",
    projectId: "app-timecard",
    storageBucket: "app-timecard.firebasestorage.app",
    messagingSenderId: "162418041467",
    appId: "1:162418041467:web:cbb9c26b4f3cfe88d0b8de",
    measurementId: "G-CJ5PKFQ1CN"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const functions = getFunctions(app, 'asia-northeast1'); // must match the region the functions were deployed to
  const createCheckoutSessionCallable = httpsCallable(functions, 'createCheckoutSession');

  window.__fb = {
    ready: true, user: null,
    auth, db, doc, getDoc, setDoc, onSnapshot, serverTimestamp,
    GoogleAuthProvider, signInWithPopup, linkWithPopup, signOut,
    signInWithRedirect, linkWithRedirect,
    createCheckoutSession: () => createCheckoutSessionCallable(),
  };
  window.dispatchEvent(new Event('fb-ready'));

  // Always redirect for Google sign-in (see fbSignInGoogle) — popups get blocked
  // by browsers and can't open at all inside an installed/standalone PWA.
  getRedirectResult(auth)
    .then((result) => {
      if (result && result.user) {
        console.log('Google redirect sign-in completed:', result.user.uid);
      } else {
        console.log('No pending Google redirect result (normal on a fresh load).');
      }
    })
    .catch((e) => {
      console.error('redirect sign-in failed', e && e.code, e);
      // If this Google account is already linked to a different Firebase user
      // (e.g. it was used to sign in from another device first), just sign in
      // as that existing account instead of failing outright.
      if (e && e.code === 'auth/credential-already-in-use') {
        signInWithRedirect(auth, new GoogleAuthProvider()).catch((e2) => console.error('fallback redirect sign-in failed', e2 && e2.code, e2));
      }
    });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.__fb.user = user;
      window.dispatchEvent(new CustomEvent('fb-auth', { detail: user }));
    } else {
      signInAnonymously(auth).catch((e) => console.error('anonymous sign-in failed', e && e.code, e));
    }
  });
  `;
  document.body.appendChild(s);
}
if('requestIdleCallback' in window){
  requestIdleCallback(__loadFirebaseModule, {timeout: 2000});
} else {
  setTimeout(__loadFirebaseModule, 300);
}

// ---- (was a separate inline <script> block: debug console loader) ----
// Optional on-screen debug console for phones without access to devtools.
// Visit the site with ?debug=1 appended to the URL to enable it (tap the
// floating button that appears in the corner to open the console/network panels).
// The flag is remembered in sessionStorage so it survives the Google sign-in
// redirect round-trip, which drops the ?debug=1 query param on return.
(function(){
  const params = new URLSearchParams(window.location.search);
  if (params.get('debug') === '1') { try{ sessionStorage.setItem('debugConsole','1'); }catch(e){} }
  let debugOn = false;
  try{ debugOn = sessionStorage.getItem('debugConsole') === '1'; }catch(e){}
  if (debugOn) {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/eruda';
    s.onload = () => { window.eruda && window.eruda.init(); };
    document.body.appendChild(s);
  }
})();