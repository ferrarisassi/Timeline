const timelineContainer = document.getElementById("timeline-container");
const addEventForm = document.getElementById("add-event-form");

// Load events from local storage and render them
let events = JSON.parse(localStorage.getItem("events")) || [];
renderTimeline();

// Handle form submission
addEventForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get input values
  const name = document.getElementById("event-name").value;
  const description = document.getElementById("event-description").value;
  const date = document.getElementById("event-date").value;
  const event = {
    name,
    description,
    date,
  };

  // Add event to events array
  events.push(event);

  // Save events to local storage
  localStorage.setItem("events", JSON.stringify(events));

  // Clear form inputs
  document.getElementById("event-name").value = "";
  document.getElementById("event-description").value = "";
  document.getElementById("event-date").value = "";

  // Render timeline
  renderTimeline();
});

// Render timeline with current events
function renderTimeline() {
  // Clear timeline container
  timelineContainer.innerHTML = "";

  // Sort events by date
  events.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Render each event
  events.forEach((event, index) => {
    const timelineItem = document.createElement("div");
    timelineItem.classList.add("timeline-item");

    const timelineIcon = document.createElement("div");
    timelineIcon.classList.add("timeline-icon");
    timelineIcon.innerHTML = '<i class="fa fa-clock-o"></i>';

    const timelineContent = document.createElement("div");
    timelineContent.classList.add("timeline-content");

    const eventName = document.createElement("h2");
    eventName.innerText = event.name;

    const eventDescription = document.createElement("p");
    eventDescription.innerText = event.description;

    const eventDate = document.createElement("p");
    const dateString = event.date + "T03:00:00-03:00"; // Append Sao Paulo timezone offset to date string
    eventDate.innerText = formatDate(dateString);

    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove Event";
    removeButton.addEventListener("click", () => {
      // Remove event from events array
      events = events.filter((e) => e.date !== event.date);

      // Save events to local storage
      localStorage.setItem("events", JSON.stringify(events));

      // Render timeline
      renderTimeline();
    });

    timelineContent.appendChild(eventName);
    timelineContent.appendChild(eventDescription);
    timelineContent.appendChild(eventDate);
    timelineContent.appendChild(removeButton);

    timelineItem.appendChild(timelineIcon);
    timelineItem.appendChild(timelineContent);

    timelineContainer.appendChild(timelineItem);

    // Add line between timeline items, except for the last one
    if (index < events.length - 1) {
      const timelineLine = document.createElement("div");
      timelineLine.classList.add("timeline-line");
      timelineContainer.insertBefore(timelineLine, timelineItem.nextSibling);
    }
  });
}

// Format date as "Day Month Year"
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("pt-BR", options);
}
