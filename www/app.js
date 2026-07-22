const DB_NAME = "jing-body-progress";
const DB_VERSION = 1;
const RECORD_STORE = "records";
const PROFILE_KEY = "jing-body-profile-v2";
const LEGACY_PROFILE_KEY = "jing-body-profile-v1";
const PLAN_START_KEY = "jing-image-plan-start-v1";
const PLAN_STATE_KEY = "jing-image-plan-state-v1";
const BUY_GATE_KEY = "jing-style-buy-gate-v1";
const WORKOUT_STATE_KEY = "jing-workout-state-v1";
const WORKOUT_DURATION_KEY = "jing-workout-duration-v1";

const defaultProfile = {
  height: 180,
  age: 24,
  baselineWeight: 62.5,
  targetWeight: 65,
  shoulderArc: 50,
  lowerLength: 104,
  torsoLength: 50,
  headHeight: 26,
  direction: "不减脂。缓慢增肌，优先肩、上背和上胸；降低拍摄失真，固定发型、镜框和企业 IP 制服。"
};

const dailyActions = [
  ["拍一张无畸变基准照", "后置 2×，距离 1.5–2 米，镜头与眼睛同高。"],
  ["把自拍镜头停用一天", "需要拍自己时只用后置镜头，让判断回到正常社交距离。"],
  ["整理眉毛和胡须边缘", "只清理杂乱边缘，不改眉形，不追求过度精修。"],
  ["练 3 次镜头表情", "先呼气，再看镜头；嘴唇放松，不抿嘴，不瞪眼。"],
  ["确认发型高度", "顶部压低，两侧收束；拍正面照检查头部轮廓。"],
  ["完成一次温和清洁和保湿", "不叠加新产品，只让皮肤状态稳定。"],
  ["拍本周面部与全身记录", "沿用同一地点、镜头、距离和光线。"],
  ["试一套合肩上衣", "肩线接近肩峰，上衣不过长，拍正面和侧面。"],
  ["清掉一个不合格购物收藏", "落肩、长款、束脚或大 Logo，命中一项就删。"],
  ["做一次肩背训练", "今天优先侧平举、划船或上胸推，不额外减脂。"],
  ["擦净镜片并检查反光", "镜片干净，灯光放在脸侧前方，不正对镜片。"],
  ["用企业 IP 机位录 30 秒", "身体转 15°，脸回镜头，下巴前伸后轻压。"],
  ["给理发师保存固定话术", "下次剪发不再临场说“随便修一下”。"],
  ["检查一件上衣长度", "自然站立看下摆，盖住大半臀部就不作为出镜服。"],
  ["拍第 2 周标准记录", "不要换滤镜，不要用自拍，不因单张照片做结论。"],
  ["搭好工厂口播制服", "炭灰上衣＋深灰直筒裤＋干净米白鞋。"],
  ["搭好见客户制服", "藏青外层＋米白内搭＋深灰直筒裤。"],
  ["搭好日常出镜制服", "米白上衣＋军绿直筒裤＋一个深色配件。"],
  ["只试穿，不下单", "用五项购买闸门评分；不过五项就不买。"],
  ["处理一件旧衣", "不合肩或过长的衣服移出常穿区，停止反复试错。"],
  ["做一次肩背训练", "身体框架是头身平衡的长期变量。"],
  ["拍第 3 周标准记录", "比较轮廓、精神度和衣服线条，不逐像素挑五官。"],
  ["录一条 60 秒产品口播", "固定机位、固定制服、只复盘一个最明显问题。"],
  ["练习站姿 5 分钟", "脚与胯同宽，胸骨微抬，肩膀向下，不夹肩。"],
  ["检查镜框尺寸感", "镜框不要明显宽过面部，镜片高度不要抢走眼神。"],
  ["重复最好的一套穿搭", "个人 IP 需要识别度，不需要每天换风格。"],
  ["做一次肩背训练", "保持增肌方向，不用有氧补偿饮食。"],
  ["拍第 4 周标准记录", "保持相同条件，让变化可比较。"],
  ["选出一张真实可用头像", "从后置标准照里选，不用自拍广角和强滤镜。"],
  ["完成 30 天复盘", "保留有效变量，下一阶段一次只改一个问题。"]
];

