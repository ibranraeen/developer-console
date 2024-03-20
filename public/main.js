// Example usage

// Define the URL for the API endpoint

const apiUrl = "https://dummyjson.com/products";
// const apiUrl = "https://dummyapi.online/api/movies";
// const apiUrl = "https://jsonplaceholder.typicode.com/todos";
// const apiUrl = "	https://dummy.restapiexample.com/api/v1/employees";
// const apiUrl = "https://fakestoreapi.com/products";

// Fetch method to retrieve JSON data from the API
fetch(apiUrl)
  .then((response) => {
    // Check if the response is successful (status code 200)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Parse the JSON data from the response
    return response.json();
  })
  .then((data) => {
    // Display the JSON data in the console
    console.log(data);
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch
    console.error("There was a problem with your fetch operation:", error);
  });
