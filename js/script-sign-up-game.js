// sign up process data to supabase database
const SUPABASE_URL = "https://ecotpcgisopujexydlhv.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjb3RwY2dpc29wdWpleHlkbGh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NjU5ODYsImV4cCI6MjA2MTQ0MTk4Nn0.OX75S76YAwlqJmXRKZA-udTr1LivfZGftPiUm6zfeDo";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const initialForm = document.getElementById("initial-form");
const form = document.getElementById("signup-form");
const messageDiv = document.getElementById("password-msg");

initialForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = form.name.value;
  const phone = form.phone.value;
  const universityName = initialForm.universityName.value;
  const facultyName = initialForm.facultyname.value;
  const gender = initialForm.gender.value;
  const religion = initialForm.religion.value;
  const gpa = initialForm.gpa.value;
  const level = initialForm.level.value;

  //   if (password !== confirmPassword) {
  //     messageDiv.textContent = "كلمات المرور غير متطابقة.";
  //     messageDiv.className = "message error visible";
  //     return;
  //   }

  console.log({
    name: name,
    phone: phone,
    universityName: universityName,
    facultyName: facultyName,
    gender: gender,
    religion: religion,
    gpa: gpa,
    level: level,
  });

  // إدخال البيانات في جدول registration فقط
  const { error } = await supabaseClient.from("regesteration").insert([
    {
      universityName: universityName,
      facultyName: facultyName,
      gender: gender,
      religion: religion,
      gpa: gpa,
      level: level,
    },
  ]);

  if (error) {
    messageDiv.textContent = "حدث خطأ أثناء حفظ البيانات: " + error.message;
    messageDiv.className = "message error visible";
  } else {
    messageDiv.textContent = "تم التسجيل بنجاح ✅";
    messageDiv.className = "message success visible";
  }
});
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = form.name.value;
  const phone = form.phone.value;
  const email = form.email.value;
  const govern = form.govern.value;
  const password = form.password.value;
  //   const confirmPassword = form["confirm-password"].value;
  const birthDate = form.date.value;

  //   if (password !== confirmPassword) {
  //     messageDiv.textContent = "كلمات المرور غير متطابقة.";
  //     messageDiv.className = "message error visible";
  //     return;
  //   }

  console.log({
    name: name,
    phone: phone,
    email: email,
    govern: govern,
    password: password,
    birthDate: birthDate,
  });

  // إدخال البيانات في جدول registration فقط
  const { error } = await supabaseClient.from("regesteration").insert([
    {
      email: email,
      phone: phone,
      govern: govern,
      password: password,
      birthDate: birthDate,
    },
  ]);

  if (error) {
    messageDiv.textContent = "حدث خطأ أثناء حفظ البيانات: " + error.message;
    messageDiv.className = "message error visible";
  } else {
    messageDiv.textContent = "تم التسجيل بنجاح ✅";
    messageDiv.className = "message success visible";
  }
});
// Characters definition
const characters = {
  A: "بومة 🦉",
  B: "دولفين 🐬",
  C: "سلحفاة 🐢",
  D: "أسد 🦁",
};

// Character images
const characterImages = {
  A: "images/owl.jpg", // Owl
  B: "images/dolphin.jpg", // Dolphin
  C: "images/turtle.jpg", // Turtle
  D: "images/lion.jpg", // Lion
};

// Character names without emoji
const characterNames = {
  A: "بومة",
  B: "دولفين",
  C: "سلحفاة",
  D: "أسد",
};

// Priority weights (for tiebreaking)
const priority = {
  D: 4,
  B: 3,
  A: 2,
  C: 1,
};

// Descriptions for each percentage range
const descriptions = {
  A: {
    // البومة - الأزرق
    high: "منطقي ومنظم، بتحلل كل حاجة قبل ما تتحرك.",
    mid: "تحب الترتيب أحيانًا، لكن بتشتغل حسب الحاجة.",
    low: "بتفضل البساطة ومش بتركز في التفاصيل كتير.",
  },
  B: {
    // الدولفين - الأصفر
    high: "اجتماعي ومتفائل، بتحب الناس وتنشر طاقة حلوة.",
    mid: "بتحب اللمة أحيانًا، لكن بتحتاج وقت لنفسك.",
    low: "مش دايمًا اجتماعي، وبتحب الخصوصية أكتر.",
  },
  C: {
    // السلحفاة - الأخضر
    high: "مسالم وخجول، بتحب تبعد عن المشاكل والضغط.",
    mid: "هادئ وتحب الجو المستقر، بس مش دايمًا بتنسحب.",
    low: "واضح ومباشر، ومش بتخاف من المواجهة.",
  },
  D: {
    // الأسد - الأحمر
    high: "قائد وواضح، تحب السيطرة وتاخد قرارات بسرعة.",
    mid: "عندك صفات قيادية لكن مش دايمًا بتفرض رأيك.",
    low: "تميل للتعاون أكتر من السيطرة أو التوجيه.",
  },
};