const phases = [
  {
    title: "第 1 周 · 去掉假问题",
    intro: "先统一拍摄条件。不要把广角畸变误判成脸大，也不要因为一张丑照继续减脂。",
    tasks: [
      ["rearCamera", "完成 2 次后置 2× 标准照", "距离 1.5–2 米，镜头与眼睛同高"],
      ["hairBaseline", "确定低顶部侧分发型", "保存理发话术，先不频繁换发型"],
      ["noCut", "体重不下降", "62 kg 已偏轻，不用减脂换脸小"]
    ]
  },
  {
    title: "第 2 周 · 稳定面部秩序",
    intro: "固定清洁、防晒、发型、胡须和镜片状态。目标不是精致化妆，而是每次出现都干净一致。",
    tasks: [
      ["grooming", "连续 5 天基础维护", "温和清洁、保湿、防晒、唇部"],
      ["frameCheck", "去线下试 3 副更克制的镜框", "稍窄、镜片高度略低、深灰或枪色"],
      ["expression", "完成 3 次 30 秒镜头练习", "呼气、放松嘴角、眼神看镜头"]
    ]
  },
  {
    title: "第 3 周 · 建立穿搭制服",
    intro: "停止随机买衣服。先用现有衣服搭三套，再只补最缺的两件。",
    tasks: [
      ["threeUniforms", "拍出 3 套固定制服", "工厂口播、见客户、日常出镜"],
      ["removeBad", "移出 3 件最拖比例的衣服", "过长、落肩、束脚优先"],
      ["shopGate", "完整使用一次购买闸门", "五项全过才允许下单"]
    ]
  },
  {
    title: "第 4 周 · 固定企业 IP",
    intro: "把有效发型、机位和制服重复使用，形成别人能记住的稳定形象。",
    tasks: [
      ["threeVideos", "录 3 条同机位口播", "每次只改一个问题"],
      ["finalCompare", "完成第 1 天与第 28 天对比", "只比较同条件照片"],
      ["nextCycle", "写下下一阶段唯一变量", "镜框、发型或衣服，只选一个"]
    ]
  }
];

const routines = {
  daily: [
    "早上：温和清洁或清水洗脸，保湿，广州白天外出加防晒。",
    "出镜前：整理两侧碎发、擦净镜片、处理明显胡须边缘，涂无色润唇。",
    "晚上：温和清洁并保湿。不要为了见效同时叠加多种酸或祛痘产品。"
  ],
  weekly: [
    "在同一个位置拍一次面部基准照和全身穿搭照。",
    "只清理眉间、眉下明显杂毛；不把眉毛修细。",
    "检查枕套、毛巾和眼镜鼻托是否干净。"
  ],
  monthly: [
    "约 3–5 周修剪一次发型，两侧和后脑先失控就提前。",
    "复盘镜框反光、发型高度、皮肤稳定度，只调整最差的一项。",
    "如果持续红肿、脱屑或痘痘加重，停止自行叠加产品，去正规皮肤科。"
  ]
};

