import React, { useState } from 'react';
const CurrencyConverter = () => {
// State variables
const [fromCurrency, setFromCurrency] = useState('USD');
const [toCurrency, setToCurrency] = useState('EUR');
const [convertedAmount, setConvertedAmount] = useState('');
// Hard-coded exchange rates
const exchangeRates = {
USD: {
EUR: 0.85,
GBP: 0.72,
CAD: 1.27
// Add more currencies as needed
},
EUR: {
USD: 1.18,
GBP: 0.85,
CAD: 1.48
// Add more currencies as needed
},
GBP: {
USD: 1.39,
EUR: 1.18,
CAD: 1.74
// Add more currencies as needed
},
CAD: {
USD: 0.79,
EUR: 0.68,
GBP: 0.57
// Add more currencies as needed
}
};
// Function to handle amount change
const handleAmountChange = (event) => {
const value = event.target.value;
setAmount(value);
}
}