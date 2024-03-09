const maxValue = Number.MAX_SAFE_INTEGER;
const addVertexButton = document.createElement("edgeButton");
document.getElementById("addGraphButton").addEventListener("click", addGraph);
document.getElementById("saveNewGraphButton").addEventListener("click",
    readInputData);
document.getElementById("saveNewGraphButton").style.display = "none";
let vertexIndex = 0;

defaultGraph();

function defaultGraph() {
  let weightedGraph = {
    0: {1: 4, 3: 5},
    1: {0: 4, 2: 3, 4: 2},
    2: {1: 3, 3: 7, 4: 1, 5: 6},
    3: {0: 5, 2: 7},
    4: {1: 2, 2: 1, 5: 5},
    5: {2: 6, 4: 5},
  }

  getGraph(weightedGraph)
}

function getGraph(weightedGraph) {
  let graphString = "Граф: " + "\n";

  console.log("==============GRAPH==============");

  for (let vertex in weightedGraph) {
    console.log("Вершина:", vertex);
    graphString = graphString + "Вершина: " + vertex + "\n";
    for (let neighborVertex in weightedGraph[vertex]) {
      const weight = weightedGraph[vertex][neighborVertex];
      console.log("Ребро між", vertex, "та", neighborVertex, "з вагою:",
          weight);
      graphString = graphString + "Ребро між " + vertex + " та "
          + neighborVertex
          + " з вагою: "
          + weight + "\n";
    }
  }
  console.log("=================================");
  document.getElementById("graphLabel").textContent = graphString;

  document.getElementById("findDistances").addEventListener("click",
      function () {
        dijkstra(weightedGraph);
      });
}

/* Реалізаця Алгоритму Дейкстри */
function dijkstra(graph) {
  let graphLength = Object.keys(graph).length;
  console.log("graphLength ", graphLength);

  let routes = new Array(graphLength).fill("0");

  let distances = new Array(graphLength).fill(maxValue);
  distances[0] = 0;
  let visitedVertices = new Array(graphLength).fill(false);

  console.log("distances ", distances);

  console.log("===============FOR===============");
  for (let i = 0; i < graphLength - 1; i++) {
    console.log("index ", i);

    for (let neighborVertex in graph[i]) {
      console.log("neighborVertex ", neighborVertex);
      console.log("weight ", graph[i][neighborVertex]);

      let weight = parseInt(graph[i][neighborVertex]);
      if (!visitedVertices[neighborVertex] && distances[i] + weight
          < distances[neighborVertex]) {
        distances[neighborVertex] = distances[i] + weight;
        routes[neighborVertex] = routes[i] + "-" + neighborVertex;
      }

    }

    console.log("distances ", distances);

  }
  console.log("=================================");
  console.log("routes ", routes);

  let distancesString = "Найкоротші шляхи:" + "\n";
  for (let i = 1; i < distances.length; i++) {
    distancesString = distancesString + " 0 -> " + i + " = " + distances[i] + " (маршрут: "+ routes[i] + ") "
        + "\n";
    document.getElementById("distanceLabel").textContent = distancesString;
  }
}




function addGraph() {
  document.getElementById("findDistances").style.display = "none";
  document.getElementById("saveNewGraphButton").style.display = "block";
  vertexIndex = 0;
  document.getElementById("graphLabel").textContent = null;
  document.getElementById("distanceLabel").textContent = null;
  document.getElementById("addGraphButton").style.display = "none";
  for (let i = 0; i < 3; i++) {
    addVertexElements(vertexIndex);
  }

  addVertexButton.classList.add("myButton")
  addVertexButton.textContent = "Додати вершину";
  addVertexButton.addEventListener("click", function () {
    addVertexElements(vertexIndex);
  });

  document.getElementById("mainPanel").appendChild(addVertexButton);
}

function addVertexElements() {
  const panelContainer = document.getElementById("panelContainer");

  const panel = document.createElement("div");
  panel.classList.add("panel");

  const vertexLabel = document.createElement("label");
  vertexLabel.textContent = "Вершина " + vertexIndex;
  vertexIndex++;

  const edgePanel = document.createElement("edgePanel");
  edgePanel.classList.add("edgePanel");

  const edgeButton = document.createElement("edgeButton");
  edgeButton.classList.add("myButton")
  edgeButton.textContent = "Додати ребро";
  edgeButton.addEventListener("click", function () {
    addEdgeElements(edgePanel);
  });

  panel.appendChild(vertexLabel);
  panel.appendChild(edgePanel)
  panel.appendChild(edgeButton);
  addEdgeElements(edgePanel);

  panelContainer.appendChild(panel);
}

function addEdgeElements(panel) {
  const edgeLabel = document.createElement("label");
  edgeLabel.textContent = ", ребро до вершини ";

  const edgeInput = document.createElement("input");

  const weightLabel = document.createElement("label");
  weightLabel.textContent = " з вагою ";

  const weightInput = document.createElement("input");

  panel.appendChild(edgeLabel);
  panel.appendChild(edgeInput);
  panel.appendChild(weightLabel);
  panel.appendChild(weightInput);
}

function readInputData() {
  const panelContainer = document.getElementById("panelContainer");
  const panels = panelContainer.querySelectorAll(".panel");

  const inputData = {};

  panels.forEach((panel, index) => {
    const inputs = panel.querySelectorAll("input");

    inputData[index] = {};

    for (let i = 0; i < inputs.length; i = i + 2) {
      if (inputs[i].value === '' && inputs[i + 1].value === '') {
        alert("Заповніть!");
        break;
      }
      inputData[index][inputs[i].value] = inputs[i + 1].value;
    }
  });

  document.getElementById("findDistances").style.display = "block";
  document.getElementById("saveNewGraphButton").style.display = "none";
  document.getElementById("addGraphButton").style.display = "block";
  document.getElementById("panelContainer").textContent = null;
  addVertexButton.style.display = "none";

  getGraph(inputData);
}