const workoutPlans = [
  {
    day: "星期一",
    focus: "上肢 A",
    heading: "今天练肩背与胸。",
    reason: "先给 T 恤和衬衫建立支撑，不做减脂型训练。",
    level: "中等强度 · 留 2 次余力",
    exercises: [
      ["动态热身", {30:"4 分钟",45:"5 分钟",60:"6 分钟"}, "肩绕环、扩胸、猫牛式，不做长时间拉伸"],
      ["俯卧撑 / 地板卧推", "3 组 × 8–12 次", "动作标准后再给双肩包加重量"],
      ["单臂背包划船", "3 组 × 每侧 10–12 次", "肘向髋部拉，顶端停 1 秒"],
      ["侧平举", "3 组 × 12–15 次", "矿泉水也可以，手肘不要高过肩"],
      ["俯身反向飞鸟", "3 组 × 12–15 次", "重量轻，肩胛向后下方收"],
      ["死虫", "3 组 × 每侧 8 次", "腰贴地，缓慢呼气"]
    ]
  },
  {
    day: "星期二",
    focus: "下肢 + 核心",
    heading: "今天练腿臀与稳定。",
    reason: "维持上下身比例，让站姿稳定，不追求练到走不动。",
    level: "中等强度 · 不做到力竭",
    exercises: [
      ["动态热身", {30:"4 分钟",45:"5 分钟",60:"6 分钟"}, "髋绕环、徒手深蹲、踝关节活动"],
      ["抱包深蹲", "3 组 × 10–12 次", "膝盖跟脚尖方向一致"],
      ["背包罗马尼亚硬拉", "3 组 × 10–12 次", "臀部向后，背部保持中立"],
      ["反向箭步蹲", "3 组 × 每侧 8–10 次", "向后迈步更容易保持稳定"],
      ["臀桥", "3 组 × 12–15 次", "顶端收紧臀部，不顶腰"],
      ["平板支撑", "3 组 × 30–45 秒", "身体一条直线，正常呼吸"]
    ]
  },
  {
    day: "星期三",
    focus: "主动恢复",
    heading: "今天恢复，不硬练。",
    reason: "恢复能让肩背真正长起来；继续消耗热量对你没有帮助。",
    level: "低强度 · 能正常说话",
    recovery: true,
    exercises: [
      ["快走", {30:"20 分钟",45:"30 分钟",60:"40 分钟"}, "保持能完整说句子的速度"],
      ["墙面滑手", "2 组 × 10 次", "后脑、上背贴墙，动作慢"],
      ["下巴回收", "2 组 × 8 次", "平移下巴，不要低头"],
      ["胸椎旋转", "每侧 2 组 × 8 次", "腰胯尽量不跟着转"],
      ["胸小肌拉伸", "每侧 2 组 × 30 秒", "门框拉伸，不要耸肩"]
    ]
  },
  {
    day: "星期四",
    focus: "上肢 B",
    heading: "今天练肩宽与背部。",
    reason: "第二次上肢训练换角度，继续服务头身比和企业 IP 站姿。",
    level: "中等强度 · 留 2 次余力",
    exercises: [
      ["动态热身", {30:"4 分钟",45:"5 分钟",60:"6 分钟"}, "肩绕环、墙面滑手、轻重量划船"],
      ["背包推举 / 哑铃推举", "3 组 × 8–12 次", "肋骨不要外翻，重量宁轻勿乱"],
      ["俯身双臂划船", "3 组 × 10–12 次", "背部稳定，肘向后拉"],
      ["上斜俯卧撑", "3 组 × 10–15 次", "手撑桌边，胸口靠近支撑面"],
      ["侧平举", "3 组 × 12–15 次", "最后 3 次费力但动作不变形"],
      ["单侧负重行走", "3 组 × 每侧 40 秒", "身体不要向负重一侧倾斜"]
    ]
  },
  {
    day: "星期五",
    focus: "腿臀 + 肩",
    heading: "今天练下肢，补一点肩。",
    reason: "下肢维持比例，肩部用小剂量增加一周总训练量。",
    level: "中等强度 · 动作稳定优先",
    exercises: [
      ["动态热身", {30:"4 分钟",45:"5 分钟",60:"6 分钟"}, "髋、膝、踝逐步活动"],
      ["保加利亚分腿蹲", "3 组 × 每侧 8 次", "站不稳就改普通分腿蹲"],
      ["臀桥 / 沙发臀推", "3 组 × 10–15 次", "顶端停 1 秒"],
      ["单腿罗马尼亚硬拉", "3 组 × 每侧 8 次", "先徒手找平衡"],
      ["侧平举", "3 组 × 12–15 次", "重量轻、过程受控"],
      ["侧平板支撑", "3 组 × 每侧 25–35 秒", "髋部不要下沉"]
    ]
  },
  {
    day: "星期六",
    focus: "全身整合",
    heading: "今天完成全身训练。",
    reason: "用基础动作巩固一周，不追求爆汗和高心率。",
    level: "中等强度 · 组间休息 60–90 秒",
    exercises: [
      ["动态热身", {30:"4 分钟",45:"5 分钟",60:"6 分钟"}, "从轻到重，不跳过热身"],
      ["抱包深蹲", "3 组 × 10 次", "稳定下蹲，脚掌完整着地"],
      ["俯卧撑", "3 组 × 8–12 次", "做不到就抬高手"],
      ["单臂背包划船", "3 组 × 每侧 10 次", "避免耸肩"],
      ["侧平举", "3 组 × 15 次", "肩部酸胀即可，不甩动"],
      ["双侧负重行走", "4 组 × 40 秒", "身体挺直，步幅自然"]
    ]
  },
  {
    day: "星期日",
    focus: "主动恢复",
    heading: "今天散步并把身体放松。",
    reason: "不连续高强度训练，给下周增肌留出恢复空间。",
    level: "低强度 · 不追求步数",
    recovery: true,
    exercises: [
      ["轻松快走", {30:"20 分钟",45:"30 分钟",60:"40 分钟"}, "不空腹硬走，不追求大汗"],
      ["猫牛式", "2 组 × 8 次", "配合呼吸活动脊柱"],
      ["髋屈肌拉伸", "每侧 2 组 × 30 秒", "骨盆保持中立"],
      ["墙面滑手", "2 组 × 10 次", "肩膀远离耳朵"],
      ["仰卧呼吸", "5 分钟", "鼻吸口呼，让肩颈放松"]
    ]
  }
];

let profile = loadProfile();
let records = [];
let activePhoto = "front";
let activeRoutine = "daily";
let workoutDuration = Number(localStorage.getItem(WORKOUT_DURATION_KEY) || 45);
let workoutSeconds = workoutDuration * 60;
let workoutRunning = false;
let workoutTimerId = null;
let toastTimer;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(RECORD_STORE)) {
        const store = db.createObjectStore(RECORD_STORE, { keyPath: "id" });
        store.createIndex("date", "date", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getAllRecords() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(RECORD_STORE, "readonly");
    const request = tx.objectStore(RECORD_STORE).getAll();
    request.onsuccess = () => resolve(request.result.sort((a, b) => a.date.localeCompare(b.date)));
    request.onerror = () => reject(request.error);
    tx.oncomplete = () => db.close();
  });
}

async function putRecord(record) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(RECORD_STORE, "readwrite");
    tx.objectStore(RECORD_STORE).put(record);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => reject(tx.error);
  });
}

async function deleteRecord(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(RECORD_STORE, "readwrite");
    tx.objectStore(RECORD_STORE).delete(id);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => reject(tx.error);
  });
}

async function clearRecords() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(RECORD_STORE, "readwrite");
    tx.objectStore(RECORD_STORE).clear();
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => reject(tx.error);
  });
}

