// Homepage Button Click Event
document.getElementById("startButton").addEventListener("click", function () {
  // Hide homepage and show the dashboard
  document.getElementById("homepage").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
});

// BMR Calculator Logic
document.getElementById("bmrForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;

  if (age && weight && height) {
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    document.getElementById(
      "bmrResult"
    ).textContent = `Your BMR is: ${bmr.toFixed(2)} kcal/day`;
  } else {
    alert("Please fill out all fields");
  }
});

// Exercise Routine Generator Logic
document
  .getElementById("exerciseForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const goal = document.getElementById("goal").value;
    let exerciseSuggestions = "";

    if (goal === "weightLoss") {
      exerciseSuggestions = "Running, Cycling, Swimming, Jump Rope";
    } else if (goal === "strength") {
      exerciseSuggestions = "Squats, Deadlifts, Bench Press, Pull-Ups";
    }

    document.getElementById(
      "exerciseResult"
    ).textContent = `Suggested exercises: ${exerciseSuggestions}`;
  });

// Healthy Recipe Generator Logic
document
  .getElementById("recipeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const mealType = document.getElementById("mealType").value;
    let recipe = "";

    if (mealType === "breakfast") {
      recipe = "Oatmeal with fruits, Scrambled eggs, Avocado toast";
    } else if (mealType === "lunch") {
      recipe = "Grilled chicken with veggies, Quinoa salad, Lentil soup";
    } else {
      recipe = "Grilled fish with steamed vegetables, Brown rice, Fruit salad";
    }

    document.getElementById(
      "recipeResult"
    ).textContent = `Suggested Recipe: ${recipe}`;
  });

// Water Intake Tracker Logic
document
  .getElementById("waterForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const waterIntake = document.getElementById("waterIntake").value;
    document.getElementById(
      "waterResult"
    ).textContent = `You have logged ${waterIntake} ml of water today.`;
  });

// Calorie Checker Logic
const foodDatabase = {
  apple: 52, // calories per 100g
  banana: 96,
  chickenBreast: 165,
  rice: 130,
  egg: 155,
  avocado: 160,
  broccoli: 55,
  almond: 579,
};

document
  .getElementById("calorieForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const foodItem = document.getElementById("foodItem").value.toLowerCase();
    const quantity = parseInt(document.getElementById("quantity").value);

    if (isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (!foodDatabase[foodItem]) {
      alert("Food item not found in the database.");
      return;
    }

    const caloriesPer100g = foodDatabase[foodItem];
    const totalCalories = (caloriesPer100g * quantity) / 100;

    document.getElementById(
      "calorieResult"
    ).textContent = `Total Calories in ${quantity} grams of ${foodItem}: ${totalCalories.toFixed(
      2
    )} kcal`;
  });

document
  .getElementById("period-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the values from the form
    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);
    const cycleLength = parseInt(document.getElementById("cycle-length").value); // Cycle length input (28 days)

    // Display the cycle length
    document.getElementById(
      "cycle-length-display"
    ).innerText = `Cycle Length: ${cycleLength} days`;

    // Calculate the number of days between the last period start and end dates (for the current cycle length)
    const cycleDays = (endDate - startDate) / (1000 * 60 * 60 * 24); // Convert milliseconds to days

    // If the user-provided cycle length is different from the actual cycle days
    if (cycleDays !== cycleLength) {
      alert(
        `Your actual cycle length is ${cycleDays} days, but you're using ${cycleLength} days.`
      );
    }

    // Calculate the next period start date by adding the cycle length to the last period's start date
    const nextPeriodStartDate = new Date(startDate);
    nextPeriodStartDate.setDate(nextPeriodStartDate.getDate() + cycleLength); // Add cycle length to start date

    // Display the next period start date
    document.getElementById(
      "next-period"
    ).innerText = `Next Period Expected Start: ${nextPeriodStartDate.toDateString()}`;
  });

