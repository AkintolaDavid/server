const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
// });
// Port to listen on (replace with desired port)
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
console.log("lets start");
const questionBank = {
  LAW101: [
    /* Existing questions */
    {
      question: "What are the elements of a valid contract?",
      answerOptions: [
        "Offer and acceptance",
        "Consideration",
        "Capacity to contract",
        "All of the above",
      ],
      answer: "All of the above",
    },
    {
      question:
        "What is the primary source of law in most common law legal systems?",
      answerOptions: [
        "Legislation",
        "Judicial precedent",
        "Customary law",
        "Treaty law",
      ],
      answer: "Judicial precedent", // Explanation: Common law systems rely heavily on past court decisions (precedent) to guide future rulings.
    },
    {
      question: "The burden of proof in a civil lawsuit lies with:",
      answerOptions: [
        "The judge",
        "The jury (if applicable)",
        "The defendant",
        "The plaintiff",
      ],
      answer: "The plaintiff", // Explanation: In civil cases, the plaintiff (the one bringing the lawsuit) must prove their case by a preponderance of the evidence.
    },
    {
      question:
        "Which of the following is NOT a core principle of contract law?",
      answerOptions: [
        "Offer and acceptance",
        "Consideration (exchange of value)",
        "Capacity to contract",
        "Goodwill (positive intentions)",
      ],
      answer: "Goodwill (positive intentions)", // Explanation: Goodwill isn't a legal element of a contract. While parties may enter a contract with good intentions, it's the formal elements like offer, acceptance, and consideration that matter for enforceability.
    },
    {
      question: "What type of law defines crimes and their punishments?",
      answerOptions: [
        "Civil law",
        "Constitutional law",
        "Criminal law",
        "Administrative law",
      ],
      answer: "Criminal law", // Explanation: Criminal law defines offenses against the state and the potential penalties for committing them.
    },
    {
      question: "Which of the following is NOT a core function of a lawyer?",
      answerOptions: [
        "Providing legal advice",
        "Drafting legal documents",
        "Representing clients in court",
        "Negotiating settlements",
      ],
      answer: "Presiding over court cases", // Explanation: Lawyers don't preside over court cases; judges do.
    },
    {
      question: "What are the different types of contracts?",
      answerOptions: [
        "Written and oral",
        "Formal and informal",
        "Express and implied",
        "All of the above",
      ],
      answer: "All of the above",
    },
    // Add more questions here
  ],
  HSC101: [
    {
      question: "What is the primary goal of healthcare?",
      answerOptions: [
        "Profit maximization",
        "Disease prevention",
        "Improving quality of life",
        "Technological advancement"
      ],
      answer: "Improving quality of life"
    },
    {
      question: "Which of the following is NOT a key component of the healthcare system?",
      answerOptions: [
        "Providers",
        "Payers",
        "Patients",
        "Technology companies"
      ],
      answer: "Technology companies"
    },
    {
      question: "What is the term for a healthcare professional who provides primary care services?",
      answerOptions: [
        "Specialist",
        "Surgeon",
        "Nurse practitioner",
        "Primary care physician"
      ],
      answer: "Primary care physician"
    },
    {
      question: "What is the primary function of health insurance?",
      answerOptions: [
        "Providing preventive care",
        "Covering healthcare costs",
        "Conducting medical research",
        "Managing hospitals"
      ],
      answer: "Covering healthcare costs"
    },
    {
      question: "Which of the following is a common type of healthcare delivery system?",
      answerOptions: [
        "Fee-for-service",
        "Managed care",
        "Public health",
        "All of the above"
      ],
      answer: "All of the above"
    },
    {
      question: "What is the term for a healthcare professional who assists doctors and nurses?",
      answerOptions: [
        "Pharmacist",
        "Medical assistant",
        "Physical therapist",
        "Dietitian"
      ],
      answer: "Medical assistant"
    },
    {
      question: "What is the primary role of public health?",
      answerOptions: [
        "Providing individual patient care",
        "Protecting and improving community health",
        "Conducting medical research",
        "Managing hospitals"
      ],
      answer: "Protecting and improving community health"
    }
  ]
  
  CON221: [{ question: "What are the elements of a valid constitution?" }],
  // ... and so on for other courses
};

// Route to handle course code request
app.get("/api/questions/:courseCode", (req, res) => {
  const courseCode = req.params.courseCode;

  const questions = questionBank[courseCode];
  res.json(questions);
});
const users = []; // Initialize an empty array to store signed-up users
console.log(users);
app.post("/api/signup", (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;
  const existingUser = users.find((user) => user.phoneNumber === phoneNumber);
  if (existingUser) {
    return res.status(400).json({ message: "Phone number is already in use" });
  }

  // Create a new user object with the provided details
  const newUser = { firstName, lastName, phoneNumber, email, password };

  // Push the new user object into the users array
  users.push(newUser);
  console.log("Users:", users);
  res.status(200).send("User signed up successfully!");
});
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Route to handle user signin
app.post("/api/signin", (req, res) => {
  const { phoneNumber, password } = req.body;
  if (!phoneNumber || !password) {
    // If phoneNumber or password is missing in the request body, return an error response
    return res
      .status(400)
      .json({ message: "Phone number and password are required" });
  }
  const user = users.find(
    (u) => u.phoneNumber === phoneNumber && u.password === password
  );

  if (user) {
    // Login successful
    res
      .status(200)
      .json({ firstName: user.firstName, lastName: user.lastName });
  } else {
    // Login failed (credentials not found)
    res.status(401).json({ message: "Invalid phone number or password" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