// Questions and options
const questions = [
  "أول يوم في السكن الجديد... بتعمل إيه؟",
  "وسط الزحمة والدوشة ، تتصرف إزاي؟",
  "حصل عطل في السكن... أول تصرف؟",
  "فطارك الصبح؟",
  "حد بيخبط عليك فجأة: 'يلا نخرج!'",
  "الكهرباء قطعت وإنت بتذاكر، تتعامل إزاي؟",
  "حد استعمل حاجتك بدون إذن ؟",
  "حصل خلاف مع زميلك في السكن؟",
  "وقت تنظيف الشقة؟",
  "ايه الي يخليك متنمش بليل؟",
];

const options = [
  [
    "A. أرتب حاجتي وأظبط أوضتي بدقة عشان أحس بالراحة",
    "B. أتعرف على زمايلي وأهزر معاهم",
    "C. أرتب حاجتي مع نفسي لحد محد يجي يكلمني",
    "D. أدخل أعرف نفسي وأوضح الحاجات اللي بتضايقني",
  ],

  [
    "A. أروح مكان تاني هادي وأركز في شغلي",
    "B. أندمج في اللمة والهزار وأجل اللي بعمله",
    "C. أفضل مكاني وأتأقلم فالدوشة",
    "D. أطلب منهم يبطلوا الدوشة عادي",
  ],

  [
    "A. أبلغ المسئولين وأتابع الحل",
    "B. أكلم زمايلي ونحاول نصلح العطل سوا",
    "C. أسيب حد تاني يكتشف العطل وهو يتصرف",
    "D. أشوف الحاجة دي بتتصلح إزاي وأصلحها",
  ],

  [
    "A. أصحى بدري وأجهز فطار مرتب ومنظم",
    "B. أدور مين صاحي ونجهز الفطار سوا",
    "C. أعمل فطاري البسيط بهدوء لوحدي بدون دوشة",
    "D. آخد قهوتي السريعة وأتحرك فورًا",
  ],

  [
    "A. أعتذر عشان متفقناش قبلها",
    "B. أكلم باقي الشلة عشان ننزل كلنا",
    "C. مش هقدر أقول لأ فهجهز وأنزل",
    "D. هشوف هنروح فين وعلى حسب المكان هقرر",
  ],

  [
    "A. أشغل الكشاف وأكمل شغلي كأن مفيش حاجة حصلت",
    "B. أقلبها قعدة هزار وضحك مع زمايلي",
    "C. أفضل مكاني أفكر في اللي هعمله لحد ما النور يجي",
    "D. أنتهز الفرصة وأطلع أغير جو",
  ],

  [
    "A. أرتب حاجتي بشكل أحسن عشان ماتتكررش",
    "B. أكلمه بهزار وأوضح له بلطافة",
    "C. هتكسف أحرجه وأتعامل عادي",
    "D. أواجهه مباشرة وبوضوح",
  ],

  [
    "A. آخد وقتي وأفكر كويس قبل أي تصرف",
    "B. ألجأ لشخص تالت يحل المشكلة بروح خفيفة",
    "C. هتجنب الخناق قدر المستطاع بس لو اتكررت هاخدموقف",
    "D. أواجهه فورًا وأخلص الموضوع",
  ],

  [
    "A. كل واحد ليه يوم في الأسبوع زي ما اتفقنا",
    "B. ننضف كلنا سوا",
    "C. كل واحد ينضف مكانه",
    "D. اللي فاضي ينضف مش قضية",
  ],

  [
    "A. مفيش، ملتزم بمعاد نومي",
    "B. بعمل حاجة بحبها",
    "C. مشكلة معايا شاغلة تفكيري",
    "D. مذاكرة لسه مخلصتش",
  ],
];

