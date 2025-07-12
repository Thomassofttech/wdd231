const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
  { code: "WDD 231", name: "Front End Dev I", credits: 3, completed: false },
  {code: "WDD 131",  name: "Web Dynamic", credits: 3, completed: true},
  {code: "CSE111", name: "Programming with Functions", credits: 2, completed: true},
  {code: "CSE210", name: "Programmimg with Classes", credits: 2, completed: true,},
];

const courseContainer = document.getElementById("course-cards");
const totalCreditsSpan = document.getElementById("total-credits");

function displayCourses(list) {
  courseContainer.innerHTML = "";
  let total = 0;
  list.forEach(course => {
    const card = document.createElement("div");
    card.className = course.completed ? "completed" : "not-completed";
    card.innerHTML = `<h3>${course.code}</h3><p>${course.name}</p><p>${course.credits} Credits</p>`;
    courseContainer.appendChild(card);
    total += course.credits;
  });
  totalCreditsSpan.textContent = total;
}

// Initial load
displayCourses(courses);

// Buttons
document.getElementById("all").addEventListener("click", () => displayCourses(courses));
document.getElementById("wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.code.includes("WDD"))));
document.getElementById("cse").addEventListener("click", () => displayCourses(courses.filter(c => c.code.includes("CSE"))));