function loadProfile() {
  try {
    const saved = localStorage.getItem(PROFILE_KEY) || localStorage.getItem(LEGACY_PROFILE_KEY) || "{}";
    return { ...defaultProfile, ...JSON.parse(saved) };
  } catch {
    return { ...defaultProfile };
  }
}

function saveProfile() {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function todayString() {
  const d = new Date();
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d - offset).toISOString().slice(0, 10);
}

function formatDate(dateString) {
  if (!dateString) return "—";
  const d = new Date(`${dateString}T12:00:00`);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

function planStart() {
  let start = localStorage.getItem(PLAN_START_KEY);
  if (!start) {
    start = todayString();
    localStorage.setItem(PLAN_START_KEY, start);
  }
  return start;
}

function planDay() {
  const start = new Date(`${planStart()}T12:00:00`);
  const now = new Date(`${todayString()}T12:00:00`);
  return Math.max(1, Math.min(30, Math.floor((now - start) / 86400000) + 1));
}

function phaseIndex() {
  return Math.min(3, Math.floor((planDay() - 1) / 7));
}

function loadPlanState() {
  try { return JSON.parse(localStorage.getItem(PLAN_STATE_KEY) || "{}"); }
  catch { return {}; }
}

function savePlanState(state) {
  localStorage.setItem(PLAN_STATE_KEY, JSON.stringify(state));
}

function bmi(weight) {
  const meters = Number(profile.height) / 100;
  return meters > 0 && weight ? (Number(weight) / meters ** 2).toFixed(1) : "—";
}

function latestRecord() {
  return records.at(-1) || null;
}

function showToast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

function renderHome() {
  const day = planDay();
  const [title, detail] = dailyActions[day - 1];
  const state = loadPlanState();
  const dailyKey = `day-${day}`;
  const phase = phases[phaseIndex()];
  const latest = latestRecord();
  const weight = Number(latest?.weight || profile.baselineWeight);

  $("#plan-day").textContent = String(day).padStart(2, "0");
  $("#today-title").textContent = title;
  $("#today-detail").textContent = detail;
  $("#complete-today").classList.toggle("done", Boolean(state[dailyKey]));
  $("#complete-today").innerHTML = state[dailyKey] ? '今日已完成 <span>✓</span>' : '标记完成 <span>→</span>';

  $("#phase-title").textContent = phase.title;
  $("#phase-intro").textContent = phase.intro;
  $("#phase-tasks").innerHTML = phase.tasks.map(([id, taskTitle, taskDetail]) => `
    <label class="action-row">
      <input type="checkbox" data-phase-task="${id}" ${state[id] ? "checked" : ""}>
      <span><b>${taskTitle}</b><small>${taskDetail}</small></span>
    </label>`).join("");
  const done = phase.tasks.filter(([id]) => state[id]).length;
  $("#phase-progress").textContent = `${done} / ${phase.tasks.length}`;

  $("#home-weight").textContent = `${weight.toFixed(1)} kg`;
  $("#home-bmi").textContent = bmi(weight);
}

function renderRoutine() {
  $("#routine-content").innerHTML = `<ul>${routines[activeRoutine].map(item => `<li>${item}</li>`).join("")}</ul>`;
}

function renderBuyGate() {
  let state = {};
  try { state = JSON.parse(localStorage.getItem(BUY_GATE_KEY) || "{}"); } catch {}
  $$("[data-buy]").forEach(box => box.checked = Boolean(state[box.dataset.buy]));
  $("#buy-score").textContent = `${$$("[data-buy]:checked").length} / 5`;
}

function saveBuyGate() {
  const state = {};
  $$("[data-buy]").forEach(box => state[box.dataset.buy] = box.checked);
  localStorage.setItem(BUY_GATE_KEY, JSON.stringify(state));
  renderBuyGate();
  if ($$("[data-buy]:checked").length === 5) showToast("五项通过，可以进入购买决定");
}

function loadWorkoutState() {
  try { return JSON.parse(localStorage.getItem(WORKOUT_STATE_KEY) || "{}"); }
  catch { return {}; }
}

function saveWorkoutState(state) {
  localStorage.setItem(WORKOUT_STATE_KEY, JSON.stringify(state));
}

function currentWorkoutPlan() {
  const mondayFirstIndex = (new Date().getDay() + 6) % 7;
  return workoutPlans[mondayFirstIndex];
}

function visibleWorkoutExercises(plan = currentWorkoutPlan()) {
  if (plan.recovery) return plan.exercises;
  const count = workoutDuration === 30 ? 4 : workoutDuration === 45 ? 5 : 6;
  return plan.exercises.slice(0, count);
}

function workoutTarget(target) {
  return typeof target === "string" ? target : target[workoutDuration];
}

function localDateString(date) {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date - offset).toISOString().slice(0, 10);
}