// Quiz state
let currentQuestion = 0;
const userAnswers = Array(questions.length).fill(null);
let quizResults = null;
let initialFormData = {};

// DOM elements

const initialFormContainer = document.getElementById("initialFormContainer");
const quizContainer = document.getElementById("quizContainer");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const progressBar = document.getElementById("progressBar");
const signupContainer = document.getElementById("signupContainer");
const resultsDiv = document.getElementById("results");
const detailedResultsDiv = document.getElementById("detailedResults");
const primaryCharacterDiv = document.getElementById("primaryCharacter");
const characterImageEl = document.getElementById("character-image");
const characterNameEl = document.getElementById("character-name");
const homeBtn = document.getElementById("homeBtn");

// Initialize quiz
function initQuiz() {
  // Create all question containers
  questions.forEach((question, index) => {
    const questionContainer = document.createElement("div");
    questionContainer.className = `question-container ${
      index === 0 ? "active" : ""
    }`;
    questionContainer.id = `question-${index}`;

    const questionElement = document.createElement("div");
    questionElement.className = "question";
    questionElement.textContent = `${index + 1}. ${question}`;

    const optionsContainer = document.createElement("div");
    optionsContainer.className = "options";

    options[index].forEach((option, optionIndex) => {
      const optionChar = option.charAt(0);
      const optionText = option.substring(3);

      const optionDiv = document.createElement("div");

      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = `question-${index}`;
      radioInput.id = `q${index}-option${optionIndex}`;
      radioInput.value = optionChar;

      if (userAnswers[index] === optionChar) {
        radioInput.checked = true;
      }

      radioInput.addEventListener("change", () => {
        userAnswers[index] = optionChar;
        updateNextButton();
      });

      const label = document.createElement("label");
      label.className = "option-label";
      label.htmlFor = `q${index}-option${optionIndex}`;
      label.textContent = option;

      optionDiv.appendChild(radioInput);
      optionDiv.appendChild(label);
      optionsContainer.appendChild(optionDiv);
    });

    questionContainer.appendChild(questionElement);
    questionContainer.appendChild(optionsContainer);
    quizContainer.appendChild(questionContainer);
  });

  updateProgressBar();
  updateButtons();
}

// Navigation functions
function showQuestion(index) {
  document.querySelectorAll(".question-container").forEach((container) => {
    container.classList.remove("active");
  });

  document.getElementById(`question-${index}`).classList.add("active");
  currentQuestion = index;

  updateProgressBar();
  updateButtons();
}

function updateProgressBar() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function updateButtons() {
  prevBtn.disabled = currentQuestion === 0;

  if (currentQuestion === questions.length - 1) {
    nextBtn.textContent = "إنهاء الاختبار";
  } else {
    nextBtn.textContent = "التالي";
  }

  updateNextButton();
}

function updateNextButton() {
  nextBtn.disabled = userAnswers[currentQuestion] === null;
}

// Event listeners for initial form
document
  .getElementById("initial-form")
  .addEventListener("submit", function (event) {
    // Store initial form data
    initialFormData = {
      universityName: document.getElementById("universityName").value,
      facultyname: document.getElementById("facultyname").value,
      gender: document.getElementById("gender").value,
      religion: document.getElementById("religion").value,
      gpa: document.getElementById("gpa").value,
      level: document.getElementById("level").value,
    };

    // Hide initial form and show quiz
    initialFormContainer.style.display = "none";
    quizContainer.style.display = "block";
    document.querySelector(".navigation").style.display = "flex";
  });

// Event listeners for quiz navigation
nextBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    showQuestion(currentQuestion + 1);
  } else {
    calculateResults();
    showSignupForm();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    showQuestion(currentQuestion - 1);
  }
});

// Restart button
// homeBtn.addEventListener('click', () => {

//     // Reset quiz state
//     currentQuestion = 0;
//     userAnswers.fill(null);

//     // Clear and reinitialize quiz
//     quizContainer.innerHTML = '';
//     initQuiz();

//     // Show quiz, hide results
//     quizContainer.style.display = 'block';
//     document.querySelector('.navigation').style.display = 'flex';
//     resultsDiv.style.display = 'none';
// });

