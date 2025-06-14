// API URL for currency conversion (Frankfurter API - free and no API key needed)
const API_URL = "https://api.frankfurter.app/latest";

// Country code to currency code mapping
const countryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};

// DOM elements
const amountInput = document.getElementById("amountInput");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const resultInput = document.getElementById("resultInput");
const convertButton = document.getElementById("convertButton");
const swapCurrencies = document.getElementById("swapCurrencies");
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");
const converterForm = document.getElementById("converterForm");

// Populate currency dropdowns
function populateCurrencies() {
  let options = "";
  for (const currency in countryList) {
    options += `<option value="${currency}">${currency}</option>`;
  }

  fromCurrency.innerHTML = options;
  toCurrency.innerHTML = options;

  // Set default values
  fromCurrency.value = "USD";
  toCurrency.value = "INR";

  // Update flags based on default values
  updateFlag("from");
  updateFlag("to");
}

// Update flag image based on selected currency
function updateFlag(type) {
  const currency = type === "from" ? fromCurrency.value : toCurrency.value;
  const countryCode = countryList[currency];
  const flagImg = type === "from" ? fromFlag : toFlag;
  flagImg.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// Convert currencies
async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  // If same currency selected, no conversion needed
  if (from === to) {
    resultInput.value = formatCurrency(amount, to);
    return;
  }

  try {
    convertButton.disabled = true;
    convertButton.textContent = "Converting...";

    // Frankfurter API call
    const response = await fetch(
      `${API_URL}?amount=${amount}&from=${from}&to=${to}`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data && data.rates && data.rates[to]) {
      const result = data.rates[to];
      resultInput.value = formatCurrency(result, to);
    } else {
      throw new Error("Invalid response from API");
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    alert("Something went wrong. Please try again later.");
  } finally {
    convertButton.disabled = false;
    convertButton.textContent = "Convert";
  }
}

// Format currency with appropriate symbol
function formatCurrency(amount, currency) {
  const formattedAmount = parseFloat(amount).toFixed(2);

  switch (currency.toUpperCase()) {
    case "INR":
      return `₹ ${formattedAmount}`;
    case "USD":
      return `$${formattedAmount}`;
    case "EUR":
      return `€${formattedAmount}`;
    case "GBP":
      return `£${formattedAmount}`;
    case "JPY":
      return `¥${formattedAmount}`;
    case "AUD":
    case "CAD":
      return `$${formattedAmount} ${currency}`;
    case "CNY":
      return `¥${formattedAmount} ${currency}`;
    default:
      return `${formattedAmount} ${currency}`;
  }
}

// Swap currencies
function swapCurrenciesHandler() {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  updateFlag("from");
  updateFlag("to");

  // If there's a result, convert immediately after swap
  if (resultInput.value) {
    convertCurrency();
  }
}

// Initialize the app
function init() {
  populateCurrencies();

  // Event listeners
  converterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    convertCurrency();
  });

  swapCurrencies.addEventListener("click", swapCurrenciesHandler);

  fromCurrency.addEventListener("change", () => updateFlag("from"));
  toCurrency.addEventListener("change", () => updateFlag("to"));
}

// Start the app
document.addEventListener("DOMContentLoaded", init);
