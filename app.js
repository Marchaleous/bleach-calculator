// Listen for submit
document.getElementById('bleach-form').addEventListener('submit', function (e) {
  document.getElementById('low-bleach').style.display = 'none';
  document.getElementById('high-bleach').style.display = 'none';
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculateResults, 1000);
  e.preventDefault();
});

// Calculate Results
const calculateResults = () => {
  console.log('Calculating...');
  let waterTotal = document.getElementById('water-total').value;
  const waterMakeup = document.getElementById('water-makeup').value;
  const ppmCurrent = document.getElementById('ppm-current').value;
  const ppmDesired = document.getElementById('ppm-desired').value;
  // ounces of 8.25% bleach needed for 1000 gallons to reach 1 ppm
  const bptg = 1.67;
  const ppmNeeded = parseFloat(
    (ppmDesired * waterTotal - ppmCurrent * (waterTotal - waterMakeup)) /
      waterMakeup
  );
  const bleachNeeded = parseFloat((ppmNeeded * bptg * waterMakeup) / 1000);
  if (waterMakeup > waterTotal) {
    waterTotal = waterMakeup;
  }
  if (bleachNeeded < 0) {
    document.getElementById('high-bleach').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  } else if (isFinite(bleachNeeded)) {
    document.getElementById('bleach-needed').value = bleachNeeded.toFixed(2);
    document.getElementById('bleach-needed-in-ml').value = Math.ceil(
      bleachNeeded * 29.574
    );
    document.getElementById('low-bleach').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
};

// Show Error
function showError(error) {
  document.getElementById('low-bleach').style.display = 'none';
  document.getElementById('high-bleach').style.display = 'none';
  document.getElementById('loading').style.display = 'none';
  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);
  setTimeout(clearError, 2000);
}
// Clear error
const clearError = () => document.querySelector('.alert').remove();