// Sign-up form validation
document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    // event.preventDefault();

    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    let message = document.getElementById("password-msg");
    let validPassword = false;

    if (password !== "" && password === confirmPassword) {
      validPassword = true;
    } else {
      window.scrollTo(0, 200);
      message.textContent = "كلمات المرور غير متطابقة";
      message.style.color = "white";
      message.style.backgroundColor = "red";
      message.style.padding = "5px";
      message.style.borderRadius = "4px";
      return;
    }

    if (validPassword) {
      // Form is valid, show results
      showResults();
    }
  });

// Results calculation
function calculateResults() {
  // Filter out any null answers (shouldn't happen with our UI)
  const validAnswers = userAnswers.filter((answer) => answer !== null);

  // Initialize scores
  const scores = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  };

  // Count the answers
  validAnswers.forEach((answer) => {
    if (scores.hasOwnProperty(answer)) {
      scores[answer]++;
    }
  });

  // Calculate percentages
  const totalAnswers = Object.values(scores).reduce(
    (sum, score) => sum + score,
    0
  );
  const percentages = {};

  for (const [char, score] of Object.entries(scores)) {
    percentages[char] = (score / totalAnswers) * 100;
  }

  // Sort characters by percentage (highest first)
  const sortedPercentages = Object.entries(percentages).sort(
    (a, b) => b[1] - a[1]
  );

  // Generate detailed results
  const detailedResults = sortedPercentages.map(([char, perc]) => {
    let level;
    if (perc >= 70) {
      level = "high";
    } else if (perc >= 40) {
      level = "mid";
    } else {
      level = "low";
    }

    return {
      character: char,
      characterDisplay: characters[char],
      percentage: perc.toFixed(1),
      description: descriptions[char][level],
    };
  });

  // Determine primary character
  const topScore = Math.max(...Object.values(scores));
  const topCharacters = Object.keys(scores).filter(
    (char) => scores[char] === topScore
  );

  let finalCharacter;
  if (topCharacters.length === 1) {
    finalCharacter = topCharacters[0];
  } else {
    // Use priority for tiebreaking
    finalCharacter = topCharacters.reduce((a, b) =>
      priority[a] > priority[b] ? a : b
    );
  }

  quizResults = {
    scores,
    percentages,
    detailedResults,
    primaryCharacter: characters[finalCharacter],
    primaryCharacterKey: finalCharacter,
  };
}

function showSignupForm() {
  // Hide quiz, show signup form
  quizContainer.style.display = "none";
  document.querySelector(".navigation").style.display = "none";
  signupContainer.style.display = "block";
}
// show results function
function showResults() {
  // Set the character image based on the primary character
  const primaryCharKey = quizResults.primaryCharacterKey;
  characterImageEl.src = characterImages[primaryCharKey];
  characterImageEl.alt = characterNames[primaryCharKey];
  characterNameEl.textContent = characterNames[primaryCharKey];

  // Display detailed results
  detailedResultsDiv.innerHTML = "";

  quizResults.detailedResults.forEach((result) => {
    const resultItem = document.createElement("div");
    resultItem.className = "result-item";
    resultItem.classList.add("col-xl-6", "col-12");

    const character = document.createElement("div");
    character.className = "character";
    character.textContent = `${result.characterDisplay}`;

    const percentage = document.createElement("span");
    percentage.className = "percentage";
    percentage.textContent = ` (${result.percentage}%)`;
    character.appendChild(percentage);

    const description = document.createElement("div");
    description.className = "description";
    description.textContent = result.description;

    resultItem.appendChild(character);
    resultItem.appendChild(description);

    detailedResultsDiv.appendChild(resultItem);
  });

  // Display primary character
  // primaryCharacterDiv.textContent = `🎯 شخصيتك الأساسية هي: ${quizResults.primaryCharacter} 🎉`;

  // Hide signup form, show results
  signupContainer.style.display = "none";
  resultsDiv.style.display = "block";

  // Store user data and results in localStorage (optional)
  // const userData = {
  //     name: document.getElementById('name').value,
  //     email: document.getElementById('email').value,
  //     phone: document.getElementById('phone').value,
  //     results: quizResults
  // };

  // localStorage.setItem('quizUserData', JSON.stringify(userData));
}

// go to home page on reload
window.addEventListener("DOMContentLoaded", initQuiz);
const entries = performance.getEntriesByType("navigation");
if (entries.length > 0 && entries[0].type === "reload") {
  window.location.href = "MAWA.html"; // Replace with your target URL
}
