document.getElementById('number-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the form from refreshing the page
  
    // Get the input value
    const number = document.getElementById('fav-number').value;
  
    // Make an API call (example: Numbers API)
    try {
      const response = await fetch(`http://numbersapi.com/${number}`);
      const fact = await response.text();
  
      // Update the result in the #num-results div
      const resultDiv = document.getElementById('num-results');
      resultDiv.textContent = `Fact about ${number}: ${fact}`;
  
      // Ensure #num-results remains outside the form
    } catch (error) {
      console.error('Error fetching the API:', error);
    }
  });
  