function formatTimer(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function renderWorkoutTimer() {
  $("#workout-timer").textContent = formatTimer(workoutSeconds);
  $("#timer-toggle").textContent = workoutRunning ? "暂停" : "开始";
}

function stopWorkoutTimer() {
  if (workoutTimerId) clearInterval(workoutTimerId);
  workoutTimerId = null;
  workoutRunning = false;
  renderWorkoutTimer();
}

function resetWorkoutTimer() {
  stopWorkoutTimer();
  workoutSeconds = workoutDuration * 60;
  renderWorkoutTimer();
}

function renderWorkout() {
  const plan = currentWorkoutPlan();
  const state = loadWorkoutState();
  const today = todayString();
  const todayState = state[today] || { checked: {}, completed: false };
  const exercises = visibleWorkoutExercises(plan);

  $("#workout-heading").textContent = plan.heading;
  $("#workout-reason").textContent = plan.reason;
  $("#workout-day-name").textContent = plan.day;
  $("#workout-focus").textContent = plan.focus;
  $("#workout-level").textContent = plan.level;
  $$(".duration-tabs button").forEach(button => button.classList.toggle("active", Number(button.dataset.duration) === workoutDuration));

  $("#exercise-list").innerHTML = exercises.map(([name, target, note], index) => `
    <label class="exercise-row">
      <input type="checkbox" data-exercise="${index}" ${todayState.checked?.[index] ? "checked" : ""}>
      <b>${String(index + 1).padStart(2, "0")}</b>
      <span><b>${name}</b><small>${workoutTarget(target)} · ${note}</small></span>
    </label>`).join("");
  const completedExercises = exercises.filter((_, index) => todayState.checked?.[index]).length;
  $("#exercise-count").textContent = `${completedExercises} / ${exercises.length}`;
  $("#finish-workout").textContent = todayState.completed ? "今日训练已完成" : "完成今日训练";
  $("#finish-workout").classList.toggle("done", Boolean(todayState.completed));

  const now = new Date();
  const mondayOffset = (now.getDay() + 6) % 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - mondayOffset);
  const shortDays = ["一", "二", "三", "四", "五", "六", "日"];
  $("#week-strip").innerHTML = workoutPlans.map((weekPlan, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const dateKey = localDateString(date);
    const classes = [
      "week-day",
      dateKey === today ? "today" : "",
      state[dateKey]?.completed ? "done" : "",
      weekPlan.recovery ? "recovery" : ""
    ].filter(Boolean).join(" ");
    return `<div class="${classes}"><b>${shortDays[index]}</b><span>${weekPlan.focus.replace("主动", "")}</span></div>`;
  }).join("");
  renderWorkoutTimer();
}

function renderScores() {
  const latest = latestRecord();
  $("#face-score").textContent = latest?.faceScore || latest?.cameraScore || "—";
  $("#style-score").textContent = latest?.styleScore || "—";
  $("#training-score").textContent = latest?.training !== "" && latest?.training != null ? latest.training : "—";
}

function renderRecordList() {
  const list = $("#record-list");
  $("#record-count").textContent = `${records.length} 条`;
  if (!records.length) {
    list.innerHTML = '<div class="empty-state">还没有记录。点击右下角＋建立第一条基线。</div>';
    return;
  }
  list.innerHTML = [...records].reverse().map(r => `
    <article class="record-row">
      <time datetime="${r.date}">${formatDate(r.date)}</time>
      <span><small>面部</small>${r.faceScore || r.cameraScore ? `${r.faceScore || r.cameraScore}/5` : "—"}</span>
      <span><small>穿搭</small>${r.styleScore ? `${r.styleScore}/5` : "—"}</span>
      <button type="button" data-delete="${r.id}" aria-label="删除${formatDate(r.date)}记录">×</button>
    </article>`).join("");
}

function renderCompareOptions() {
  const a = $("#compare-a");
  const b = $("#compare-b");
  const selectedA = a.value;
  const selectedB = b.value;
  const options = records.map(r => `<option value="${r.id}">${formatDate(r.date)} · ${Number(r.weight).toFixed(1)}kg</option>`).join("");
  a.innerHTML = options || '<option value="">暂无记录</option>';
  b.innerHTML = options || '<option value="">暂无记录</option>';
  if (records.length) {
    a.value = records.some(r => r.id === selectedA) ? selectedA : records[0].id;
    b.value = records.some(r => r.id === selectedB) ? selectedB : records.at(-1).id;
  }
  renderComparison();
}

function photoUrl(record, type) {
  const blob = record?.photos?.[type];
  return blob instanceof Blob ? URL.createObjectURL(blob) : blob || "";
}

function renderPhoto(slot, record, type) {
  const oldImg = $("img", slot);
  if (oldImg?.dataset.objectUrl) URL.revokeObjectURL(oldImg.dataset.objectUrl);
  slot.innerHTML = "";
  const url = photoUrl(record, type);
  if (!url) {
    slot.innerHTML = "<span>暂无照片</span>";
    return;
  }
  const img = new Image();
  const labels = { front: "面部", full: "全身", side: "侧面" };
  img.alt = `${formatDate(record.date)}${labels[type]}照片`;
  img.src = url;
  if (url.startsWith("blob:")) img.dataset.objectUrl = url;
  slot.appendChild(img);
}

