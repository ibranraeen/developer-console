// Get the console-output div
const outputDiv = document.getElementById("console-output");

// Overwrite the console.log function
const originalConsoleLog = console.log;
console.log = function (...args) {
  // Call the original console.log function
  originalConsoleLog.apply(console, args);

  // Create a new div element for the log message
  const logDiv = document.createElement("div");
  logDiv.classList.add("break-words", "text-white", "w-full");

  // Convert the arguments to HTML elements
  const logElements = args.map((arg) => {
    if (typeof arg === "object") {
      return createObjectElement(arg);
    } else if (typeof arg === "function") {
      return createFunctionElement(arg);
    } else {
      return createPrimitiveElement(arg);
    }
  });

  // Append the log elements to the log message div
  logElements.forEach((element) => logDiv.appendChild(element));

  // Append the log message div to the console-output div
  outputDiv.appendChild(logDiv);
};

function createObjectElement(obj) {
  const objectContainer = document.createElement("div");
  objectContainer.classList.add("ml-4");

  const objectHeader = document.createElement("div");
  objectHeader.classList.add(
    "inline-flex",
    "items-center",
    "text-xs",
    "text-gray-400",
    "cursor-pointer"
  );
  objectHeader.addEventListener("click", toggleObjectExpansion);

  // Create the SVG icon element
  const objectHeaderIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  objectHeaderIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  objectHeaderIcon.setAttribute("fill", "none");
  objectHeaderIcon.setAttribute("viewBox", "0 0 24 24");
  objectHeaderIcon.setAttribute("stroke-width", "1.5");
  objectHeaderIcon.setAttribute("stroke", "currentColor");
  objectHeaderIcon.classList.add(
    "w-4",
    "h-4",
    "mr-1",
    "transition-transform",
    "transform"
  ); // Added 'transform' class
  objectHeaderIcon.style.transition = "transform 0.3s ease"; // Added transition style

  // Create the path for the SVG icon
  const objectHeaderIconPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  objectHeaderIconPath.setAttribute("stroke-linecap", "round");
  objectHeaderIconPath.setAttribute("stroke-linejoin", "round");
  objectHeaderIconPath.setAttribute("d", "m8.25 4.5 7.5 7.5-7.5 7.5");

  // Append the path to the SVG icon
  objectHeaderIcon.appendChild(objectHeaderIconPath);
  // Append the SVG icon to the object header
  objectHeader.appendChild(objectHeaderIcon);

  const objectHeaderText = document.createElement("span");
  objectHeaderText.textContent = "Object";
  objectHeader.appendChild(objectHeaderText);

  objectContainer.appendChild(objectHeader);

  const objectBody = document.createElement("div");
  objectBody.classList.add(
    "hidden",
    "ml-4",
    "mt-2",
    "p-2",
    "bg-gray-700",
    "rounded"
  );

  for (const [key, value] of Object.entries(obj)) {
    const keyElement = document.createElement("span");
    keyElement.classList.add("text-green-400");
    keyElement.textContent = `${key}: `;

    const valueElement = createValueElement(value);

    const entryContainer = document.createElement("div");
    entryContainer.classList.add("flex", "mb-2");
    entryContainer.appendChild(keyElement);
    entryContainer.appendChild(valueElement);

    objectBody.appendChild(entryContainer);
  }

  objectContainer.appendChild(objectBody);
  return objectContainer;
}

function createFunctionElement(func) {
  const funcElement = document.createElement("span");
  funcElement.classList.add("text-white");
  funcElement.textContent = func.toString();
  return funcElement;
}

function createPrimitiveElement(value) {
  const valueElement = document.createElement("span");

  switch (typeof value) {
    case "string":
      valueElement.classList.add("text-yellow-300");
      valueElement.textContent = value;
      break;
    case "number":
      valueElement.classList.add("text-blue-300");
      valueElement.textContent = value;
      break;
    case "boolean":
      valueElement.classList.add("text-purple-300");
      valueElement.textContent = value.toString();
      break;
    case "undefined":
      valueElement.classList.add("text-gray-500");
      valueElement.textContent = "undefined";
      break;
    case "object":
      if (value === null) {
        valueElement.classList.add("text-gray-500");
        valueElement.textContent = "null";
      } else {
        valueElement.appendChild(createObjectElement(value));
      }
      break;
    default:
      valueElement.classList.add("text-white");
      valueElement.textContent = value;
  }

  return valueElement;
}

function createValueElement(value) {
  if (typeof value === "object") {
    return createObjectElement(value);
  } else if (typeof value === "function") {
    return createFunctionElement(value);
  } else {
    return createPrimitiveElement(value);
  }
}

function toggleObjectExpansion(event) {
  const objectHeader = event.currentTarget;
  const objectBody = objectHeader.nextElementSibling;
  const objectHeaderIcon = objectHeader.querySelector("svg");

  objectBody.classList.toggle("hidden");

  // Toggle rotation class for the SVG icon
  objectHeaderIcon.classList.toggle("rotate-90");
}
