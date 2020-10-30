var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
var apiToken = "?token=dQllno8-JhNlxb46t9mLJVIJnDFmvNdkafhM3X5td3Q";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      handleResponse(request.response);
    })
);

const handleResponse = (response) => {
  const plants = JSON.parse(response).data;
  console.log(plants);
  const after1753 = plants.filter((plant) => plant.year > 1753);
  after1753.map(addToDom);
};

const addToDom = (plant) => {
  const wrapperDiv = document.createElement("div");
  wrapperDiv.setAttribute("class", "plant");
  const plantName = document.createElement("h3");
  plantName.innerText = plant.common_name;
  const imageUrl = plant.image_url;
  const plantImg = document.createElement("img");
  plantImg.setAttribute("src", imageUrl);
  plantImg.setAttribute("class", "plant-img");
  wrapperDiv.appendChild(plantName);
  wrapperDiv.appendChild(plantImg);
  document.getElementById("plants").appendChild(wrapperDiv);
};