function renderComparison() {
  const recordA = records.find(r => r.id === $("#compare-a").value);
  const recordB = records.find(r => r.id === $("#compare-b").value);
  renderPhoto($("#photo-a"), recordA, activePhoto);
  renderPhoto($("#photo-b"), recordB, activePhoto);
  $("#caption-a").textContent = recordA ? `${formatDate(recordA.date)} · ${Number(recordA.weight).toFixed(1)}kg` : "—";
  $("#caption-b").textContent = recordB ? `${formatDate(recordB.date)} · ${Number(recordB.weight).toFixed(1)}kg` : "—";
}

function drawChart() {
  const canvas = $("#weight-chart");
  if (!canvas) return;
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || 350;
  const height = 190;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);
  ctx.clearRect(0, 0, width, height);
  const data = records.filter(r => Number(r.weight));

  if (!data.length) {
    ctx.fillStyle = "#716d64";
    ctx.font = "13px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("新增两次记录后显示趋势", width / 2, 96);
    $("#chart-change").textContent = "—";
    return;
  }

  const values = data.map(r => Number(r.weight));
  const min = Math.min(...values, Number(profile.baselineWeight)) - .6;
  const max = Math.max(...values, Number(profile.targetWeight)) + .6;
  const left = 10, right = 12, top = 20, bottom = 31;
  const plotW = width - left - right;
  const plotH = height - top - bottom;
  const xAt = i => left + (data.length === 1 ? plotW / 2 : (i / (data.length - 1)) * plotW);
  const yAt = v => top + ((max - v) / (max - min || 1)) * plotH;

  ctx.strokeStyle = "rgba(23,24,21,.13)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) {
    const y = top + (plotH / 3) * i;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(width - right, y);
    ctx.stroke();
  }

  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = "rgba(217,88,45,.5)";
  const targetY = yAt(Number(profile.targetWeight));
  ctx.beginPath();
  ctx.moveTo(left, targetY);
  ctx.lineTo(width - right, targetY);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.beginPath();
  data.forEach((r, i) => i ? ctx.lineTo(xAt(i), yAt(Number(r.weight))) : ctx.moveTo(xAt(i), yAt(Number(r.weight))));
  ctx.strokeStyle = "#171815";
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.stroke();

  data.forEach((r, i) => {
    ctx.beginPath();
    ctx.arc(xAt(i), yAt(Number(r.weight)), 4, 0, Math.PI * 2);
    ctx.fillStyle = i === data.length - 1 ? "#d9582d" : "#f2efe7";
    ctx.fill();
    ctx.strokeStyle = "#171815";
    ctx.lineWidth = 1.4;
    ctx.stroke();
  });

  ctx.fillStyle = "#716d64";
  ctx.font = "10px system-ui";
  ctx.textAlign = "left";
  ctx.fillText(formatDate(data[0].date), left, height - 8);
  ctx.textAlign = "right";
  ctx.fillText(formatDate(data.at(-1).date), width - right, height - 8);

  const change = values.at(-1) - values[0];
  $("#chart-change").textContent = data.length > 1 ? `${change >= 0 ? "+" : ""}${change.toFixed(1)}kg` : "首条记录";
}

function renderProfile() {
  const form = $("#profile-form");
  Object.entries(profile).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value;
  });
}

function renderAll() {
  renderHome();
  renderRoutine();
  renderBuyGate();
  renderWorkout();
  renderScores();
  renderRecordList();
  renderCompareOptions();
  renderProfile();
  requestAnimationFrame(drawChart);
}

function switchPage(page) {
  $$(".page").forEach(el => el.classList.toggle("active", el.id === `page-${page}`));
  $$(".bottom-nav button").forEach(el => el.classList.toggle("active", el.dataset.page === page));
  $("#fab-add").hidden = page === "profile" || page === "workout";
  window.scrollTo({ top: 0, behavior: "auto" });
  if (page === "progress") {
    renderComparison();
    requestAnimationFrame(drawChart);
  }
  if (page === "workout") renderWorkout();
}

function openCheckin() {
  const form = $("#checkin-form");
  form.reset();
  form.elements.date.value = todayString();
  form.elements.weight.value = latestRecord()?.weight || profile.baselineWeight;
  $("#checkin-dialog").showModal();
}

function fileFromInput(input) {
  return input.files?.[0] || null;
}

function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

async function serializeRecord(record) {
  const copy = { ...record, photos: {} };
  for (const [key, value] of Object.entries(record.photos || {})) {
    copy.photos[key] = value instanceof Blob ? await blobToDataURL(value) : value;
  }
  return copy;
}

