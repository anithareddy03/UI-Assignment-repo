// COLORS USED IN GRID

const colors = ["#6F98A8", "#2B8EAD", "#2F454E", "#BFBFBF"];

// RANDOMLY GENERATE COLOR FOR EACH GRID ITEM

const getColors = (num) => {
  if ([1, 8].includes(num)) {
    return colors[0];
  }
  if ([2, 4].includes(num)) {
    return colors[1];
  }
  if ([3, 5, 9].includes(num)) {
    return colors[2];
  }
  if ([6, 7].includes(num)) {
    return colors[3];
  }
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
};
let sorted = true;


// GENERATE ARRAY
const createArrayOfNumbers = (length) =>
  new Array(length).fill(null).map((_, i) => {
    const name = i + 1;
    const color = getColors(name);
    return { name, color };
  });

// INIT NUMBERS ARRAY
let items = createArrayOfNumbers(9);

// UPDATE VALUES INSIDE GRID
const updateValues = (node, { name = 1, color }) => {
  node.textContent = name;
  //node.style.setProperty("--node-color", color);
};
// CREATE GRID NODE
const generateNode = ({ name = 1, color }) => {
  const node = document.createElement("li");
  node.className = "list-Items";
  node.textContent = name;
  node.style.setProperty("--node-color", color);
  return node;
};

// CONTAINER NODE
const rootNode = document.getElementById("shuffleAndSort");

// ADD NUMBER NODES TO GRID
const createNodes = (array, rootNode) => {
  for (let i = 0; i < array.length; i++) {
    const element = generateNode(array[i]);
    rootNode.appendChild(element);
  }
  setTimeout(() => (rootNode.style.opacity = 1), 0);
};

// INIT GRID
createNodes(items, rootNode);

// REPLACE NODES WITH NEW NODES
const replaceNodes = (items) => {
  rootNode.style.opacity = 0;
  const itemNodes = document.querySelectorAll(".list-Items");
  itemNodes.forEach((node, i) => {
    // updateValues(node, items[i])
    const item = generateNode(items[i]);
    node.parentNode.replaceChild(item, node);
  });
  setTimeout(() => (rootNode.style.opacity = 1), 300);
};

const shuffle = (array) => {
  sorted = false;
  for (let i = array.length - 1; i > 0; i--) {
    const newIndex = Math.floor(Math.random() * (i + 1));
    const oldValue = array[i];
    array[i] = array[newIndex];
    array[newIndex] = oldValue;
  }
  return array;
};

const sort = (array, key) => {
  sorted = true;
  return array.sort((a, b) => a[key] - b[key]);
};

const shuffleHandler = ({ target }) => {
  target.blur();
  items = shuffle([...items]);
  replaceNodes(items);
};

const sortHandler = ({ target }) => {
  target.blur();
  if (sorted) {
    return;
  }
  items = sort([...items], "name");
  replaceNodes(items);
};

// ADD EVENT LISTENERS

const btnShuffle = document.getElementById("shuffle-btn");
const btnSort = document.getElementById("sort-btn");

btnShuffle.addEventListener("click", shuffleHandler, false);
btnSort.addEventListener("click", sortHandler, false);

