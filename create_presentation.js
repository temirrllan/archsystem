const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// Icon imports
const { FaUserTie, FaPaintBrush, FaCode, FaColumns, FaRobot, FaBrain, FaDocker,
        FaServer, FaPalette, FaReact, FaTelegram, FaMicrochip, FaCogs,
        FaRocket, FaCheck, FaDatabase, FaShieldAlt, FaComments, FaClock,
        FaChartBar, FaTerminal, FaLayerGroup, FaUsers, FaStar } = require("react-icons/fa");

// Colors
const BG_DARK = "0F0F1A";
const BG_CARD = "1A1A2E";
const BG_CARD2 = "16213E";
const PRIMARY = "6C63FF";
const PRIMARY_LIGHT = "8B83FF";
const ACCENT_RED = "FF6B6B";
const ACCENT_GREEN = "4ECDC4";
const ACCENT_YELLOW = "FFE66D";
const ACCENT_PURPLE = "A78BFA";
const TEXT_WHITE = "FFFFFF";
const TEXT_MUTED = "A0AEC0";
const TEXT_DIM = "718096";

// Icon rendering
function renderIconSvg(IconComponent, color = "#FFFFFF", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// Helper: fresh shadow factory
const cardShadow = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.3 });

async function createPresentation() {
  let pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Physics Bot Team";
  pres.title = "Physics Bot - Telegram Mini App";

  // Pre-render all icons
  const icons = {};
  const iconMap = {
    userTie: [FaUserTie, "#" + PRIMARY],
    paintBrush: [FaPaintBrush, "#" + ACCENT_RED],
    code: [FaCode, "#" + ACCENT_GREEN],
    columns: [FaColumns, "#" + ACCENT_YELLOW],
    telegram: [FaTelegram, "#29B6F6"],
    brain: [FaBrain, "#" + ACCENT_PURPLE],
    docker: [FaDocker, "#2196F3"],
    server: [FaServer, "#" + PRIMARY],
    palette: [FaPalette, "#" + ACCENT_RED],
    react: [FaReact, "#61DAFB"],
    microchip: [FaMicrochip, "#" + ACCENT_GREEN],
    cogs: [FaCogs, "#" + TEXT_MUTED],
    rocket: [FaRocket, "#" + PRIMARY],
    check: [FaCheck, "#" + ACCENT_GREEN],
    database: [FaDatabase, "#" + ACCENT_YELLOW],
    shield: [FaShieldAlt, "#" + ACCENT_RED],
    comments: [FaComments, "#" + ACCENT_GREEN],
    clock: [FaClock, "#" + ACCENT_YELLOW],
    chartBar: [FaChartBar, "#" + PRIMARY],
    terminal: [FaTerminal, "#" + ACCENT_GREEN],
    layers: [FaLayerGroup, "#" + ACCENT_PURPLE],
    users: [FaUsers, "#" + PRIMARY],
    star: [FaStar, "#" + ACCENT_YELLOW],
    robot: [FaRobot, "#" + ACCENT_PURPLE],
  };

  for (const [key, [Comp, color]] of Object.entries(iconMap)) {
    icons[key] = await iconToBase64Png(Comp, color);
  }

  // ========== SLIDE 1: Title ==========
  let slide1 = pres.addSlide();
  slide1.background = { color: BG_DARK };

  // Decorative top accent bar
  slide1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: PRIMARY } });

  // Decorative circles
  slide1.addShape(pres.shapes.OVAL, { x: 8.2, y: 0.4, w: 2.2, h: 2.2, fill: { color: PRIMARY, transparency: 90 } });
  slide1.addShape(pres.shapes.OVAL, { x: -0.8, y: 3.5, w: 2.5, h: 2.5, fill: { color: ACCENT_PURPLE, transparency: 92 } });

  // Robot icon
  slide1.addImage({ data: icons.robot, x: 4.4, y: 0.7, w: 1.2, h: 1.2 });

  // Title
  slide1.addText("Physics Bot", {
    x: 0.5, y: 2.0, w: 9, h: 1.0,
    fontSize: 48, fontFace: "Arial Black", color: TEXT_WHITE,
    align: "center", bold: true, margin: 0
  });

  // Subtitle
  slide1.addText("Физика үйренуге арналған Telegram Mini App", {
    x: 0.5, y: 2.9, w: 9, h: 0.6,
    fontSize: 20, fontFace: "Calibri", color: TEXT_MUTED,
    align: "center", margin: 0
  });

  // Divider line
  slide1.addShape(pres.shapes.LINE, { x: 3.5, y: 3.7, w: 3, h: 0, line: { color: PRIMARY, width: 2 } });

  // Tech stack
  slide1.addText("7 адам  |  React + FastAPI + aiogram + Groq AI + Docker", {
    x: 0.5, y: 4.0, w: 9, h: 0.5,
    fontSize: 14, fontFace: "Calibri", color: TEXT_DIM,
    align: "center", margin: 0
  });

  // Date
  slide1.addText("20 наурыз 2026", {
    x: 0.5, y: 4.6, w: 9, h: 0.4,
    fontSize: 13, fontFace: "Calibri", color: TEXT_DIM,
    align: "center", margin: 0
  });

  // Bottom accent
  slide1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: PRIMARY } });

  // ========== SLIDE 2: Team ==========
  let slide2 = pres.addSlide();
  slide2.background = { color: BG_DARK };
  slide2.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: PRIMARY } });

  slide2.addText("Команда және рөлдер", {
    x: 0.5, y: 0.25, w: 9, h: 0.7,
    fontSize: 32, fontFace: "Arial Black", color: TEXT_WHITE,
    align: "center", bold: true, margin: 0
  });

  // Team cards - 2 rows
  const teamData = [
    { name: "Темирлан", role: "PM + Backend Dev", icon: "userTie", color: PRIMARY },
    { name: "Инкар", role: "UI/UX Designer", icon: "paintBrush", color: ACCENT_RED },
    { name: "Бакдаулет", role: "Frontend Developer", icon: "code", color: ACCENT_GREEN },
    { name: "Азиз", role: "Admin Panel Dev", icon: "columns", color: ACCENT_YELLOW },
    { name: "Санжар", role: "Bot Developer", icon: "telegram", color: "29B6F6" },
    { name: "Анеля", role: "AI Engineer", icon: "brain", color: ACCENT_PURPLE },
    { name: "Бекзат", role: "DevOps / QA", icon: "docker", color: "2196F3" },
  ];

  // Row 1: 4 cards
  const cardW = 2.05;
  const cardH = 1.55;
  const gap = 0.2;
  const startX1 = (10 - (4 * cardW + 3 * gap)) / 2;
  const y1 = 1.2;
  const y2 = 1.2 + cardH + 0.25;

  for (let i = 0; i < 4; i++) {
    const t = teamData[i];
    const x = startX1 + i * (cardW + gap);
    const y = y1;
    slide2.addShape(pres.shapes.RECTANGLE, { x, y, w: cardW, h: cardH, fill: { color: BG_CARD }, shadow: cardShadow() });
    slide2.addShape(pres.shapes.RECTANGLE, { x, y, w: cardW, h: 0.05, fill: { color: t.color } });
    slide2.addImage({ data: icons[t.icon], x: x + cardW/2 - 0.22, y: y + 0.2, w: 0.44, h: 0.44 });
    slide2.addText(t.name, { x, y: y + 0.7, w: cardW, h: 0.35, fontSize: 14, fontFace: "Arial", color: TEXT_WHITE, bold: true, align: "center", margin: 0 });
    slide2.addText(t.role, { x, y: y + 1.02, w: cardW, h: 0.35, fontSize: 10, fontFace: "Calibri", color: TEXT_MUTED, align: "center", margin: 0 });
  }

  // Row 2: 3 cards centered
  const startX2 = (10 - (3 * cardW + 2 * gap)) / 2;
  for (let i = 0; i < 3; i++) {
    const t = teamData[4 + i];
    const x = startX2 + i * (cardW + gap);
    const y = y2;
    slide2.addShape(pres.shapes.RECTANGLE, { x, y, w: cardW, h: cardH, fill: { color: BG_CARD }, shadow: cardShadow() });
    slide2.addShape(pres.shapes.RECTANGLE, { x, y, w: cardW, h: 0.05, fill: { color: t.color } });
    slide2.addImage({ data: icons[t.icon], x: x + cardW/2 - 0.22, y: y + 0.2, w: 0.44, h: 0.44 });
    slide2.addText(t.name, { x, y: y + 0.7, w: cardW, h: 0.35, fontSize: 14, fontFace: "Arial", color: TEXT_WHITE, bold: true, align: "center", margin: 0 });
    slide2.addText(t.role, { x, y: y + 1.02, w: cardW, h: 0.35, fontSize: 10, fontFace: "Calibri", color: TEXT_MUTED, align: "center", margin: 0 });
  }

  // Footer note
  slide2.addText("Темирлан көрсетеді", {
    x: 0.5, y: 5.0, w: 9, h: 0.4,
    fontSize: 11, fontFace: "Calibri", color: TEXT_DIM, italic: true, align: "center", margin: 0
  });

  // ========== SLIDE 3: Timeline ==========
  let slide3 = pres.addSlide();
  slide3.background = { color: BG_DARK };
  slide3.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: PRIMARY } });

  slide3.addText("Жоба таймлайны", {
    x: 0.5, y: 0.25, w: 9, h: 0.7,
    fontSize: 32, fontFace: "Arial Black", color: TEXT_WHITE, align: "center", bold: true, margin: 0
  });

  slide3.addText("3 апта  •  3 спринт  •  9 созвон", {
    x: 0.5, y: 0.85, w: 9, h: 0.35,
    fontSize: 14, fontFace: "Calibri", color: TEXT_MUTED, align: "center", margin: 0
  });

  // Sprint cards
  const sprints = [
    { title: "Sprint 1", dates: "23-28 ақпан", items: ["Архитектура жоспары", "Дизайн-жүйе", "Негізгі API құрылым", "UI компоненттер"], color: PRIMARY },
    { title: "Sprint 2", dates: "2-6 наурыз", items: ["Фронт + Бэк интеграция", "AI тьютор (Groq API)", "Админ-панель", "Бот командалары"], color: ACCENT_GREEN },
    { title: "Sprint 3", dates: "9-13 наурыз", items: ["Docker деплой", "Тестілеу (QA)", "Баг фикстер", "Презентация прогон"], color: ACCENT_YELLOW },
  ];

  const sprintW = 2.8;
  const sprintGap = 0.25;
  const sprintStartX = (10 - (3 * sprintW + 2 * sprintGap)) / 2;

  sprints.forEach((s, i) => {
    const x = sprintStartX + i * (sprintW + sprintGap);
    const y = 1.5;

    slide3.addShape(pres.shapes.RECTANGLE, { x, y, w: sprintW, h: 3.3, fill: { color: BG_CARD }, shadow: cardShadow() });
    slide3.addShape(pres.shapes.RECTANGLE, { x, y, w: sprintW, h: 0.06, fill: { color: s.color } });

    slide3.addText(s.title, { x, y: y + 0.2, w: sprintW, h: 0.4, fontSize: 18, fontFace: "Arial", color: s.color, bold: true, align: "center", margin: 0 });
    slide3.addText(s.dates, { x, y: y + 0.55, w: sprintW, h: 0.3, fontSize: 11, fontFace: "Calibri", color: TEXT_DIM, align: "center", margin: 0 });

    slide3.addShape(pres.shapes.LINE, { x: x + 0.3, y: y + 0.95, w: sprintW - 0.6, h: 0, line: { color: "2D3748", width: 1 } });

    const bulletItems = s.items.map((item, idx) => ({
      text: item,
      options: { bullet: { code: "2022" }, breakLine: idx < s.items.length - 1, fontSize: 12, color: TEXT_MUTED }
    }));
    slide3.addText(bulletItems, { x: x + 0.25, y: y + 1.1, w: sprintW - 0.5, h: 2.0, fontFace: "Calibri", paraSpaceAfter: 6 });
  });

  slide3.addText("Темирлан көрсетеді", {
    x: 0.5, y: 5.0, w: 9, h: 0.4,
    fontSize: 11, fontFace: "Calibri", color: TEXT_DIM, italic: true, align: "center", margin: 0
  });

  // ========== SLIDE 4: Architecture ==========
  let slide4 = pres.addSlide();
  slide4.background = { color: BG_DARK };
  slide4.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: PRIMARY } });

  slide4.addText("Жүйе архитектурасы", {
    x: 0.5, y: 0.25, w: 9, h: 0.7,
    fontSize: 32, fontFace: "Arial Black", color: TEXT_WHITE, align: "center", bold: true, margin: 0
  });

  // Architecture rows
  const archRows = [
    { left: "Telegram User", leftIcon: "users", mid: "aiogram Bot", midNote: "(Санжар)", midIcon: "telegram", right: "FastAPI Backend", rightNote: "(Темирлан)", rightIcon: "server", db: "SQLite DB", dbIcon: "database" },
    { left: "Telegram WebApp", leftIcon: "react", mid: "React Mini App", midNote: "(Бакдаулет)", midIcon: "react", right: "FastAPI Backend", rightNote: "(Темирлан)", rightIcon: "server", db: "Groq AI", dbNote: "(Анеля)", dbIcon: "brain" },
    { left: "Admin Browser", leftIcon: "chartBar", mid: "React Admin", midNote: "(Азиз)", midIcon: "columns", right: "FastAPI Backend", rightNote: "(Темирлан)", rightIcon: "server", db: "", dbIcon: null },
  ];

  const rowY = [1.2, 2.6, 4.0];
  const boxW = 2.0;
  const boxH = 1.1;
  const colX = [0.3, 2.8, 5.3, 7.8];

  archRows.forEach((row, i) => {
    const y = rowY[i];

    // Left box
    slide4.addShape(pres.shapes.RECTANGLE, { x: colX[0], y, w: boxW, h: boxH, fill: { color: BG_CARD }, shadow: cardShadow() });
    slide4.addImage({ data: icons[row.leftIcon], x: colX[0] + boxW/2 - 0.17, y: y + 0.1, w: 0.34, h: 0.34 });
    slide4.addText(row.left, { x: colX[0], y: y + 0.5, w: boxW, h: 0.3, fontSize: 10, fontFace: "Arial", color: TEXT_WHITE, bold: true, align: "center", margin: 0 });
    if (row.leftNote) slide4.addText(row.leftNote, { x: colX[0], y: y + 0.75, w: boxW, h: 0.2, fontSize: 8, fontFace: "Calibri", color: TEXT_DIM, align: "center", margin: 0 });

    // Arrow 1
    slide4.addText("→", { x: colX[0] + boxW, y, w: 0.5, h: boxH, fontSize: 20, color: PRIMARY, align: "center", valign: "middle", margin: 0 });

    // Mid box
    slide4.addShape(pres.shapes.RECTANGLE, { x: colX[1], y, w: boxW, h: boxH, fill: { color: BG_CARD }, shadow: cardShadow() });
    slide4.addImage({ data: icons[row.midIcon], x: colX[1] + boxW/2 - 0.17, y: y + 0.1, w: 0.34, h: 0.34 });
    slide4.addText(row.mid, { x: colX[1], y: y + 0.5, w: boxW, h: 0.3, fontSize: 10, fontFace: "Arial", color: TEXT_WHITE, bold: true, align: "center", margin: 0 });
    slide4.addText(row.midNote, { x: colX[1], y: y + 0.75, w: boxW, h: 0.2, fontSize: 8, fontFace: "Calibri", color: TEXT_DIM, align: "center", margin: 0 });

    // Arrow 2
    slide4.addText("→", { x: colX[1] + boxW, y, w: 0.5, h: boxH, fontSize: 20, color: PRIMARY, align: "center", valign: "middle", margin: 0 });

    // Right box
    slide4.addShape(pres.shapes.RECTANGLE, { x: colX[2], y, w: boxW, h: boxH, fill: { color: BG_CARD2 }, shadow: cardShadow() });
    slide4.addImage({ data: icons[row.rightIcon], x: colX[2] + boxW/2 - 0.17, y: y + 0.1, w: 0.34, h: 0.34 });
    slide4.addText(row.right, { x: colX[2], y: y + 0.5, w: boxW, h: 0.3, fontSize: 10, fontFace: "Arial", color: TEXT_WHITE, bold: true, align: "center", margin: 0 });
    slide4.addText(row.rightNote, { x: colX[2], y: y + 0.75, w: boxW, h: 0.2, fontSize: 8, fontFace: "Calibri", color: TEXT_DIM, align: "center", margin: 0 });

    // Arrow 3 + DB
    if (row.db) {
      slide4.addText("→", { x: colX[2] + boxW, y, w: 0.5, h: boxH, fontSize: 20, color: PRIMARY, align: "center", valign: "middle", margin: 0 });
      slide4.addShape(pres.shapes.RECTANGLE, { x: colX[3], y, w: boxW, h: boxH, fill: { color: BG_CARD }, shadow: cardShadow() });
      slide4.addImage({ data: icons[row.dbIcon], x: colX[3] + boxW/2 - 0.17, y: y + 0.1, w: 0.34, h: 0.34 });
      slide4.addText(row.db, { x: colX[3], y: y + 0.5, w: boxW, h: 0.3, fontSize: 10, fontFace: "Arial", color: TEXT_WHITE, bold: true, align: "center", margin: 0 });
      if (row.dbNote) slide4.addText(row.dbNote, { x: colX[3], y: y + 0.75, w: boxW, h: 0.2, fontSize: 8, fontFace: "Calibri", color: TEXT_DIM, align: "center", margin: 0 });
    }
  });

  // Bottom footer
  slide4.addText("Дизайн: Инкар  |  DevOps: Бекзат  |  Docker Compose", {
    x: 0.5, y: 5.1, w: 9, h: 0.35,
    fontSize: 11, fontFace: "Calibri", color: TEXT_DIM, align: "center", margin: 0
  });

  // ========== SLIDE 5: Backend API ==========
  let slide5 = pres.addSlide();
  slide5.background = { color: BG_DARK };
  slide5.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: PRIMARY } });

  slide5.addText("Backend API", {
    x: 0.5, y: 0.25, w: 7, h: 0.7,
    fontSize: 32, fontFace: "Arial Black", color: TEXT_WHITE, bold: true, margin: 0
  });
  slide5.addText("Темирлан көрсетеді", {
    x: 6.5, y: 0.35, w: 3, h: 0.4,
    fontSize: 11, fontFace: "Calibri", color: TEXT_DIM, italic: true, align: "right", margin: 0
  });

  // Left column - tech stack
  slide5.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 4.3, h: 4.1, fill: { color: BG_CARD }, shadow: cardShadow() });
  slide5.addText("Технологиялар", { x: 0.7, y: 1.2, w: 3.9, h: 0.4, fontSize: 16, fontFace: "Arial", color: PRIMARY, bold: true, margin: 0 });

  const backendTech = [
    { text: "FastAPI — async Python web framework", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "SQLAlchemy 2.0 — ORM", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "Pydantic v2 — деректер валидациясы", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "SQLite — деректер қоры", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "JWT — аутентификация", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "Uvicorn — ASGI сервер", options: { bullet: { code: "2022" }, fontSize: 12, color: TEXT_MUTED } },
  ];
  slide5.addText(backendTech, { x: 0.7, y: 1.7, w: 3.9, h: 3.2, fontFace: "Calibri", paraSpaceAfter: 6 });

  // Right column - routes & models
  slide5.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.1, w: 4.3, h: 1.9, fill: { color: BG_CARD }, shadow: cardShadow() });
  slide5.addText("8 API роутер", { x: 5.4, y: 1.2, w: 3.9, h: 0.4, fontSize: 16, fontFace: "Arial", color: ACCENT_GREEN, bold: true, margin: 0 });
  slide5.addText("users  •  theory  •  problems  •  tests\nprogress  •  rating  •  ai  •  admin", {
    x: 5.4, y: 1.65, w: 3.9, h: 1.1, fontSize: 12, fontFace: "Consolas", color: TEXT_MUTED, margin: 0
  });

  slide5.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 3.2, w: 4.3, h: 2.0, fill: { color: BG_CARD }, shadow: cardShadow() });
  slide5.addText("Моделдер", { x: 5.4, y: 3.3, w: 3.9, h: 0.4, fontSize: 16, fontFace: "Arial", color: ACCENT_YELLOW, bold: true, margin: 0 });

  const models = [
    { text: "User — telegram_id, score, streak, level", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 11, color: TEXT_MUTED } },
    { text: "Problem — topic, formula, difficulty", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 11, color: TEXT_MUTED } },
    { text: "TestResult — correct_answers, percentage", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 11, color: TEXT_MUTED } },
    { text: "Progress — topic_name, completion_%", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 11, color: TEXT_MUTED } },
    { text: "ChatHistory — AI чат тарихы", options: { bullet: { code: "2022" }, fontSize: 11, color: TEXT_MUTED } },
  ];
  slide5.addText(models, { x: 5.4, y: 3.75, w: 3.9, h: 1.3, fontFace: "Calibri", paraSpaceAfter: 3 });

  // ========== SLIDE 6: Design System ==========
  let slide6 = pres.addSlide();
  slide6.background = { color: BG_DARK };
  slide6.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: ACCENT_RED } });

  slide6.addText("Дизайн жүйесі", {
    x: 0.5, y: 0.25, w: 7, h: 0.7,
    fontSize: 32, fontFace: "Arial Black", color: TEXT_WHITE, bold: true, margin: 0
  });
  slide6.addText("Инкар көрсетеді", {
    x: 6.5, y: 0.35, w: 3, h: 0.4,
    fontSize: 11, fontFace: "Calibri", color: TEXT_DIM, italic: true, align: "right", margin: 0
  });

  // Color palette
  slide6.addText("Түстер палитрасы", { x: 0.5, y: 1.1, w: 4, h: 0.35, fontSize: 16, fontFace: "Arial", color: TEXT_WHITE, bold: true, margin: 0 });

  const colors = [
    { hex: BG_DARK, label: "Background", w: 1.2 },
    { hex: PRIMARY, label: "Primary", w: 1.2 },
    { hex: ACCENT_RED, label: "Accent 1", w: 1.2 },
    { hex: ACCENT_GREEN, label: "Accent 2", w: 1.2 },
    { hex: ACCENT_YELLOW, label: "Accent 3", w: 1.2 },
    { hex: ACCENT_PURPLE, label: "Accent 4", w: 1.2 },
  ];

  colors.forEach((c, i) => {
    const x = 0.5 + i * 1.45;
    slide6.addShape(pres.shapes.RECTANGLE, { x, y: 1.55, w: 1.25, h: 0.7, fill: { color: c.hex }, shadow: cardShadow() });
    slide6.addText("#" + c.hex, { x, y: 2.3, w: 1.25, h: 0.25, fontSize: 9, fontFace: "Consolas", color: TEXT_DIM, align: "center", margin: 0 });
    slide6.addText(c.label, { x, y: 2.5, w: 1.25, h: 0.25, fontSize: 9, fontFace: "Calibri", color: TEXT_MUTED, align: "center", margin: 0 });
  });

  // Components
  slide6.addText("Компоненттер", { x: 0.5, y: 3.0, w: 4, h: 0.35, fontSize: 16, fontFace: "Arial", color: TEXT_WHITE, bold: true, margin: 0 });

  const components = ["Button", "Card", "TopBar", "BottomNav", "FormulaRenderer"];
  components.forEach((comp, i) => {
    const x = 0.5 + i * 1.8;
    slide6.addShape(pres.shapes.RECTANGLE, { x, y: 3.5, w: 1.6, h: 0.5, fill: { color: BG_CARD }, shadow: cardShadow() });
    slide6.addText(comp, { x, y: 3.5, w: 1.6, h: 0.5, fontSize: 11, fontFace: "Consolas", color: PRIMARY, align: "center", valign: "middle", margin: 0 });
  });

  // User Flow
  slide6.addText("User Flow", { x: 0.5, y: 4.2, w: 4, h: 0.35, fontSize: 16, fontFace: "Arial", color: TEXT_WHITE, bold: true, margin: 0 });

  const flowSteps = ["/start", "Mini App", "Home", "Theory / Problems / Test / AskAI"];
  flowSteps.forEach((step, i) => {
    const x = 0.5 + i * 2.35;
    const w = i === 3 ? 2.8 : 1.8;
    slide6.addShape(pres.shapes.RECTANGLE, { x, y: 4.65, w, h: 0.45, fill: { color: BG_CARD } });
    slide6.addText(step, { x, y: 4.65, w, h: 0.45, fontSize: 11, fontFace: "Calibri", color: ACCENT_GREEN, align: "center", valign: "middle", margin: 0 });
    if (i < 3) {
      slide6.addText("→", { x: x + w, y: 4.65, w: 0.55, h: 0.45, fontSize: 16, color: TEXT_DIM, align: "center", valign: "middle", margin: 0 });
    }
  });

  // ========== SLIDE 7: Frontend ==========
  let slide7 = pres.addSlide();
  slide7.background = { color: BG_DARK };
  slide7.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: ACCENT_GREEN } });

  slide7.addText("Frontend Mini App", {
    x: 0.5, y: 0.25, w: 7, h: 0.7,
    fontSize: 32, fontFace: "Arial Black", color: TEXT_WHITE, bold: true, margin: 0
  });
  slide7.addText("Бакдаулет көрсетеді", {
    x: 6.5, y: 0.35, w: 3, h: 0.4,
    fontSize: 11, fontFace: "Calibri", color: TEXT_DIM, italic: true, align: "right", margin: 0
  });

  // Left: tech + features
  slide7.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 4.3, h: 4.2, fill: { color: BG_CARD }, shadow: cardShadow() });
  slide7.addText("React 18 + Vite + TailwindCSS", { x: 0.7, y: 1.2, w: 3.9, h: 0.4, fontSize: 15, fontFace: "Arial", color: ACCENT_GREEN, bold: true, margin: 0 });

  const frontendFeatures = [
    { text: "Zustand state management", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "Telegram WebApp SDK интеграция", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "KaTeX формула рендеринг", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "canvas-confetti анимациялар", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "Axios HTTP клиент", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "React Router v6", options: { bullet: { code: "2022" }, fontSize: 12, color: TEXT_MUTED } },
  ];
  slide7.addText(frontendFeatures, { x: 0.7, y: 1.7, w: 3.9, h: 3.2, fontFace: "Calibri", paraSpaceAfter: 8 });

  // Right: 8 pages grid (2x4)
  slide7.addText("8 бет", { x: 5.2, y: 1.1, w: 4.3, h: 0.35, fontSize: 16, fontFace: "Arial", color: TEXT_WHITE, bold: true, margin: 0 });

  const pages = [
    { name: "Home", desc: "Басты экран" },
    { name: "Theory", desc: "6 тақырып" },
    { name: "Problems", desc: "Есептер" },
    { name: "Test", desc: "10 сұрақ" },
    { name: "Progress", desc: "Прогресс" },
    { name: "Rating", desc: "Лидерборд" },
    { name: "AskAI", desc: "AI чат" },
    { name: "Help", desc: "Нұсқаулық" },
  ];

  pages.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 5.2 + col * 2.2;
    const y = 1.55 + row * 0.9;
    slide7.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.0, h: 0.75, fill: { color: BG_CARD }, shadow: cardShadow() });
    slide7.addText(p.name, { x, y, w: 2.0, h: 0.4, fontSize: 13, fontFace: "Arial", color: ACCENT_GREEN, bold: true, align: "center", margin: 0 });
    slide7.addText(p.desc, { x, y: y + 0.38, w: 2.0, h: 0.3, fontSize: 10, fontFace: "Calibri", color: TEXT_DIM, align: "center", margin: 0 });
  });

  // ========== SLIDE 8: Admin Panel ==========
  let slide8 = pres.addSlide();
  slide8.background = { color: BG_DARK };
  slide8.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: ACCENT_YELLOW } });

  slide8.addText("Админ-панель", {
    x: 0.5, y: 0.25, w: 7, h: 0.7,
    fontSize: 32, fontFace: "Arial Black", color: TEXT_WHITE, bold: true, margin: 0
  });
  slide8.addText("Азиз көрсетеді", {
    x: 6.5, y: 0.35, w: 3, h: 0.4,
    fontSize: 11, fontFace: "Calibri", color: TEXT_DIM, italic: true, align: "right", margin: 0
  });

  // 6 page cards (2x3)
  const adminPages = [
    { name: "Login", desc: "JWT аутентификация", color: ACCENT_RED },
    { name: "Dashboard", desc: "Аналитика, графиктер", color: PRIMARY },
    { name: "Theory", desc: "Теория CRUD + LaTeX", color: ACCENT_GREEN },
    { name: "Problems", desc: "Есептер CRUD + CSV import", color: ACCENT_YELLOW },
    { name: "Users", desc: "Пайдаланушыларды басқару", color: ACCENT_PURPLE },
    { name: "Notifications", desc: "Broadcast хабарламалар", color: "29B6F6" },
  ];

  adminPages.forEach((p, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.5 + col * 3.1;
    const y = 1.2 + row * 1.6;
    const cw = 2.8;
    const ch = 1.35;

    slide8.addShape(pres.shapes.RECTANGLE, { x, y, w: cw, h: ch, fill: { color: BG_CARD }, shadow: cardShadow() });
    slide8.addShape(pres.shapes.RECTANGLE, { x, y, w: cw, h: 0.05, fill: { color: p.color } });
    slide8.addText(p.name, { x, y: y + 0.2, w: cw, h: 0.4, fontSize: 16, fontFace: "Arial", color: p.color, bold: true, align: "center", margin: 0 });
    slide8.addText(p.desc, { x, y: y + 0.65, w: cw, h: 0.4, fontSize: 12, fontFace: "Calibri", color: TEXT_MUTED, align: "center", margin: 0 });
  });

  // Tech stack line
  slide8.addText("React 18 + Vite  •  Recharts  •  react-hook-form + Zod  •  @hello-pangea/dnd", {
    x: 0.5, y: 4.6, w: 9, h: 0.4,
    fontSize: 12, fontFace: "Calibri", color: TEXT_DIM, align: "center", margin: 0
  });

  // ========== SLIDE 9: Telegram Bot ==========
  let slide9 = pres.addSlide();
  slide9.background = { color: BG_DARK };
  slide9.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: "29B6F6" } });

  slide9.addText("Telegram бот", {
    x: 0.5, y: 0.25, w: 7, h: 0.7,
    fontSize: 32, fontFace: "Arial Black", color: TEXT_WHITE, bold: true, margin: 0
  });
  slide9.addText("Санжар көрсетеді", {
    x: 6.5, y: 0.35, w: 3, h: 0.4,
    fontSize: 11, fontFace: "Calibri", color: TEXT_DIM, italic: true, align: "right", margin: 0
  });

  // Left: commands
  slide9.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 4.3, h: 3.8, fill: { color: BG_CARD }, shadow: cardShadow() });
  slide9.addText("aiogram 3.7 | 5 команда", { x: 0.7, y: 1.2, w: 3.9, h: 0.4, fontSize: 15, fontFace: "Arial", color: "29B6F6", bold: true, margin: 0 });

  const botCommands = [
    { cmd: "/start", desc: "Қарсы алу + Mini App батырмасы" },
    { cmd: "/profile", desc: "Юзер статистикасы" },
    { cmd: "/rating", desc: "Топ-10 лидерборд" },
    { cmd: "/streak", desc: "Күнделікті серия" },
    { cmd: "/help", desc: "Нұсқаулық" },
  ];

  botCommands.forEach((bc, i) => {
    const y = 1.8 + i * 0.58;
    slide9.addText(bc.cmd, { x: 0.7, y, w: 1.4, h: 0.35, fontSize: 13, fontFace: "Consolas", color: ACCENT_GREEN, bold: true, margin: 0 });
    slide9.addText(bc.desc, { x: 2.2, y, w: 2.4, h: 0.35, fontSize: 12, fontFace: "Calibri", color: TEXT_MUTED, margin: 0 });
  });

  // Right: features
  slide9.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.1, w: 4.3, h: 3.8, fill: { color: BG_CARD }, shadow: cardShadow() });
  slide9.addText("Мүмкіндіктер", { x: 5.4, y: 1.2, w: 3.9, h: 0.4, fontSize: 15, fontFace: "Arial", color: "29B6F6", bold: true, margin: 0 });

  const botFeatures = [
    { text: "Inline клавиатуралар (WebApp батырмасы)", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "httpx арқылы Backend API байланыс", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "Notification жүйесі (әр сағат сайын)", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "Белсенді емес юзерлерге еске салу", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "Callback query handlers", options: { bullet: { code: "2022" }, fontSize: 12, color: TEXT_MUTED } },
  ];
  slide9.addText(botFeatures, { x: 5.4, y: 1.7, w: 3.9, h: 2.8, fontFace: "Calibri", paraSpaceAfter: 8 });

  // ========== SLIDE 10: AI Tutor ==========
  let slide10 = pres.addSlide();
  slide10.background = { color: BG_DARK };
  slide10.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: ACCENT_PURPLE } });

  slide10.addText("AI Тьютор", {
    x: 0.5, y: 0.25, w: 7, h: 0.7,
    fontSize: 32, fontFace: "Arial Black", color: TEXT_WHITE, bold: true, margin: 0
  });
  slide10.addText("Анеля көрсетеді", {
    x: 6.5, y: 0.35, w: 3, h: 0.4,
    fontSize: 11, fontFace: "Calibri", color: TEXT_DIM, italic: true, align: "right", margin: 0
  });

  // Left: AI features
  slide10.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 4.3, h: 2.4, fill: { color: BG_CARD }, shadow: cardShadow() });
  slide10.addText("Groq API + LLaMA 3.3 70B", { x: 0.7, y: 1.2, w: 3.9, h: 0.4, fontSize: 15, fontFace: "Arial", color: ACCENT_PURPLE, bold: true, margin: 0 });

  const aiFeatures = [
    { text: "Қазақ тілінде физика жауаптары", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "LaTeX формулалар ($E=mc^2$)", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "Юзер прогресін ескеретін контекст", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "Chat history: 20 хабарлама, 6 контекст", options: { bullet: { code: "2022" }, fontSize: 12, color: TEXT_MUTED } },
  ];
  slide10.addText(aiFeatures, { x: 0.7, y: 1.7, w: 3.9, h: 1.6, fontFace: "Calibri", paraSpaceAfter: 6 });

  // Right: Jailbreak
  slide10.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.1, w: 4.3, h: 2.4, fill: { color: BG_CARD }, shadow: cardShadow() });
  slide10.addImage({ data: icons.shield, x: 5.4, y: 1.2, w: 0.3, h: 0.3 });
  slide10.addText("Jailbreak Prevention", { x: 5.75, y: 1.2, w: 3.5, h: 0.4, fontSize: 15, fontFace: "Arial", color: ACCENT_RED, bold: true, margin: 0 });

  const jailbreakItems = [
    { text: "20+ кілт сөз фильтр (KZ + EN)", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "'ignore instructions' блокталады", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "'жүйелік нұсқауларды елеме' блокталады", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "Физикадан тыс сұрақтар — жоқ", options: { bullet: { code: "2022" }, fontSize: 12, color: TEXT_MUTED } },
  ];
  slide10.addText(jailbreakItems, { x: 5.4, y: 1.7, w: 3.9, h: 1.6, fontFace: "Calibri", paraSpaceAfter: 6 });

  // System prompt box
  slide10.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.7, w: 9.0, h: 1.4, fill: { color: BG_CARD2 }, shadow: cardShadow() });
  slide10.addText("System Prompt", { x: 0.7, y: 3.8, w: 8.6, h: 0.35, fontSize: 14, fontFace: "Arial", color: ACCENT_YELLOW, bold: true, margin: 0 });
  slide10.addText('"Сен Physics Bot AI тьюторысың. Тек физика сұрақтарына жауап бер. Қазақ тілінде жауап бер. LaTeX формулаларын $...$ ішінде жаз. Юзердің прогресін ескер."', {
    x: 0.7, y: 4.15, w: 8.6, h: 0.8, fontSize: 12, fontFace: "Consolas", color: TEXT_MUTED, italic: true, margin: 0
  });

  // ========== SLIDE 11: DevOps & QA ==========
  let slide11 = pres.addSlide();
  slide11.background = { color: BG_DARK };
  slide11.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: "2196F3" } });

  slide11.addText("DevOps және QA", {
    x: 0.5, y: 0.25, w: 7, h: 0.7,
    fontSize: 32, fontFace: "Arial Black", color: TEXT_WHITE, bold: true, margin: 0
  });
  slide11.addText("Бекзат көрсетеді", {
    x: 6.5, y: 0.35, w: 3, h: 0.4,
    fontSize: 11, fontFace: "Calibri", color: TEXT_DIM, italic: true, align: "right", margin: 0
  });

  // Docker Compose
  slide11.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 4.3, h: 3.5, fill: { color: BG_CARD }, shadow: cardShadow() });
  slide11.addText("Docker Compose — 4 контейнер", { x: 0.7, y: 1.2, w: 3.9, h: 0.4, fontSize: 14, fontFace: "Arial", color: "2196F3", bold: true, margin: 0 });

  const dockerItems = [
    { text: "backend — FastAPI (port 8000)", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "frontend — React + Nginx (port 3000)", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "admin — React + Nginx (port 5174)", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "bot — aiogram (no port)", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "Health check: /health эндпоинт", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "Persistent volume: SQLite /app/data", options: { bullet: { code: "2022" }, breakLine: true, fontSize: 12, color: TEXT_MUTED } },
    { text: "Nginx: SPA routing, gzip, cache", options: { bullet: { code: "2022" }, fontSize: 12, color: TEXT_MUTED } },
  ];
  slide11.addText(dockerItems, { x: 0.7, y: 1.7, w: 3.9, h: 2.6, fontFace: "Calibri", paraSpaceAfter: 5 });

  // Test results
  slide11.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.1, w: 4.3, h: 3.5, fill: { color: BG_CARD }, shadow: cardShadow() });
  slide11.addText("Тест нәтижелері", { x: 5.4, y: 1.2, w: 3.9, h: 0.4, fontSize: 14, fontFace: "Arial", color: ACCENT_GREEN, bold: true, margin: 0 });

  const testResults = [
    { label: "API endpoints", result: "25/25", color: ACCENT_GREEN },
    { label: "UI (mobile emulator)", result: "OK", color: ACCENT_GREEN },
    { label: "Bot командалары", result: "5/5", color: ACCENT_GREEN },
    { label: "AI jailbreak тест", result: "20/20", color: ACCENT_GREEN },
    { label: "KaTeX рендеринг", result: "OK", color: ACCENT_GREEN },
  ];

  testResults.forEach((t, i) => {
    const y = 1.8 + i * 0.55;
    slide11.addText(t.label, { x: 5.4, y, w: 2.6, h: 0.35, fontSize: 13, fontFace: "Calibri", color: TEXT_MUTED, margin: 0 });
    slide11.addShape(pres.shapes.RECTANGLE, { x: 8.2, y: y + 0.02, w: 1.1, h: 0.3, fill: { color: t.color, transparency: 80 } });
    slide11.addText(t.result + " \u2705", { x: 8.0, y, w: 1.3, h: 0.35, fontSize: 13, fontFace: "Arial", color: ACCENT_GREEN, bold: true, align: "center", margin: 0 });
  });

  // ========== SLIDE 12: Prompts ==========
  let slide12 = pres.addSlide();
  slide12.background = { color: BG_DARK };
  slide12.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: PRIMARY } });

  slide12.addText("Промпт мысалдары", {
    x: 0.5, y: 0.2, w: 9, h: 0.6,
    fontSize: 30, fontFace: "Arial Black", color: TEXT_WHITE, bold: true, margin: 0
  });

  const prompts = [
    { role: "Backend", prompt: "FastAPI проект жаса: routers/, models/, schemas/. SQLAlchemy 2.0, Pydantic v2", color: PRIMARY },
    { role: "Frontend", prompt: "React + TailwindCSS Mini App жаса, dark theme, Telegram SDK", color: ACCENT_GREEN },
    { role: "Bot", prompt: "aiogram 3 бот жаса, WebApp батырмасы, httpx API байланыс", color: "29B6F6" },
    { role: "AI", prompt: "Groq API physics tutor жаса, system prompt, jailbreak prevention", color: ACCENT_PURPLE },
    { role: "Admin", prompt: "React админ-панель: JWT login, Dashboard, CRUD, CSV import", color: ACCENT_YELLOW },
    { role: "DevOps", prompt: "Docker Compose: 4 сервис, health check, Nginx", color: "2196F3" },
  ];

  prompts.forEach((p, i) => {
    const y = 0.95 + i * 0.73;
    slide12.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9, h: 0.6, fill: { color: BG_CARD } });
    slide12.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.06, h: 0.6, fill: { color: p.color } });
    slide12.addText(p.role, { x: 0.75, y, w: 1.2, h: 0.6, fontSize: 12, fontFace: "Arial", color: p.color, bold: true, valign: "middle", margin: 0 });
    slide12.addText('"' + p.prompt + '"', { x: 2.0, y, w: 7.3, h: 0.6, fontSize: 11, fontFace: "Consolas", color: TEXT_MUTED, valign: "middle", margin: 0 });
  });

  // ========== SLIDE 13: Tech Stack ==========
  let slide13 = pres.addSlide();
  slide13.background = { color: BG_DARK };
  slide13.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: PRIMARY } });

  slide13.addText("Технологиялар стегі", {
    x: 0.5, y: 0.25, w: 9, h: 0.7,
    fontSize: 32, fontFace: "Arial Black", color: TEXT_WHITE, align: "center", bold: true, margin: 0
  });

  const stacks = [
    { category: "Frontend", items: "React 18, Vite, TailwindCSS, Zustand, KaTeX, Axios", color: ACCENT_GREEN },
    { category: "Backend", items: "FastAPI, SQLAlchemy 2.0, Pydantic v2, SQLite, JWT", color: PRIMARY },
    { category: "Bot", items: "aiogram 3.7, httpx, python-dotenv", color: "29B6F6" },
    { category: "AI", items: "Groq API, LLaMA 3.3 70B, OpenAI-compatible", color: ACCENT_PURPLE },
    { category: "Admin", items: "React, Recharts, react-hook-form, Zod, react-hot-toast", color: ACCENT_YELLOW },
    { category: "DevOps", items: "Docker, Docker Compose, Nginx, Uvicorn", color: "2196F3" },
  ];

  stacks.forEach((s, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 4.75;
    const y = 1.15 + row * 1.4;

    slide13.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.4, h: 1.15, fill: { color: BG_CARD }, shadow: cardShadow() });
    slide13.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h: 1.15, fill: { color: s.color } });
    slide13.addText(s.category, { x: x + 0.25, y: y + 0.05, w: 4.0, h: 0.4, fontSize: 16, fontFace: "Arial", color: s.color, bold: true, margin: 0 });
    slide13.addText(s.items, { x: x + 0.25, y: y + 0.5, w: 4.0, h: 0.5, fontSize: 11, fontFace: "Calibri", color: TEXT_MUTED, margin: 0 });
  });

  // ========== SLIDE 14: Thank You ==========
  let slide14 = pres.addSlide();
  slide14.background = { color: BG_DARK };
  slide14.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: PRIMARY } });

  // Decorative
  slide14.addShape(pres.shapes.OVAL, { x: -1, y: -0.5, w: 3, h: 3, fill: { color: PRIMARY, transparency: 92 } });
  slide14.addShape(pres.shapes.OVAL, { x: 8.5, y: 3.5, w: 2.5, h: 2.5, fill: { color: ACCENT_PURPLE, transparency: 92 } });

  slide14.addImage({ data: icons.star, x: 4.55, y: 0.8, w: 0.9, h: 0.9 });

  slide14.addText("Рахмет!", {
    x: 0.5, y: 1.8, w: 9, h: 1.0,
    fontSize: 52, fontFace: "Arial Black", color: TEXT_WHITE, align: "center", bold: true, margin: 0
  });

  slide14.addText("Physics Bot — Физика үйренудің жаңа жолы", {
    x: 0.5, y: 2.8, w: 9, h: 0.6,
    fontSize: 18, fontFace: "Calibri", color: TEXT_MUTED, align: "center", margin: 0
  });

  slide14.addShape(pres.shapes.LINE, { x: 3.5, y: 3.6, w: 3, h: 0, line: { color: PRIMARY, width: 2 } });

  slide14.addText("Темирлан  •  Инкар  •  Бакдаулет  •  Азиз  •  Санжар  •  Анеля  •  Бекзат", {
    x: 0.5, y: 3.9, w: 9, h: 0.5,
    fontSize: 15, fontFace: "Calibri", color: TEXT_MUTED, align: "center", margin: 0
  });

  slide14.addText("React + FastAPI + aiogram + Groq AI + Docker", {
    x: 0.5, y: 4.5, w: 9, h: 0.4,
    fontSize: 12, fontFace: "Calibri", color: TEXT_DIM, align: "center", margin: 0
  });

  slide14.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: PRIMARY } });

  // Save
  await pres.writeFile({ fileName: "D:\\Projects\\tgboteraka\\Physics_Bot_Presentation.pptx" });
  console.log("Presentation created successfully!");
}

createPresentation().catch(console.error);