async function handleCheckin(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const date = data.get("date");
  const previous = records.find(r => r.date === date);
  const numberOrEmpty = name => data.get(name) ? Number(data.get(name)) : "";
  const record = {
    ...previous,
    id: previous?.id || `${date}-${crypto.randomUUID?.() || Date.now()}`,
    date,
    weight: Number(data.get("weight")),
    faceScore: numberOrEmpty("faceScore"),
    styleScore: numberOrEmpty("styleScore"),
    training: numberOrEmpty("training"),
    sleep: numberOrEmpty("sleep"),
    waist: numberOrEmpty("waist"),
    chest: numberOrEmpty("chest"),
    factors: {
      hairDone: data.has("hairDone"),
      groomingDone: data.has("groomingDone"),
      cameraDone: data.has("cameraDone"),
      outfitDone: data.has("outfitDone")
    },
    notes: data.get("notes") || "",
    photos: {
      front: fileFromInput(form.elements.photoFront) || previous?.photos?.front || null,
      full: fileFromInput(form.elements.photoFull) || previous?.photos?.full || null,
      side: fileFromInput(form.elements.photoSide) || previous?.photos?.side || null
    },
    updatedAt: new Date().toISOString()
  };
  await putRecord(record);
  records = await getAllRecords();
  $("#checkin-dialog").close();
  renderAll();
  showToast(previous ? "已更新本周记录" : "本周记录已保存");
}

async function exportData() {
  const serialized = [];
  for (const record of records) serialized.push(await serializeRecord(record));
  const payload = {
    app: "阿靖形象计划",
    version: 2,
    exportedAt: new Date().toISOString(),
    profile,
    planStart: localStorage.getItem(PLAN_START_KEY),
    planState: loadPlanState(),
    buyGate: JSON.parse(localStorage.getItem(BUY_GATE_KEY) || "{}"),
    workoutState: loadWorkoutState(),
    workoutDuration,
    records: serialized
  };
  const json = JSON.stringify(payload, null, 2);
  const fileName = `阿靖形象计划备份-${todayString()}.json`;
  const nativePlugins = window.Capacitor?.Plugins;
  if (window.Capacitor?.isNativePlatform?.() && nativePlugins?.Filesystem && nativePlugins?.Share) {
    const result = await nativePlugins.Filesystem.writeFile({
      path: fileName,
      data: json,
      directory: "CACHE",
      encoding: "utf8"
    });
    await nativePlugins.Share.share({
      title: "阿靖形象计划备份",
      text: "请选择保存位置，或发送到自己的文件助手。",
      files: [result.uri],
      dialogTitle: "保存备份"
    });
    showToast("备份已生成，请选择保存位置");
    return;
  }
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast("备份已导出");
}

async function importData(file) {
  const payload = JSON.parse(await file.text());
  if (!payload?.profile || !Array.isArray(payload.records)) throw new Error("备份格式不正确");
  await clearRecords();
  profile = { ...defaultProfile, ...payload.profile };
  saveProfile();
  if (payload.planStart) localStorage.setItem(PLAN_START_KEY, payload.planStart);
  if (payload.planState) localStorage.setItem(PLAN_STATE_KEY, JSON.stringify(payload.planState));
  if (payload.buyGate) localStorage.setItem(BUY_GATE_KEY, JSON.stringify(payload.buyGate));
  if (payload.workoutState) localStorage.setItem(WORKOUT_STATE_KEY, JSON.stringify(payload.workoutState));
  if ([30, 45, 60].includes(Number(payload.workoutDuration))) {
    workoutDuration = Number(payload.workoutDuration);
    workoutSeconds = workoutDuration * 60;
    localStorage.setItem(WORKOUT_DURATION_KEY, String(workoutDuration));
  }
  for (const record of payload.records) await putRecord(record);
  records = await getAllRecords();
  renderAll();
  showToast("备份已恢复");
}