document
  .getElementById("sleep-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the sleep start and end times from the form
    const sleepStart = document.getElementById("sleep-start").value;
    const sleepEnd = document.getElementById("sleep-end").value;

    // Convert the times to Date objects
    const startTime = new Date(`1970-01-01T${sleepStart}:00`);
    const endTime = new Date(`1970-01-01T${sleepEnd}:00`);

    // If sleep end time is earlier than start time, assume it's the next day
    if (endTime < startTime) {
      endTime.setDate(endTime.getDate() + 1); // Move end time to the next day
    }

    // Calculate sleep duration in milliseconds
    const sleepDurationMillis = endTime - startTime;
    const sleepDurationHours = Math.floor(
      sleepDurationMillis / (1000 * 60 * 60)
    ); // Hours
    const sleepDurationMinutes = Math.floor(
      (sleepDurationMillis % (1000 * 60 * 60)) / (1000 * 60)
    ); // Minutes

    // Display the total sleep duration
    const sleepDurationText = `Total Sleep Duration: ${sleepDurationHours} hours and ${sleepDurationMinutes} minutes.`;
    document.getElementById("sleep-duration").textContent = sleepDurationText;

    // Suggest if the user needs more sleep
    let sleepMessage = "";
    if (sleepDurationHours < 7) {
      sleepMessage =
        "You should aim for at least 7-9 hours of sleep for better health.";
    } else if (sleepDurationHours >= 7 && sleepDurationHours <= 9) {
      sleepMessage = "Great! You got a healthy amount of sleep.";
    } else {
      sleepMessage =
        "You had a long sleep! Make sure not to oversleep, as it can also affect your health.";
    }
    document.getElementById("sleep-message").textContent = sleepMessage;
  });

document.getElementById("bp-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const systolic = parseInt(document.getElementById("systolic").value);
  const diastolic = parseInt(document.getElementById("diastolic").value);

  let message = "";

  if (systolic < 120 && diastolic < 80) {
    message = "Your blood pressure is normal. Keep it up!";
  } else if (systolic >= 120 && systolic < 130 && diastolic < 80) {
    message = "Elevated blood pressure. Consider reducing stress.";
  } else if (systolic >= 130 || diastolic >= 80) {
    message =
      "High blood pressure. It’s recommended to consult a healthcare provider.";
  }

  document.getElementById("bp-message").textContent = message;
});

document.getElementById("hr-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const heartRate = parseInt(document.getElementById("heart-rate").value);
  let message = "";

  if (heartRate < 60) {
    message =
      "Your heart rate is low. Make sure to get enough rest and stay hydrated.";
  } else if (heartRate >= 60 && heartRate <= 100) {
    message = "Your heart rate is normal. Keep it up!";
  } else if (heartRate > 100) {
    message =
      "Your heart rate is high. If persistent, consider consulting a healthcare provider.";
  }

  document.getElementById("hr-message").textContent = message;
});

document
  .getElementById("temp-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const temperature = parseFloat(
      document.getElementById("temperature").value
    );
    let message = "";

    if (temperature < 36.1) {
      message = "You have a low body temperature. Please stay warm!";
    } else if (temperature >= 36.1 && temperature <= 37.2) {
      message = "Your body temperature is normal.";
    } else if (temperature > 37.2) {
      message = "You may have a fever. Consider monitoring your symptoms.";
    }

    document.getElementById("temp-message").textContent = message;
  });

document
  .getElementById("hydration-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const waterIntake = parseInt(document.getElementById("water-intake").value);
    let message = "";

    if (waterIntake < 2000) {
      message = "You should drink more water. Aim for at least 2L daily!";
    } else if (waterIntake >= 2000 && waterIntake <= 3000) {
      message = "Great! You’re drinking a healthy amount of water.";
    } else {
      message = "You may be over-hydrating. Remember to drink as needed!";
    }

    document.getElementById("hydration-message").textContent = message;
  });

document
  .getElementById("bmi-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value) / 100; // convert cm to meters
    const bmi = weight / (height * height);

    document.getElementById(
      "bmi-result"
    ).textContent = `Your BMI is: ${bmi.toFixed(1)}`;

    let message = "";

    if (bmi < 18.5) {
      message = "You are underweight. Consider consulting a nutritionist.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      message = "You have a healthy weight. Keep up the good work!";
    } else if (bmi >= 25 && bmi < 29.9) {
      message =
        "You are overweight. Consider adopting a balanced diet and exercise.";
    } else {
      message =
        "You are obese. It’s recommended to consult a healthcare provider.";
    }

    document.getElementById("bmi-message").textContent = message;
  });