function bindEvents() {
  $$(".bottom-nav button").forEach(btn => btn.addEventListener("click", () => switchPage(btn.dataset.page)));
  $("#open-add").addEventListener("click", openCheckin);
  $("#fab-add").addEventListener("click", openCheckin);
  $("#close-checkin").addEventListener("click", () => $("#checkin-dialog").close());
  $("#checkin-form").addEventListener("submit", handleCheckin);

  $("#complete-today").addEventListener("click", () => {
    const state = loadPlanState();
    const key = `day-${planDay()}`;
    state[key] = !state[key];
    savePlanState(state);
    renderHome();
    showToast(state[key] ? "今天这一件已完成" : "已取消完成");
  });

  $("#phase-tasks").addEventListener("change", event => {
    const box = event.target.closest("[data-phase-task]");
    if (!box) return;
    const state = loadPlanState();
    state[box.dataset.phaseTask] = box.checked;
    savePlanState(state);
    renderHome();
  });

  $$(".routine-tabs button").forEach(btn => btn.addEventListener("click", () => {
    activeRoutine = btn.dataset.routine;
    $$(".routine-tabs button").forEach(item => item.classList.toggle("active", item === btn));
    renderRoutine();
  }));

  $$("[data-buy]").forEach(box => box.addEventListener("change", saveBuyGate));

  $$(".duration-tabs button").forEach(button => button.addEventListener("click", () => {
    const nextDuration = Number(button.dataset.duration);
    if (nextDuration === workoutDuration) return;
    stopWorkoutTimer();
    workoutDuration = nextDuration;
    workoutSeconds = workoutDuration * 60;
    localStorage.setItem(WORKOUT_DURATION_KEY, String(workoutDuration));
    renderWorkout();
  }));

  $("#exercise-list").addEventListener("change", event => {
    const box = event.target.closest("[data-exercise]");
    if (!box) return;
    const state = loadWorkoutState();
    const today = todayString();
    const todayState = state[today] || { checked: {}, completed: false };
    todayState.checked = { ...todayState.checked, [box.dataset.exercise]: box.checked };
    state[today] = todayState;
    saveWorkoutState(state);
    renderWorkout();
  });

  $("#finish-workout").addEventListener("click", () => {
    const state = loadWorkoutState();
    const today = todayString();
    const todayState = state[today] || { checked: {}, completed: false };
    todayState.completed = !todayState.completed;
    todayState.duration = workoutDuration;
    todayState.completedAt = todayState.completed ? new Date().toISOString() : null;
    state[today] = todayState;
    saveWorkoutState(state);
    if (todayState.completed) stopWorkoutTimer();
    renderWorkout();
    showToast(todayState.completed ? "今日训练已记录" : "已取消完成");
  });

  $("#timer-toggle").addEventListener("click", () => {
    if (workoutRunning) {
      stopWorkoutTimer();
      return;
    }
    if (workoutSeconds <= 0) workoutSeconds = workoutDuration * 60;
    workoutRunning = true;
    renderWorkoutTimer();
    workoutTimerId = setInterval(() => {
      workoutSeconds = Math.max(0, workoutSeconds - 1);
      renderWorkoutTimer();
      if (workoutSeconds === 0) {
        stopWorkoutTimer();
        showToast("训练时间完成");
      }
    }, 1000);
  });
  $("#timer-reset").addEventListener("click", resetWorkoutTimer);

  $$(".photo-tabs button").forEach(btn => btn.addEventListener("click", () => {
    activePhoto = btn.dataset.photo;
    $$(".photo-tabs button").forEach(item => item.classList.toggle("active", item === btn));
    renderComparison();
  }));
  $("#compare-a").addEventListener("change", renderComparison);
  $("#compare-b").addEventListener("change", renderComparison);

  $("#record-list").addEventListener("click", async event => {
    const button = event.target.closest("[data-delete]");
    if (!button) return;
    if (!confirm("确定删除这条记录？照片也会一起删除。")) return;
    await deleteRecord(button.dataset.delete);
    records = await getAllRecords();
    renderAll();
    showToast("记录已删除");
  });

  $("#profile-form").addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    profile = {
      ...profile,
      height: Number(data.get("height")),
      age: Number(data.get("age")),
      baselineWeight: Number(data.get("baselineWeight")),
      targetWeight: Number(data.get("targetWeight")),
      shoulderArc: Number(data.get("shoulderArc")),
      lowerLength: Number(data.get("lowerLength")),
      torsoLength: Number(data.get("torsoLength")),
      headHeight: Number(data.get("headHeight")),
      direction: data.get("direction")
    };
    saveProfile();
    renderAll();
    showToast("个人档案已保存");
  });

  $("#restart-plan").addEventListener("click", () => {
    if (!confirm("确定从今天重新开始 30 天计划？历史周记录不会删除。")) return;
    localStorage.setItem(PLAN_START_KEY, todayString());
    localStorage.removeItem(PLAN_STATE_KEY);
    renderAll();
    switchPage("home");
    showToast("30 天计划已重新开始");
  });

  $("#export-data").addEventListener("click", exportData);
  $("#import-data").addEventListener("change", async event => {
    if (!event.target.files?.[0]) return;
    try { await importData(event.target.files[0]); }
    catch (error) { showToast(error.message || "导入失败"); }
    event.target.value = "";
  });

  $("#clear-data").addEventListener("click", async () => {
    if (!confirm("确定清空个人档案、记录和照片？此操作无法恢复。")) return;
    await clearRecords();
    [PROFILE_KEY, LEGACY_PROFILE_KEY, PLAN_START_KEY, PLAN_STATE_KEY, BUY_GATE_KEY, WORKOUT_STATE_KEY, WORKOUT_DURATION_KEY].forEach(key => localStorage.removeItem(key));
    profile = { ...defaultProfile };
    records = [];
    workoutDuration = 45;
    resetWorkoutTimer();
    renderAll();
    showToast("全部数据已清空");
  });

  window.addEventListener("resize", () => requestAnimationFrame(drawChart));
}

async function init() {
  bindEvents();
  planStart();
  records = await getAllRecords();
  renderAll();
  if (!window.Capacitor?.isNativePlatform?.() && "serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

init().catch(error => {
  console.error(error);
  showToast("应用初始化失败，请刷新重试");
});
